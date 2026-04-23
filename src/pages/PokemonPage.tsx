/**
 * PokemonPage component.
 *
 * Main page for displaying Pokémon data.
 * Supports:
 * - Pagination
 * - Search (debounced/delayed)
 * - Type filtering
 * - Shiny toggle
 *
 * Combines multiple data sources and decides what to render
 * based on current UI state.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { usePokemon, useSearchPokemon, useTypeSearchPokemon, useAllPokemon } from "../hooks/usePokemon"
import PokemonCard from "../components/PokemonCard"
import { useState } from "react"
import { types, typeColors } from "../types/types"
import { useDelay } from "../hooks/useDelay"

const PokemonPage = () => {
  /** Pagination state */
  const [page, setPage] = useState(1)
  const { pokemon, loading, error } = usePokemon(page)
  const [sortBy, setSortBy] = useState<string>("id")

  /** Search state (debounced to avoid excessive API calls) */
  const [search, setSearch] = useState("")
  const delaySearch = useDelay(search, 500)
  const { pokemon: searchedPokemon, loading: searchLoading, error: searchError } = useSearchPokemon(delaySearch)

  /** Type filter state */
  const [selectedType, setSelectedType] = useState("")
  const { pokemon: typeResults } = useTypeSearchPokemon(selectedType)

  /** Toggle shiny sprites */
  const [isShiny, setIsShiny] = useState(false)
  const { pokemon: allPokemon } = useAllPokemon()

  /**
   * Determines which dataset to display.
   *
   * Priority:
   * 1. Search results
   * 2. Type filter results
   * 3. Default paginated list
   */
const displayPokemon = search
  ? searchedPokemon
  : selectedType
  ? typeResults
  : sortBy !== "id"
  ? allPokemon
  : pokemon

const sortedPokemon = [...displayPokemon].sort((a, b) => {
  switch (sortBy) {
    case "total": return ((b.hp ?? 0) + (b.attack ?? 0) + (b.defense ?? 0) + (b.spAttack ?? 0) + (b.spDefense ?? 0) + (b.speed ?? 0))
                       - ((a.hp ?? 0) + (a.attack ?? 0) + (a.defense ?? 0) + (a.spAttack ?? 0) + (a.spDefense ?? 0) + (a.speed ?? 0))
    case "hp":      return (b.hp ?? 0) - (a.hp ?? 0)
    case "attack":  return (b.attack ?? 0) - (a.attack ?? 0)
    case "defense": return (b.defense ?? 0) - (a.defense ?? 0)
    case "spAttack":  return (b.spAttack ?? 0) - (a.spAttack ?? 0)
    case "spDefense": return (b.spDefense ?? 0) - (a.spDefense ?? 0)
    case "speed":   return (b.speed ?? 0) - (a.speed ?? 0)
    default: return parseInt(a.id) - parseInt(b.id)
  }
})

  /**
   * Determines loading state based on active mode.
   */
  const isLoading = search ? searchLoading : loading

  /**
   * Dynamic page title depending on active filter/search.
   */
  const pageTitle = selectedType
    ? `${selectedType} Pokémon`
    : search
    ? `Results for "${search}"`
    : 'All Pokémon'

  /** Loading state UI */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm animate-pulse">Loading Pokémon…</p>
      </div>
    )
  }

  /** Error state UI */
  if (error || searchError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Pokédex</h1>
        <p className="text-sm text-gray-500 mt-1">Browse, search, and filter all Pokémon to build your team.</p>
      </div>

      {/* Search + filter toolbar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-4 shadow-sm">

        {/* Search input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name…"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors duration-150"
        />

        <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none focus:border-gray-400 focus:bg-white transition-colors duration-150"
      >
        <option value="id">Sort: Default (#)</option>
        <option value="total">Sort: Total stats</option>
        <option value="hp">Sort: HP</option>
        <option value="attack">Sort: Attack</option>
        <option value="defense">Sort: Defense</option>
        <option value="spAttack">Sort: Sp. Attack</option>
        <option value="spDefense">Sort: Sp. Defense</option>
        <option value="speed">Sort: Speed</option>
      </select>

        {/* Type filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType("")}
            className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-150
              ${selectedType === ''
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            All
          </button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-150 ${typeColors[type]}
                ${selectedType === type ? 'ring-2 ring-offset-1 ring-gray-400' : 'hover:opacity-80'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

    {/* Shiny toggle */}
    <button
      onClick={() => setIsShiny(!isShiny)}
      className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-150 ${
        isShiny
          ? 'bg-yellow-400 text-yellow-900'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {isShiny ? '✨ Shiny' : 'Normal'}
    </button>

      {/* Results header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">{pageTitle}</h2>
        <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
          {sortedPokemon.length} found
        </span>
      </div>

      {/* Empty state */}
      {sortedPokemon.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center h-48 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm font-medium">No Pokémon found</p>
          <p className="text-gray-300 text-xs mt-1">Try a different name or type filter</p>
        </div>
      )}

      {/* Pokemon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {sortedPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} isShiny={isShiny} />
        ))}
      </div>

      {/* Pagination (only when no filters/search are active) */}
      {!search && !selectedType && (
        <div className="flex items-center justify-center gap-3 pt-4 pb-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
          >
            ← Previous
          </button>
          <span className="text-sm font-medium text-gray-500 tabular-nums min-w-16 text-center">
            Page {page}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-150"
          >
            Next →
          </button>
        </div>
      )}

    </div>
  )
}

export default PokemonPage
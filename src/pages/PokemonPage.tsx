import { usePokemon, useSearchPokemon } from "../hooks/usePokemon"
import PokemonCard from "../components/PokemonCard"
import { useState } from "react"
import { types } from "../types/types"
import { typeColors } from "../types/types"

const PokemonPage = () => {
  const [page, setPage] = useState(1);
  const { pokemon, loading, error } = usePokemon(page)

  const [search, setSearch] = useState("");
  const { pokemon: searchedPokemon, loading: searchLoading, error: searchError } =
    useSearchPokemon(search)

  const displayPokemon = search ? searchedPokemon : pokemon
  const isLoading = search ? searchLoading : loading

  if (isLoading) {
    return <p className="p-6">Loading Pokemon</p>;
  }

  if (error || searchError) {
    return <p className="p-6 text-red-400">Error</p>;
  }

  return (
    <div className="p-6">
      <input
        id="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-2 py-1 mb-4 w-full"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {types.map((type) => (
          <button
            key={type}
            className={`text-xs font-medium px-3 py-1 rounded-full ${typeColors[type]}`}
          >
            {type}
          </button>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-6">Pokemon</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayPokemon.length === 0 && !isLoading && (
    <p className="text-gray-500 col-span-full">No Pokemon found</p>
  )}
        {displayPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {!search && (
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-red-200 rounded disabled:opacity-50"
        >
          Go back
        </button>
        <span className="bg-blue-200"> Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-green-200"
        >
          Next
        </button>
      </div>
      )}
    </div>
  )
}

export default PokemonPage;

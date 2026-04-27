/**
 * The Pokemon card component
 *
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */
import type { Pokemon } from "../types"
import { typeColors } from "../types/types"

/**
 * Props for PokemonCard.
 *
 * @property pokemon - The Pokémon data to display
 * @property isShiny - Whether to show shiny sprite (optional)
 * @property selectedTeamId - Currently selected team ID
 * @property onAddToTeam - Callback to add pokemon to team
 */
interface PokemonCardProps {
  pokemon: Pokemon
  isShiny?: boolean
  selectedTeamId?: string
  onAddToTeam?: (pokemonId: string) => Promise<void>
}

/**
 * Maps stat labels to Tailwind color classes.
 */
const statColors: Record<string, string> = {
  HP:  "bg-emerald-400",
  ATK: "bg-yellow-400",
  DEF: "bg-orange-400",
  SPATK: "bg-blue-400",
  SPDEF: "bg-violet-400",
  SPD: "bg-pink-400",
  TOTAL: "bg-red-500",
}

/**
 * Renders a card UI for a single Pokémon.
 */
const PokemonCard = ({ pokemon, isShiny = false, selectedTeamId, onAddToTeam }: PokemonCardProps) => {

  const getTypeColor = (type: string) => typeColors[type] ?? "bg-gray-100 text-gray-500"

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col">

      {/* Image area */}
      <div className="relative flex justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 pt-5 pb-2 px-4">
        <img
          src={`https://img.pokemondb.net/sprites/home/${isShiny ? 'shiny' : 'normal'}/${pokemon.name.toLowerCase()}.png`}
          alt={pokemon.name}
          className="w-24 h-24 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
        />
        {/* Add to team button */}
        {selectedTeamId && onAddToTeam && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAddToTeam(pokemon.id)
            }}
            className="absolute top-2 right-2 w-6 h-6 bg-gray-900 text-white rounded-full text-xs font-bold hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            +
          </button>
        )}
      </div>

      {/* Info + stats */}
      <div className="flex flex-col gap-3 p-4 flex-1">

        {/* Name + types */}
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-0.5">
            #{String(pokemon.id).padStart(3, '0')}
          </p>
          <h2 className="text-sm font-semibold text-gray-900 capitalize">{pokemon.name}</h2>
          <div className="flex gap-1.5 mt-2">
            {[pokemon.type1, pokemon.type2].filter(Boolean).map((type) => (
              <span
                key={type}
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getTypeColor(type!)}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Stats */}
        <div className="flex flex-col gap-2">
          {[
            { label: "HP",  value: pokemon.hp },
            { label: "ATK", value: pokemon.attack },
            { label: "DEF", value: pokemon.defense },
            { label: "SPATK", value: pokemon.spAttack },
            { label: "SPDEF", value: pokemon.spDefense },
            { label: "SPD", value: pokemon.speed },
            { label: "TOTAL", value: (pokemon.hp ?? 0) + (pokemon.attack ?? 0) + (pokemon.defense ?? 0) + (pokemon.spAttack ?? 0) + (pokemon.spDefense ?? 0) + (pokemon.speed ?? 0) }
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-400 w-7 shrink-0">{label}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${statColors[label]} transition-all duration-500`}
                  style={{ width: `${Math.min(((value ?? 0) / 160) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs tabular-nums text-gray-500 w-6 text-right shrink-0">{value}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PokemonCard
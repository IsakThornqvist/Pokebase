import type { Pokemon } from "../types";
import { typeColors } from "../types/types";

interface PokemonCardProps {
  pokemon: Pokemon;
}



const statColors: Record<string, string> = {
  HP: "bg-green-400",
  ATK: "bg-orange-400",
  DEF: "bg-blue-400",
  SPD: "bg-purple-400",
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {

  const getTypeColor = (type: string) =>
    typeColors[type] ?? "bg-gray-100 text-gray-600";

  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-3 border border-gray-100 shadow-sm">
<img 
  src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name.toLowerCase()}.png`}
  alt={pokemon.name}
  className="w-24 h-24 object-contain"
/>
      <div>
        <h2 className="text-base font-medium">{pokemon.name}</h2>
        <div className="flex gap-1.5 mt-1">
          {[pokemon.type1, pokemon.type2].filter(Boolean).map((type) => (
            <span
            key={type}
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeColor(type!)}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {[
          { label: "HP", value: pokemon.hp },
          { label: "ATK", value: pokemon.attack },
          { label: "DEF", value: pokemon.defense },
          { label: "SPD", value: pokemon.speed },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-8">{label}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${statColors[label]}`}
                style={{ width: `${((value ?? 0) / 150) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-5 text-right">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PokemonCard;

import type { Pokemon } from "../types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  Fire: "bg-orange-100 text-orange-700",
  Water: "bg-blue-100 text-blue-700",
  Grass: "bg-green-100 text-green-700",
  Electric: "bg-yellow-100 text-yellow-700",
  Poison: "bg-purple-100 text-purple-700",
  Psychic: "bg-pink-100 text-pink-700",
  Ice: "bg-cyan-100 text-cyan-700",
  Dragon: "bg-indigo-100 text-indigo-700",
  Dark: "bg-gray-900 text-white",
  Rock: "bg-yellow-200 text-yellow-800",
  Ground: "bg-orange-200 text-orange-800",
  Ghost: "bg-violet-100 text-violet-700",
  Bug: "bg-lime-100 text-lime-700",
  Steel: "bg-slate-100 text-slate-700",
  Fighting: "bg-red-100 text-red-700",
  Normal: "bg-stone-100 text-stone-600",
  Flying: "bg-sky-100 text-sky-700",
  Fairy: "bg-pink-300 text-pink-700",
};

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
  );
};

export default PokemonCard;

import type { Pokemon } from "../types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-cpl gap-2">
      <h2 className="text-xl font-bold">{pokemon.name}</h2>
      <p className="text-sm text-gray-500">
        {pokemon.type1} {pokemon.type2 ? `/ ${pokemon.type2}` : ""}
      </p>
      <div className="text-sm">
        <p>HP: {pokemon.hp}</p>
        <p>Attack: {pokemon.attack}</p>
        <p>Defense: {pokemon.defense}</p>
        <p>Speed: {pokemon.speed}</p>
      </div>
    </div>
  )
}

export default PokemonCard

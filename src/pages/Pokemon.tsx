import { fakePokemon } from '../utils/fakaData'
import PokemonCard from '../components/PokemonCard'

const PokemonPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pokemon</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fakePokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
}

export default PokemonPage
import { usePokemon } from '../hooks/usePokemon'
import PokemonCard from '../components/PokemonCard'

const PokemonPage = () => {

  const { pokemon, loading, error } = usePokemon()
  
  if (loading) {
    return <p className='p-6'>Loading Pokemon</p>
  }

  if (error) {
    return <p className='p-6 text-red-400'>Error</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pokemon</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
}

export default PokemonPage
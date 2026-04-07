import { usePokemon } from '../hooks/usePokemon'
import PokemonCard from '../components/PokemonCard'
import { useState } from 'react'
import { types } from '../types/types'
import { typeColors } from '../types/types'

const PokemonPage = () => {

  const [page, setPage] = useState(1)
  const { pokemon, loading, error } = usePokemon(page)
  
  if (loading) {
    return <p className='p-6'>Loading Pokemon</p>
  }

  if (error) {
    return <p className='p-6 text-red-400'>Error</p>
  }

  return (
    <div className="p-6">
      <label htmlFor="search" className="block mb-2 font-medium">Search Pokemon:</label>
      <input id="search" type='text' className="border rounded px-2 py-1 mb-4 w-full" />

<div className="flex flex-wrap gap-2 mb-6">
  {types.map(type => (
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
        {pokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className='flwx gap-4 mt-6'>
        <button 
        onClick={() => setPage(p => p-1)}
        disabled={page === 1}
        className='px-4 py 2 bg-red-200 rounded diabled:opacity-50'
        >
          Go back
        </button>
        <span className='bg-blue-200'> Page {page}</span>
        <button 
        onClick={() => setPage(p => p + 1)}
        className='px-4 py-2 bg-green-200'
        >
          Next

        </button>


      </div>
    </div>
  )
}

export default PokemonPage
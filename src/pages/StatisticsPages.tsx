import { useAllPokemonStats, countTypes } from "../hooks/useStatistics"

const StatisticsPage = () => {

const { pokemon, loading, error } = useAllPokemonStats()



const sortedTypes = Object.entries(countTypes(pokemon)). sort((a, b) => b[1] - a[1])

const maxAmountForOneType = sortedTypes[0]?.[1] ?? 1


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm animate-pulse">Loading Pokémon…</p>
      </div>
    )
  }

  /** Error state UI */
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      </div>
    )
  }

  return (
    <p> yoyo</p>
  )

}

export default StatisticsPage
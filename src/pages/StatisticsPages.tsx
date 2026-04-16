import { useAllPokemonStats, countTypes } from "../hooks/useStatistics"
import { typeHexColors } from "../types/types"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"


const StatisticsPage = () => {

  const { pokemon, loading, error } = useAllPokemonStats()

  const sortedTypes = Object.entries(countTypes(pokemon)).sort((a, b) => b[1] - a[1])
  const chartData = sortedTypes.map(([type, count]) => ({ type, count }))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm animate-pulse">Loading Statistics…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Statistics</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of Pokémon by type.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Top Left */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Pokémon count per type</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} layout="horizontal" margin={{ left: 60, right: 20 }}>
              <XAxis type="category" dataKey="type" tick={{ fontSize: 12 }} />
              <YAxis type="number" tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`${value} Pokémon`, "Count"]}
                cursor={{ fill: "#f3f4f6" }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {chartData.map(({ type }) => (
                  <Cell key={type} fill={typeHexColors[type] ?? "#aaaaaa"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Right */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Statistics Section 2</h2>
            <p> yoyo </p>
        </div>

        {/* Bottom Left */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Statistics Section 3</h2>
<p> yoyo </p>
        </div>

        {/* Bottom Right */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Statistics Section 4</h2>
                <p> yoyo </p>
        </div>
      </div>

    </div>
  )
}

export default StatisticsPage
/**
 * StatisticsPage component.
 *
 * Displays statistical insights about Pokémon data using charts.
 * Includes:
 * - Bar chart for Pokémon count per type
 * - Scatter plot for height vs weight
 * - ??
 * - ?????
 * Data is fetched via custom hooks and transformed for visualization.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { useAllPokemonStats, countTypes } from "../hooks/useStatistics"
import { typeHexColors } from "../types/types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ScatterChart,
  Scatter,
  CartesianGrid,
} from "recharts"

/**
 * Extracts a numeric value from a string (e.g. "8.9 kg" → 8.9).
 *
 * @param value - String containing a number
 * @returns Parsed number or NaN if invalid
 */
function extractNumber(value: string | null | undefined): number {
  return parseFloat(value?.match(/[\d.]+/)?.[0] ?? "")
}

/**
 * Extracts a numeric value from a string (e.g. "6.9 kg" → 6.9).
 *
 * @param value - String containing a number
 * @returns Parsed number or NaN if invalid
 */
const StatisticsPage = () => {

  /** Fetch all Pokémon data for statistics */
  const { pokemon, loading, error } = useAllPokemonStats()

  /** Count Pokémon per type and sort descending */
  const sortedTypes = Object.entries(countTypes(pokemon)).sort(
    (a, b) => b[1] - a[1],
  )

  /** Format data for bar chart */
  const chartData = sortedTypes.map(([type, count]) => ({ type, count }))

  /** Prepare height vs weight data for scatter diagram */
  const heightAndWeightData = pokemon
    .map((p) => ({
      height: extractNumber(p.height),
      weight: extractNumber(p.weight),
      name: p.name,
      type: p.type1,
    }))
    .filter((p) => !isNaN(p.height) && !isNaN(p.weight))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm animate-pulse">
          Loading Statistics…
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-400 text-sm">
          Something went wrong. Please try again.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Statistics
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of Pokémon by type.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Top Left */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Pokémon count per type
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout="horizontal"
              margin={{ left: 60, right: 20 }}
            >
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
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Statistics Section 2
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />

              <XAxis type="number" dataKey="height" name="Height" unit="m" />

              <YAxis type="number" dataKey="weight" name="Weight" unit="kg" />

              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value, name) => [`${value}`, name]}
                labelFormatter={(_, payload) => payload?.[0]?.payload?.name}
              />

              <Scatter data={heightAndWeightData} dataKey="weight">
                {heightAndWeightData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={typeHexColors[entry.type] ?? "#8884d8"}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Left */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Statistics Section 3
          </h2>
          <p> dunno yet </p>
        </div>

        {/* Bottom Right */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Statistics Section 4
          </h2>
          <p> dunno yet </p>
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage

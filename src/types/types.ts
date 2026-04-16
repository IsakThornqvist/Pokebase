/**
 * List of Pokémon types.
 */
export const types = [
  "Normal", "Fire", "Water", "Grass", "Electric", "Ice",
  "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug",
  "Rock", "Ghost", "Dragon", "Dark", "Steel"
]

/**
 * Mapping of Pokémon types to Tailwind CSS classes for background and text color.
 */
export const typeColors: Record<string, string> = {
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
}

export const typeHexColors: Record<string, string> = {
  Normal:   "#A8A878",
  Fire:     "#F08030",
  Water:    "#6890F0",
  Electric: "#F8D030",
  Grass:    "#78C850",
  Ice:      "#98D8D8",
  Fighting: "#C03028",
  Poison:   "#A040A0",
  Ground:   "#E0C068",
  Flying:   "#A890F0",
  Psychic:  "#F85888",
  Bug:      "#A8B820",
  Rock:     "#B8A038",
  Ghost:    "#705898",
  Dragon:   "#7038F8",
  Dark:     "#705848",
  Steel:    "#B8B8D0",
  Fairy:    "#EE99AC",
}
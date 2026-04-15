/**
 * Represents a Pokémon.
 */
export interface Pokemon {
  id: string
  name: string
  type1: string
  type2: string | null
/*     species: string | null
  height: string | null */
  weight: string | null 
  //abilities: string | null
  hp: number | null
  attack: number | null
  defense: number | null
  spAttack: number | null
  spDefense: number | null
  speed: number | null
/*   catchRate: number | null
  baseExp: number | null
  growthRate: string |null
  eggGroups: string |null
  gender: string | null */

}
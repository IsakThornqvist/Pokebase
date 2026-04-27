/**
 * Represents a Pokémon.
 */
export interface Pokemon {
  id: string
  name: string
  type1: string
  type2: string | null
  species: string | null 
  height: string | null 
  weight: string | null 
  abilities: string | null
  hp: number | null
  attack: number | null
  defense: number | null
  spAttack: number | null
  spDefense: number | null
  speed: number | null
  catchRate: number | null
  baseExp: number | null
  growthRate: string |null
  eggGroups: string |null
  gender: string | null 

}

export interface User {
  id: string
  email: string
}

export interface TeamMember {
  id: string
  pokemon: Pokemon
}

export interface Team {
  id: string
  name: string
  user?: User
  members: TeamMember[]
  createdAt: string
}
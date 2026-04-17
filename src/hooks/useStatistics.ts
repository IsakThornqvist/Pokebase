import { useEffect, useState } from "react"
import { graphqlRequest } from "../utils/graphql"
import type { Pokemon } from "../types"


interface PokemonResponse {
    allPokemon: Pokemon[]
}



const POKEMON_QUERY = `
  query ($limit: Int, $offset: Int) {
    allPokemon(limit: $limit, offset: $offset) {
      id
      name
      type1
      type2
      hp
      attack
      defense
      spAttack
      spDefense
      speed
      weight
      height
    }
  }
`

export function useAllPokemonStats () {

    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const data = await graphqlRequest<PokemonResponse>(POKEMON_QUERY, {
                    limit: 1500,
                    offset: 0
                })
                setPokemon(data.allPokemon)
            } catch (error) {
                setError("error placeholder")
            } finally {
                setLoading(false)
            }
        }
        fetchPokemon()
    }, [])
    return { pokemon, loading, error}
}

export function countTypes(pokemon: Pokemon[]): Record<string, number> {
    const typeCounts: Record<string, number> = {}
    
    pokemon.forEach(p => {
        if (p.type1) {
            typeCounts[p.type1] = (typeCounts[p.type1] || 0) + 1
        }
        if (p.type2) {
            typeCounts[p.type2] = (typeCounts[p.type2] || 0) + 1
        }
    })
    
    return typeCounts
}


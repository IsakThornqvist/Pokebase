import { graphqlRequest } from "../utils/graphql"
import type { Pokemon } from "../types"
import { useState, useEffect } from "react"

// PokemonResponse = object that has a key allPokemon which is an array of pokemon
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
      speed
      weight
    }
  }
`

const LIMIT = 20

export function usePokemon(page: number) {
    // When data is fetched 3 things can happen
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const data = await graphqlRequest<PokemonResponse>(POKEMON_QUERY, {
                    limit: LIMIT,
                    offset: (page - 1) * LIMIT 
                })
                setPokemon(data.allPokemon)
            } catch (error) {
                setError("Error while getting pokemon data")
            } finally {
                setLoading(false)
            }
        }
        fetchPokemon()
    }, [page])
    return { pokemon, loading, error }
}
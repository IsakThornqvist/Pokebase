import { graphqlRequest } from "../utils/graphql"
import type { Pokemon } from "../types"
import { useState, useEffect } from "react"

// PokemonResponse = object that has a key allPokemon which is an array of pokemon
interface PokemonResponse {
    allPokemon: Pokemon[]
}

const POKEMON_QUERY = `
  query {
    allPokemon(limit: 5) {
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

export function usePokemon() {
    // When data is fetched 3 things can happen
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const data = await graphqlRequest<PokemonResponse>(POKEMON_QUERY)
                setPokemon(data.allPokemon)
            } catch (error) {
                setError("Error while getting pokemon data")
            } finally {
                setLoading(false)
            }
        }
        fetchPokemon()
    }, [])
    return { pokemon, loading, error }
}
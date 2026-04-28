/**
 * The Pokemon hook.
 *
 * Handles fetching Pokémon data from the GraphQL API,
 * including pagination, search, and type filtering.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */
import { graphqlRequest } from "../utils/graphql"
import type { Pokemon } from "../types"
import { useState, useEffect } from "react"

/**
 * Response type for fetching all Pokémon.
 */
export interface PokemonResponse {
    allPokemon: Pokemon[]
}

/**
 * Response type for searching Pokémon.
 */
interface searchPokemonResponse {
    searchPokemon: Pokemon[]
}

/**
 * Response type for filtering Pokémon by type.
 */
/* interface typeSearchPokemonResponse {
    pokemonByType: Pokemon[]
} */

/**
 * GraphQL query for fetching Pokémon with pagination.
 */
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

/**
 * GraphQL query for searching Pokémon by name.
 */
const SEARCH_QUERY = `
    query ($name: String!) {
      searchPokemon(name: $name) {
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

/**
 * Number of Pokémon per page.
 */
const LIMIT = 20

/**
 * Fetches a paginated list of Pokémon.
 *
 * @param {number} page - Current page number.
 * @returns {{ pokemon: Pokemon[], loading: boolean, error: string | null }}
 */
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
            } catch {
                setError("Error while getting pokemon data")
            } finally {
                setLoading(false)
            }
        }
        fetchPokemon()
    }, [page])
    return { pokemon, loading, error }
}

export function useAllPokemon() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchAll() {
            try {
                const data = await graphqlRequest<PokemonResponse>(POKEMON_QUERY, {
                    limit: 1500,
                    offset: 0
                })
                setPokemon(data.allPokemon)
            } catch {
                setError("Error while getting all pokemon")
            } finally {
                setLoading(false)
            }
        }
        fetchAll()
    }, [])

    return { pokemon, loading, error }
}


/**
 * Searches Pokémon by name.
 *
 * Skips request if no name is provided.
 *
 * @param {string} name - Pokémon name.
 * @returns {{ pokemon: Pokemon[], loading: boolean, error: string | null }}
 */
export function useSearchPokemon(name: string) {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!name) {
            setPokemon([])
            setLoading(false)
            return
        }
        async function fetchPokemonViaSearch() {
            try {
                const data = await graphqlRequest<searchPokemonResponse>
                (SEARCH_QUERY, {
                    name
                })
                setPokemon(data.searchPokemon)
            } catch {
                setError("Error while getting pokemon data via search")
            } finally {
                setLoading(false)
            }
        }
        fetchPokemonViaSearch()
    }, [ name ])

    return { pokemon, loading, error}
}
export function useTypeSearchPokemon(type1: string) {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!type1) {
            setPokemon([])
            setLoading(false)
            return
        }

        async function fetchPokemonViaType() {
            try {
                const data = await graphqlRequest<PokemonResponse>(POKEMON_QUERY, {
                    limit: 1500,
                    offset: 0
                })

                const filtered = data.allPokemon.filter(p =>
                    p.type1?.toLowerCase() === type1.toLowerCase() || 
                    p.type2?.toLowerCase() === type1.toLowerCase()
                )

                setPokemon(filtered)
            } catch {
                setError("Error while getting pokemon via type search")
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonViaType()
    }, [type1])

    return { pokemon, loading, error }
}
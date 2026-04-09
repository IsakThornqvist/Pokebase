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
interface PokemonResponse {
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
interface typeSearchPokemonResponse {
    pokemonByType: Pokemon[]
}

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
      speed
      weight
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
    hp
  }

    }
`

/**
 * GraphQL query for filtering Pokémon by type.
 */
const TYPE_QUERY = `
  query ($type1: String!) {
    pokemonByType(type1: $type1) {
      id
      name
      type1
      type2
      hp
      attack
      defense
      speed
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
            } catch(error) {
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

        /**
/**
 * Fetches Pokémon by type.
 *
 * Skips request if no type is provided.
 *
 * @param {string} type1 - Pokémon primary type.
 * @returns {{ pokemon: Pokemon[], loading: boolean, error: string | null }}
 */
        async function fetchPokemonViaType () {
            try {
                const data = await graphqlRequest<typeSearchPokemonResponse>(TYPE_QUERY, {
                    type1
                })
                setPokemon(data.pokemonByType)
            } catch(error) {
                setError("Error while getting pokemon via type search")
            } finally {
                setLoading(false)
            }
        }
        fetchPokemonViaType()
    }, [type1])

    return { pokemon, loading, error}
} 



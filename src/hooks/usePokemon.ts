import { graphqlRequest } from "../utils/graphql"
import type { Pokemon } from "../types"
import { useState, useEffect } from "react"

// PokemonResponse = object that has a key allPokemon which is an array of pokemon
interface PokemonResponse {
    allPokemon: Pokemon[]
}

interface searchPokemonResponse {
    searchPokemon: Pokemon[]
}

interface typeSearchPokemonResponse {
    typeSearchPokemon: Pokemon[]
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

/*  const TYPE_QUERY = `
    query ($type: String) {
        pokemonByType(type1: $type) {
            id
            name
            }
            }

`  */

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

/* export function useTypeSearchPokemon(type1: string) {

} */



/**
 * Statistics hooks and utilities.
 *
 * Provides data fetching and aggregation functions
 * for Pokémon statistics visualizations.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { useEffect, useState } from "react"
import { graphqlRequest } from "../utils/graphql"
import type { Pokemon } from "../types"


/**
 * Response type for fetching all Pokémon.
 */
interface PokemonResponse {
    allPokemon: Pokemon[]
}


/**
 * GraphQL query for fetching all Pokémon with stats.
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
 * Fetches all Pokémon for use in statistics calculations.
 *
 * Uses a high limit to retrieve the full dataset in one request.
 *
 * @returns {{ pokemon: Pokemon[], loading: boolean, error: string | null }}
 */
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
            } catch {
                setError("error placeholder")
            } finally {
                setLoading(false)
            }
        }
        fetchPokemon()
    }, [])
    return { pokemon, loading, error}
}

/**
 * Counts the number of Pokémon per type.
 *
 * Both type1 and type2 are counted, so a dual-type
 * Pokémon contributes to two type totals.
 *
 * @param {Pokemon[]} pokemon - List of Pokémon to count.
 * @returns {Record<string, number>} Map of type name to count.
 */
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

/**
 * Calculates average base stats per Pokémon type.
 *
 * Only considers type1 for grouping. Stats are rounded
 * to the nearest integer.
 *
 * @param {Pokemon[]} pokemon - List of Pokémon to aggregate.
 * @returns Array of objects with type name and averaged stats.
 */
export function averageStastByType (pokemon: Pokemon[]) {

    const statTypes: Record<string, { hp: number, attack: number, defense: number, spAttack: number, spDefense: number, speed: number, count: number }> = {}

    pokemon.forEach(p => {
        if (p.type1) {
            if(!statTypes[p.type1]) {
            statTypes[p.type1] = { hp: 0, attack: 0, defense: 0, spAttack: 0, spDefense: 0, speed: 0, count: 0 }
        }
        statTypes[p.type1].hp += p.hp ?? 0
        statTypes[p.type1].attack += p.attack ?? 0
        statTypes[p.type1].defense += p.defense ?? 0
        statTypes[p.type1].spAttack += p.spAttack ?? 0
        statTypes[p.type1].spDefense += p.spDefense ?? 0
        statTypes[p.type1].speed += p.speed ?? 0
        statTypes[p.type1].count += 1
        }
    })
        return Object.entries(statTypes).map(([type, stats]) => ({
            type,
            hp: Math.round(stats.hp / stats.count),
            attack: Math.round(stats.attack / stats.count),
            defense: Math.round(stats.defense / stats.count),
            spAttack: Math.round(stats.spAttack / stats.count),
            spDefense: Math.round(stats.spDefense / stats.count),
            speed: Math.round(stats.speed / stats.count),
        }))
    }


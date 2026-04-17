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


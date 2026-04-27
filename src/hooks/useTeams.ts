import { graphqlRequest } from "../utils/graphql"
import { useState, useEffect } from "react"
import type { Team } from "../types/index"

export interface TeamsResponse {
    allTeams: Team[]
}

export interface MyTeamsResponse {
    myTeams: Team[]
}

const MY_TEAMS_QUERY = `
  query {
    myTeams {
      id
      name
      members {
        id
        pokemon {
          id
          name
        }
      }
      createdAt
    }
  }
`

const CREATE_TEAM_MUTATION = `
  mutation($name: String!) {
    createTeam(name: $name) {
      id
      name
      members {
        id
        pokemon {
          id
          name
        }
      }
      createdAt
    }
  }
`

const ADD_POKEMON_MUTATION = `
  mutation($teamId: ID!, $pokemonId: ID!) {
    addPokemonToTeam(teamId: $teamId, pokemonId: $pokemonId) {
      id
      name
      members {
        id
        pokemon {
          id
          name
        }
      }
    }
  }
`

const DELETE_TEAM_MUTATION = `
  mutation($teamId: ID!) {
    deleteTeam(teamId: $teamId) {
      id
    }
  }
`

const REMOVE_POKEMON_MUTATION = `
  mutation($teamId: ID!, $pokemonId: ID!) {
    removePokemonFromTeam(teamId: $teamId, pokemonId: $pokemonId) {
      id
      name
      members {
        id
        pokemon {
          id
          name
        }
      }
    }
  }
`

const UPDATE_TEAM_MUTATION = `
  mutation($teamId: ID!, $name: String!) {
    updateTeam(teamId: $teamId, name: $name) {
      id
      name
    }
  }
`

export async function removePokemonFromTeam(teamId: string, pokemonId: string, token: string | null) {
    return await graphqlRequest<{ removePokemonFromTeam: Team }>(
        REMOVE_POKEMON_MUTATION,
        { teamId, pokemonId },
        token
    )
}

export async function updateTeam(teamId: string, name: string, token: string | null) {
    return await graphqlRequest<{ updateTeam: Team }>(
        UPDATE_TEAM_MUTATION,
        { teamId, name },
        token
    )
}

export async function deleteTeam(teamId: string, token: string | null) {
    return await graphqlRequest<{ deleteTeam: { id: string } }>(
        DELETE_TEAM_MUTATION,
        { teamId },
        token
    )
}

export async function addPokemonToTeam(teamId: string, pokemonId: string, token: string | null) {
    return await graphqlRequest<{ addPokemonToTeam: Team }>(
        ADD_POKEMON_MUTATION,
        { teamId, pokemonId },
        token
    )
}


export async function createTeam(name: string, token: string | null) {
    return await graphqlRequest<{ createTeam: Team }>(
        CREATE_TEAM_MUTATION,
        { name },
        token
    )
}

export function useMyTeams(token: string | null) {

    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchTeams() {
            try {
                const data = await graphqlRequest<MyTeamsResponse>(MY_TEAMS_QUERY, {}, token)
                setTeams(data.myTeams)
            } catch (error) {
                console.log("Teams error:", error)
                setError("Error while getting teams")
            } finally {
                setLoading(false)
            }
        }
        fetchTeams()
    }, [token])

    return { teams, loading, error }
}
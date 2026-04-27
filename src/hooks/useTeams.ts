/**
 * Teams hooks and mutations.
 *
 * Provides data fetching and mutation functions
 * for managing Pokémon teams via the GraphQL API.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { graphqlRequest } from "../utils/graphql"
import { useState, useEffect } from "react"
import type { Team } from "../types/index"

/**
 * Response type for fetching all teams.
 */
export interface TeamsResponse {
    allTeams: Team[]
}

/**
 * Response type for fetching the current user's teams.
 */
export interface MyTeamsResponse {
    myTeams: Team[]
}

/**
 * GraphQL query for fetching the authenticated user's teams.
 */
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

/**
 * GraphQL mutation for creating a new team.
 */
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

/**
 * GraphQL mutation for adding a Pokémon to a team.
 */
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

/**
 * GraphQL mutation for deleting a team.
 */
const DELETE_TEAM_MUTATION = `
  mutation($teamId: ID!) {
    deleteTeam(teamId: $teamId) {
      id
    }
  }
`

/**
 * GraphQL mutation for removing a Pokémon from a team.
 */
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

/**
 * GraphQL mutation for updating a team's name.
 */
const UPDATE_TEAM_MUTATION = `
  mutation($teamId: ID!, $name: String!) {
    updateTeam(teamId: $teamId, name: $name) {
      id
      name
    }
  }
`

/**
 * Removes a Pokémon from a team.
 *
 * @param {string} teamId - ID of the team.
 * @param {string} pokemonId - ID of the Pokémon to remove.
 * @param {string | null} token - JWT auth token.
 */
export async function removePokemonFromTeam(teamId: string, pokemonId: string, token: string | null) {
    return await graphqlRequest<{ removePokemonFromTeam: Team }>(
        REMOVE_POKEMON_MUTATION,
        { teamId, pokemonId },
        token
    )
}

/**
 * Updates a team's name.
 *
 * @param {string} teamId - ID of the team to update.
 * @param {string} name - New name for the team.
 * @param {string | null} token - JWT auth token.
 */
export async function updateTeam(teamId: string, name: string, token: string | null) {
    return await graphqlRequest<{ updateTeam: Team }>(
        UPDATE_TEAM_MUTATION,
        { teamId, name },
        token
    )
}

/**
 * Deletes a team.
 *
 * @param {string} teamId - ID of the team to delete.
 * @param {string | null} token - JWT auth token.
 */
export async function deleteTeam(teamId: string, token: string | null) {
    return await graphqlRequest<{ deleteTeam: { id: string } }>(
        DELETE_TEAM_MUTATION,
        { teamId },
        token
    )
}

/**
 * Adds a Pokémon to a team.
 *
 * @param {string} teamId - ID of the team.
 * @param {string} pokemonId - ID of the Pokémon to add.
 * @param {string | null} token - JWT auth token.
 */
export async function addPokemonToTeam(teamId: string, pokemonId: string, token: string | null) {
    return await graphqlRequest<{ addPokemonToTeam: Team }>(
        ADD_POKEMON_MUTATION,
        { teamId, pokemonId },
        token
    )
}

/**
 * Creates a new team.
 *
 * @param {string} name - Name of the new team.
 * @param {string | null} token - JWT auth token.
 */
export async function createTeam(name: string, token: string | null) {
    return await graphqlRequest<{ createTeam: Team }>(
        CREATE_TEAM_MUTATION,
        { name },
        token
    )
}

/**
 * Fetches all teams belonging to the authenticated user.
 *
 * Re-fetches automatically when the token changes.
 *
 * @param {string | null} token - JWT auth token.
 * @returns {{ teams: Team[], loading: boolean, error: string | null }}
 */
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
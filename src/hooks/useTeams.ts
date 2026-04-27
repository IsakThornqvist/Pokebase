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
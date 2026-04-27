import { useMyTeams, createTeam } from "../hooks/useTeams"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

const TeamsPage = () => {
  const { token } = useAuth()
  const { teams, loading, error } = useMyTeams(token)
  const [newTeamName, setNewTeamName] = useState("")
  const [creating, setCreating] = useState(false)

  async function handleCreateTeam() {
    if (!newTeamName.trim()) return
    try {
      setCreating(true)
      await createTeam(newTeamName, token)
      setNewTeamName("")
      window.location.reload()
    } catch (err) {
      console.log("Error creating team:", err)
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm animate-pulse">Loading teams…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Teams</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your Pokémon teams.</p>
      </div>

      {/* Create team */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-3">
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Team name…"
          className="flex-1 px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors"
        />
        <button
          onClick={handleCreateTeam}
          disabled={creating || !newTeamName.trim()}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 disabled:opacity-40 transition-colors"
        >
          {creating ? "Creating…" : "Create team"}
        </button>
      </div>

      {/* Teams list */}
      {teams.length === 0 && (
        <div className="flex flex-col items-center justify-center h-48 bg-white rounded-lg border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm font-medium">No teams yet</p>
          <p className="text-gray-300 text-xs mt-1">Create your first team above</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-gray-900">{team.name}</h2>
            <div className="flex flex-wrap gap-1">
              {team.members.map((member) => (
                <img
                  key={member.id}
                  src={`https://img.pokemondb.net/sprites/home/normal/${member.pokemon.name.toLowerCase()}.png`}
                  alt={member.pokemon.name}
                  className="w-10 h-10 object-contain"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamsPage
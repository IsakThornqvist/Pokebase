import { useMyTeams, createTeam, deleteTeam, updateTeam, removePokemonFromTeam } from "../hooks/useTeams"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

const TeamsPage = () => {
  const { token } = useAuth()
  const { teams, loading, error } = useMyTeams(token)
  const [newTeamName, setNewTeamName] = useState("")
  const [creating, setCreating] = useState(false)
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")

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

  async function handleUpdateTeam(teamId: string) {
    if (!editingName.trim()) return
    try {
      await updateTeam(teamId, editingName, token)
      setEditingTeamId(null)
      window.location.reload()
    } catch (err) {
      console.log("Error updating team:", err)
    }
  }

  async function handleRemovePokemon(teamId: string, pokemonId: string) {
    try {
      await removePokemonFromTeam(teamId, pokemonId, token)
      window.location.reload()
    } catch (err) {
      console.log("Error removing pokemon:", err)
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
            
            {/* Team header */}
            <div className="flex items-center justify-between">
              {editingTeamId === team.id ? (
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-1 px-2 py-1 rounded-md border border-gray-300 text-sm outline-none focus:border-gray-500"
                    autoFocus
                  />
                  <button
                    onClick={() => handleUpdateTeam(team.id)}
                    className="text-xs font-medium text-green-600 hover:text-green-800 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTeamId(null)}
                    className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-sm font-semibold text-gray-900">{team.name}</h2>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditingTeamId(team.id)
                        setEditingName(team.name)
                      }}
                      className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Rename
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await deleteTeam(team.id, token)
                          window.location.reload()
                        } catch (err) {
                          console.log("Error deleting team:", err)
                        }
                      }}
                      className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Pokemon sprites with remove button */}
            <div className="flex flex-wrap gap-2">
              {team.members.map((member) => (
                <div key={member.id} className="relative group/pokemon">
                  <img
                    src={`https://img.pokemondb.net/sprites/home/normal/${member.pokemon.name.toLowerCase()}.png`}
                    alt={member.pokemon.name}
                    className="w-10 h-10 object-contain"
                  />
                  <button
                    onClick={() => handleRemovePokemon(team.id, member.pokemon.id)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs hidden group-hover/pokemon:flex items-center justify-center leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
              {team.members.length === 0 && (
                <p className="text-xs text-gray-400">No Pokémon yet</p>
              )}
            </div>

            {/* Member count */}
            <p className="text-xs text-gray-400">{team.members.length}/6 Pokémon</p>

          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamsPage
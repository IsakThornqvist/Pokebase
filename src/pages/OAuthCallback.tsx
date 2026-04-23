/**
 * OAuthCallback
 *
 * 
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const OAuthCallback = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")

    if (token) {
      login(token)
      navigate("/pokemon")
    } else {
      navigate("/login?error=oauth_failed")
    }
  }, [navigate])

  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400 text-sm animate-pulse">Signing you in…</p>
    </div>
  )
}

export default OAuthCallback
/**
 * OAuthCallback component.
 *
 * Handles the OAuth 2.0 callback after the user authenticates
 * with a third-party provider. Extracts the JWT token from the
 * URL query parameters, saves it to AuthContext, and redirects
 * to the Pokémon page. If no token is found, redirects to login.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

/**
 * Renders a loading state while processing the OAuth callback.
 */
const OAuthCallback = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  /**
   * On mount, reads the token from the URL and saves it.
   * Redirects to /pokemon on success, /login on failure.
   */
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
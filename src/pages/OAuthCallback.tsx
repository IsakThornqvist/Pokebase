import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const OAuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")

    if (token) {
      localStorage.setItem("token", token)
      navigate("/")
    } else {
      navigate("/login?error=oauth_failed")
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400 text-sm animate-pulse">Signing you in…</p>
    </div>
  )
}

export default OAuthCallback
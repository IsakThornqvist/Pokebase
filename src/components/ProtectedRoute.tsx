/**
 * ProtectedRoute component.
 *
 * Wraps routes that require authentication.
 * Redirects unauthenticated users to the login page.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import type { ReactNode } from "react"

/**
 * Props for ProtectedRoute.
 *
 * @property children - The protected content to render if authenticated.
 */
interface Props {
  children: ReactNode
}

/**
 * Renders children if the user is authenticated.
 * Otherwise redirects to /login.
 */
const ProtectedRoute = ({ children }: Props) => {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
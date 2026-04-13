/**
 * Authentication context.
 *
 * Provides global auth state and actions.
 * Persists token in localStorage.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

/**
 * Auth context shape.
*/
interface AuthContextType {
    token: string | null
    login: (token: string) => void
    logout: () => void
}

/**
 * Auth context instance.
*/
const AuthContext = createContext<AuthContextType | null>(null)

/**
 * Provides authentication state to the app.
*/
export function AuthProvider({ children }: { children: ReactNode }) {

    const [ token, setToken ] = useState<string | null>(
        localStorage.getItem("token")
    )

    
    function login (token: string): void {
        setToken(token)
        localStorage.setItem("token", token)
    }

    function logout () {
        setToken(null)
        localStorage.removeItem("token")
    }

    return (
    <AuthContext.Provider value={{ token, login, logout }}>
        {children}
    </AuthContext.Provider>
    )

}
/**
 * Hook for accessing auth context.
 */
export function useAuth () {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("Error in authcontext.tsx no useAuth")
    }
    return context

}
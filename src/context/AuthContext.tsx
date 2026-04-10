import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface AuthContextType {
    token: string | null
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)


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
/* export function useAuth () {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("Error in authcontext.tsx no useAuth")
    }
    return context

} */
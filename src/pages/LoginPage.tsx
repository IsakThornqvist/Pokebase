/**
 * LoginPage component.
 *
 * Provides a login form and handles authentication flow.
 * On success, stores token and redirects to Pokémon page.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { loginMutation } from "../hooks/useAuth"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Renders the login form.
*/
const LoginPage = () => {
    /** Form state */
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    /** Auth + navigation */
    const { login } = useAuth()
    const navigate = useNavigate()

    /**
     * Handles form submission.
    */
    async function handleSubmit(e: React.FormEvent) {
        console.log("submitted!")
        e.preventDefault()
        try {
            const { token } = await loginMutation(email, password)
            login(token)
            navigate("/pokemon")
        } catch (err) {
            setError("Invalid email or password")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit" onClick={handleSubmit}>Login</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default LoginPage
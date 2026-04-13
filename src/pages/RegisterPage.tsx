/**
 * LoginPage component.
 *
 * Provides a login form and handles authentication flow.
 * On success, stores token and redirects to Pokémon page.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { registerMutation } from "../hooks/useAuth"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Renders the login form.
*/
const RegisterPage = () => {
    /** Form state */
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    /** Auth + navigation */
    const { login } = useAuth()
    const navigate = useNavigate()

    /**
     * Handles form submission.
    */
    async function handleSubmit(e: React.FormEvent) {
        console.log("registered")
        e.preventDefault()
        try {
            if (password != confirmPassword) {
                throw new Error("Passwords do not match!")
            }
            const { token } = await registerMutation(email, password)
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
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
            />
            <button type="submit" onClick={handleSubmit}>Register</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default RegisterPage
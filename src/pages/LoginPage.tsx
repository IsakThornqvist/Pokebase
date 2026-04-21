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
    <div className="min-h-[85vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">

            <div className="flex flex-col items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center mb-3">
                    <span className="text-white text-base font-bold">P</span>
                </div>
                <h1 className="text-lg font-semibold text-gray-900">Pokebase</h1>
                <p className="text-sm text-gray-500 mt-0.5">Sign in to your account</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-colors"
                        />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md px-3 py-2">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
                >
                    Sign in
                </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
                No account yet?{" "}
                <a href="/register" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">
                    Create one
                </a>
            </p>
        </div>
    </div>
)
}

export default LoginPage
/**
 * LoginPage component.
 *
 * Provides a Register form and handles registration flow
 * On successful register, redirect to Pokémon page.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { registerMutation } from "../hooks/useAuth"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Renders the Register form.
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
    <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 w-full max-w-md flex flex-col gap-6">

            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create account</h1>
                <p className="text-sm text-gray-500 mt-1">Start building your Pokémon teams</p>
            </div>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors duration-150"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors duration-150"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors duration-150"
                />
                {error && (
                    <p className="text-red-400 text-xs font-medium">{error}</p>
                )}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors duration-150 mt-1"
                >
                    Register
                </button>
            </form>

            <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-gray-700 font-semibold hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    </div>
)
}

export default RegisterPage
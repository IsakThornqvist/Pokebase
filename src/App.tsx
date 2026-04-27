/**
 * App component.
 *
 * Root component of the application.
 * Sets up routing and global layout structure.
 *
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pokemon from "./pages/PokemonPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import StatisticsPage from "./pages/StatisticsPages"
import HomePage from "./pages/HomePage"

 import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"
import OAuthCallback from "./pages/OAuthCallback"
import TeamsPage from "./pages/TeamsPage"

/**
 * Renders the main application layout and routes.
 */
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8f9fb]">
        <Navbar />
        <div className="px-6 py-8">
          <Routes>
            <Route path="/pokemon" element={<Pokemon />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/statistics" element={
            <ProtectedRoute>
              <StatisticsPage />
            </ProtectedRoute>
            }  />
            <Route path="/teams" element={
            <ProtectedRoute>
              <TeamsPage />
            </ProtectedRoute>
            } />
            <Route path="/" element={<HomePage />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
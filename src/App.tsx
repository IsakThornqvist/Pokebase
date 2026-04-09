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

/**
 * Renders the main application layout and routes.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8f9fb]">
        <Navbar />
        <div className="px-6 py-8">
          <Routes>
            <Route path="/pokemon" element={<Pokemon />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
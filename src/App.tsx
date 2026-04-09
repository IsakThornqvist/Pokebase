import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pokemon from "./pages/PokemonPage"

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
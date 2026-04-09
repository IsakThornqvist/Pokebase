import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pokemon from "./pages/PokemonPage"

function App() {
  return (
    <BrowserRouter>
    <main className="h-screen">
      <Navbar/>
      <Routes>
      <Route path="/pokemon" element={<Pokemon />} />
      </Routes>
    </main>
    {/* <Footer/> */}
    </BrowserRouter>
  )
}

export default App
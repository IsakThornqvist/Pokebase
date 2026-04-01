import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pokemon from "./pages/Pokemon"

function App() {
  return (
    <BrowserRouter>
    <main className="h-screen">
      <Navbar/>
      <Routes>
      <Route path="/pokemon" element={<Pokemon />} />
      </Routes>
      <h1 className="font-bold text-3xl text-center"> Header</h1>
    </main>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
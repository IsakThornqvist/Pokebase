import Navbar from "./components/Navbar"
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <main className="h-screen">
      <Navbar/>
      <h1 className="font-bold text-3xl text-center"> Header</h1>

    </main>
    </BrowserRouter>
  )
}

export default App
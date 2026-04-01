import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
<nav className="bg-green-700 px-6 py-10 flex items-center justify-between min-h-16">
      <ul className="flex gap-6">
        <li>
          <Link to="/" className="text-white hover:text-blue-400">Home</Link>
        </li>
        <li>
          <Link to="/pokemon" className="text-white hover:text-blue-400">Pokemon</Link>
        </li>
        <li>
          <Link to="/teams" className="text-white hover:text-blue-400">Teams</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
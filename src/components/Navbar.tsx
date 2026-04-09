/**
 * Navbar component.
 *
 * Provides top-level navigation for the application.
 * Highlights the active route based on current location.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */
import { Link, useLocation } from 'react-router-dom'

/**
 * Renders the main navigation bar.
 */
const Navbar = () => {
  /** Current route location (used to highlight active link) */
  const location = useLocation()

  /**
   * Navigation links configuration.
   */
  const links = [
    { to: '/', label: 'Home' },
    { to: '/pokemon', label: 'Pokémon' },
    { to: '/teams', label: 'Teams' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-gray-900 tracking-tight">Pokébuilder</span>
          <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-red-100 text-red-600 leading-none">β</span>
        </div>
        <ul className="flex gap-0.5">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors duration-150
                  ${location.pathname === to
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
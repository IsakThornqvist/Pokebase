const Navbar = () => {
  return (
<nav className="bg-green-700 px-6 py-10 flex items-center justify-between min-h-16">
      <ul className="flex gap-6">
        <li>
          <a href="/" className="text-white hover:text-blue-400">Home</a>
        </li>
        <li>
          <a href="/pagetwo" className="text-white hover:text-blue-400">Page Two</a>
        </li>
        <li>
          <a href="/pagethree" className="text-white hover:text-blue-400">Page Three</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
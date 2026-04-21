/**
 * HomePage component.
 *
 * Landing page for the PokeBase application.
 * Full-viewport hero using the sprite grid image from public/images/pokemon/Pokemon-HomePage.jpg
 * with parallax scroll, staggered entrance animations, stats strip, feature cards, and footer.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const SPRITE_IMAGE = "/images/pokemon/Pokemon-HomePage.jpg"

const STATS = [
  { value: "1,000+", label: "Pokémon" },
  { value: "18", label: "Types" },
  { value: "9", label: "Generations" },
]

const FEATURES = [
  {
    title: "Pokemon Application",
    description:
      "Browse the complete Pokemon roster. Filter by type, generation, or search by name.",
    route: "/pokemon",
    icon: "◈",
  },
  {
    title: "Statistics",
    description:
      "Dive into scatter charts, bar charts, type statistics, stat comparisons, and more.",
    route: "/statistics",
    icon: "◎",
  },
  {
    title: "Account",
    description:
      "Sign in to create your own teams",
    route: "/login",
    icon: "⊹",
  },
]

const HomePage = () => {
  const navigate = useNavigate()
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0px)" : "translateY(18px)",
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  })

  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >

      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      >
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.28}px) scale(1.12)` }}
        >
          <img
            src={SPRITE_IMAGE}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">

          <span
            className="uppercase text-[11px] tracking-[0.4em] text-gray-400 mb-7"
            style={reveal(0.1)}
          >
            The Complete Reference
          </span>

          <h1
            className="text-[clamp(4.5rem,13vw,10rem)] leading-none tracking-tight text-white mb-5"
            style={{ ...reveal(0.28), fontWeight: 400 }}
          >
            PokeBase
          </h1>

          <div
            className="h-px bg-white/25 mb-7"
            style={{
              width: mounted ? "6rem" : "0rem",
              transition: "width 0.7s ease 0.52s",
            }}
          />

          <p
            className="text-gray-300 text-[clamp(0.85rem,1.8vw,1.05rem)] font-light max-w-sm leading-relaxed mb-11"
            style={reveal(0.55)}
          >
            Every stat. Every type. Every generation.
            <br />
            All in one place.
          </p>

          <div
            className="flex flex-wrap gap-3 items-center justify-center"
            style={reveal(0.7)}
          >
            <button
              onClick={() => navigate("/pokemon")}
              className="px-9 py-3 bg-white text-black text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:scale-95"
            >
              Browse Pokemon
            </button>
            <button
              onClick={() => navigate("/statistics")}
              className="px-9 py-3 border border-white/35 text-white text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-200 hover:border-white/70 hover:bg-white/[0.07] hover:scale-105 active:scale-95"
            >
              Statistics
            </button>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: mounted ? 0.45 : 0,
            transition: "opacity 1s ease 1.3s",
          }}
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-gray-400">
            Scroll
          </span>
          <div className="w-px h-9 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-black">
        <div className="max-w-2xl mx-auto px-6 py-14 grid grid-cols-3 divide-x divide-white/[0.08]">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 px-6">
              <span className="text-[2.6rem] leading-none text-white font-light">
                {value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-gray-500 font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-black">
        <div className="max-w-5xl mx-auto px-6 py-20">

          <div className="flex items-end gap-6 mb-10">
            <h2 className="text-3xl font-light text-white">Explore</h2>
            <div className="flex-1 h-px bg-white/[0.08] mb-1.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURES.map(({ title, description, route, icon }) => (
              <button
                key={title}
                onClick={() => navigate(route)}
                className="group text-left p-7 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.055] hover:border-white/20 transition-all duration-200"
              >
                <div className="text-[1.6rem] text-gray-600 mb-5 group-hover:text-white transition-colors duration-200">
                  {icon}
                </div>
                <h3 className="text-white text-base font-normal tracking-wide mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  {description}
                </p>
                <div className="mt-7 text-[10px] uppercase tracking-[0.25em] text-gray-600 group-hover:text-gray-300 transition-colors duration-200">
                  Explore →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.08] bg-black">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="text-white text-lg font-light tracking-wide">
            Pokebase
          </span>
          <span className="text-[11px] text-gray-600 tracking-widest uppercase">
            Built by Isak Thörnqvist
          </span>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
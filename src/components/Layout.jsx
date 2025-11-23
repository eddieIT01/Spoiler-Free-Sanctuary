import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import ParticleBackground from './ParticleBackground'

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-black via-gray-900 to-gray-950 text-gray-100 font-sans overflow-hidden">
      <ParticleBackground className="opacity-60" />
      <header className="bg-gradient-to-r from-gray-900 via-zinc-900 to-black border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-extrabold tracking-tight text-indigo-400 flex items-center gap-3">
                <span className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center animate-float shadow-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v18" stroke="#0b1220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12h18" stroke="#0b1220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span className="animate-fade-in-up">Spoiler-Free Sanctuary</span>
              </Link>
              <nav className="hidden md:flex space-x-4 ml-8">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:text-indigo-300 transform transition hover:-translate-y-0.5">Home</Link>
                <Link to="/features" className="px-3 py-2 rounded-md text-sm font-medium hover:text-indigo-300 transform transition hover:-translate-y-0.5">Features</Link>
                <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:text-indigo-300 transform transition hover:-translate-y-0.5">About</Link>
                <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:text-indigo-300 transform transition hover:-translate-y-0.5">Contact</Link>
                <Link to="/game-progress" className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-black hover:brightness-110 transform transition hover:scale-105">Game Progress</Link>
                <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium bg-gray-700 text-gray-100 hover:brightness-110 transform transition hover:scale-105">Admin</Link>
              </nav>
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-800 focus:outline-none"
                aria-label="Main menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="md:hidden bg-zinc-900 border-t border-gray-800 animate-fade-in-up">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Home</Link>
              <Link to="/features" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Features</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">About</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Contact</Link>
              <Link to="/game-progress" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-black transition">Game Progress</Link>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="mt-12 border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between">
          <div>© {new Date().getFullYear()} Spoiler-Free Sanctuary</div>
          <div className="mt-2 md:mt-0">Built with React & Tailwind CSS — University Project</div>
        </div>
      </footer>
    </div>
  )
}

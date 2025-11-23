import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-lg">
        <div className="bg-gradient-to-br from-indigo-900 via-black to-gray-900 p-12 rounded-lg shadow-2xl">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-300 leading-tight">Spoiler-Free Sanctuary</h1>
              <p className="mt-4 text-gray-300 max-w-2xl">Track playthroughs, unlock spoiler-free tips as you progress, and keep story surprises intact. Built for narrative-focused gamers and designed to look and feel cinematic.</p>
              <div className="mt-6 flex gap-4">
                <Link to="/game-progress" className="px-6 py-3 rounded-md bg-indigo-600 text-black font-semibold hover:scale-105 transition">Open Game Progress</Link>
                <Link to="/features" className="px-6 py-3 rounded-md border border-gray-700 text-gray-200 hover:bg-gray-800 transition">Explore Features</Link>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative bg-gradient-to-br from-indigo-700 to-pink-600 p-6 rounded-lg shadow-2xl text-white overflow-hidden">
                <svg className="absolute -right-24 -top-20 opacity-20 w-80 h-80 transform rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="90" fill="url(#g1)" />
                </svg>

                <div className="relative z-10">
                  <h3 className="font-bold text-xl">Featured Games</h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-white/80 mt-2" /> <span>The Last of Us — progress-based spoiler unlocking</span></li>
                    <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-white/80 mt-2" /> <span>Horizon Zero Dawn — tips for combat & exploration</span></li>
                    <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-white/80 mt-2" /> <span>God of War — combat, resources, and safe hints</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md animate-pop">
          <h4 className="text-indigo-300 font-semibold">Why Spoiler-Free?</h4>
          <p className="mt-2 text-gray-300 text-sm">We respect narrative discovery — only reveal tips that won't spoil future story beats. Progress gating ensures safety.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md animate-pop">
          <h4 className="text-indigo-300 font-semibold">Designed for Gamers</h4>
          <p className="mt-2 text-gray-300 text-sm">Dark, vibrant UI with responsive layout keeps the focus on your playthrough. Fast, accessible, and minimal friction.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md animate-pop">
          <h4 className="text-indigo-300 font-semibold">Built for Teaching</h4>
          <p className="mt-2 text-gray-300 text-sm">A strong project for university coursework: clear UX, state management, and extendable data-driven design.</p>
        </div>
      </section>
    </div>
  )
}

import React from 'react'

export default function About() {
  return (
    <div className="max-w-4xl">
      <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-300">About Spoiler-Free Sanctuary</h1>
        <p className="mt-4 text-gray-300">Spoiler-Free Sanctuary is a university project created to demonstrate careful UX around story-driven games. It prioritizes player agency and discovery by gating tips behind progress so that players only see the guidance they need, when they need it.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h4 className="text-indigo-300 font-semibold">Purpose</h4>
            <p className="text-gray-300 text-sm mt-2">Help players enjoy narrative games without spoilers while providing useful tips.</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h4 className="text-indigo-300 font-semibold">Tech</h4>
            <p className="text-gray-300 text-sm mt-2">React, Vite, Tailwind CSS, react-router-dom. Clean component-driven architecture.</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h4 className="text-indigo-300 font-semibold">For Teaching</h4>
            <p className="text-gray-300 text-sm mt-2">Designed to be explained in classes: state, routing, persistence, and UX tradeoffs.</p>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg border border-gray-800 bg-gradient-to-r from-indigo-800 to-purple-800 text-white">
          <h4 className="font-bold">Project Notes</h4>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-100">
            <li>Progress is saved locally (no backend required).</li>
            <li>Guides are data-driven and easy to extend (`src/data/guides.js`).</li>
            <li>Pages use accessible contrast and reduced-motion-friendly animations (optional to add).</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

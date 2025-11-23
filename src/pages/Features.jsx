import React from 'react'

const FeatureCard = ({ title, desc, icon }) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transform transition hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-black font-bold">{icon}</div>
      <div>
        <h4 className="text-indigo-300 font-semibold">{title}</h4>
        <p className="text-gray-300 text-sm mt-1">{desc}</p>
      </div>
    </div>
  </div>
)

export default function Features() {
  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-indigo-300">Features</h1>
      <p className="text-gray-300 mt-2">A compact list of what makes Spoiler-Free Sanctuary useful and polished for players and demonstrative for coursework.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard icon="SF" title="Spoiler-safe Unlocks" desc="Tips appear only after you progress to prevent spoilers." />
        <FeatureCard icon="PV" title="Per-Game Progress" desc="Manage multiple games; progress persists per title in your browser." />
        <FeatureCard icon="EX" title="Export / Import" desc="Save JSON snapshots of progress to share or backup." />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h4 className="text-indigo-300 font-semibold">Design</h4>
          <p className="text-gray-300 mt-2 text-sm">Built with component-driven React, small footprint, and accessible color contrasts. Tailwind CSS for rapid, consistent styling.</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h4 className="text-indigo-300 font-semibold">Extensibility</h4>
          <p className="text-gray-300 mt-2 text-sm">Add new games by editing `src/data/guides.js` or create an editor to manage guides at runtime.</p>
        </div>
      </div>
    </div>
  )
}

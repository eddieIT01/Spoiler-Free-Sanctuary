import React, { useEffect, useState } from 'react'
import { getGuides, saveGuides } from '../utils/guideStore'

function blankGame() {
  return { slug: `game-${Date.now()}`, title: 'New Game', accent: 'from-indigo-500 to-pink-500', sections: [] }
}

export default function Admin() {
  const [guides, setGuides] = useState(getGuides())
  const [editingIndex, setEditingIndex] = useState(null)

  useEffect(() => {
    const handler = () => setGuides(getGuides())
    window.addEventListener('sfs:guides-updated', handler)
    return () => window.removeEventListener('sfs:guides-updated', handler)
  }, [])

  function addGame() {
    const g = blankGame()
    const next = [...guides, g]
    setGuides(next)
  }

  function saveAll() {
    saveGuides(guides)
    alert('Guides saved to localStorage')
  }

  function updateGame(i, changes) {
    const next = guides.map((g, idx) => idx === i ? { ...g, ...changes } : g)
    setGuides(next)
  }

  function addSection(i) {
    const next = guides.map((g, idx) => {
      if (idx !== i) return g
      const sec = { id: Date.now(), chapterName: 'New Chapter', isCompleted: false, tips: [], spoilers: [], tasks: [] }
      return { ...g, sections: [...g.sections, sec] }
    })
    setGuides(next)
  }

  function updateSection(gameIdx, secIdx, changes) {
    const next = guides.map((g, idx) => {
      if (idx !== gameIdx) return g
      const secs = g.sections.map((s, si) => si === secIdx ? { ...s, ...changes } : s)
      return { ...g, sections: secs }
    })
    setGuides(next)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-300">Admin: Guides Editor</h1>
        <div className="flex gap-2">
          <button onClick={addGame} className="px-3 py-2 rounded bg-indigo-600 text-black">Add Game</button>
          <button onClick={saveAll} className="px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700">Save All</button>
        </div>
      </div>

      <div className="space-y-4">
        {guides.map((g, gi) => (
          <div key={g.slug} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <input value={g.title} onChange={(e) => updateGame(gi, { title: e.target.value })} className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white w-full" />
                <input value={g.slug} onChange={(e) => updateGame(gi, { slug: e.target.value })} className="mt-2 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm text-gray-300 w-full" />
              </div>
              <div className="ml-4">
                <button onClick={() => addSection(gi)} className="px-2 py-1 rounded bg-indigo-500 text-black">Add Section</button>
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {g.sections.map((s, si) => (
                <div key={s.id} className="bg-gray-900 p-3 rounded">
                  <input value={s.chapterName} onChange={(e) => updateSection(gi, si, { chapterName: e.target.value })} className="bg-transparent w-full text-white" />
                  <textarea value={(s.tips || []).join('\n')} onChange={(e) => updateSection(gi, si, { tips: e.target.value.split('\n') })} className="mt-2 bg-gray-800 w-full rounded p-2 text-sm text-gray-200" placeholder="Tips (one per line)" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

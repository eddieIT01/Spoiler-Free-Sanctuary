import React, { useState, useEffect, useMemo } from 'react'
import GuideSection from '../components/GuideSection'
import { Link } from 'react-router-dom'
import { getGuides } from '../utils/guideStore'

const STORAGE_KEY = 'sfs_progress_v1'

export default function GameProgressView() {
  // selected game slug
  const [selected, setSelected] = useState(() => getGuides()[0].slug)

  const [localGuides, setLocalGuides] = useState(() => getGuides())

  useEffect(() => {
    const handler = () => setLocalGuides(getGuides())
    window.addEventListener('sfs:guides-updated', handler)
    return () => window.removeEventListener('sfs:guides-updated', handler)
  }, [])

  // storedProgress is an object { [slug]: sectionsArray }
  const [storedProgress, setStoredProgress] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch (e) {
      // ignore
    }
    // initialize with defaults (use localGuides which is available)
    const initial = {}
    const defaults = getGuides()
    defaults.forEach(g => {
      initial[g.slug] = g.sections.map(s => ({ ...s }))
    })
    return initial
  })

  // convenience: current sections for selected game
  const sections = useMemo(() => storedProgress[selected] || [], [storedProgress, selected])
  const guides = localGuides

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedProgress))
    } catch (e) {
      // ignore storage errors
    }
  }, [storedProgress])

  const markCompleted = (index) => {
    setStoredProgress(prev => {
      const copy = { ...prev }
      const arr = (copy[selected] || []).map((s, i) => i === index ? { ...s, isCompleted: true } : s)
      copy[selected] = arr
      return copy
    })
  }

  return (
    <div className="space-y-6 text-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-indigo-300">Game Progress</h1>
          <p className="text-gray-300">Choose a game and track chapters without spoilers.</p>
        </div>
        <div className="hidden sm:block text-sm text-gray-400">Progress is saved locally in your browser.</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {guides.map(g => {
          const completed = (storedProgress[g.slug] || []).filter(s => s.isCompleted).length
          return (
            <Link key={g.slug} to={`/game/${g.slug}`} className={`rounded-lg p-4 text-left transform transition hover:scale-105 border ${selected === g.slug ? 'ring-4 ring-indigo-500/40' : 'border-gray-700'} bg-gradient-to-br ${g.accent}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">{g.title}</div>
                  <div className="text-sm text-gray-200">{completed} / {g.sections.length} completed</div>
                </div>
                <div className="ml-4 text-sm text-gray-900 bg-white/80 px-3 py-1 rounded">Open</div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-6">
        {sections.map((sec, idx) => {
          const isUnlocked = idx === 0 || sections[idx - 1].isCompleted
          if (!isUnlocked) return null

          return (
            <div key={sec.id} className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className={`w-full`}> 
                <GuideSection section={sec} isUnlocked={isUnlocked} />
              </div>

              <div className="md:ml-6 mt-4 md:mt-0">
                {!sec.isCompleted ? (
                  <button
                    onClick={() => markCompleted(idx)}
                    className="px-4 py-2 rounded bg-indigo-600 text-black font-semibold hover:brightness-110 transition transform hover:-translate-y-0.5"
                  >
                    Mark as Completed
                  </button>
                ) : (
                  <div className="text-sm text-green-400 font-medium">Completed</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

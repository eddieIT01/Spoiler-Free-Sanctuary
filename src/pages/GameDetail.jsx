import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getGuides } from '../utils/guideStore'
import GuideSection from '../components/GuideSection'
import confetti from 'canvas-confetti'

const STORAGE_KEY = 'sfs_progress_v1'

export default function GameDetail() {
  const { slug } = useParams()
  const [localGuides, setLocalGuides] = useState(() => getGuides())

  useEffect(() => {
    const handler = () => setLocalGuides(getGuides())
    window.addEventListener('sfs:guides-updated', handler)
    return () => window.removeEventListener('sfs:guides-updated', handler)
  }, [])

  const game = useMemo(() => localGuides.find(g => g.slug === slug) || localGuides[0], [localGuides, slug])

  const [storedProgress, setStoredProgress] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch (e) {}
    const initial = {}
    getGuides().forEach(g => (initial[g.slug] = g.sections.map(s => ({ ...s }))))
    return initial
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedProgress))
    } catch (e) {}
  }, [storedProgress])

  const sections = useMemo(() => storedProgress[game.slug] || game.sections.map(s => ({ ...s })), [storedProgress, game])

  function markCompleted(idx) {
    setStoredProgress(prev => {
      const copy = { ...prev }
      const arr = (copy[game.slug] || game.sections.map(s => ({ ...s }))).map((s, i) => i === idx ? { ...s, isCompleted: true } : s)
      copy[game.slug] = arr
      return copy
    })
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
  }

  function exportProgress() {
    const data = JSON.stringify(storedProgress, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sfs-progress-${new Date().toISOString().slice(0,10)}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function importProgress(file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result)
        setStoredProgress(parsed)
      } catch (err) {
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }

  const completedCount = sections.filter(s => s.isCompleted).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{game.title}</h1>
          <div className="text-sm text-gray-300">{completedCount} of {sections.length} chapters completed</div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportProgress} className="px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700">Export Progress</button>
          <label className="px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700 cursor-pointer">
            Import
            <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files && importProgress(e.target.files[0])} />
          </label>
          <Link to="/game-progress" className="px-3 py-2 rounded bg-indigo-600 text-black font-semibold">Back</Link>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
          <div className="h-3 bg-indigo-500 transition-all" style={{ width: `${(completedCount / sections.length) * 100}%` }} />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {sections.map((sec, idx) => {
          const isUnlocked = idx === 0 || sections[idx - 1].isCompleted
          return (
            <div key={sec.id} className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="w-full">
                <GuideSection section={sec} isUnlocked={isUnlocked} />
                {isUnlocked && (
                  <div className="mt-2 ml-2 text-sm text-gray-200">
                    <div className="font-medium text-gray-300">Tasks</div>
                    <ul className="list-disc list-inside mt-2">
                      {sec.tasks && sec.tasks.map((t, i) => (
                        <li key={i} className="mt-1">{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="md:ml-6 mt-4 md:mt-0">
                {!sec.isCompleted ? (
                  <button onClick={() => markCompleted(idx)} className="px-4 py-2 rounded bg-indigo-600 text-black font-semibold hover:brightness-110">Mark as Completed</button>
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

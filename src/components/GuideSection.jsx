import React from 'react'

export default function GuideSection({ section, isUnlocked }) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      {isUnlocked ? (
        <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md transition transform ${section.isCompleted ? 'ring-4 ring-green-500/30' : 'hover:shadow-lg'} animate-pop`}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-indigo-300">{section.chapterName}</h3>
            <span className={`text-sm px-2 py-1 rounded ${section.isCompleted ? 'bg-green-600 text-black' : 'bg-yellow-600 text-black'}`}>
              {section.isCompleted ? 'Completed' : 'Unlocked'}
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-300">Tips</h4>
            <ul className="mt-2 list-disc list-inside text-gray-200 space-y-1">
              {section.tips.map((tip, i) => (
                <li key={i} className="mt-1">{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="relative bg-gray-800 border border-gray-700 rounded-lg p-6 overflow-hidden transform transition">
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm scale-105"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-400">{section.chapterName}</h3>
              <span className="text-sm px-2 py-1 rounded bg-gray-600 text-gray-200">Locked</span>
            </div>
            <div className="mt-4 text-gray-400">
              <p className="italic">This section is locked to avoid spoilers. Complete previous chapters to unlock tips.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

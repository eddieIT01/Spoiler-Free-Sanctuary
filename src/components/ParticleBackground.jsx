import React from 'react'

export default function ParticleBackground({ className = '' }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="pb" cx="30%" cy="10%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#pb)" />
      <g fill="#ffffff" fillOpacity="0.02">
        <circle cx="10%" cy="20%" r="140" />
        <circle cx="80%" cy="10%" r="120" />
        <circle cx="50%" cy="80%" r="180" />
      </g>
    </svg>
  )
}

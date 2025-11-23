import React from 'react'
import { HashRouter } from 'react-router-dom'
import AppRouter from './router'

// Use HashRouter to ensure client-side routes work on GitHub Pages
export default function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  )
}

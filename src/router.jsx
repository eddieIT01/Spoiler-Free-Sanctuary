import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import Contact from './pages/Contact'
import GameProgressView from './pages/GameProgressView'
import GameDetail from './pages/GameDetail'
import Admin from './pages/Admin'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="features" element={<Features />} />
        <Route path="contact" element={<Contact />} />
        <Route path="game-progress" element={<GameProgressView />} />
        <Route path="game/:slug" element={<GameDetail />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}

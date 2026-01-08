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
import Login from './pages/Login'
import Signup from './pages/Signup'
import Users from './pages/Users'
import Orders from './pages/Orders'
import Answers from './pages/Answers'
import Database from './pages/Database'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="features" element={<Features />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="database" element={<Database />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        <Route path="answers" element={<Answers />} />
        <Route path="game-progress" element={<GameProgressView />} />
        <Route path="game/:slug" element={<GameDetail />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}

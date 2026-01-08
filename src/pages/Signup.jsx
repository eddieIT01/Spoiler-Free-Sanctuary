import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../utils/api'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSignup(e) {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    try {
      const data = await signup(email, password, name)
      
      if (data.success) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setStatus('success')
        setTimeout(() => navigate('/game-progress'), 1000)
      } else {
        setError(data.message || 'Signup failed')
        setStatus('error')
      }
    } catch (err) {
      setError('Error connecting to server')
      setStatus('error')
      console.error(err)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-gray-800 rounded-lg p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-indigo-300 mb-6">Sign Up</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              required
              minLength="6"
            />
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {status === 'success' && (
            <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded">
              Signup successful! Redirecting...
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-indigo-600 text-black font-semibold py-2 rounded hover:brightness-110 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300">Login</Link>
        </p>
      </div>
    </div>
  )
}

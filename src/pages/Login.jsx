import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../utils/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    try {
      const data = await login(email, password)
      
      if (data.success) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setStatus('success')
        setTimeout(() => navigate('/game-progress'), 1000)
      } else {
        setError(data.message || 'Login failed')
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
        <h1 className="text-3xl font-bold text-indigo-300 mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Your password"
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {status === 'success' && (
            <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded">
              Login successful! Redirecting...
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-indigo-600 text-black font-semibold py-2 rounded hover:brightness-110 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Don't have an account? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

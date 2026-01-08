import React, { useState, useEffect } from 'react'
import { API_URL } from '../utils/api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/api/users`, {
        headers: token ? { 'Authorization': 'Bearer ' + token } : {}
      })
      const data = await res.json()
      if (data.success) {
        setUsers(data.users || [])
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to fetch users')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading users...</div>
  if (error) return <div className="bg-red-900 text-red-200 p-4 rounded">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-300">Users Database</h1>
        <button onClick={fetchUsers} className="px-4 py-2 bg-indigo-600 text-black rounded hover:brightness-110">
          Refresh
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-indigo-300">ID</th>
              <th className="px-6 py-3 text-left text-indigo-300">Name</th>
              <th className="px-6 py-3 text-left text-indigo-300">Email</th>
              <th className="px-6 py-3 text-left text-indigo-300">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-400">No users yet</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.name || 'N/A'}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-gray-400 text-sm">
        Total users: <span className="font-bold text-indigo-300">{users.length}</span>
      </p>
    </div>
  )
}

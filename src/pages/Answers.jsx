import React, { useState, useEffect } from 'react'
import { API_URL } from '../utils/api'

export default function Answers() {
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ question: '', answer: '' })
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchAnswers()
  }, [])

  async function fetchAnswers() {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/api/answers`, {
        headers: token ? { 'Authorization': 'Bearer ' + token } : {}
      })
      const data = await res.json()
      if (data.success) {
        setAnswers(data.answers || [])
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to fetch answers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveAnswer(e) {
    e.preventDefault()
    if (!token) {
      setError('Please login first')
      return
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `${API_URL}/api/answers/${editingId}` : `${API_URL}/api/answers`
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success) {
        setFormData({ question: '', answer: '' })
        setEditingId(null)
        setShowForm(false)
        fetchAnswers()
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to save answer')
      console.error(err)
    }
  }

  async function handleDeleteAnswer(id) {
    if (!window.confirm('Are you sure you want to delete this answer?')) return
    
    try {
      const res = await fetch(`${API_URL}/api/answers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      const data = await res.json()
      if (data.success) {
        fetchAnswers()
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to delete answer')
      console.error(err)
    }
  }

  function handleEdit(answer) {
    setEditingId(answer.id)
    setFormData({ question: answer.question, answer: answer.answer })
    setShowForm(true)
  }

  function handleCancel() {
    setEditingId(null)
    setFormData({ question: '', answer: '' })
    setShowForm(false)
  }

  if (loading) return <div className="text-center py-8">Loading answers...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-300">Answers Database</h1>
        <div className="space-x-2">
          <button onClick={fetchAnswers} className="px-4 py-2 bg-indigo-600 text-black rounded hover:brightness-110">
            Refresh
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-black rounded hover:brightness-110"
          >
            {showForm ? 'Cancel' : 'New Answer'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSaveAnswer} className="bg-gray-800 p-6 rounded-lg space-y-4">
          {error && <div className="bg-red-900 text-red-200 p-3 rounded">{error}</div>}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Question</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="Your question (optional)"
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Answer</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Your answer..."
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
              rows="4"
              required
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-black rounded font-semibold hover:brightness-110">
              {editingId ? 'Update Answer' : 'Submit Answer'}
            </button>
            <button type="button" onClick={handleCancel} className="px-6 py-2 bg-gray-700 text-gray-200 rounded font-semibold hover:brightness-110">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-indigo-300">Actions</th>
              <th className="px-6 py-3 text-left text-indigo-300">ID</th>
              <th className="px-6 py-3 text-left text-indigo-300">User ID</th>
              <th className="px-6 py-3 text-left text-indigo-300">Question</th>
              <th className="px-6 py-3 text-left text-indigo-300">Answer</th>
              <th className="px-6 py-3 text-left text-indigo-300">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {answers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-400">No answers yet</td>
              </tr>
            ) : (
              answers.map(answer => (
                <tr key={answer.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4">{answer.id}</td>
                  <td className="px-6 py-4">{answer.user_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{answer.question || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{answer.answer?.substring(0, 50)}...</td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(answer.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button onClick={() => handleEdit(answer)} className="px-3 py-1 bg-blue-600 text-white rounded hover:brightness-110">Edit</button>
                    <button onClick={() => handleDeleteAnswer(answer.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:brightness-110">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-gray-400 text-sm">
        Total answers: <span className="font-bold text-indigo-300">{answers.length}</span>
      </p>
    </div>
  )
}

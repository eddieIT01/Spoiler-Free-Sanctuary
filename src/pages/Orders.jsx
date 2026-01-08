import React, { useState, useEffect } from 'react'
import { API_URL } from '../utils/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ title: '', details: '' })
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: token ? { 'Authorization': 'Bearer ' + token } : {}
      })
      const data = await res.json()
      if (data.success) {
        setOrders(data.orders || [])
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to fetch orders')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveOrder(e) {
    e.preventDefault()
    if (!token) {
      setError('Please login first')
      return
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `${API_URL}/api/orders/${editingId}` : `${API_URL}/api/orders`
      
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
        setFormData({ title: '', details: '' })
        setEditingId(null)
        setShowForm(false)
        fetchOrders()
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to save order')
      console.error(err)
    }
  }

  async function handleDeleteOrder(id) {
    if (!window.confirm('Are you sure you want to delete this order?')) return
    
    try {
      const res = await fetch(`${API_URL}/api/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      const data = await res.json()
      if (data.success) {
        fetchOrders()
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to delete order')
      console.error(err)
    }
  }

  function handleEdit(order) {
    setEditingId(order.id)
    setFormData({ title: order.title, details: order.details })
    setShowForm(true)
  }

  function handleCancel() {
    setEditingId(null)
    setFormData({ title: '', details: '' })
    setShowForm(false)
  }

  if (loading) return <div className="text-center py-8">Loading orders...</div>
  if (error && !showForm) return <div className="bg-red-900 text-red-200 p-4 rounded">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-300">Orders Database</h1>
        <div className="space-x-2">
          <button onClick={fetchOrders} className="px-4 py-2 bg-indigo-600 text-black rounded hover:brightness-110">
            Refresh
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-black rounded hover:brightness-110"
          >
            {showForm ? 'Cancel' : 'New Order'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSaveOrder} className="bg-gray-800 p-6 rounded-lg space-y-4">
          {error && <div className="bg-red-900 text-red-200 p-3 rounded">{error}</div>}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Order Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Fix game bug"
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Details</label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Order details..."
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
              rows="4"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-black rounded font-semibold hover:brightness-110">
              {editingId ? 'Update Order' : 'Create Order'}
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
              <th className="px-6 py-3 text-left text-indigo-300">Title</th>
              <th className="px-6 py-3 text-left text-indigo-300">Details</th>
              <th className="px-6 py-3 text-left text-indigo-300">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-400">No orders yet</td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.user_id}</td>
                  <td className="px-6 py-4 font-semibold">{order.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{order.details?.substring(0, 50)}...</td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button onClick={() => handleEdit(order)} className="px-3 py-1 bg-blue-600 text-white rounded hover:brightness-110">Edit</button>
                    <button onClick={() => handleDeleteOrder(order.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:brightness-110">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-gray-400 text-sm">
        Total orders: <span className="font-bold text-indigo-300">{orders.length}</span>
      </p>
    </div>
  )
}

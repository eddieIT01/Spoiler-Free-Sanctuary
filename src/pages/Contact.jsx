import React, { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // No backend in this demo — show a local success message
    alert('Thanks! This demo does not send messages. You entered: ' + message)
    setName('')
    setMessage('')
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-indigo-300">Contact</h1>
      <p className="text-gray-300 mt-2">This demo has no real contact endpoint. Use this page to leave a local note or find project resources.</p>

      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-indigo-500" placeholder="Your name" />
          </div>

          <div>
            <label className="block text-sm text-gray-300">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-100 focus:ring-2 focus:ring-indigo-500" rows={4} placeholder="A short note for your professor or testers" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-black font-semibold">Send (Demo)</button>
            <div className="text-sm text-gray-400">No data leaves your browser in this demo.</div>
          </div>
        </form>
      </div>
    </div>
  )
}

import React, { useState } from 'react'

async function submitAnswer(token, question, answer) {
  const res = await fetch('/api/answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ question, answer })
  })
  return res.json()
}

export default function AnswerForm({ token }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('saving')
    try {
      const data = await submitAnswer(token, question, answer)
      setStatus('saved')
      setQuestion('')
      setAnswer('')
      console.log('saved', data)
    } catch (err) {
      setStatus('error')
      console.error(err)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{maxWidth:600}}>
      <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Question (optional)" />
      <textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Your answer" required />
      <button type="submit">Save answer</button>
      {status && <div>{status}</div>}
    </form>
  )
}

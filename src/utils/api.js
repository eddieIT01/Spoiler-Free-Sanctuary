// API Configuration - Points to backend server
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function submitAnswer(token, question, answer) {
  const res = await fetch(`${API_URL}/api/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ question, answer })
  })
  return res.json()
}

export async function getAnswers(token) {
  const res = await fetch(`${API_URL}/api/answers`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  return res.json()
}

export async function signup(email, password, name) {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  })
  return res.json()
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

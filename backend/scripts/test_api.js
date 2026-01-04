require('dotenv').config()
(async () => {
  try {
    const base = 'http://127.0.0.1:4000'
    const email = `test+${Date.now()}@example.com`
    const password = 'secret123'

    const fetchFn = global.fetch || (await import('node-fetch')).default

    console.log('Signing up:', email)
    const signupRes = await fetchFn(`${base}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const signupBody = await signupRes.json()
    if (!signupRes.ok) {
      console.error('Signup failed', signupBody)
      process.exit(1)
    }
    const token = signupBody.token
    console.log('Got token, creating answer...')

    const answerRes = await fetchFn(`${base}/api/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ question: 'Test question', answer: 'Test answer' })
    })
    const answerBody = await answerRes.json()
    if (!answerRes.ok) {
      console.error('Save answer failed', answerBody)
      process.exit(1)
    }
    console.log('Saved answer:', answerBody)
    process.exit(0)
  } catch (err) {
    console.error('Test failed', err)
    process.exit(1)
  }
})()
const fetch = global.fetch || require('node-fetch')
const base = 'http://localhost:4000'

async function signupOrLogin(email, password) {
  // try signup
  let res = await fetch(base + '/api/auth/signup', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (res.status === 409) {
    // already exists -> login
    res = await fetch(base + '/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
  }
  const data = await res.json()
  if (!data.token) throw new Error('No token received: ' + JSON.stringify(data))
  return data.token
}

async function main() {
  try {
    const email = `tester+${Date.now()}@example.com`
    const password = 'secret123'
    console.log('Signing up / logging in as', email)
    const token = await signupOrLogin(email, password)
    console.log('Token received')

    // post an answer
    const ans = { question: 'Test question', answer: 'This is a test answer from test_api.js' }
    let res = await fetch(base + '/api/answers', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(ans)
    })
    const saved = await res.json()
    console.log('Saved answer:', saved)

    // list answers
    res = await fetch(base + '/api/answers', { headers: { 'Authorization': 'Bearer ' + token } })
    const list = await res.json()
    console.log('Answers for user:', list)
    process.exit(0)
  } catch (err) {
    console.error('Test failed:', err)
    process.exit(1)
  }
}

main()
async function signupAndPost() {
  const base = 'http://127.0.0.1:4000'
  try {
    // signup (may fail if user exists)
    let res = await fetch(base + '/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'ci_test@example.local', password: 'secret' })
    })
    let body = await res.json().catch(() => ({}))
    console.log('/api/auth/signup', res.status, body)

    // login to get token
    res = await fetch(base + '/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'ci_test@example.local', password: 'secret' })
    })
    body = await res.json()
    console.log('/api/auth/login', res.status, body)
    if (!body.token) {
      console.error('No token, aborting')
      process.exit(1)
    }
    const token = body.token

    // post an answer
    res = await fetch(base + '/api/answers', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ question: 'Test question', answer: 'This is a test answer' })
    })
    body = await res.json()
    console.log('/api/answers POST', res.status, body)

    // fetch answers
    res = await fetch(base + '/api/answers', { headers: { 'Authorization': 'Bearer ' + token } })
    body = await res.json()
    console.log('/api/answers GET', res.status, body.slice(-3))

  } catch (err) {
    console.error('ERROR', err)
    process.exit(1)
  }
}

signupAndPost()

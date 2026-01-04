require('dotenv').config()

const fetch = require('node-fetch')
const base = 'http://localhost:4000'

let testsPassed = 0
let testsFailed = 0

// Helper function for colored output
const log = {
  success: (msg) => console.log('\x1b[32m✓\x1b[0m', msg),
  error: (msg) => console.log('\x1b[31m✗\x1b[0m', msg),
  info: (msg) => console.log('\x1b[36mℹ\x1b[0m', msg),
  heading: (msg) => console.log('\n\x1b[1m' + msg + '\x1b[0m')
}

async function test(name, fn) {
  try {
    await fn()
    log.success(name)
    testsPassed++
  } catch (err) {
    log.error(name)
    console.error('  Error:', err.message)
    testsFailed++
  }
}

async function runTests() {
  log.heading('🧪 Spoiler-Free Sanctuary Backend Tests')
  log.info(`Base URL: ${base}`)

  let token
  let userId
  let orderId
  let answerId

  // Auth Tests
  log.heading('Authentication Tests')

  const testEmail = `test+${Date.now()}@example.com`
  const testPassword = 'test123456'

  await test('POST /api/auth/signup - Create new user', async () => {
    const res = await fetch(`${base}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        name: 'Test User'
      })
    })

    if (res.status !== 201) {
      throw new Error(`Expected 201, got ${res.status}`)
    }

    const body = await res.json()
    if (!body.token) throw new Error('No token returned')
    if (!body.user.id) throw new Error('No user ID returned')

    token = body.token
    userId = body.user.id
  })

  await test('POST /api/auth/login - Login existing user', async () => {
    const res = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    })

    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`)
    }

    const body = await res.json()
    if (!body.token) throw new Error('No token returned')
    token = body.token
  })

  await test('POST /api/auth/login - Invalid password fails', async () => {
    const res = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'wrongpassword'
      })
    })

    if (res.status !== 401) {
      throw new Error(`Expected 401, got ${res.status}`)
    }
  })

  // User Tests
  log.heading('User Tests')

  await test('GET /api/users/profile - Get current user', async () => {
    const res = await fetch(`${base}/api/users/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`)
    }

    const body = await res.json()
    if (body.data.id !== userId) throw new Error('User ID mismatch')
  })

  await test('PUT /api/users/:id - Update user profile', async () => {
    const res = await fetch(`${base}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: 'Updated Test User' })
    })

    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`)
    }
  })

  // Orders Tests
  log.heading('Orders Tests')

  await test('POST /api/orders - Create order', async () => {
    const res = await fetch(`${base}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Test Order',
        details: 'This is a test order'
      })
    })

    if (res.status !== 201) {
      throw new Error(`Expected 201, got ${res.status}`)
    }

    const body = await res.json()
    if (!body.data.id) throw new Error('No order ID returned')
    orderId = body.data.id
  })

  await test('GET /api/orders - Get user orders', async () => {
    const res = await fetch(`${base}/api/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`)
    }

    const body = await res.json()
    if (!Array.isArray(body.data)) throw new Error('Expected array')
  })

  await test('GET /api/orders/:id - Get specific order', async () => {
    const res = await fetch(`${base}/api/orders/${orderId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`)
    }

    const body = await res.json()
    if (body.data.id !== orderId) throw new Error('Order ID mismatch')
  })

  await test('PUT /api/orders/:id - Update order', async () => {
    const res = await fetch(`${base}/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: 'Updated Test Order' })
    })

    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`)
    }
  })

  // Answers Tests
  log.heading('Answers Tests')

  await test('POST /api/answers - Create answer', async () => {
    const res = await fetch(`${base}/api/answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        question: 'How to beat the boss?',
        answer: 'Use the shield when the boss attacks'
      })
    })

    if (res.status !== 201) {
      throw new Error(`Expected 201, got ${res.status}`)
    }

    const body = await res.json()
    if (!body.data.id) throw new Error('No answer ID returned')
    answerId = body.data.id
  })

  await test('GET /api/answers - Get user answers', async () => {
    const res = await fetch(`${base}/api/answers`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`)
    }

    const body = await res.json()
    if (!Array.isArray(body.data)) throw new Error('Expected array')
  })

  await test('GET /api/answers/:id - Get specific answer', async () => {
    const res = await fetch(`${base}/api/answers/${answerId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`)
    }

    const body = await res.json()
    if (body.data.id !== answerId) throw new Error('Answer ID mismatch')
  })

  await test('PUT /api/answers/:id - Update answer', async () => {
    const res = await fetch(`${base}/api/answers/${answerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ answer: 'Updated answer text' })
    })

    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`)
    }
  })

  // Cleanup Tests
  log.heading('Cleanup Tests')

  await test('DELETE /api/answers/:id - Delete answer', async () => {
    const res = await fetch(`${base}/api/answers/${answerId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`)
    }
  })

  await test('DELETE /api/orders/:id - Delete order', async () => {
    const res = await fetch(`${base}/api/orders/${orderId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (res.status !== 200) {
      throw new Error(`Expected 200, got ${res.status}`)
    }
  })

  // Summary
  log.heading('📊 Test Summary')
  console.log(`Passed: \x1b[32m${testsPassed}\x1b[0m`)
  console.log(`Failed: \x1b[31m${testsFailed}\x1b[0m`)
  console.log(`Total:  ${testsPassed + testsFailed}`)

  if (testsFailed === 0) {
    log.success('All tests passed!')
    process.exit(0)
  } else {
    log.error(`${testsFailed} test(s) failed`)
    process.exit(1)
  }
}

runTests().catch(err => {
  console.error('Test suite error:', err)
  process.exit(1)
})
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

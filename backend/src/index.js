const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const orderRoutes = require('./routes/orders')
const answerRoutes = require('./routes/answers')
const adminRoutes = require('./routes/admin')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/answers', answerRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => res.json({ 
  message: 'Spoiler-Free Sanctuary API',
  version: '1.0.0',
  endpoints: {
    auth: '/api/auth',
    users: '/api/users',
    orders: '/api/orders',
    answers: '/api/answers',
    admin: '/api/admin'
  }
}))

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API listening on port ${port}`))


const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const orderRoutes = require('./routes/orders')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => res.json({ message: 'Spoiler-Free Sanctuary API' }))

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API listening on port ${port}`))

const express = require('express')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db')
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

router.post('/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { email, password, name } = req.body
    try {
      const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email])
      if (rows.length) return res.status(409).json({ message: 'Email already registered' })

      const hash = await bcrypt.hash(password, 10)
      const [result] = await pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name || null, email, hash])
      const userId = result.insertId
      const token = jwt.sign({ sub: userId, email }, JWT_SECRET, { expiresIn: '7d' })
      res.json({ token, user: { id: userId, email, name: name || null } })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  })

router.post('/login',
  body('email').isEmail(),
  body('password').exists(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body
    try {
      const [rows] = await pool.query('SELECT id, password_hash, name FROM users WHERE email = ?', [email])
      if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' })
      const user = rows[0]
      const ok = await bcrypt.compare(password, user.password_hash)
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
      const token = jwt.sign({ sub: user.id, email }, JWT_SECRET, { expiresIn: '7d' })
      res.json({ token, user: { id: user.id, email, name: user.name } })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  })

module.exports = router

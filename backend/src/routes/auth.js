const express = require('express')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db')
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

// Helper function to handle validation errors
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      message: 'Validation failed',
      errors: errors.array() 
    })
  }
  return null
}

// POST /api/auth/signup - Register new user
router.post('/signup',
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Name must be between 1 and 200 characters'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { email, password, name } = req.body
    
    try {
      // Check if email already exists
      const [existingUsers] = await pool.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
      )
      
      if (existingUsers.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Email already registered'
        })
      }

      // Hash password and create user
      const hash = await bcrypt.hash(password, 10)
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name?.trim() || null, email, hash]
      )

      const userId = result.insertId
      const token = jwt.sign(
        { sub: userId, email },
        JWT_SECRET,
        { expiresIn: '7d' }
      )

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: userId,
          email,
          name: name?.trim() || null
        }
      })
    } catch (err) {
      console.error('Signup error:', err)
      res.status(500).json({
        success: false,
        message: 'Server error during registration'
      })
    }
  }
)

// POST /api/auth/login - User login
router.post('/login',
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  body('password')
    .exists()
    .withMessage('Password is required'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { email, password } = req.body

    try {
      const [rows] = await pool.query(
        'SELECT id, password_hash, name, email FROM users WHERE email = ?',
        [email]
      )

      if (rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        })
      }

      const user = rows[0]
      const isValidPassword = await bcrypt.compare(password, user.password_hash)

      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        })
      }

      const token = jwt.sign(
        { sub: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      )

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      })
    } catch (err) {
      console.error('Login error:', err)
      res.status(500).json({
        success: false,
        message: 'Server error during login'
      })
    }
  }
)

module.exports = router

const express = require('express')
const { body, validationResult, param } = require('express-validator')
const pool = require('../db')
const requireAuth = require('../middleware/auth')
const router = express.Router()

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

// GET /api/users - Get current user profile
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [req.user.id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      message: 'User profile retrieved successfully',
      data: rows[0]
    })
  } catch (err) {
    console.error('Profile retrieval error:', err)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile'
    })
  }
})

// GET /api/users/:id - Get specific user (admin or self)
router.get('/:id',
  requireAuth,
  param('id').isInt().withMessage('Invalid user ID'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { id } = req.params

    // Users can only view their own profile, except admins
    if (parseInt(id) !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    try {
      const [rows] = await pool.query(
        'SELECT id, name, email, created_at FROM users WHERE id = ?',
        [id]
      )

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }

      res.json({
        success: true,
        message: 'User retrieved successfully',
        data: rows[0]
      })
    } catch (err) {
      console.error('User retrieval error:', err)
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve user'
      })
    }
  }
)

// PUT /api/users/:id - Update user profile
router.put('/:id',
  requireAuth,
  param('id').isInt().withMessage('Invalid user ID'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Name must be between 1 and 200 characters'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { id } = req.params
    const { name } = req.body

    // Users can only update their own profile
    if (parseInt(id) !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    try {
      const [existingUser] = await pool.query(
        'SELECT id FROM users WHERE id = ?',
        [id]
      )

      if (existingUser.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }

      if (name) {
        await pool.query(
          'UPDATE users SET name = ? WHERE id = ?',
          [name.trim(), id]
        )
      }

      res.json({
        success: true,
        message: 'Profile updated successfully'
      })
    } catch (err) {
      console.error('Profile update error:', err)
      res.status(500).json({
        success: false,
        message: 'Failed to update profile'
      })
    }
  }
)

// DELETE /api/users/:id - Delete user account
router.delete('/:id',
  requireAuth,
  param('id').isInt().withMessage('Invalid user ID'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { id } = req.params

    // Users can only delete their own account
    if (parseInt(id) !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    try {
      const [existingUser] = await pool.query(
        'SELECT id FROM users WHERE id = ?',
        [id]
      )

      if (existingUser.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }

      // Delete user and cascade delete their orders and answers
      await pool.query('DELETE FROM users WHERE id = ?', [id])

      res.json({
        success: true,
        message: 'Account deleted successfully'
      })
    } catch (err) {
      console.error('Account deletion error:', err)
      res.status(500).json({
        success: false,
        message: 'Failed to delete account'
      })
    }
  }
)

module.exports = router

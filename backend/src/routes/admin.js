const express = require('express')
const { param } = require('express-validator')
const { validationResult } = require('express-validator')
const pool = require('../db')
const requireAuth = require('../middleware/auth')
const router = express.Router()

// Admin check middleware
const isAdmin = async (req, res, next) => {
  // For demo purposes, allow admin access to user with id 1
  // In production, you'd add an is_admin column to users table
  const ADMIN_USER_ID = process.env.ADMIN_USER_ID || 1

  if (req.user.id !== parseInt(ADMIN_USER_ID)) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    })
  }
  next()
}

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

// GET /api/admin/dashboard - Admin dashboard stats
router.get('/dashboard', requireAuth, isAdmin, async (req, res) => {
  try {
    // Total users
    const [[{ total_users }]] = await pool.query(
      'SELECT COUNT(*) as total_users FROM users'
    )

    // Total orders
    const [[{ total_orders }]] = await pool.query(
      'SELECT COUNT(*) as total_orders FROM orders'
    )

    // Total answers
    const [[{ total_answers }]] = await pool.query(
      'SELECT COUNT(*) as total_answers FROM answers'
    )

    // Recent users
    const [recentUsers] = await pool.query(
      'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC LIMIT 5'
    )

    // Recent orders
    const [recentOrders] = await pool.query(
      'SELECT o.id, o.user_id, o.title, u.email, o.created_at FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC LIMIT 5'
    )

    res.json({
      success: true,
      message: 'Dashboard data retrieved successfully',
      data: {
        stats: {
          total_users: total_users || 0,
          total_orders: total_orders || 0,
          total_answers: total_answers || 0
        },
        recent_users: recentUsers,
        recent_orders: recentOrders
      }
    })
  } catch (err) {
    console.error('Dashboard error:', err)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard data'
    })
  }
})

// GET /api/admin/users - List all users
router.get('/users', requireAuth, isAdmin, async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC'
    )

    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: users
    })
  } catch (err) {
    console.error('User list error:', err)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users'
    })
  }
})

// GET /api/admin/users/:id - Get user details with their orders
router.get('/users/:id',
  requireAuth,
  isAdmin,
  param('id').isInt().withMessage('Invalid user ID'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { id } = req.params

    try {
      // Get user
      const [users] = await pool.query(
        'SELECT id, name, email, created_at FROM users WHERE id = ?',
        [id]
      )

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }

      // Get user's orders
      const [orders] = await pool.query(
        'SELECT id, title, details, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC',
        [id]
      )

      // Get user's answers
      const [answers] = await pool.query(
        'SELECT id, question, answer, created_at FROM answers WHERE user_id = ? ORDER BY created_at DESC',
        [id]
      )

      res.json({
        success: true,
        message: 'User details retrieved successfully',
        data: {
          user: users[0],
          orders,
          answers
        }
      })
    } catch (err) {
      console.error('User detail error:', err)
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve user details'
      })
    }
  }
)

// DELETE /api/admin/users/:id - Delete user and related data
router.delete('/users/:id',
  requireAuth,
  isAdmin,
  param('id').isInt().withMessage('Invalid user ID'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { id } = req.params

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

      // Delete user (cascades to orders and answers)
      await pool.query('DELETE FROM users WHERE id = ?', [id])

      res.json({
        success: true,
        message: 'User deleted successfully'
      })
    } catch (err) {
      console.error('User deletion error:', err)
      res.status(500).json({
        success: false,
        message: 'Failed to delete user'
      })
    }
  }
)

// GET /api/admin/orders - List all orders
router.get('/orders', requireAuth, isAdmin, async (req, res) => {
  try {
    const [orders] = await pool.query(
      'SELECT o.id, o.user_id, o.title, u.email, o.created_at FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC'
    )

    res.json({
      success: true,
      message: 'Orders retrieved successfully',
      data: orders
    })
  } catch (err) {
    console.error('Order list error:', err)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders'
    })
  }
})

// DELETE /api/admin/orders/:id - Delete order
router.delete('/orders/:id',
  requireAuth,
  isAdmin,
  param('id').isInt().withMessage('Invalid order ID'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { id } = req.params

    try {
      const [existingOrder] = await pool.query(
        'SELECT id FROM orders WHERE id = ?',
        [id]
      )

      if (existingOrder.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        })
      }

      await pool.query('DELETE FROM orders WHERE id = ?', [id])

      res.json({
        success: true,
        message: 'Order deleted successfully'
      })
    } catch (err) {
      console.error('Order deletion error:', err)
      res.status(500).json({
        success: false,
        message: 'Failed to delete order'
      })
    }
  }
)

// GET /api/admin/answers - List all answers
router.get('/answers', requireAuth, isAdmin, async (req, res) => {
  try {
    const [answers] = await pool.query(
      'SELECT a.id, a.user_id, a.question, u.email, a.created_at FROM answers a JOIN users u ON a.user_id = u.id ORDER BY a.created_at DESC'
    )

    res.json({
      success: true,
      message: 'Answers retrieved successfully',
      data: answers
    })
  } catch (err) {
    console.error('Answer list error:', err)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve answers'
    })
  }
})

// DELETE /api/admin/answers/:id - Delete answer
router.delete('/answers/:id',
  requireAuth,
  isAdmin,
  param('id').isInt().withMessage('Invalid answer ID'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { id } = req.params

    try {
      const [existingAnswer] = await pool.query(
        'SELECT id FROM answers WHERE id = ?',
        [id]
      )

      if (existingAnswer.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Answer not found'
        })
      }

      await pool.query('DELETE FROM answers WHERE id = ?', [id])

      res.json({
        success: true,
        message: 'Answer deleted successfully'
      })
    } catch (err) {
      console.error('Answer deletion error:', err)
      res.status(500).json({
        success: false,
        message: 'Failed to delete answer'
      })
    }
  }
)

module.exports = router

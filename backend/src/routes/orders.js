const express = require('express')
const { body, validationResult } = require('express-validator')
const pool = require('../db')
const requireAuth = require('../middleware/auth')
const router = express.Router()

// Create order (for demo purposes 'orders' can represent any entity related to users)
router.post('/', requireAuth, body('title').isString().notEmpty(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { title, details } = req.body
  try {
    const [result] = await pool.query('INSERT INTO orders (user_id, title, details) VALUES (?, ?, ?)', [req.user.id, title, details || null])
    res.json({ id: result.insertId, title, details })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, user_id, title, details, created_at FROM orders WHERE user_id = ?', [req.user.id])
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', requireAuth, async (req, res) => {
  const id = req.params.id
  try {
    const [rows] = await pool.query('SELECT id, user_id, title, details, created_at FROM orders WHERE id = ? AND user_id = ?', [id, req.user.id])
    if (!rows.length) return res.status(404).json({ message: 'Not found' })
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.put('/:id', requireAuth, body('title').optional().isString(), async (req, res) => {
  const id = req.params.id
  const { title, details } = req.body
  try {
    await pool.query('UPDATE orders SET title = ?, details = ? WHERE id = ? AND user_id = ?', [title || null, details || null, id, req.user.id])
    res.json({ message: 'Updated' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  const id = req.params.id
  try {
    await pool.query('DELETE FROM orders WHERE id = ? AND user_id = ?', [id, req.user.id])
    res.json({ message: 'Deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router

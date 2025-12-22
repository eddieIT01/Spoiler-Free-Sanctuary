const express = require('express')
const { body, validationResult } = require('express-validator')
const pool = require('../db')
const requireAuth = require('../middleware/auth')
const router = express.Router()

// List users (admin use in real app)
router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, created_at FROM users')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', requireAuth, async (req, res) => {
  const id = req.params.id
  try {
    const [rows] = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [id])
    if (!rows.length) return res.status(404).json({ message: 'Not found' })
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.put('/:id', requireAuth, body('name').optional().isString(), async (req, res) => {
  const id = req.params.id
  const { name } = req.body
  try {
    await pool.query('UPDATE users SET name = ? WHERE id = ?', [name || null, id])
    res.json({ message: 'Updated' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  const id = req.params.id
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id])
    res.json({ message: 'Deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router

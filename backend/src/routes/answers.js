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

// POST /api/answers - Create new answer
router.post('/',
  requireAuth,
  body('question')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Question must be less than 255 characters'),
  body('answer')
    .trim()
    .notEmpty()
    .withMessage('Answer is required')
    .isLength({ max: 5000 })
    .withMessage('Answer must be less than 5000 characters'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { question, answer } = req.body

    try {
      const [result] = await pool.query(
        'INSERT INTO answers (user_id, question, answer) VALUES (?, ?, ?)',
        [req.user.id, question || null, answer]
      )

      res.status(201).json({
        success: true,
        message: 'Answer created successfully',
        data: {
          id: result.insertId,
          user_id: req.user.id,
          question: question || null,
          answer,
          created_at: new Date().toISOString()
        }
      })
    } catch (err) {
      console.error('Answer creation error:', err)
      res.status(500).json({
        success: false,
        message: 'Failed to create answer'
      })
    }
  }
)

// GET /api/answers - Get all answers for the user
router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, user_id, question, answer, created_at FROM answers WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    )

    res.json({
      success: true,
      message: 'Answers retrieved successfully',
      data: rows
    })
  } catch (err) {
    console.error('Answer retrieval error:', err)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve answers'
    })
  }
})

// GET /api/answers/:id - Get specific answer
router.get('/:id',
  requireAuth,
  param('id').isInt().withMessage('Invalid answer ID'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { id } = req.params

    try {
      const [rows] = await pool.query(
        'SELECT id, user_id, question, answer, created_at FROM answers WHERE id = ? AND user_id = ?',
        [id, req.user.id]
      )

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Answer not found'
        })
      }

      res.json({
        success: true,
        message: 'Answer retrieved successfully',
        data: rows[0]
      })
    } catch (err) {
      console.error('Answer retrieval error:', err)
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve answer'
      })
    }
  }
)

// PUT /api/answers/:id - Update answer
router.put('/:id',
  requireAuth,
  param('id').isInt().withMessage('Invalid answer ID'),
  body('question')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Question must be less than 255 characters'),
  body('answer')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Answer cannot be empty')
    .isLength({ max: 5000 })
    .withMessage('Answer must be less than 5000 characters'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { id } = req.params
    const { question, answer } = req.body

    try {
      // Check if answer exists and belongs to user
      const [existingAnswer] = await pool.query(
        'SELECT id FROM answers WHERE id = ? AND user_id = ?',
        [id, req.user.id]
      )

      if (existingAnswer.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Answer not found'
        })
      }

      const updateFields = []
      const updateValues = []

      if (question !== undefined) {
        updateFields.push('question = ?')
        updateValues.push(question)
      }
      if (answer !== undefined) {
        updateFields.push('answer = ?')
        updateValues.push(answer)
      }

      if (updateFields.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No fields to update'
        })
      }

      updateValues.push(id, req.user.id)

      await pool.query(
        `UPDATE answers SET ${updateFields.join(', ')} WHERE id = ? AND user_id = ?`,
        updateValues
      )

      res.json({
        success: true,
        message: 'Answer updated successfully'
      })
    } catch (err) {
      console.error('Answer update error:', err)
      res.status(500).json({
        success: false,
        message: 'Failed to update answer'
      })
    }
  }
)

// DELETE /api/answers/:id - Delete answer
router.delete('/:id',
  requireAuth,
  param('id').isInt().withMessage('Invalid answer ID'),
  async (req, res) => {
    const validationError = handleValidationErrors(req, res)
    if (validationError) return

    const { id } = req.params

    try {
      // Check if answer exists and belongs to user
      const [existingAnswer] = await pool.query(
        'SELECT id FROM answers WHERE id = ? AND user_id = ?',
        [id, req.user.id]
      )

      if (existingAnswer.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Answer not found'
        })
      }

      await pool.query(
        'DELETE FROM answers WHERE id = ? AND user_id = ?',
        [id, req.user.id]
      )

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

import { Router } from 'express'
import { getAnalyticsSummary } from '../services/database.js'

const router = Router()

// GET /api/analytics
router.get('/', async (req, res) => {
  try {
    const stats = await getAnalyticsSummary()
    return res.json({ success: true, stats })
  } catch (error) {
    console.error('[analytics] Query failed:', error.message)
    return res.status(500).json({ success: false, error: 'Analytics unavailable' })
  }
})

export default router

import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { analyzeWithClaude } from '../services/claude.js'
import {
  saveSubmission,
  updateSubmissionResult,
  updateSubmissionError,
  getSubmissionById,
} from '../services/database.js'
import { sendAnalysisNotification, sendFarmerResultsEmail } from '../services/email.js'

const router = Router()

// POST /api/cropfit/analyze
router.post('/analyze', async (req, res) => {
  const { inputs, contactEmail, contactName, farmName } = req.body

  if (!inputs || typeof inputs !== 'object') {
    return res.status(400).json({ success: false, error: 'inputs object is required' })
  }

  const planId = uuidv4()

  try {
    // 1. Save submission to DB (pending state)
    await saveSubmission({ id: planId, inputs, contactEmail, contactName, farmName })

    // 2. Run Claude analysis
    const { analysis, topCrops, modelUsed, processingMs } = await analyzeWithClaude(inputs)

    // 3. Update DB with completed results
    await updateSubmissionResult({ id: planId, analysis, topCrops, modelUsed, processingMs })

    // 4. Send email notification (non-blocking — don't fail request if email fails)
    sendAnalysisNotification({ planId, inputs, analysis, contactName, contactEmail, farmName })
      .catch(err => console.error('[email] Notification failed:', err.message))

    // 5. Return results to frontend
    return res.json({
      success: true,
      planId,
      planUrl: `/cropfit/plan/${planId}`,
      analysis,
    })
  } catch (error) {
    console.error('[cropfit] Analysis failed:', error.message)
    await updateSubmissionError({ id: planId, errorMessage: error.message }).catch(() => {})
    return res.status(500).json({
      success: false,
      error: 'Analysis failed. Please try again.',
      planId,
    })
  }
})

// GET /api/cropfit/plan/:id
router.get('/plan/:id', async (req, res) => {
  const { id } = req.params

  // Basic UUID format validation
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return res.status(400).json({ success: false, error: 'Invalid plan ID format' })
  }

  try {
    const submission = await getSubmissionById(id)

    if (submission.status !== 'completed') {
      return res.status(404).json({ success: false, error: 'Plan not found or still processing' })
    }

    return res.json({
      success: true,
      plan: {
        id: submission.id,
        created_at: submission.created_at,
        inputs: submission.inputs,
        analysis: submission.analysis,
        contact_name: submission.contact_name,
        farm_name: submission.farm_name,
        region: submission.region,
        season: submission.season,
      },
    })
  } catch (error) {
    return res.status(404).json({ success: false, error: 'Plan not found' })
  }
})

// POST /api/cropfit/send-farmer-email
router.post('/send-farmer-email', async (req, res) => {
  const { planId, email } = req.body

  if (!planId || !email) {
    return res.status(400).json({ success: false, error: 'planId and email are required' })
  }

  try {
    const submission = await getSubmissionById(planId)
    if (!submission?.analysis) {
      return res.status(404).json({ success: false, error: 'Plan not found' })
    }
    await sendFarmerResultsEmail({ planId, email, analysis: submission.analysis, inputs: submission.inputs })
    return res.json({ success: true })
  } catch (error) {
    console.error('[cropfit] send-farmer-email failed:', error.message)
    return res.status(500).json({ success: false, error: 'Failed to send email' })
  }
})

export default router

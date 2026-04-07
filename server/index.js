import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cropfitRouter from './routes/cropfit.js'
import analyticsRouter from './routes/analytics.js'

const app = express()
const PORT = process.env.PORT || 3001

// CORS — allow frontend origins only
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [
        'https://elementfarmsolutions.co.za',
        'https://www.elementfarmsolutions.co.za',
      ]
    : ['http://localhost:5173', 'http://localhost:4173']

app.use(
  cors({
    origin: allowedOrigins,
    credentials: false,
  })
)

app.use(express.json({ limit: '1mb' }))

// Routes
app.use('/api/cropfit', cropfitRouter)
app.use('/api/analytics', analyticsRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Element Farm Solutions API running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})

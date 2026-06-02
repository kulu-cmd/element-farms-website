// Central API base URL
// In production this is set via VITE_API_URL env var (your Railway server URL)
// In development the Vite proxy handles /api → localhost:3001
const base = import.meta.env.VITE_API_URL || ''

export const API = {
  analyze:         `${base}/api/cropfit/analyze`,
  plan:            (id) => `${base}/api/cropfit/plan/${id}`,
  sendFarmerEmail: `${base}/api/cropfit/send-farmer-email`,
}

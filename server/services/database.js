import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function saveSubmission({ id, inputs, contactEmail, contactName, farmName }) {
  const { error } = await supabase
    .from('cropfit_submissions')
    .insert({
      id,
      inputs,
      region: inputs.region || null,
      season: inputs.season || null,
      water_access: inputs.water_access || null,
      soil_type: inputs.soil_type || null,
      management_level: inputs.management || null,
      farm_scale: inputs.farm_scale || null,
      contact_email: contactEmail || null,
      contact_name: contactName || null,
      farm_name: farmName || null,
      status: 'pending',
    })

  if (error) throw new Error(`Database insert failed: ${error.message}`)
}

export async function updateSubmissionResult({ id, analysis, topCrops, modelUsed, processingMs }) {
  const { error } = await supabase
    .from('cropfit_submissions')
    .update({
      analysis,
      top_crops: topCrops,
      status: 'completed',
      model_used: modelUsed,
      processing_ms: processingMs,
    })
    .eq('id', id)

  if (error) throw new Error(`Database update failed: ${error.message}`)
}

export async function updateSubmissionError({ id, errorMessage }) {
  const { error } = await supabase
    .from('cropfit_submissions')
    .update({ status: 'failed', error_message: errorMessage })
    .eq('id', id)

  if (error) console.error('Failed to update submission error status:', error.message)
}

export async function getSubmissionById(id) {
  const { data, error } = await supabase
    .from('cropfit_submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Submission not found: ${error.message}`)
  return data
}

export async function getAnalyticsSummary() {
  const { data: submissions, error } = await supabase
    .from('cropfit_submissions')
    .select('region, season, top_crops, created_at, status')
    .eq('status', 'completed')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Analytics query failed: ${error.message}`)

  const total = submissions.length
  const recent = submissions.filter(s => {
    const daysAgo = (Date.now() - new Date(s.created_at)) / (1000 * 60 * 60 * 24)
    return daysAgo <= 7
  }).length

  const byRegion = {}
  const bySeason = {}
  const cropCounts = {}

  for (const s of submissions) {
    if (s.region) byRegion[s.region] = (byRegion[s.region] || 0) + 1
    if (s.season) bySeason[s.season] = (bySeason[s.season] || 0) + 1
    if (s.top_crops) {
      for (const crop of s.top_crops) {
        cropCounts[crop] = (cropCounts[crop] || 0) + 1
      }
    }
  }

  const topCrops = Object.entries(cropCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([crop, count]) => ({ crop, count }))

  return { total, recent, byRegion, bySeason, topCrops }
}

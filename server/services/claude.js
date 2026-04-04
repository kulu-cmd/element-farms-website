import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const MODEL = 'gpt-4o-mini'

const SYSTEM_PROMPT = `You are Dr. Nolwazi Dlamini, a Senior Agricultural Consultant with 20 years of experience in South African farming systems. You specialise in crop suitability analysis, regenerative farming practices, and commercial farm planning for small to medium farms across all South African provinces.

Your expertise covers:
- All South African climate zones: Highveld, Bushveld, KwaZulu-Natal coastal and midlands, Western Cape Mediterranean, Northern Cape semi-arid, Eastern Cape diverse
- Crop varieties suited to South African conditions: local favourites, export crops, niche high-value crops
- South African market channels: SPAR Freshline, Woolworths Food, Pick n Pay Fresh, Checkers, Joburg Market, Cape Town Market, Durban Market, farm stalls, agri-tourism, export to EU/UK
- Regenerative farming practices: cover cropping, composting, reduced tillage, polyculture systems
- Water-wise farming for South Africa's water-stressed context
- Smallholder and small commercial farm economics

Your analysis is always:
- Grounded in practical South African farming reality — not theoretical textbooks
- Specific to the stated region's actual climate, soil, and market conditions
- Commercially honest — you give realistic assessments, not just encouraging ones
- Inclusive of both quick-win crops and longer-term strategic crops
- Aligned with regenerative principles where feasible

You must return ONLY valid JSON — no preamble, no explanation, no markdown code blocks. Just the raw JSON object.`

export async function analyzeWithClaude(inputs) {
  const startTime = Date.now()

  const regionLabel = inputs.regionLabel || inputs.region || 'Unknown Region'
  const marketChannels = Array.isArray(inputs.market)
    ? inputs.market.join(', ')
    : (inputs.market || 'Not specified')

  const userPrompt = `Analyse crop suitability for this South African farm profile:

LOCATION:
- Region: ${regionLabel}
- Region key: ${inputs.region || 'not specified'}
${inputs.lat && inputs.lng ? `- GPS coordinates: ${inputs.lat}, ${inputs.lng}` : ''}

GROWING CONDITIONS:
- Target season: ${inputs.season || 'not specified'}
- Crop duration preference: ${inputs.duration_type || 'not specified'} (annual = 1 season, short-perennial = 1–3 years to first income, long-perennial = 3+ years investment)
- Water access: ${inputs.water_access || 'not specified'} (rainfed = rainfall only, limited-irrigation = some supplementary water, reliable-irrigation = full irrigation available)
- Soil type: ${inputs.soil_type || 'unknown'}
- Frost risk: ${inputs.frost_risk || 'unknown'}
- Drainage: ${inputs.drainage || 'unknown'}

FARM OPERATIONS:
- Management intensity: ${inputs.management || 'not specified'} (low = minimal labour/inputs, moderate = standard commercial, high = intensive specialist)
- Farm scale: ${inputs.farm_scale || 'not specified'}
- Target market channels: ${marketChannels}
- Income timeline preference: ${inputs.time_income_pref || 'no preference'} (fast = under 3 months, medium = 3–8 months, long = 1 year or more)

Return a JSON object with EXACTLY this structure:
{
  "summary": "2–3 sentence overview of this farm's suitability and strategic potential based on their specific inputs",
  "regional_context": "1–2 sentences describing this region's typical agricultural conditions, climate patterns, and key opportunities or challenges",
  "season_advice": "1–2 sentences on optimal planting timing, seasonal windows, and any warnings for their stated season in this region",
  "recommendations": [
    {
      "crop_name": "Full common name of crop",
      "category": "vegetables|fruits|grains|legumes|herbs|cash-crops|cover-crops",
      "suitability_score": 85,
      "band": "best-fit",
      "reasons": ["Why this crop suits their specific conditions — be specific to their inputs", "Second reason"],
      "warnings": ["Specific risk or challenge for this farm profile"],
      "market_fit": "How well this crop matches their stated market channels and farm scale",
      "time_to_income": "X–Y months from planting to first sale",
      "management_notes": "Key management requirements and labour considerations at their stated scale"
    }
  ],
  "action_plan": [
    "Specific first action the farmer should take",
    "Second action",
    "Third action — be concrete and South Africa-specific",
    "Fourth action",
    "Fifth action"
  ]
}

Rules:
- Include exactly 12–15 crop recommendations
- Order by suitability_score descending
- Band thresholds: best-fit = 80–100, good-fit = 60–79, marginal = 40–59, not-recommended = 0–39
- Band distribution must reflect actual suitability — do not force artificial counts per band
- Be specific: name South African varieties where relevant (e.g. "Forono Beetroot", "Caro-Gold Pumpkin", "Sugar Loaf Cabbage")
- Action plan must have exactly 5 items
- reasons array: 2–3 items per crop
- warnings array: 1–2 items per crop (use empty array [] if genuinely no warnings)
- All suitability_score values must be integers 0–100`

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 7000,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  })

  const processingMs = Date.now() - startTime
  const rawText = response.choices[0].message.content.trim()

  let analysis
  try {
    analysis = JSON.parse(rawText)
  } catch (parseError) {
    throw new Error(
      `OpenAI returned invalid JSON: ${parseError.message}. Raw output (first 300 chars): ${rawText.substring(0, 300)}`
    )
  }

  const topCrops = (analysis.recommendations || [])
    .filter(r => r.band === 'best-fit' || r.band === 'good-fit')
    .slice(0, 5)
    .map(r => r.crop_name)

  return { analysis, topCrops, modelUsed: MODEL, processingMs }
}

/**
 * CropFit Planner — Scoring Engine
 * ============================================================
 *
 * PURPOSE
 * -------
 * This module scores every crop in the database against a farmer's
 * stated conditions and preferences, producing a 0–100 suitability
 * score and a plain-language explanation.
 *
 * SCORING MODEL
 * -------------
 * Base score: 50 points (neutral starting position)
 *
 * Adjustments are applied sequentially in the order below.
 * The total is clamped to 0–100 after all adjustments.
 *
 *  #  Factor                  Max impact   Weight rationale
 *  ─  ──────────────────────  ──────────   ─────────────────────────────────────
 *  1. Climate / region fit      ±20 pts    Climate is the primary constraint on crop viability
 *  2. Planting season fit        ±15 pts   Wrong season = failed crop
 *  3. Water availability fit     ±20 pts   Water mismatch causes complete crop failure
 *  4. Crop duration fit          ±12 pts   Perennial vs annual is a major farm planning decision
 *  5. Market target fit          +10 pts   Bonus only — a market the farmer can't reach ≠ penalty
 *  6. Soil type fit              ±8 pts    Important, but unknown soil = no deduction
 *  7. Management preference fit  ±8 pts    Skill/input mismatch causes underperformance
 *  8. Farm scale fit             ±5 pts    Some crops are unviable at wrong scale
 *  9. Frost risk penalty         -8 pts    Penalty only — frost kills frost-sensitive crops
 * 10. Time to income preference  ±4 pts    Low priority tie-breaker
 * 11. Drainage fit               ±4 pts    Optional; only applied when drainage is known
 *
 * BANDS
 * -----
 * 80–100  →  "Best fit"
 * 60–79   →  "Possible with caution"
 *  0–59   →  "Not recommended"
 *
 * ============================================================
 */

import { REGION_ARCHETYPES } from './regions.js'

// ─── SCORING WEIGHTS ──────────────────────────────────────────────────────
// Centralised here so tuning the engine is a single-place edit.
const WEIGHTS = {
  climate:    20,   // #1 — climate zone match
  season:     15,   // #2 — planting season match
  water:      20,   // #3 — water requirement vs available supply
  duration:   12,   // #4 — annual / short-perennial / long-perennial fit
  market:     10,   // #5 — market channel match (bonus only)
  soil:        8,   // #6 — soil type match
  management:  8,   // #7 — management intensity match
  scale:       5,   // #8 — farm scale match
  frost:       8,   // #9 — frost penalty for sensitive crops
  timeIncome:  4,   // #10 — time-to-income preference
  drainage:    4,   // #11 — soil drainage match
}


// ─── MAIN SCORING FUNCTION ────────────────────────────────────────────────
/**
 * Score a single crop against a set of farmer inputs.
 *
 * @param {Object} crop    A crop object from crops.js
 * @param {Object} inputs  Farmer inputs (see shape below)
 * @returns {{ score: number, band: string, explanation: string, warnings: string[], breakdown: Object }}
 *
 * inputs shape:
 * {
 *   region:           string  — archetype key from REGION_ARCHETYPES (e.g. 'warm-humid')
 *   season:           string  — 'summer' | 'autumn' | 'winter' | 'spring'
 *   duration_type:    string  — 'annual' | 'short-perennial' | 'long-perennial'
 *   water_access:     string  — 'rainfed' | 'limited-irrigation' | 'reliable-irrigation'
 *   soil_type:        string  — soil key or 'unknown'
 *   management:       string  — 'low' | 'moderate' | 'high'
 *   market:           string|string[]  — market channel key(s), can be an array for multi-select
 *   farm_scale:       string  — 'under-2' | '2-10' | '10-50' | '50+'
 *   frost_risk:       string|null  — 'low' | 'medium' | 'high' | null
 *   time_income_pref: string|null  — 'fast' | 'medium' | 'long' | null
 *   drainage:         string|null  — 'poor' | 'moderate' | 'good' | null
 * }
 */
export function scoreCrop(crop, inputs) {
  let score = 50   // neutral baseline
  const breakdown = {}
  const explanationParts = []  // positive/neutral observations for the explanation
  const warnings = []          // negative observations shown as warning pills

  // ── 1. CLIMATE FIT ─────────────────────────────────────────────────────
  // Compare the user's region archetype against the crop's climate zone list.
  //
  // Full match (+20): crop lists this zone as suitable
  // Partial match (+8): archetype has similar rainfall/temp profile (defined below)
  // No match (−15): crop is genuinely unsuitable for this climate
  //
  // "Similar" regions: warm-humid ↔ warm-subhumid share summer-rainfall patterns
  // and many crops bridge both. mediterranean is treated as partially compatible
  // with semi-arid (both have winter rainfall component / dry season).

  const CLIMATE_SIMILAR = {
    'warm-humid':    ['warm-subhumid'],
    'warm-subhumid': ['warm-humid', 'semi-arid'],
    'mediterranean': ['semi-arid'],
    'semi-arid':     ['warm-subhumid', 'mediterranean'],
    'highland-cool': ['warm-subhumid'],
  }

  let climateAdj = 0
  if (crop.climate_zones.includes(inputs.region)) {
    // Perfect climate match
    climateAdj = WEIGHTS.climate  // +20
    explanationParts.push(`well-adapted to ${REGION_ARCHETYPES[inputs.region]?.label || inputs.region} conditions`)
  } else {
    const similarZones = CLIMATE_SIMILAR[inputs.region] || []
    const hasSimilarMatch = crop.climate_zones.some(z => similarZones.includes(z))
    if (hasSimilarMatch) {
      // Adjacent climate — possible but not optimal
      climateAdj = Math.round(WEIGHTS.climate * 0.4)  // +8
      explanationParts.push('climate is adjacent — manageable with adaptation')
    } else {
      // Poor climate match
      climateAdj = -Math.round(WEIGHTS.climate * 0.75)  // −15
      warnings.push(`Not suited to ${REGION_ARCHETYPES[inputs.region]?.label || inputs.region} climate`)
    }
  }
  score += climateAdj
  breakdown.climate = climateAdj


  // ── 2. PLANTING SEASON FIT ──────────────────────────────────────────────
  // The user selects the season they intend to plant in.
  // Full match (+15): crop lists this season as suitable
  // Adjacent season (+6): preceding or following season listed (e.g. plant autumn, crop suits winter)
  // No match (−12): crop genuinely not planted in this season
  //
  // South African season adjacency ring: summer → autumn → winter → spring → summer

  const SEASON_ADJACENT = {
    'summer': ['spring', 'autumn'],
    'autumn': ['summer', 'winter'],
    'winter': ['autumn', 'spring'],
    'spring': ['winter', 'summer'],
  }

  let seasonAdj = 0
  if (crop.suitable_seasons.includes(inputs.season)) {
    seasonAdj = WEIGHTS.season  // +15
    explanationParts.push(`${inputs.season} is a recommended planting window`)
  } else {
    const adjSeasons = SEASON_ADJACENT[inputs.season] || []
    const hasAdjacentSeason = crop.suitable_seasons.some(s => adjSeasons.includes(s))
    if (hasAdjacentSeason) {
      seasonAdj = Math.round(WEIGHTS.season * 0.4)  // +6
      explanationParts.push('planting window is close — timing adjustment may be needed')
    } else {
      seasonAdj = -Math.round(WEIGHTS.season * 0.8)  // −12
      warnings.push(`${inputs.season} planting not recommended for this crop`)
    }
  }
  score += seasonAdj
  breakdown.season = seasonAdj


  // ── 3. WATER AVAILABILITY FIT ───────────────────────────────────────────
  // Water mismatch is a hard constraint — growing a high-water crop with only
  // rainfed access in a low-rainfall zone causes total crop failure.
  //
  // Logic:
  //   reliable-irrigation → no water penalty for any crop; bonuses for crops
  //                          that benefit from irrigation
  //   limited-irrigation  → suitable for low/moderate water crops (+full bonus)
  //                          partial fit for high water crops (+partial)
  //                          hard penalty for very-high water crops (−16)
  //   rainfed             → must match rainfall vs crop min_rainfall_mm
  //                          also considers drought tolerance
  //
  // Rainfall available under rainfed is estimated from the region archetype.

  const regionData = REGION_ARCHETYPES[inputs.region] || {}
  const regionRainfall = regionData.avg_annual_rainfall_mm || 600

  let waterAdj = 0

  if (inputs.water_access === 'reliable-irrigation') {
    // Full irrigation — can grow almost any crop; bonus for irrigation-benefiting crops
    if (crop.water_requirement === 'very-high' || crop.water_requirement === 'high') {
      waterAdj = WEIGHTS.water  // +20 — these crops are exactly what irrigation unlocks
      explanationParts.push('reliable irrigation satisfies high water demand')
    } else if (crop.irrigation_benefit) {
      waterAdj = Math.round(WEIGHTS.water * 0.75)  // +15
      explanationParts.push('irrigation will boost yield significantly')
    } else {
      waterAdj = Math.round(WEIGHTS.water * 0.5)   // +10 — crops don't need it but no harm
      explanationParts.push('irrigation available — water not a limiting factor')
    }

  } else if (inputs.water_access === 'limited-irrigation') {
    // Can supplement rain but cannot fully meet very-high demand crops
    if (crop.water_requirement === 'low') {
      waterAdj = WEIGHTS.water  // +20 — low-demand crops thrive with any irrigation
      explanationParts.push('low water demand matches limited irrigation well')
    } else if (crop.water_requirement === 'moderate') {
      waterAdj = Math.round(WEIGHTS.water * 0.75)  // +15
      explanationParts.push('moderate water demand is manageable with limited irrigation')
    } else if (crop.water_requirement === 'high') {
      // High demand + limited supply — depends on regional rainfall backup
      if (regionRainfall >= 700) {
        waterAdj = Math.round(WEIGHTS.water * 0.4)  // +8 — rain helps bridge the gap
        explanationParts.push('supplemental irrigation partially offsets high water need')
      } else {
        waterAdj = -Math.round(WEIGHTS.water * 0.4)  // −8
        warnings.push('High water demand may exceed limited irrigation in this region')
      }
    } else {
      // very-high — even limited irrigation won't cover the deficit
      waterAdj = -Math.round(WEIGHTS.water * 0.8)  // −16
      warnings.push('Very high water demand — limited irrigation is insufficient')
    }

  } else {
    // rainfed — compare region rainfall to crop minimum requirement
    const minRain = crop.min_rainfall_mm || 0

    if (regionRainfall >= minRain * 1.15) {
      // Comfortable surplus (+20 for well-matched rainfed crops)
      waterAdj = WEIGHTS.water  // +20
      explanationParts.push('regional rainfall comfortably meets crop water needs')
    } else if (regionRainfall >= minRain) {
      // Just sufficient — drought tolerance matters
      if (crop.drought_tolerance === 'high') {
        waterAdj = Math.round(WEIGHTS.water * 0.75)  // +15
        explanationParts.push('rainfall marginally sufficient — drought tolerance is an asset')
      } else if (crop.drought_tolerance === 'moderate') {
        waterAdj = Math.round(WEIGHTS.water * 0.5)  // +10
        explanationParts.push('rainfall just meets minimum requirement')
      } else {
        waterAdj = Math.round(WEIGHTS.water * 0.25)  // +5
        warnings.push('Rainfall barely meets minimum — dry spells will cause crop stress')
      }
    } else if (regionRainfall >= minRain * 0.7) {
      // Significant deficit — drought tolerance determines survivability
      if (crop.drought_tolerance === 'high') {
        waterAdj = -Math.round(WEIGHTS.water * 0.15)  // −3
        warnings.push('Rainfall below minimum but drought tolerance may compensate')
      } else if (crop.drought_tolerance === 'moderate') {
        waterAdj = -Math.round(WEIGHTS.water * 0.45)  // −9
        warnings.push('Rainfall deficit — significant yield loss likely without irrigation')
      } else {
        waterAdj = -Math.round(WEIGHTS.water * 0.75)  // −15
        warnings.push('Insufficient rainfall for this crop — irrigation essential')
      }
    } else {
      // Severe deficit — rainfed production not viable for this crop
      waterAdj = -WEIGHTS.water  // −20 (hard penalty)
      warnings.push(`Rainfed rainfall (~${regionRainfall} mm) far below crop minimum (${minRain} mm)`)
    }
  }

  score += waterAdj
  breakdown.water = waterAdj


  // ── 4. CROP DURATION TYPE FIT ───────────────────────────────────────────
  // Farmers choose whether they want annual, short-perennial, or long-perennial crops.
  // This is a major planning decision — mismatches have significant consequences.
  //
  // Exact match: +12
  // One step away (annual ↔ short-perennial): +5
  // Two steps away (annual ↔ long-perennial): −10

  const DURATION_ORDER = { 'annual': 0, 'short-perennial': 1, 'long-perennial': 2 }
  const inputDurOrder = DURATION_ORDER[inputs.duration_type] ?? 0
  const cropDurOrder  = DURATION_ORDER[crop.duration_type]  ?? 0
  const durDiff = Math.abs(inputDurOrder - cropDurOrder)

  let durationAdj = 0
  if (durDiff === 0) {
    durationAdj = WEIGHTS.duration  // +12 — exact match
    explanationParts.push(`matches preferred ${crop.duration_type} production cycle`)
  } else if (durDiff === 1) {
    durationAdj = Math.round(WEIGHTS.duration * 0.4)  // +5
    // No warning — adjacent is acceptable
  } else {
    durationAdj = -Math.round(WEIGHTS.duration * 0.85)  // −10
    const durationLabels = { 'annual': 'annual', 'short-perennial': 'short-term perennial', 'long-perennial': 'long-term perennial' }
    warnings.push(`Farmer prefers ${durationLabels[inputs.duration_type]} — this crop is ${durationLabels[crop.duration_type]}`)
  }
  score += durationAdj
  breakdown.duration = durationAdj


  // ── 5. MARKET CHANNEL FIT (bonus only) ──────────────────────────────────
  // Matching the farmer's target market is a bonus — no penalty for mismatch
  // because a farmer can usually find an alternative buyer.
  //
  // Normalise market input: can be a string or array of strings (multi-select)

  const marketInputs = Array.isArray(inputs.market)
    ? inputs.market
    : (inputs.market ? [inputs.market] : [])

  let marketAdj = 0
  if (marketInputs.length > 0) {
    const marketOverlap = crop.market_channels.filter(m => marketInputs.includes(m))
    if (marketOverlap.length >= 2) {
      marketAdj = WEIGHTS.market  // +10 — strong multi-channel overlap
      explanationParts.push('multiple target market channels supported')
    } else if (marketOverlap.length === 1) {
      marketAdj = Math.round(WEIGHTS.market * 0.6)  // +6 — single channel match
      explanationParts.push(`suitable for ${marketOverlap[0].replace(/-/g, ' ')} market`)
    } else {
      // No match — no bonus, no penalty (farmer may still find a buyer)
      marketAdj = 0
    }
  }
  score += marketAdj
  breakdown.market = marketAdj


  // ── 6. SOIL TYPE FIT ────────────────────────────────────────────────────
  // Soil is important but is often unknown — if unknown, skip entirely (0 adj).
  // No negative confidence note is added here; the UI will show overall score
  // with a "lower confidence" tag when soil is unknown.
  //
  // Exact match:   +8
  // Adjacent soil: +3  (sandy ↔ sandy-loam, sandy-loam ↔ loam, loam ↔ clay-loam, clay-loam ↔ clay)
  // No match:      −6

  const SOIL_ADJACENT = {
    'sandy':        ['sandy-loam'],
    'sandy-loam':   ['sandy', 'loam'],
    'loam':         ['sandy-loam', 'clay-loam'],
    'clay-loam':    ['loam', 'clay'],
    'clay':         ['clay-loam'],
    'shallow-rocky': [],
  }

  let soilAdj = 0
  if (inputs.soil_type && inputs.soil_type !== 'unknown') {
    if (crop.soil_types.includes(inputs.soil_type)) {
      soilAdj = WEIGHTS.soil  // +8 — exact soil match
      explanationParts.push(`performs well on ${inputs.soil_type.replace(/-/g, ' ')} soil`)
    } else {
      const adjacentSoils = SOIL_ADJACENT[inputs.soil_type] || []
      const hasAdjacentSoil = crop.soil_types.some(s => adjacentSoils.includes(s))
      if (hasAdjacentSoil) {
        soilAdj = Math.round(WEIGHTS.soil * 0.375)  // +3
        // No explicit warning — adjacent soil is acceptable with minor amendment
      } else {
        soilAdj = -Math.round(WEIGHTS.soil * 0.75)  // −6
        warnings.push(`Soil type mismatch — performs best on ${crop.soil_types.join(', ').replace(/-/g, ' ')}`)
      }
    }
  }
  // If soil is 'unknown', soilAdj stays 0 — no bonus, no penalty
  score += soilAdj
  breakdown.soil = soilAdj


  // ── 7. MANAGEMENT PREFERENCE FIT ────────────────────────────────────────
  // Matching management capacity to crop demands prevents production failure.
  //
  // Logic:
  //   Farmer wants LOW management (limited inputs/labour):
  //     crop is low     → +8  (perfect fit)
  //     crop is moderate→ +2  (manageable stretch)
  //     crop is high    → −8  (serious mismatch — crop will underperform)
  //
  //   Farmer wants MODERATE management:
  //     crop is moderate → +8
  //     crop is low      → +4  (no penalty — can always manage a simpler crop)
  //     crop is high     → −4  (slight stretch)
  //
  //   Farmer wants HIGH management (skilled, well-resourced):
  //     any crop         → +8  (can manage anything)
  //     — We reward high-management farmers more for high-management crops
  //       since those crops deliver higher returns.

  const MANAGEMENT_LEVELS = { 'low': 0, 'moderate': 1, 'high': 2 }
  const farmMgmt = MANAGEMENT_LEVELS[inputs.management] ?? 1
  const cropMgmt = MANAGEMENT_LEVELS[crop.management_level] ?? 1

  let managementAdj = 0
  if (inputs.management === 'high') {
    // High-capacity farmers can manage any crop
    managementAdj = WEIGHTS.management  // +8
    if (cropMgmt === 2) explanationParts.push('management capacity matches intensive crop requirements')
  } else if (inputs.management === 'moderate') {
    if (cropMgmt <= 1) {
      managementAdj = WEIGHTS.management  // +8 — moderate or easier crops
      if (cropMgmt === 1) explanationParts.push('management level is a good match')
    } else {
      managementAdj = -Math.round(WEIGHTS.management * 0.5)  // −4 — high-demand crop vs moderate capacity
      warnings.push('Crop management demands may exceed current capacity')
    }
  } else {
    // inputs.management === 'low'
    if (cropMgmt === 0) {
      managementAdj = WEIGHTS.management  // +8 — perfect low-input fit
      explanationParts.push('low-input crop matches management preference')
    } else if (cropMgmt === 1) {
      managementAdj = Math.round(WEIGHTS.management * 0.25)  // +2
    } else {
      managementAdj = -WEIGHTS.management  // −8 — serious mismatch
      warnings.push('High-management crop — unlikely to succeed with low-input approach')
    }
  }
  score += managementAdj
  breakdown.management = managementAdj


  // ── 8. FARM SCALE FIT ───────────────────────────────────────────────────
  // Some crops (e.g. macadamia, sugarcane) require large-scale operations to
  // be economically viable. Others (e.g. basil, spinach) suit small intensives.
  //
  // Exact scale in crop's farm_scale_fit: +5
  // Scale is in the list: +5 (same — same scale fit list is a binary check)
  // Scale is one step away: +2
  // Not in list and not adjacent: −3

  const SCALE_ORDER = ['under-2', '2-10', '10-50', '50+']
  const inputScaleIdx = SCALE_ORDER.indexOf(inputs.farm_scale)

  let scaleAdj = 0
  if (crop.farm_scale_fit.includes(inputs.farm_scale)) {
    scaleAdj = WEIGHTS.scale  // +5
    // No explanatory note added — scale is a background factor
  } else {
    // Check if an adjacent scale is listed
    const adjacentScales = [
      SCALE_ORDER[inputScaleIdx - 1],
      SCALE_ORDER[inputScaleIdx + 1],
    ].filter(Boolean)
    const hasAdjacentScale = crop.farm_scale_fit.some(s => adjacentScales.includes(s))
    if (hasAdjacentScale) {
      scaleAdj = Math.round(WEIGHTS.scale * 0.4)  // +2
    } else {
      scaleAdj = -Math.round(WEIGHTS.scale * 0.6)  // −3
      warnings.push(`Typically not viable at ${inputs.farm_scale} ha scale`)
    }
  }
  score += scaleAdj
  breakdown.scale = scaleAdj


  // ── 9. FROST RISK PENALTY ────────────────────────────────────────────────
  // Only applied when frost_risk is provided by the user or auto-detected.
  // Frost is a penalty-only factor — frost-tolerant crops get no bonus.
  //
  // Crop frost_tolerance: 'none' | 'low' | 'moderate' | 'high'
  // inputs.frost_risk:    'low'  | 'medium' | 'high'  | null
  //
  // Penalty matrix:
  //   frost_risk=high   + tolerance=none    → −8  (crop death likely)
  //   frost_risk=high   + tolerance=low     → −5  (significant risk)
  //   frost_risk=medium + tolerance=none    → −4  (moderate risk)
  //   frost_risk=medium + tolerance=low     → −2
  //   frost_risk=low    + tolerance=none    → −1  (minor risk)
  //   all other combos                      →  0

  let frostAdj = 0
  if (inputs.frost_risk && inputs.frost_risk !== 'none') {
    if (inputs.frost_risk === 'high') {
      if (crop.frost_tolerance === 'none') {
        frostAdj = -WEIGHTS.frost  // −8
        warnings.push('High frost risk — this crop has no frost tolerance and may be killed')
      } else if (crop.frost_tolerance === 'low') {
        frostAdj = -Math.round(WEIGHTS.frost * 0.625)  // −5
        warnings.push('High frost risk — this crop has limited frost tolerance')
      }
      // moderate and high tolerance crops are fine in high frost risk areas
    } else if (inputs.frost_risk === 'medium') {
      if (crop.frost_tolerance === 'none') {
        frostAdj = -Math.round(WEIGHTS.frost * 0.5)  // −4
        warnings.push('Moderate frost risk — frost protection recommended')
      } else if (crop.frost_tolerance === 'low') {
        frostAdj = -Math.round(WEIGHTS.frost * 0.25)  // −2
        warnings.push('Moderate frost risk — monitor winter temperatures carefully')
      }
    } else if (inputs.frost_risk === 'low') {
      if (crop.frost_tolerance === 'none') {
        frostAdj = -Math.round(WEIGHTS.frost * 0.125)  // −1
        // No explicit warning — minor risk only
      }
    }
  }
  score += frostAdj
  breakdown.frost = frostAdj


  // ── 10. TIME TO INCOME PREFERENCE ──────────────────────────────────────
  // A lower-priority tie-breaker. Farmers who need fast cash-flow should be
  // pointed away from long-term perennials even if climate matches.
  //
  // Exact match: +4
  // One step away: +1
  // Two steps away: −2
  // Three steps away: −4

  const INCOME_ORDER = { 'fast': 0, 'medium': 1, 'long': 2, 'very-long': 3 }

  let timeIncomeAdj = 0
  if (inputs.time_income_pref) {
    const inputTiIdx = INCOME_ORDER[inputs.time_income_pref] ?? 1
    const cropTiIdx  = INCOME_ORDER[crop.time_to_income]     ?? 1
    const tiDiff = Math.abs(inputTiIdx - cropTiIdx)

    if (tiDiff === 0) {
      timeIncomeAdj = WEIGHTS.timeIncome  // +4
    } else if (tiDiff === 1) {
      timeIncomeAdj = Math.round(WEIGHTS.timeIncome * 0.25)  // +1
    } else if (tiDiff === 2) {
      timeIncomeAdj = -Math.round(WEIGHTS.timeIncome * 0.5)  // −2
    } else {
      timeIncomeAdj = -WEIGHTS.timeIncome  // −4
      warnings.push('Time to first income does not match preference')
    }
  }
  score += timeIncomeAdj
  breakdown.timeIncome = timeIncomeAdj


  // ── 11. DRAINAGE FIT ────────────────────────────────────────────────────
  // Only applied when drainage is provided. Some crops (e.g. avocado, beans)
  // are critically intolerant of poor drainage; others cope.
  //
  // drainage_preference on crop: 'poor' | 'moderate' | 'good'
  //   'good' = crop needs well-drained soil (flood-sensitive)
  //   'moderate' = tolerates some wetness
  //   'poor' = tolerant of or benefits from moisture retention
  //
  // inputs.drainage = what the farm actually has.
  //
  // Penalty: if farm has 'poor' drainage and crop needs 'good' → −4
  // Bonus:   if drainage matches perfectly → +4

  let drainageAdj = 0
  if (inputs.drainage) {
    const DRAINAGE_LEVELS = { 'poor': 0, 'moderate': 1, 'good': 2 }
    const farmDrain = DRAINAGE_LEVELS[inputs.drainage] ?? 1
    const cropDrain = DRAINAGE_LEVELS[crop.drainage_preference] ?? 1

    const drainDiff = farmDrain - cropDrain  // positive = farm drains better than crop needs

    if (drainDiff === 0) {
      drainageAdj = WEIGHTS.drainage  // +4 — exact match
    } else if (drainDiff >= 1) {
      drainageAdj = Math.round(WEIGHTS.drainage * 0.5)  // +2 — better drainage than needed is fine
    } else if (drainDiff === -1) {
      drainageAdj = -Math.round(WEIGHTS.drainage * 0.5)  // −2 — slight deficit
      if (crop.drainage_preference === 'good' && inputs.drainage === 'moderate') {
        warnings.push('This crop prefers well-drained soil')
      }
    } else {
      drainageAdj = -WEIGHTS.drainage  // −4 — serious drainage mismatch
      warnings.push('Poor drainage is a significant risk for this crop')
    }
  }
  score += drainageAdj
  breakdown.drainage = drainageAdj


  // ── CLAMP SCORE ─────────────────────────────────────────────────────────
  // Ensure score never goes below 0 or above 100.
  score = Math.max(0, Math.min(100, Math.round(score)))


  // ── DETERMINE BAND ──────────────────────────────────────────────────────
  const band =
    score >= 80 ? 'best-fit' :
    score >= 60 ? 'caution'  :
                  'not-recommended'


  // ── BUILD EXPLANATION ───────────────────────────────────────────────────
  const explanation = generateExplanation(explanationParts, warnings, score)

  return { score, band, explanation, warnings, breakdown }
}


// ─── BATCH SCORER ─────────────────────────────────────────────────────────
/**
 * Score every crop in the provided array and return results sorted
 * highest score first.
 *
 * @param {Object}   inputs  Farmer inputs (same shape as scoreCrop expects)
 * @param {Object[]} crops   Full array of crop objects from crops.js
 * @returns {{ crop: Object, score: number, band: string, explanation: string, warnings: string[], breakdown: Object }[]}
 */
export function scoreCrops(inputs, crops) {
  return crops
    .map(crop => ({ crop, ...scoreCrop(crop, inputs) }))
    .sort((a, b) => b.score - a.score)
}


// ─── EXPLANATION GENERATOR ────────────────────────────────────────────────
/**
 * Compose a human-readable, 1–2 sentence explanation from scoring parts.
 *
 * Strategy:
 *   - Take up to 3 positive/neutral observation strings from explanationParts
 *   - Form a brief positive sentence: "This crop [part1], [part2], and [part3]."
 *   - Append up to 2 key warnings as a second sentence.
 *
 * @param {string[]} parts     Positive/neutral observation strings
 * @param {string[]} warnings  Warning strings
 * @param {number}   score     Final score (used to tone the opener)
 * @returns {string}
 */
export function generateExplanation(parts, warnings, score) {
  const positiveParts = parts.slice(0, 3)
  const keyWarnings = warnings.slice(0, 2)

  let explanation = ''

  if (positiveParts.length > 0) {
    if (score >= 80) {
      explanation = `Strong fit: this crop ${joinList(positiveParts)}.`
    } else if (score >= 60) {
      explanation = `Possible fit: this crop ${joinList(positiveParts)}.`
    } else {
      explanation = `Limited fit: this crop ${joinList(positiveParts)}.`
    }
  } else if (score >= 60) {
    explanation = 'Adequate fit given current conditions.'
  } else {
    explanation = 'Several key conditions are not met for this crop.'
  }

  if (keyWarnings.length > 0) {
    explanation += ' Note: ' + keyWarnings.join('; ') + '.'
  }

  return explanation
}

/**
 * Helper: join an array of strings into a natural-language list.
 * e.g. ['a', 'b', 'c'] → 'a, b, and c'
 *      ['a', 'b']      → 'a and b'
 *      ['a']           → 'a'
 */
function joinList(arr) {
  if (arr.length === 0) return ''
  if (arr.length === 1) return arr[0]
  if (arr.length === 2) return `${arr[0]} and ${arr[1]}`
  const last = arr[arr.length - 1]
  const rest = arr.slice(0, -1)
  return `${rest.join(', ')}, and ${last}`
}


// ─── BAND LABEL UTILITY ───────────────────────────────────────────────────
/**
 * Return a human-readable display label for a score band key.
 *
 * @param {string} band  'best-fit' | 'caution' | 'not-recommended'
 * @returns {string}
 */
export function getBandLabel(band) {
  const labels = {
    'best-fit':        'Best fit',
    'caution':         'Possible with caution',
    'not-recommended': 'Not recommended',
  }
  return labels[band] || band
}

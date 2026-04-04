/**
 * CropFit Planner — Region Archetypes & Location Lookup
 *
 * South African climate zone archetypes used throughout the scoring engine.
 * The five archetypes cover the major agricultural production contexts found
 * across the country.
 */

// ─── REGION ARCHETYPES ─────────────────────────────────────────────────────
// Each archetype describes a climate zone used for crop scoring.
// avg_annual_rainfall_mm, summer/winter temps, and frost_risk are used by the
// scoring engine to evaluate crop suitability.

export const REGION_ARCHETYPES = {
  'warm-humid': {
    label: 'Warm Humid Subtropical',
    description:
      'High summer rainfall, warm winters. KwaZulu-Natal coast, Mpumalanga lowveld.',
    avg_annual_rainfall_mm: 900,
    summer_temp_avg: 27,
    winter_temp_avg: 16,
    frost_risk: 'low',
  },
  'warm-subhumid': {
    label: 'Warm Sub-humid Inland',
    description:
      'Summer rainfall, moderate winters. Limpopo bushveld, North West, parts of Mpumalanga.',
    avg_annual_rainfall_mm: 600,
    summer_temp_avg: 30,
    winter_temp_avg: 12,
    frost_risk: 'medium',
  },
  'mediterranean': {
    label: 'Mediterranean Winter Rainfall',
    description:
      'Dry summers, wet cool winters. Western Cape, parts of Northern Cape.',
    avg_annual_rainfall_mm: 500,
    summer_temp_avg: 26,
    winter_temp_avg: 12,
    frost_risk: 'low',
  },
  'semi-arid': {
    label: 'Semi-arid',
    description:
      'Low and unreliable rainfall, hot summers. Karoo, parts of Free State and Northern Cape.',
    avg_annual_rainfall_mm: 350,
    summer_temp_avg: 32,
    winter_temp_avg: 8,
    frost_risk: 'high',
  },
  'highland-cool': {
    label: 'Cooler Highland',
    description:
      'Summer rainfall, cool to cold winters. KwaZulu-Natal midlands, eastern Free State, parts of Mpumalanga escarpment.',
    avg_annual_rainfall_mm: 700,
    summer_temp_avg: 22,
    winter_temp_avg: 6,
    frost_risk: 'high',
  },
}

// ─── LAT/LNG → REGION ARCHETYPE LOOKUP ────────────────────────────────────
/**
 * Maps a geographic coordinate pair to a South African climate archetype.
 *
 * Uses bounding-box logic as a v1 approximation.
 * South Africa occupies roughly lat -22 to -35, lng 16 to 33.
 *
 * Rules applied in priority order (first match wins):
 *  1. Western Cape / Overberg (Mediterranean): lng < 22 AND lat < -31
 *  2. KZN midlands / Mpumalanga escarpment (Highland cool): lng 29–31, lat -28 to -31
 *  3. KZN coast and lowveld (Warm humid): lng > 29.5, lat -25 to -32
 *  4. Karoo / southern Northern Cape (Semi-arid): lng < 24, lat -29 to -33
 *  5. Limpopo / North West / Gauteng (Warm subhumid): lat > -26 OR (lng 24–30, lat -26 to -29)
 *  6. Default: warm-subhumid
 *
 * @param {number|null} lat  Decimal latitude  (negative = south)
 * @param {number|null} lng  Decimal longitude (positive = east)
 * @returns {string}  Archetype key matching a key in REGION_ARCHETYPES
 */
export function getRegionFromLatLng(lat, lng) {
  if (lat == null || lng == null) return 'warm-subhumid'

  const la = Number(lat)
  const lo = Number(lng)

  // Sanity-check: must be within broad South African bounds
  if (la > -20 || la < -36 || lo < 15 || lo > 34) return 'warm-subhumid'

  // 1. Western Cape / Overberg — Mediterranean zone
  //    Classic Mediterranean band: west coast below ~-31° and west of lng 22°
  if (lo < 22 && la < -31) return 'mediterranean'

  // Broader Mediterranean catchment for Breede River Valley and Overberg
  // (lng 19–24, lat -33 to -34 covers Worcester/Robertson area)
  if (lo >= 19 && lo < 24 && la < -33) return 'mediterranean'

  // 2. KZN midlands and Mpumalanga escarpment — Highland cool
  //    Drakensberg foothills: lng 29–31, lat -28 to -31
  if (lo >= 29 && lo <= 31.5 && la >= -31 && la <= -28) return 'highland-cool'

  // Eastern Free State highlands: lat south of -28, lng 27–30
  if (lo >= 27 && lo < 30 && la >= -31 && la < -28.5) return 'highland-cool'

  // 3. KwaZulu-Natal coast and Mpumalanga lowveld — Warm humid
  //    KZN coastal strip: lng > 29.5, lat between -25 and -32
  if (lo > 29.5 && la >= -32 && la <= -25) return 'warm-humid'

  // Mpumalanga / Limpopo lowveld: lng 30–32, lat -24 to -26
  if (lo >= 30 && lo <= 32.5 && la >= -26 && la <= -24) return 'warm-humid'

  // 4. Karoo and southern Northern Cape — Semi-arid
  //    Central Karoo: lng 20–26, lat -29 to -33.5
  if (lo >= 20 && lo < 26 && la >= -33.5 && la < -29) return 'semi-arid'

  // Northern Cape interior: lng 22–26, lat -27 to -30
  if (lo >= 22 && lo < 26 && la >= -30 && la < -27) return 'semi-arid'

  // 5. Limpopo / North West / Gauteng — Warm subhumid (explicit band)
  //    Limpopo bushveld: lat -22 to -26
  if (la >= -26 && la <= -22) return 'warm-subhumid'

  // North West / northern Free State / parts of Mpumalanga interior: lng 24–30, lat -26 to -29
  if (lo >= 24 && lo <= 30 && la >= -29 && la < -26) return 'warm-subhumid'

  // 6. Default — warm subhumid covers most unmatched inland summer-rainfall regions
  return 'warm-subhumid'
}

// ─── TEXT → REGION ARCHETYPE LOOKUP ───────────────────────────────────────
/**
 * Maps a free-text province or region name to a climate archetype.
 *
 * Matching is case-insensitive. Partial province names and common
 * sub-regional names are supported.
 *
 * @param {string} regionText  Free-text input from the user
 * @returns {string}  Archetype key matching a key in REGION_ARCHETYPES
 */
export function getRegionFromText(regionText) {
  if (!regionText || typeof regionText !== 'string') return 'warm-subhumid'

  const text = regionText.toLowerCase().trim()

  // ── Mediterranean ────────────────────────────────────────────────────────
  const mediterraneanTerms = [
    'western cape', 'west cape',
    'cape town', 'stellenbosch', 'paarl', 'worcester', 'robertson',
    'swartland', 'overberg', 'hermanus', 'george', 'oudtshoorn',
    'klein karoo', 'breede river', 'elgin', 'botrivier',
    'northern cape west', 'namaqualand', 'cederberg',
    'cape winelands',
  ]
  if (mediterraneanTerms.some(term => text.includes(term))) return 'mediterranean'

  // ── Warm Humid ───────────────────────────────────────────────────────────
  const warmHumidTerms = [
    'kwazulu-natal coast', 'kzn coast', 'durban', 'umhlanga',
    'south coast', 'north coast', 'zululand', 'eshowe', 'stanger',
    'mpumalanga lowveld', 'nelspruit', 'hazyview', 'hoedspruit',
    'tzaneen', 'letsitele', 'phalaborwa',
    'white river', 'malelane', 'komatipoort',
    'eastern cape coast', 'port elizabeth coastal', 'gqeberha coast',
  ]
  if (warmHumidTerms.some(term => text.includes(term))) return 'warm-humid'

  // ── Highland Cool ─────────────────────────────────────────────────────────
  const highlandTerms = [
    'kwazulu-natal midlands', 'kzn midlands', 'midlands', 'pietermaritzburg',
    'mooi river', 'underberg', 'nottingham road', 'bergville',
    'eastern free state', 'free state highlands', 'clarens', 'wepener',
    'lady grey', 'barkly east',
    'mpumalanga escarpment', 'sabie', 'pilgrim\'s rest', 'graskop',
    'drakensberg', 'lesotho border', 'swaziland highlands',
    'lydenburg', 'mashishing',
  ]
  if (highlandTerms.some(term => text.includes(term))) return 'highland-cool'

  // ── Semi-arid ─────────────────────────────────────────────────────────────
  const semiAridTerms = [
    'karoo', 'great karoo', 'upper karoo', 'beaufort west',
    'graaff-reinet', 'cradock', 'de aar',
    'northern cape', 'north cape', 'upington', 'springbok',
    'calvinia', 'sutherland', 'fraserburg',
    'kimberley', 'sol plaatje',
    'free state karoo', 'free state semi-arid',
    'namakwa', 'namakwaland',
  ]
  if (semiAridTerms.some(term => text.includes(term))) return 'semi-arid'

  // ── Warm Subhumid ─────────────────────────────────────────────────────────
  // Checked last as the broadest category — also the default
  const warmSubhumidTerms = [
    'limpopo', 'polokwane', 'mokopane', 'bela-bela', 'musina', 'makhado',
    'vhembe', 'mopani', 'sekhukhune', 'capricorn',
    'north west', 'rustenburg', 'mahikeng', 'mafikeng', 'brits', 'hartbeespoort',
    'gauteng', 'johannesburg', 'pretoria', 'tshwane', 'centurion', 'midrand',
    'mpumalanga', 'emalahleni', 'witbank', 'standerton', 'ermelo', 'carolina',
    'free state', 'bloemfontein', 'kroonstad', 'welkom', 'bethlehem',
    'north eastern cape', 'aliwal', 'queenstown', 'komani',
    'eastern cape inland', 'east london inland',
  ]
  if (warmSubhumidTerms.some(term => text.includes(term))) return 'warm-subhumid'

  // ── Province-level broad fallbacks ───────────────────────────────────────
  if (text.includes('kwazulu') || text.includes('kzn') || text.includes('natal')) {
    // Generic KZN reference — default to warm-humid (coastal bias in the province)
    return 'warm-humid'
  }
  if (text.includes('free state')) return 'warm-subhumid'
  if (text.includes('eastern cape')) return 'warm-subhumid'

  // Default
  return 'warm-subhumid'
}

/**
 * CropFit Planner — Crop Data
 *
 * 25 crops covering annuals, short-perennials, and long-perennials.
 * All agronomic values reflect South African subtropical and warm-temperate
 * production contexts unless otherwise noted.
 *
 * Schema documentation is inline on the first crop (Maize).
 */

export const crops = [

  // ─── ANNUALS / SEASONAL ────────────────────────────────────────────────────

  {
    id: 'maize',
    name: 'Maize',
    category: 'grain',
    duration_type: 'annual',
    description: 'Staple grain crop widely grown across summer-rainfall regions of South Africa for food, feed, and processing.',

    climate_zones: ['warm-humid', 'warm-subhumid', 'semi-arid'],
    suitable_seasons: ['summer', 'spring'],

    water_requirement: 'moderate',
    min_rainfall_mm: 450,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam', 'clay-loam'],
    drainage_preference: 'moderate',

    management_level: 'moderate',

    farm_scale_fit: ['2-10', '10-50', '50+'],

    market_channels: ['processor', 'farmgate', 'informal'],

    time_to_income: 'medium',

    frost_tolerance: 'none',
    wind_tolerance: 'moderate',
    drought_tolerance: 'low',

    water_need_display: 'Moderate (450–600 mm/season)',
    soil_display: 'Loam, Sandy loam, Clay loam',
    income_display: '4–5 months',
    management_display: 'Moderate',

    notes: 'Plant after last frost when soil temperature reaches 10°C; use certified hybrid seed for best yields. Rotate with legumes to reduce nitrogen input costs and break pest cycles.',
    risks: ['Susceptible to stalk borer (Busseola fusca)', 'Poor yield on waterlogged or compacted soils', 'Fall Armyworm pressure in warm-humid zones'],
  },

  {
    id: 'dry-beans',
    name: 'Dry Beans',
    category: 'grain',
    duration_type: 'annual',
    description: 'High-protein legume that fixes atmospheric nitrogen, making it an excellent rotation crop with maize and other grains.',

    climate_zones: ['warm-subhumid', 'warm-humid', 'highland-cool'],
    suitable_seasons: ['summer', 'spring'],

    water_requirement: 'moderate',
    min_rainfall_mm: 300,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam', 'clay-loam'],
    drainage_preference: 'good',

    management_level: 'moderate',

    farm_scale_fit: ['2-10', '10-50', '50+'],

    market_channels: ['processor', 'farmgate', 'informal'],

    time_to_income: 'medium',

    frost_tolerance: 'none',
    wind_tolerance: 'moderate',
    drought_tolerance: 'moderate',

    water_need_display: 'Moderate (300–500 mm/season)',
    soil_display: 'Loam, Sandy loam, Clay loam',
    income_display: '3–4 months',
    management_display: 'Moderate',

    notes: 'Well-drained soils are critical — waterlogging causes root rot and rapid yield loss. Inoculate seed with Rhizobium to maximise biological nitrogen fixation.',
    risks: ['Very sensitive to waterlogging at any stage', 'Bean stem maggot common in warm-humid zones', 'Hail damage causes significant pod shattering'],
  },

  {
    id: 'cabbage',
    name: 'Cabbage',
    category: 'vegetable',
    duration_type: 'annual',
    description: 'Cool-season brassica grown almost year-round in South Africa; one of the country\'s most widely consumed vegetables.',

    climate_zones: ['warm-subhumid', 'highland-cool', 'mediterranean', 'warm-humid'],
    suitable_seasons: ['autumn', 'winter', 'spring'],

    water_requirement: 'moderate',
    min_rainfall_mm: 380,
    irrigation_benefit: true,

    soil_types: ['loam', 'clay-loam', 'sandy-loam'],
    drainage_preference: 'moderate',

    management_level: 'moderate',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'informal', 'supermarket'],

    time_to_income: 'medium',

    frost_tolerance: 'moderate',
    wind_tolerance: 'moderate',
    drought_tolerance: 'low',

    water_need_display: 'Moderate (380–500 mm/season)',
    soil_display: 'Loam, Clay loam, Sandy loam',
    income_display: '3–4 months',
    management_display: 'Moderate',

    notes: 'Transplant seedlings raised in a nursery for more uniform stands; avoid planting in the same field more than once every three seasons to reduce clubroot buildup. Consistent moisture produces tight, heavy heads.',
    risks: ['Diamondback moth and caterpillars require regular monitoring', 'Clubroot fungus persists in acidic, poorly drained soils', 'Bolting risk if transplanted during warm spells in spring'],
  },

  {
    id: 'tomato',
    name: 'Tomato',
    category: 'vegetable',
    duration_type: 'annual',
    description: 'High-value vegetable with strong demand across all market channels; requires attentive management but delivers excellent returns.',

    climate_zones: ['warm-subhumid', 'warm-humid', 'mediterranean', 'semi-arid'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'high',
    min_rainfall_mm: 600,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam', 'clay-loam'],
    drainage_preference: 'good',

    management_level: 'high',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'informal', 'supermarket', 'processor'],

    time_to_income: 'medium',

    frost_tolerance: 'none',
    wind_tolerance: 'low',
    drought_tolerance: 'low',

    water_need_display: 'High (600–800 mm/season)',
    soil_display: 'Loam, Sandy loam, Clay loam',
    income_display: '3–4 months',
    management_display: 'High',

    notes: 'Drip irrigation with fertigation significantly improves fruit quality and reduces foliar disease; stake or trellis determinate varieties for airflow. Tomato yellow leaf curl virus, spread by whitefly, is a major yield threat.',
    risks: ['Bacterial and fungal wilts in warm-humid areas', 'Blossom-end rot from inconsistent calcium/water supply', 'Frost kills plants — avoid planting near expected frost dates'],
  },

  {
    id: 'butternut',
    name: 'Butternut',
    category: 'vegetable',
    duration_type: 'annual',
    description: 'Hardy cucurbit well-suited to warm South African summers; stores well post-harvest and has broad market demand.',

    climate_zones: ['warm-subhumid', 'warm-humid', 'semi-arid'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'moderate',
    min_rainfall_mm: 400,
    irrigation_benefit: true,

    soil_types: ['sandy-loam', 'loam', 'clay-loam'],
    drainage_preference: 'good',

    management_level: 'low',

    farm_scale_fit: ['2-10', '10-50', '50+'],

    market_channels: ['fresh-local', 'informal', 'supermarket', 'farmgate'],

    time_to_income: 'medium',

    frost_tolerance: 'none',
    wind_tolerance: 'moderate',
    drought_tolerance: 'moderate',

    water_need_display: 'Moderate (400–600 mm/season)',
    soil_display: 'Sandy loam, Loam, Clay loam',
    income_display: '3–4 months',
    management_display: 'Low–Moderate',

    notes: 'Butternut tolerates brief dry spells once vines are established; avoid overwatering which promotes powdery mildew. Fruits store 3–6 months in cool, dry conditions — ideal for staggered market sales.',
    risks: ['Powdery mildew in humid conditions', 'Fruit fly damage if left too long on the vine', 'Virus diseases spread by aphids in dense plantings'],
  },

  {
    id: 'onion',
    name: 'Onion',
    category: 'vegetable',
    duration_type: 'annual',
    description: 'Cool-season bulb crop with high market demand and long shelf life; timing of planting relative to day length is critical.',

    climate_zones: ['semi-arid', 'mediterranean', 'warm-subhumid', 'highland-cool'],
    suitable_seasons: ['autumn', 'winter', 'spring'],

    water_requirement: 'moderate',
    min_rainfall_mm: 350,
    irrigation_benefit: true,

    soil_types: ['sandy-loam', 'loam'],
    drainage_preference: 'good',

    management_level: 'high',

    farm_scale_fit: ['under-2', '2-10', '10-50', '50+'],

    market_channels: ['fresh-local', 'informal', 'supermarket', 'processor'],

    time_to_income: 'medium',

    frost_tolerance: 'moderate',
    wind_tolerance: 'moderate',
    drought_tolerance: 'moderate',

    water_need_display: 'Moderate (350–500 mm/season)',
    soil_display: 'Sandy loam, Loam',
    income_display: '4–5 months',
    management_display: 'High',

    notes: 'Choose cultivars matched to your day-length regime — short-day types for winter planting, long-day or intermediate types for spring. Reduce irrigation 2–3 weeks before harvest for good bulb skin development.',
    risks: ['Onion thrips cause severe yield and quality losses in dry conditions', 'Fusarium basal rot spreads rapidly in warm, wet soils', 'Bolting triggered by temperature fluctuations'],
  },

  {
    id: 'spinach',
    name: 'Spinach',
    category: 'vegetable',
    duration_type: 'annual',
    description: 'Fast-growing leafy green with year-round demand in informal and fresh markets; quick cash-flow crop for small farmers.',

    climate_zones: ['warm-subhumid', 'highland-cool', 'warm-humid', 'mediterranean'],
    suitable_seasons: ['autumn', 'winter', 'spring', 'summer'],

    water_requirement: 'moderate',
    min_rainfall_mm: 300,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam', 'clay-loam'],
    drainage_preference: 'moderate',

    management_level: 'low',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'informal', 'farmgate'],

    time_to_income: 'fast',

    frost_tolerance: 'moderate',
    wind_tolerance: 'moderate',
    drought_tolerance: 'low',

    water_need_display: 'Moderate (300–450 mm)',
    soil_display: 'Loam, Sandy loam, Clay loam',
    income_display: '6–8 weeks',
    management_display: 'Low',

    notes: 'Successive sowings every 3–4 weeks provide continuous harvest; cut-and-come-again varieties extend each planting\'s productive life. Keep soil consistently moist — moisture stress causes bitterness and premature bolting.',
    risks: ['Downy mildew in cool, humid conditions', 'Bolts quickly in hot weather — avoid summer peak in hot climates', 'Short shelf life requires proximity to market'],
  },

  {
    id: 'green-pepper',
    name: 'Green Pepper',
    category: 'vegetable',
    duration_type: 'annual',
    description: 'Warm-season solanaceous crop with strong fresh and informal market demand; closely related to chilli with similar management needs.',

    climate_zones: ['warm-subhumid', 'warm-humid', 'semi-arid'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'high',
    min_rainfall_mm: 600,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam'],
    drainage_preference: 'good',

    management_level: 'moderate',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'informal', 'supermarket'],

    time_to_income: 'medium',

    frost_tolerance: 'none',
    wind_tolerance: 'low',
    drought_tolerance: 'low',

    water_need_display: 'High (600–800 mm/season)',
    soil_display: 'Loam, Sandy loam',
    income_display: '3–4 months',
    management_display: 'Moderate',

    notes: 'Peppers are sensitive to both drought stress (causes flower drop) and waterlogging; consistent drip irrigation is ideal. Staking in exposed sites reduces stem breakage and improves airflow.',
    risks: ['Phytophthora root rot in poorly drained soils', 'Bacterial spot (Xanthomonas) spreads in warm, wet conditions', 'Sun scald on fruit in high-temperature zones without shade'],
  },

  {
    id: 'chilli',
    name: 'Chilli',
    category: 'vegetable',
    duration_type: 'annual',
    description: 'Warm-season spice crop with growing demand for fresh, dried, and processed product in domestic and export markets.',

    climate_zones: ['warm-subhumid', 'warm-humid', 'semi-arid'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'moderate',
    min_rainfall_mm: 500,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam', 'clay-loam'],
    drainage_preference: 'good',

    management_level: 'moderate',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'informal', 'processor', 'export'],

    time_to_income: 'medium',

    frost_tolerance: 'none',
    wind_tolerance: 'low',
    drought_tolerance: 'moderate',

    water_need_display: 'Moderate (500–700 mm/season)',
    soil_display: 'Loam, Sandy loam, Clay loam',
    income_display: '3–5 months',
    management_display: 'Moderate',

    notes: 'Once established, chilli tolerates moderate drought better than bell pepper; however consistent irrigation during flowering and fruiting is essential for yield. Processor contracts for paprika chilli provide price security on larger farms.',
    risks: ['Phytophthora root rot in compacted or waterlogged soils', 'Thrips transmit tospo viruses — monitor early and use reflective mulch', 'Requires sorting and grading labour for fresh market'],
  },

  {
    id: 'ginger',
    name: 'Ginger',
    category: 'root',
    duration_type: 'annual',
    description: 'Tropical rhizome crop suited to warm, humid conditions; increasingly valued for fresh, dried, and value-added health products.',

    climate_zones: ['warm-humid', 'warm-subhumid'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'high',
    min_rainfall_mm: 1200,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam'],
    drainage_preference: 'good',

    management_level: 'moderate',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'informal', 'processor', 'export'],

    time_to_income: 'long',

    frost_tolerance: 'none',
    wind_tolerance: 'low',
    drought_tolerance: 'low',

    water_need_display: 'High (1 200–2 000 mm/season)',
    soil_display: 'Loam, Sandy loam',
    income_display: '8–10 months',
    management_display: 'Moderate',

    notes: 'Ginger requires partial shade in very hot, dry areas; mulching heavily retains moisture and suppresses weeds around the shallow rhizomes. Harvest baby ginger at 5–6 months for a faster cash cycle, or mature rhizomes at 8–10 months for better dried-product value.',
    risks: ['Bacterial wilt (Ralstonia) is devastating — avoid replanting on infected soil for several years', 'Rhizome rot in waterlogged conditions', 'Low tolerance for full-sun exposure in semi-arid zones'],
  },

  {
    id: 'turmeric',
    name: 'Turmeric',
    category: 'root',
    duration_type: 'annual',
    description: 'High-value spice and medicinal rhizome with rapidly growing domestic and export demand; closely related to ginger with similar production requirements.',

    climate_zones: ['warm-humid', 'warm-subhumid'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'high',
    min_rainfall_mm: 1000,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam'],
    drainage_preference: 'good',

    management_level: 'moderate',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'processor', 'export'],

    time_to_income: 'long',

    frost_tolerance: 'none',
    wind_tolerance: 'low',
    drought_tolerance: 'low',

    water_need_display: 'High (1 000–1 500 mm/season)',
    soil_display: 'Loam, Sandy loam',
    income_display: '8–10 months',
    management_display: 'Moderate',

    notes: 'Curcumin content — the key commercial compound — is highest when rhizomes are harvested at full maturity (9–10 months); premium markets pay significant premiums for certified organic turmeric. Keep soil moisture consistent throughout the growing season to prevent rhizome cracking.',
    risks: ['Rhizome rot if soil poorly drains after heavy rain', 'Leaf blotch and leaf spot in high-humidity conditions', 'Slow emergence means heavy weed competition in early stages'],
  },

  {
    id: 'basil',
    name: 'Basil',
    category: 'herb',
    duration_type: 'annual',
    description: 'Fast-growing aromatic herb with strong fresh market and food-service demand; ideal for small-scale intensive production close to urban centres.',

    climate_zones: ['warm-humid', 'warm-subhumid', 'mediterranean'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'moderate',
    min_rainfall_mm: 400,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam'],
    drainage_preference: 'good',

    management_level: 'low',

    farm_scale_fit: ['under-2', '2-10'],

    market_channels: ['fresh-local', 'supermarket', 'farmgate'],

    time_to_income: 'fast',

    frost_tolerance: 'none',
    wind_tolerance: 'low',
    drought_tolerance: 'low',

    water_need_display: 'Moderate (400–600 mm)',
    soil_display: 'Loam, Sandy loam',
    income_display: '4–6 weeks',
    management_display: 'Low',

    notes: 'Pinch out flower heads as soon as they appear to extend the harvest window significantly; regular cutting encourages bushy growth and higher leaf yield. Cold temperatures below 10°C cause blackening — avoid cold-season planting in highland zones.',
    risks: ['Frost and cold damage kills plants quickly', 'Fusarium wilt is soil-borne and persists between seasons', 'Very short shelf life — must be harvested close to delivery time'],
  },

  {
    id: 'coriander',
    name: 'Coriander',
    category: 'herb',
    duration_type: 'annual',
    description: 'Cool-season herb with dual-purpose value — leaves (dhania) for fresh markets and seed for spice processing — offering year-round income opportunities.',

    climate_zones: ['mediterranean', 'highland-cool', 'warm-subhumid'],
    suitable_seasons: ['autumn', 'winter', 'spring'],

    water_requirement: 'low',
    min_rainfall_mm: 250,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam', 'sandy'],
    drainage_preference: 'good',

    management_level: 'low',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'informal', 'farmgate', 'processor'],

    time_to_income: 'fast',

    frost_tolerance: 'low',
    wind_tolerance: 'low',
    drought_tolerance: 'moderate',

    water_need_display: 'Low–Moderate (250–400 mm)',
    soil_display: 'Loam, Sandy loam, Sandy',
    income_display: '3–5 weeks',
    management_display: 'Low',

    notes: 'Direct-sow into final position as coriander dislikes root disturbance; sow thickly and thin to 10 cm for leaf production or leave denser for seed crop. Bolts rapidly in heat — stagger sowings every 2–3 weeks for continuous supply.',
    risks: ['Bolts prematurely in warm or long-day conditions', 'Powdery mildew in humid, poorly ventilated areas', 'Low value per kg — profitability requires high yields or premium fresh-market access'],
  },

  // ─── PERENNIALS / TREE CROPS ───────────────────────────────────────────────

  {
    id: 'avocado',
    name: 'Avocado',
    category: 'fruit',
    duration_type: 'long-perennial',
    description: 'Premium subtropical tree fruit with strong export and domestic demand; requires deep, well-drained soils and frost-free conditions.',

    climate_zones: ['warm-humid', 'warm-subhumid', 'mediterranean'],
    suitable_seasons: ['spring'],

    water_requirement: 'high',
    min_rainfall_mm: 1200,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam'],
    drainage_preference: 'good',

    management_level: 'high',

    farm_scale_fit: ['2-10', '10-50', '50+'],

    market_channels: ['supermarket', 'export', 'fresh-local'],

    time_to_income: 'long',

    frost_tolerance: 'none',
    wind_tolerance: 'low',
    drought_tolerance: 'low',

    water_need_display: 'High (1 200–1 600 mm/year)',
    soil_display: 'Loam, Sandy loam',
    income_display: '3–4 years (first commercial harvest)',
    management_display: 'High',

    notes: 'Avocado roots are extremely sensitive to waterlogging — even 24 hours of standing water can cause Phytophthora root rot; raised beds or ridging on heavier soils is recommended. Export varieties (Hass, Ryan) command the best prices but require GlobalGAP certification for international markets.',
    risks: ['Phytophthora root rot in poorly drained soils is the leading cause of orchard failure', 'Frost during flowering (July–September) causes severe crop loss', 'High capital cost for establishment, irrigation infrastructure, and certification'],
  },

  {
    id: 'macadamia',
    name: 'Macadamia',
    category: 'tree-crop',
    duration_type: 'long-perennial',
    description: 'Premium nut crop with strong export demand; South Africa is one of the world\'s largest producers, primarily from Limpopo and KwaZulu-Natal.',

    climate_zones: ['warm-humid', 'warm-subhumid'],
    suitable_seasons: ['spring'],

    water_requirement: 'moderate',
    min_rainfall_mm: 1000,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam', 'clay-loam'],
    drainage_preference: 'good',

    management_level: 'high',

    farm_scale_fit: ['10-50', '50+'],

    market_channels: ['processor', 'export'],

    time_to_income: 'long',

    frost_tolerance: 'low',
    wind_tolerance: 'low',
    drought_tolerance: 'low',

    water_need_display: 'Moderate (1 000–1 400 mm/year)',
    soil_display: 'Loam, Sandy loam, Clay loam',
    income_display: '4–6 years (first commercial harvest)',
    management_display: 'High',

    notes: 'Macadamia orchards typically reach full production at 10–12 years; despite the long investment period, nut-in-shell prices have historically remained strong. Windbreaks are essential as wind-damaged nuts fall prematurely and reduce recoverable kernel quality.',
    risks: ['Stinkbug (Nezara viridula) causes significant nut abortion', 'Frost at flowering (June–August) causes crop loss in highland areas', 'Very high establishment cost and long payback period — requires patient capital'],
  },

  {
    id: 'banana',
    name: 'Banana',
    category: 'fruit',
    duration_type: 'short-perennial',
    description: 'High-yielding tropical fruit with year-round fresh market demand; produces ratoons indefinitely under good management in frost-free zones.',

    climate_zones: ['warm-humid', 'warm-subhumid'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'very-high',
    min_rainfall_mm: 1500,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam', 'clay-loam'],
    drainage_preference: 'moderate',

    management_level: 'moderate',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'informal', 'farmgate', 'supermarket'],

    time_to_income: 'long',

    frost_tolerance: 'none',
    wind_tolerance: 'low',
    drought_tolerance: 'low',

    water_need_display: 'Very high (1 500–2 500 mm/year)',
    soil_display: 'Loam, Sandy loam, Clay loam',
    income_display: '12–18 months (first bunch)',
    management_display: 'Moderate',

    notes: 'The plant mat system (mother, daughter, granddaughter) is key to maintaining productivity — manage suckers to keep one strong follower per stool. Banana Xanthomonas Wilt (BXW) and Fusarium wilt (Panama disease) are quarantine threats; use clean planting material and avoid moving soil between sites.',
    risks: ['Frost kills leaves and pseudostems — entire plant can be lost', 'Wind toppling in exposed sites — stake bunches before harvest', 'Banana weevil and nematode damage reduces stool lifespan without management'],
  },

  {
    id: 'litchi',
    name: 'Litchi',
    category: 'fruit',
    duration_type: 'long-perennial',
    description: 'Premium subtropical tree fruit with strong festive-season demand; requires specific temperature cues to flower and a precise water management regime.',

    climate_zones: ['warm-humid', 'warm-subhumid'],
    suitable_seasons: ['spring'],

    water_requirement: 'moderate',
    min_rainfall_mm: 1000,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam', 'clay-loam'],
    drainage_preference: 'good',

    management_level: 'high',

    farm_scale_fit: ['2-10', '10-50', '50+'],

    market_channels: ['fresh-local', 'supermarket', 'export'],

    time_to_income: 'long',

    frost_tolerance: 'low',
    wind_tolerance: 'moderate',
    drought_tolerance: 'moderate',

    water_need_display: 'Moderate–High (1 000–1 500 mm/year)',
    soil_display: 'Loam, Sandy loam, Clay loam',
    income_display: '4–5 years (first commercial harvest)',
    management_display: 'High',

    notes: 'Litchi requires a cool, dry rest period (winter stress) to trigger flower induction — irrigation should be withheld from about May to July. Protect developing fruit from fruit fly with protein bait stations from onset of colour change.',
    risks: ['Erratic bearing (alternate bearing) if flowering stress is not managed', 'Fruit cracking and poor colour in excessively humid harvest conditions', 'High establishment cost and 4–5 year payback on a small scale'],
  },

  {
    id: 'mango',
    name: 'Mango',
    category: 'fruit',
    duration_type: 'long-perennial',
    description: 'Widely grown subtropical/tropical fruit tree; tolerates drier conditions better than most tropical fruits and is well-adapted to Limpopo and lower Mpumalanga.',

    climate_zones: ['warm-subhumid', 'warm-humid', 'semi-arid'],
    suitable_seasons: ['spring'],

    water_requirement: 'moderate',
    min_rainfall_mm: 700,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam', 'clay-loam', 'sandy'],
    drainage_preference: 'good',

    management_level: 'moderate',

    farm_scale_fit: ['2-10', '10-50', '50+'],

    market_channels: ['fresh-local', 'informal', 'supermarket', 'export', 'processor'],

    time_to_income: 'long',

    frost_tolerance: 'none',
    wind_tolerance: 'moderate',
    drought_tolerance: 'moderate',

    water_need_display: 'Moderate (700–1 200 mm/year)',
    soil_display: 'Loam, Sandy loam, Clay loam, Sandy',
    income_display: '3–4 years (first commercial harvest)',
    management_display: 'Moderate',

    notes: 'Mango trees need a dry, cool rest period in winter to stimulate flowering — supplemental irrigation during this period reduces crop load the following season. Kent and Keitt varieties carry premium export prices; Sensation and Tommy Atkins dominate fresh domestic markets.',
    risks: ['Mango seed weevil limits export market access to certain countries', 'Anthracnose (fungal) at harvest causes rapid post-harvest losses', 'Alternate bearing requires thinning and girdling management on older trees'],
  },

  {
    id: 'passionfruit',
    name: 'Passionfruit',
    category: 'fruit',
    duration_type: 'short-perennial',
    description: 'Fast-producing subtropical vine with high fresh and juice market demand; reaches commercial production within the first year and produces for 3–5 years.',

    climate_zones: ['warm-humid', 'warm-subhumid', 'highland-cool'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'moderate',
    min_rainfall_mm: 900,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam'],
    drainage_preference: 'good',

    management_level: 'moderate',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'informal', 'processor', 'farmgate'],

    time_to_income: 'long',

    frost_tolerance: 'low',
    wind_tolerance: 'low',
    drought_tolerance: 'low',

    water_need_display: 'Moderate (900–1 200 mm/year)',
    soil_display: 'Loam, Sandy loam',
    income_display: '12–18 months (first significant harvest)',
    management_display: 'Moderate',

    notes: 'Yellow passionfruit is more vigorous and disease-tolerant than purple in hot lowland areas; purple varieties produce better flavour in cooler highland zones. Trellis systems must be built strongly — mature vines are extremely heavy and difficult to re-trellis.',
    risks: ['Woodiness disease (potyvirus) — no cure; use certified virus-free planting material only', 'Root rot in poorly drained soils', 'Short productive lifespan (3–5 years) requires replanting planning'],
  },

  {
    id: 'citrus',
    name: 'Citrus (Orange/Navel)',
    category: 'fruit',
    duration_type: 'long-perennial',
    description: 'Major commercial export and fresh market tree crop; South Africa is a global top-ten citrus exporter with strong infrastructure in Limpopo, Eastern Cape, and Western Cape.',

    climate_zones: ['warm-subhumid', 'semi-arid', 'mediterranean', 'warm-humid'],
    suitable_seasons: ['spring'],

    water_requirement: 'moderate',
    min_rainfall_mm: 600,
    irrigation_benefit: true,

    soil_types: ['sandy-loam', 'loam', 'clay-loam'],
    drainage_preference: 'good',

    management_level: 'high',

    farm_scale_fit: ['2-10', '10-50', '50+'],

    market_channels: ['supermarket', 'export', 'processor', 'fresh-local'],

    time_to_income: 'long',

    frost_tolerance: 'low',
    wind_tolerance: 'moderate',
    drought_tolerance: 'moderate',

    water_need_display: 'Moderate (600–900 mm/year)',
    soil_display: 'Sandy loam, Loam, Clay loam',
    income_display: '3–5 years (first commercial harvest)',
    management_display: 'High',

    notes: 'Navel orange is the dominant export variety — timing of harvest window (April–October) aligns well with Northern Hemisphere demand. Comply with phytosanitary requirements from day one — citrus greening (Huanglongbing) and false codling moth are priority pests for export protocols.',
    risks: ['Citrus greening (HLB) is a quarantine disease with no cure', 'False codling moth breaches export protocols — requires integrated pest management', 'High water demand in semi-arid zones requires reliable drip irrigation infrastructure'],
  },

  {
    id: 'guava',
    name: 'Guava',
    category: 'fruit',
    duration_type: 'short-perennial',
    description: 'Hardy, vigorous fruit tree with excellent fresh and processing market demand; tolerates a wider range of conditions than most subtropical fruits.',

    climate_zones: ['warm-subhumid', 'warm-humid', 'semi-arid'],
    suitable_seasons: ['spring'],

    water_requirement: 'moderate',
    min_rainfall_mm: 500,
    irrigation_benefit: true,

    soil_types: ['loam', 'sandy-loam', 'clay-loam', 'sandy'],
    drainage_preference: 'moderate',

    management_level: 'low',

    farm_scale_fit: ['under-2', '2-10', '10-50', '50+'],

    market_channels: ['fresh-local', 'informal', 'processor', 'farmgate'],

    time_to_income: 'long',

    frost_tolerance: 'low',
    wind_tolerance: 'moderate',
    drought_tolerance: 'moderate',

    water_need_display: 'Moderate (500–800 mm/year)',
    soil_display: 'Loam, Sandy loam, Clay loam, Sandy',
    income_display: '2–3 years (commercial quantities)',
    management_display: 'Low–Moderate',

    notes: 'Guava is one of the lowest-input fruit trees available; it recovers well after pruning and heavy-bearing seasons. Fruit fly is the primary pest — bait spray programmes and field hygiene (remove fallen fruit) are the most cost-effective management.',
    risks: ['Fruit fly renders fresh-market fruit unmarketable without management', 'Guava wilt (Fusarium) is a major replanting problem in established orchards', 'Over-production during peak season crushes fresh-market prices — processing contracts offer price stability'],
  },

  {
    id: 'moringa',
    name: 'Moringa',
    category: 'tree-crop',
    duration_type: 'short-perennial',
    description: 'Fast-growing multi-purpose tree prized for its highly nutritious leaves, seeds, and pods; tolerates drought and poor soils better than most crops.',

    climate_zones: ['warm-subhumid', 'warm-humid', 'semi-arid'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'low',
    min_rainfall_mm: 250,
    irrigation_benefit: true,

    soil_types: ['sandy-loam', 'loam', 'sandy', 'clay-loam'],
    drainage_preference: 'good',

    management_level: 'low',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'informal', 'processor', 'export'],

    time_to_income: 'medium',

    frost_tolerance: 'none',
    wind_tolerance: 'moderate',
    drought_tolerance: 'high',

    water_need_display: 'Low (250–600 mm/year)',
    soil_display: 'Sandy loam, Loam, Sandy, Clay loam',
    income_display: '6–8 months (first leaf harvest)',
    management_display: 'Low',

    notes: 'For leaf production, manage as a coppiced shrub — cut back to 1 m height every 45–60 days to stimulate continuous new leaf flush. Dried moringa leaf powder has high export value in health food and nutraceutical markets.',
    risks: ['Frost kills stems to ground level — regrowth is slow in cool regions', 'Leaf blight in high-humidity, waterlogged conditions', 'Niche market requires development of buyer relationships before scaling up'],
  },

  {
    id: 'dragon-fruit',
    name: 'Dragon Fruit',
    category: 'fruit',
    duration_type: 'short-perennial',
    description: 'High-value cactus-origin climbing fruit with rapidly growing demand in premium fresh, export, and value-added markets.',

    climate_zones: ['warm-subhumid', 'warm-humid', 'semi-arid'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'low',
    min_rainfall_mm: 400,
    irrigation_benefit: true,

    soil_types: ['sandy-loam', 'loam', 'sandy'],
    drainage_preference: 'good',

    management_level: 'moderate',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'supermarket', 'export', 'farmgate'],

    time_to_income: 'long',

    frost_tolerance: 'none',
    wind_tolerance: 'moderate',
    drought_tolerance: 'high',

    water_need_display: 'Low–Moderate (400–700 mm/year)',
    soil_display: 'Sandy loam, Loam, Sandy',
    income_display: '18–24 months (first harvest)',
    management_display: 'Moderate',

    notes: 'Dragon fruit flowers open only at night and require hand pollination or bat/moth activity for fruit set — hand pollination is recommended for reliable yields. Concrete or treated-wood trellis posts are a significant establishment cost but last 15–20 years.',
    risks: ['No commercial fruit set without effective pollination', 'Stem rot and anthracnose in high-humidity, poor-drainage conditions', 'Niche fresh market is currently undersupplied but can become saturated quickly'],
  },

  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    category: 'root',
    duration_type: 'annual',
    description: 'Fast-growing root crop with excellent nutritional value and strong informal and fresh market demand across South Africa.',

    climate_zones: ['warm-subhumid', 'warm-humid', 'semi-arid'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'moderate',
    min_rainfall_mm: 500,
    irrigation_benefit: true,

    soil_types: ['sandy-loam', 'loam', 'sandy'],
    drainage_preference: 'good',

    management_level: 'low',

    farm_scale_fit: ['under-2', '2-10', '10-50'],

    market_channels: ['fresh-local', 'informal', 'farmgate'],

    time_to_income: 'medium',

    frost_tolerance: 'none',
    wind_tolerance: 'moderate',
    drought_tolerance: 'moderate',

    water_need_display: 'Moderate (500–700 mm/season)',
    soil_display: 'Sandy loam, Loam, Sandy',
    income_display: '3–5 months',
    management_display: 'Low',

    notes: 'Sweet potato is one of the most productive crops per hectare under resource-limited conditions; it smothers weeds once established and requires minimal inputs. Avoid over-fertilising with nitrogen — it promotes excessive vine growth at the expense of root development.',
    risks: ['Weevil (Cylas formicarius) tunnels into roots and causes complete crop loss if unmanaged', 'Virus diseases (spread by aphids and whitefly) reduce yield over multiple seasons from infected slips', 'Cracking soils cause forked, unmarketable roots'],
  },

  {
    id: 'sugarcane',
    name: 'Sugarcane',
    category: 'grain',
    duration_type: 'short-perennial',
    description: 'Major industrial crop contracted to sugar mills; South Africa\'s KwaZulu-Natal and Mpumalanga lowveld regions are primary production areas with established infrastructure.',

    climate_zones: ['warm-humid', 'warm-subhumid'],
    suitable_seasons: ['spring', 'summer'],

    water_requirement: 'very-high',
    min_rainfall_mm: 1200,
    irrigation_benefit: true,

    soil_types: ['loam', 'clay-loam', 'sandy-loam'],
    drainage_preference: 'moderate',

    management_level: 'moderate',

    farm_scale_fit: ['10-50', '50+'],

    market_channels: ['processor'],

    time_to_income: 'long',

    frost_tolerance: 'low',
    wind_tolerance: 'moderate',
    drought_tolerance: 'low',

    water_need_display: 'Very high (1 200–2 000 mm/year)',
    soil_display: 'Loam, Clay loam, Sandy loam',
    income_display: '12–16 months (first crush)',
    management_display: 'Moderate',

    notes: 'Sugarcane is typically grown on a mill-contract basis which provides pricing certainty but removes market flexibility; ratoon management (allowing regrowth from cut stools) for 2–4 ratoon crops reduces establishment cost over the cycle. Ensure transport logistics to the nearest mill are viable before planting.',
    risks: ['Single-channel processor market — mill gate price volatility affects profitability directly', 'High water demand requires reliable rainfall or irrigation infrastructure', 'Eldana borer and termites are primary pest challenges in established stands'],
  },

]

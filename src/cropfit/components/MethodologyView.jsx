import React from 'react'

const SCORING_WEIGHTS = [
  {
    category: 'Climate zone match',
    weight: '20 pts',
    description: 'How well the crop\'s preferred climate zones align with your region.',
  },
  {
    category: 'Planting season match',
    weight: '15 pts',
    description: 'Whether your intended season aligns with the crop\'s viable planting windows.',
  },
  {
    category: 'Water availability',
    weight: '15 pts',
    description: 'Compatibility between your water source and the crop\'s irrigation requirements.',
  },
  {
    category: 'Soil type compatibility',
    weight: '10 pts',
    description: 'How well your soil type(s) support the crop\'s root and drainage requirements.',
  },
  {
    category: 'Management intensity match',
    weight: '10 pts',
    description: 'Alignment between the crop\'s labour intensity and your available management capacity.',
  },
  {
    category: 'Farm scale fit',
    weight: '8 pts',
    description: 'Whether the crop is suited to your farm size (smallholder, medium, or commercial).',
  },
  {
    category: 'Market channel alignment',
    weight: '8 pts',
    description: 'How well the crop\'s typical market channels match your stated preference.',
  },
  {
    category: 'Frost risk penalty',
    weight: 'up to –10 pts',
    description: 'Score is reduced if the crop has low frost tolerance and your region has frost risk.',
  },
  {
    category: 'Time to income preference',
    weight: '7 pts',
    description: 'Match between your income urgency and the crop\'s time to first harvest.',
  },
  {
    category: 'Drainage requirement',
    weight: '5 pts',
    description: 'Compatibility between the crop\'s drainage sensitivity and your drainage conditions.',
  },
  {
    category: 'Duration type preference',
    weight: '2 pts',
    description: 'Bonus if the crop\'s annual/perennial type aligns with your stated preference.',
  },
]

const SCORE_BANDS = [
  {
    range: '80–100',
    band: 'Best fit',
    cls: 'cf-band-chip--best',
    description: 'Strong alignment across most or all criteria. Recommended for further evaluation.',
  },
  {
    range: '60–79',
    band: 'Possible with caution',
    cls: 'cf-band-chip--caution',
    description: 'Some criteria match well; one or more factors may need mitigation or adaptation.',
  },
  {
    range: 'Below 60',
    band: 'Not recommended',
    cls: 'cf-band-chip--not-rec',
    description: 'Significant mismatches in key criteria. Feasible only with major changes to conditions.',
  },
]

const ACCOUNTED_FACTORS = [
  'Climate zone (arid, semi-arid, warm humid, subtropical, temperate, cool highlands)',
  'Planting season (summer, winter, year-round)',
  'Water availability (rainfed, borehole, dam, irrigation, municipal)',
  'Crop duration type (annual, perennial, tree crop)',
  'Soil type (clay, loam, sandy loam, sand, silt)',
  'Management intensity (low, moderate, high)',
  'Farm scale (smallholder, medium, commercial)',
  'Market channel preference (fresh local, processor, export, self-supply, direct retail)',
  'Frost risk (based on climate zone and crop tolerance)',
  'Time to income urgency (immediate, 1–2 years, long-term)',
  'Drainage conditions (well-drained, moderate, poor)',
]

const NOT_ACCOUNTED_FACTORS = [
  'Current spot market prices or price volatility',
  'Farm-specific microclimates and elevation effects',
  'Specific cultivar selection within a crop type',
  'Pest and disease pressure in your specific area or season',
  'Available capital, credit, and infrastructure costs',
  'Actual laboratory soil test results (pH, nutrient levels, organic matter)',
  'Certification or compliance requirements for specific markets',
  'Proximity to buyers, input suppliers, or processing facilities',
]

export function MethodologyView() {
  return (
    <div className="cf-methodology">

      {/* Section 1 — About */}
      <div className="cf-methodology-section">
        <p className="cf-section-heading">About this tool</p>
        <p>
          CropFit Planner is a decision-support tool for farmers, growers, and agricultural
          consultants. It provides directional crop suitability recommendations based on
          farm conditions you describe. It does not replace detailed local agronomic assessment,
          soil testing, physical site evaluation, or market due diligence.
        </p>
        <p>
          Use CropFit to shortlist crops worth investigating further — then consult an
          agronomist, extension officer, or market specialist before making production decisions.
        </p>
      </div>

      {/* Section 2 — How scoring works */}
      <div className="cf-methodology-section">
        <p className="cf-section-heading">How scoring works</p>
        <p>
          Each crop starts with a base score of <strong>50 points</strong>. Points are added
          or subtracted based on how well each crop's profile matches your declared farm
          conditions. The maximum possible score is 100; the minimum is 0 (after penalties).
        </p>
        <p>
          Scores are then grouped into three bands:
        </p>
        <table className="cf-methodology-table" aria-label="Score bands">
          <thead>
            <tr>
              <th>Score range</th>
              <th>Band</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {SCORE_BANDS.map((band) => (
              <tr key={band.range}>
                <td style={{ fontVariantNumeric: 'tabular-nums' }}>{band.range}</td>
                <td>
                  <span className={`cf-band-chip ${band.cls}`}>{band.band}</span>
                </td>
                <td>{band.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: '1.1rem' }}>
          The table below shows the scoring categories and their maximum contribution to the
          total score:
        </p>
        <table className="cf-methodology-table" aria-label="Scoring weights by category">
          <thead>
            <tr>
              <th>Category</th>
              <th>Max contribution</th>
              <th>What it measures</th>
            </tr>
          </thead>
          <tbody>
            {SCORING_WEIGHTS.map((row) => (
              <tr key={row.category}>
                <td>{row.category}</td>
                <td style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                  {row.weight}
                </td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3 — What it accounts for */}
      <div className="cf-methodology-section">
        <p className="cf-section-heading">What the tool accounts for</p>
        <ul className="cf-methodology-list">
          {ACCOUNTED_FACTORS.map((factor, i) => (
            <li key={i}>{factor}</li>
          ))}
        </ul>
      </div>

      {/* Section 4 — What it does not account for */}
      <div className="cf-methodology-section">
        <p className="cf-section-heading">What the tool does not account for</p>
        <ul className="cf-methodology-list">
          {NOT_ACCOUNTED_FACTORS.map((factor, i) => (
            <li key={i}>{factor}</li>
          ))}
        </ul>
      </div>

      {/* Section 5 — Data sources */}
      <div className="cf-methodology-section">
        <p className="cf-section-heading">Data sources and limitations</p>
        <p>
          Crop profiles in CropFit are generalised for South African production contexts
          and represent typical performance under favourable management. Regional variation,
          cultivar selection, and seasonal weather variability can significantly affect
          real-world outcomes.
        </p>
        <p>
          We recommend consulting a local agricultural extension officer, a registered
          agronomist, or the Department of Agriculture, Land Reform and Rural Development
          (DALRRD) for site-specific advice before committing to a production plan.
        </p>
        <div className="cf-methodology-note">
          <p>
            <strong>Disclaimer:</strong> Element Farm Solutions provides this tool as
            general guidance only. No liability is accepted for production or financial
            outcomes based on CropFit recommendations. Always verify with qualified local
            experts.
          </p>
        </div>
      </div>

      {/* Section 6 — Adding crops */}
      <div className="cf-methodology-section">
        <p className="cf-section-heading">How to add crops to the dataset</p>
        <p>
          Each crop follows a structured profile defined in{' '}
          <span className="cf-methodology-code">src/cropfit/data/crops.js</span>. Fields
          are documented in that file. To add a crop, copy an existing profile object,
          assign a unique <span className="cf-methodology-code">id</span>, and fill in
          all required fields. The scoring engine will automatically include it in all
          future assessments.
        </p>
        <p>
          Crop data is intentionally kept in a plain JavaScript file to make it easy to
          review, edit, and extend without needing a database or backend. Profiles should
          be reviewed periodically against current agronomic literature and local extension
          guidance.
        </p>
      </div>

    </div>
  )
}

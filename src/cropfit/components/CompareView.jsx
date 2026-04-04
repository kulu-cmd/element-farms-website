import React from 'react'

function getBand(score) {
  if (score >= 80) return 'best'
  if (score >= 60) return 'caution'
  return 'not-rec'
}

function StatusBadge({ band }) {
  const map = {
    'best':    { cls: 'cf-status-badge--best',    label: 'Best fit' },
    'caution': { cls: 'cf-status-badge--caution', label: 'Possible' },
    'not-rec': { cls: 'cf-status-badge--not-rec', label: 'Not rec.' },
  }
  const { cls, label } = map[band] || map['not-rec']
  return <span className={`cf-status-badge ${cls}`}>{label}</span>
}

function DotRating({ value, max = 5, color }) {
  return (
    <span className="cf-dot-rating" style={{ color }} aria-label={`${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`cf-dot${i < value ? ' cf-dot--filled' : ''}`}
        />
      ))}
    </span>
  )
}

function scoreToStars(score) {
  if (score >= 90) return 5
  if (score >= 75) return 4
  if (score >= 60) return 3
  if (score >= 45) return 2
  return 1
}

function MatchIcon({ match }) {
  if (match === 'yes')     return <span className="cf-match-icon cf-match-icon--yes"     aria-label="Match">✓</span>
  if (match === 'partial') return <span className="cf-match-icon cf-match-icon--partial" aria-label="Partial match">~</span>
  return                          <span className="cf-match-icon cf-match-icon--no"      aria-label="No match">✗</span>
}

function getClimateMatch(crop, userInputs) {
  if (!userInputs || !crop.climateZones) return 'partial'
  const zone = (userInputs.climateZone || '').toLowerCase()
  const zones = Array.isArray(crop.climateZones)
    ? crop.climateZones.map((z) => z.toLowerCase())
    : [crop.climateZones.toLowerCase()]
  if (zones.some((z) => z.includes(zone) || zone.includes(z))) return 'yes'
  return 'no'
}

function getSeasonMatch(crop, userInputs) {
  if (!userInputs || !crop.plantingSeasons) return 'partial'
  const season = (userInputs.season || '').toLowerCase()
  const seasons = Array.isArray(crop.plantingSeasons)
    ? crop.plantingSeasons.map((s) => s.toLowerCase())
    : [crop.plantingSeasons.toLowerCase()]
  if (seasons.some((s) => s.includes(season) || season.includes(s))) return 'yes'
  return 'no'
}

const COMPARE_ROWS = [
  { key: 'score',          label: 'Suitability score' },
  { key: 'status',         label: 'Status' },
  { key: 'climate',        label: 'Climate zone match' },
  { key: 'season',         label: 'Planting season' },
  { key: 'water',          label: 'Water requirement' },
  { key: 'soil',           label: 'Soil preference' },
  { key: 'management',     label: 'Management level' },
  { key: 'timeToIncome',   label: 'Time to income' },
  { key: 'market',         label: 'Market channels' },
  { key: 'frost',          label: 'Frost tolerance' },
  { key: 'drought',        label: 'Drought tolerance' },
  { key: 'notes',          label: 'Notes' },
  { key: 'risks',          label: 'Risks' },
]

function getCellContent(rowKey, crop, userInputs) {
  const band = getBand(crop.score)
  const bandColorVar =
    band === 'best' ? 'var(--cf-best-fit)' :
    band === 'caution' ? 'var(--cf-caution)' :
    'var(--cf-not-rec)'

  switch (rowKey) {
    case 'score':
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <strong
            className={`cf-compare-header-score cf-compare-header-score--${band === 'not-rec' ? 'not-rec' : band}`}
            style={{ fontSize: '1rem' }}
          >
            {crop.score}
          </strong>
          <DotRating
            value={scoreToStars(crop.score)}
            max={5}
            color={bandColorVar}
          />
        </span>
      )

    case 'status':
      return <StatusBadge band={band} />

    case 'climate': {
      const match = getClimateMatch(crop, userInputs)
      const label = Array.isArray(crop.climateZones)
        ? crop.climateZones.join(', ')
        : (crop.climateZones || '—')
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <MatchIcon match={match} />
          <span>{label}</span>
        </span>
      )
    }

    case 'season': {
      const match = getSeasonMatch(crop, userInputs)
      const label = Array.isArray(crop.plantingSeasons)
        ? crop.plantingSeasons.join(', ')
        : (crop.plantingSeasons || '—')
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <MatchIcon match={match} />
          <span>{label}</span>
        </span>
      )
    }

    case 'water':
      return crop.waterRequirement || '—'

    case 'soil':
      return Array.isArray(crop.soilPreference)
        ? crop.soilPreference.join(', ')
        : (crop.soilPreference || '—')

    case 'management':
      return crop.managementLevel || '—'

    case 'timeToIncome':
      return crop.timeToIncome || '—'

    case 'market':
      return Array.isArray(crop.marketChannels)
        ? crop.marketChannels.join(', ')
        : (crop.marketChannels || '—')

    case 'frost':
      return crop.frostTolerance || '—'

    case 'drought':
      return crop.droughtTolerance || '—'

    case 'notes':
      return (
        <span style={{ fontSize: '0.78rem', lineHeight: 1.55, color: 'var(--cf-text-2)' }}>
          {crop.notes || '—'}
        </span>
      )

    case 'risks':
      if (!crop.risks || crop.risks.length === 0) return '—'
      return (
        <span className="cf-risk-list" style={{ margin: 0 }}>
          {crop.risks.map((r, i) => (
            <span key={i} className="cf-risk-pill">⚠ {r}</span>
          ))}
        </span>
      )

    default:
      return '—'
  }
}

export function CompareView({ state, setView, removeFromCompare }) {
  const { compareList = [], results = [], inputs } = state

  const compareItems = results.filter((c) => compareList.includes(c.id))

  if (compareItems.length < 2) {
    return (
      <div className="cf-compare">
        <div className="cf-empty-state">
          <span className="cf-empty-state__icon" aria-hidden="true">⚖️</span>
          <h2 className="cf-empty-state__title">Nothing to compare yet</h2>
          <p className="cf-empty-state__text">
            Select at least 2 crops from the results page to compare them side by side.
          </p>
          <div className="cf-empty-state__action">
            <button
              className="cf-btn cf-btn--primary"
              onClick={() => setView('results')}
              disabled={!state.hasResults}
            >
              Go to Results
            </button>
          </div>
        </div>
      </div>
    )
  }

  const colCount = compareItems.length

  return (
    <div className="cf-compare">
      <div className="cf-compare__top">
        <button
          className="cf-btn cf-btn--secondary cf-btn--sm"
          onClick={() => setView('results')}
        >
          ← Back to results
        </button>
        <h2 className="cf-compare__title">
          Comparing {colCount} crops
        </h2>
      </div>

      <div className="cf-compare-scroll">
        <div
          className="cf-compare-table"
          data-cols={colCount}
          style={{ '--cols': colCount }}
          role="table"
          aria-label="Crop comparison"
        >
          {/* Header row — crop names */}
          <div className="cf-compare-header-row" role="row">
            {/* Top-left empty cell */}
            <div
              className="cf-compare-cell cf-compare-cell--label"
              style={{ background: 'var(--cf-surface-2)', borderRight: '1px solid var(--cf-border)', borderBottom: '2px solid var(--cf-border)' }}
              role="columnheader"
            />

            {compareItems.map((crop) => {
              const band = getBand(crop.score)
              return (
                <div
                  key={crop.id}
                  className="cf-compare-header-cell"
                  role="columnheader"
                >
                  <span className="cf-compare-header-name">{crop.name}</span>
                  <span
                    className={`cf-compare-header-score cf-compare-header-score--${band === 'not-rec' ? 'not-rec' : band}`}
                  >
                    {crop.score}
                  </span>
                  <div className="cf-compare-header-actions">
                    <StatusBadge band={band} />
                    <button
                      className="cf-compare-remove-btn"
                      onClick={() => removeFromCompare && removeFromCompare(crop.id)}
                      aria-label={`Remove ${crop.name} from comparison`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Data rows */}
          {COMPARE_ROWS.map((row) => (
            <div key={row.key} className="cf-compare-row" role="row">
              <div
                className="cf-compare-cell cf-compare-cell--label"
                role="rowheader"
              >
                {row.label}
              </div>
              {compareItems.map((crop) => (
                <div
                  key={crop.id}
                  className="cf-compare-cell"
                  role="cell"
                >
                  {getCellContent(row.key, crop, inputs)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--cf-text-muted)', marginTop: '0.25rem' }}>
        ✓ = good match for your conditions &nbsp;|&nbsp; ~ = partial match &nbsp;|&nbsp; ✗ = potential mismatch
      </p>
    </div>
  )
}

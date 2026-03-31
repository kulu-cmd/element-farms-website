import React, { useState, useMemo } from 'react'

const SORT_OPTIONS = [
  { value: 'score',      label: 'Suitability' },
  { value: 'ease',       label: 'Ease of growth' },
  { value: 'income',     label: 'Time to income' },
  { value: 'market',     label: 'Market fit' },
  { value: 'water',      label: 'Water demand' },
]

const FILTER_OPTIONS = [
  { value: 'all',        label: 'All' },
  { value: 'best',       label: 'Best fit' },
  { value: 'caution',    label: 'Possible' },
  { value: 'not-rec',    label: 'Not recommended' },
]

function getBand(score) {
  if (score >= 80) return 'best'
  if (score >= 60) return 'caution'
  return 'not-rec'
}

function getBandClass(band) {
  if (band === 'best')    return 'best'
  if (band === 'caution') return 'caution'
  return 'not-rec'
}

function StatusBadge({ band }) {
  const map = {
    'best':    { cls: 'cf-status-badge--best',    label: 'Best fit' },
    'caution': { cls: 'cf-status-badge--caution', label: 'Possible with caution' },
    'not-rec': { cls: 'cf-status-badge--not-rec', label: 'Not recommended' },
  }
  const { cls, label } = map[band] || map['not-rec']
  return <span className={`cf-status-badge ${cls}`}>{label}</span>
}

function ScoreBadge({ score, band }) {
  const bandClass = getBandClass(band)
  return (
    <div className={`cf-crop-card__score cf-crop-card__score--${bandClass}`}>
      <span className={`cf-score-number cf-score-number--${bandClass}`}>
        {score}
      </span>
    </div>
  )
}

function CropCard({ crop, isInCompare, onToggleCompare, compareDisabled, onAdvice }) {
  const band = getBand(crop.score)
  const maxCompareReached = compareDisabled && !isInCompare

  return (
    <article className="cf-crop-card">
      <div className="cf-crop-card__top">
        <ScoreBadge score={crop.score} band={band} />
        <StatusBadge band={band} />
        {crop.category && (
          <span className="cf-type-tag">{crop.category}</span>
        )}
        {crop.durationType && crop.durationType !== crop.category && (
          <span className="cf-type-tag">{crop.durationType}</span>
        )}
      </div>

      <h3 className="cf-crop-card__name">{crop.name}</h3>

      {crop.explanation && (
        <p className="cf-crop-card__explanation">{crop.explanation}</p>
      )}

      <div className="cf-crop-card__details">
        {crop.waterRequirement && (
          <div className="cf-crop-card__detail-item">
            <span className="cf-crop-card__detail-label">Water need</span>
            <span className="cf-crop-card__detail-value">{crop.waterRequirement}</span>
          </div>
        )}
        {crop.soilPreference && (
          <div className="cf-crop-card__detail-item">
            <span className="cf-crop-card__detail-label">Soil</span>
            <span className="cf-crop-card__detail-value">
              {Array.isArray(crop.soilPreference)
                ? crop.soilPreference.join(', ')
                : crop.soilPreference}
            </span>
          </div>
        )}
        {crop.timeToIncome && (
          <div className="cf-crop-card__detail-item">
            <span className="cf-crop-card__detail-label">Income</span>
            <span className="cf-crop-card__detail-value">{crop.timeToIncome}</span>
          </div>
        )}
        {crop.managementLevel && (
          <div className="cf-crop-card__detail-item">
            <span className="cf-crop-card__detail-label">Management</span>
            <span className="cf-crop-card__detail-value">{crop.managementLevel}</span>
          </div>
        )}
        {crop.marketChannels && (
          <div className="cf-crop-card__detail-item">
            <span className="cf-crop-card__detail-label">Market fit</span>
            <span className="cf-crop-card__detail-value">
              {Array.isArray(crop.marketChannels)
                ? crop.marketChannels.join(', ')
                : crop.marketChannels}
            </span>
          </div>
        )}
      </div>

      {crop.notes && (
        <p className="cf-crop-card__notes">{crop.notes}</p>
      )}

      {crop.risks && crop.risks.length > 0 && (
        <div className="cf-risk-list" aria-label="Risk warnings">
          {crop.risks.map((risk, i) => (
            <span key={i} className="cf-risk-pill">
              ⚠ {risk}
            </span>
          ))}
        </div>
      )}

      <div className="cf-crop-card__actions">
        <label
          className="cf-compare-checkbox"
          title={maxCompareReached ? 'Maximum 3 crops' : undefined}
        >
          <input
            type="checkbox"
            className="cf-compare-checkbox__input"
            checked={isInCompare}
            onChange={() => onToggleCompare(crop.id)}
            disabled={maxCompareReached}
            aria-label={`Add ${crop.name} to compare`}
          />
          <span className="cf-compare-checkbox__label">Add to compare</span>
        </label>

        <button
          className="cf-advice-btn"
          onClick={() => onAdvice && onAdvice(crop)}
          aria-label={`Get advice on ${crop.name}`}
        >
          Get advice →
        </button>
      </div>
    </article>
  )
}

export function ResultsView({ state, setView, resetPlanner, toggleCompare }) {
  const [sortBy, setSortBy] = useState('score')
  const [filterBy, setFilterBy] = useState('all')

  const { results = [], compareList = [] } = state

  const sorted = useMemo(() => {
    const arr = [...results]
    switch (sortBy) {
      case 'ease':
        return arr.sort((a, b) => {
          const order = { Low: 0, Moderate: 1, High: 2 }
          return (order[a.managementLevel] ?? 1) - (order[b.managementLevel] ?? 1)
        })
      case 'income': {
        const parseMonths = (str) => {
          if (!str) return 999
          const m = str.match(/(\d+)/)
          return m ? parseInt(m[1], 10) : 999
        }
        return arr.sort((a, b) => parseMonths(a.timeToIncome) - parseMonths(b.timeToIncome))
      }
      case 'market':
        return arr.sort((a, b) => (b.marketScore ?? 0) - (a.marketScore ?? 0))
      case 'water': {
        const order = { Low: 0, Moderate: 1, High: 2, 'Very high': 3 }
        return arr.sort((a, b) =>
          (order[a.waterRequirement] ?? 1) - (order[b.waterRequirement] ?? 1)
        )
      }
      case 'score':
      default:
        return arr.sort((a, b) => b.score - a.score)
    }
  }, [results, sortBy])

  const filtered = useMemo(() => {
    if (filterBy === 'all') return sorted
    return sorted.filter((crop) => getBand(crop.score) === filterBy)
  }, [sorted, filterBy])

  const bestCount    = results.filter((c) => getBand(c.score) === 'best').length
  const cautionCount = results.filter((c) => getBand(c.score) === 'caution').length

  const maxCompareReached = compareList.length >= 3

  function handleAdvice(crop) {
    // Navigate to contact page with crop context (future integration point)
    window.location.href = '/contact/agri-farms'
  }

  if (!results || results.length === 0) {
    return (
      <div className="cf-empty-state">
        <span className="cf-empty-state__icon" aria-hidden="true">📋</span>
        <h2 className="cf-empty-state__title">No results yet</h2>
        <p className="cf-empty-state__text">
          Run the planner to see crop recommendations tailored to your farm conditions.
        </p>
        <div className="cf-empty-state__action">
          <button className="cf-btn cf-btn--primary" onClick={() => setView('planner')}>
            Go to Planner
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="cf-results">
      {/* Results header */}
      <div className="cf-results-header">
        <p className="cf-results-summary">
          <strong>{results.length} crops assessed</strong> —{' '}
          <strong style={{ color: 'var(--cf-best-fit)' }}>{bestCount} best fit</strong>
          {cautionCount > 0 && (
            <>, <strong style={{ color: 'var(--cf-caution)' }}>{cautionCount} possible</strong></>
          )}
        </p>

        <div className="cf-results-actions">
          <button
            className="cf-btn cf-btn--secondary cf-btn--sm"
            onClick={() => setView('planner')}
          >
            ← Edit search
          </button>
          <button
            className="cf-btn cf-btn--secondary cf-btn--sm"
            onClick={resetPlanner}
          >
            Reset
          </button>
        </div>

        <div className="cf-results-controls">
          <div className="cf-sort-row">
            <span className="cf-sort-label">Sort:</span>
            <select
              className="cf-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort results by"
              style={{ width: 'auto', minWidth: '160px' }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="cf-filter-pills" role="group" aria-label="Filter by suitability">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`cf-filter-pill${filterBy === opt.value ? ' cf-filter-pill--active' : ''}`}
                onClick={() => setFilterBy(opt.value)}
                aria-pressed={filterBy === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results grid */}
      {filtered.length === 0 ? (
        <div className="cf-empty-state" style={{ padding: '2rem 1rem' }}>
          <p className="cf-empty-state__text">
            No crops match this filter. Try selecting a different category.
          </p>
        </div>
      ) : (
        <div className="cf-results-grid">
          {filtered.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
              isInCompare={compareList.includes(crop.id)}
              onToggleCompare={toggleCompare}
              compareDisabled={maxCompareReached}
              onAdvice={handleAdvice}
            />
          ))}
        </div>
      )}

      {/* Compare sticky bar */}
      {compareList.length >= 2 && (
        <div className="cf-compare-sticky-bar" role="region" aria-label="Compare selection">
          <span className="cf-compare-sticky-bar__text">
            {compareList.length} crops selected
          </span>
          <button
            className="cf-compare-sticky-bar__btn"
            onClick={() => setView('compare')}
          >
            Compare now →
          </button>
        </div>
      )}
    </div>
  )
}

import React, { useState, useMemo, useCallback } from 'react'

const CONSULTANT_WHATSAPP = '27613889339'
const FARM_VISIT_FORM = 'https://docs.google.com/forms/d/18f14G-hCciPDNnAgy9ITvT8iedrzmZ5K3zb37G_ca5Q/viewform'

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

function ResultsCTA({ planUrl, topCrops }) {
  function buildWhatsAppShareUrl() {
    const top3 = topCrops.slice(0, 3).join(', ')
    const planLink = planUrl
      ? `${typeof window !== 'undefined' ? window.location.origin : ''}${planUrl}`
      : ''
    const text = `My CropFit crop plan is ready! Top picks: ${top3}. View full analysis: ${planLink}`
    return `https://wa.me/?text=${encodeURIComponent(text)}`
  }

  function buildConsultantWhatsAppUrl() {
    const planLink = planUrl
      ? `${typeof window !== 'undefined' ? window.location.origin : ''}${planUrl}`
      : ''
    const text = `Hi Element Farm Solutions, I'd like to discuss my CropFit analysis: ${planLink}`
    return `https://wa.me/${CONSULTANT_WHATSAPP}?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="cf-results-cta">
      <h3 className="cf-results-cta__heading">What's next?</h3>
      <div className="cf-results-cta__grid">
        <a
          className="cf-cta-card cf-cta-card--share"
          href={buildWhatsAppShareUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="cf-cta-card__icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L.057 23.5l5.823-1.527A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.37l-.36-.213-3.454.906.922-3.366-.234-.375A9.818 9.818 0 0 1 2.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
            </svg>
          </span>
          <div>
            <strong className="cf-cta-card__title">Share on WhatsApp</strong>
            <span className="cf-cta-card__sub">Send your crop plan to a friend or family</span>
          </div>
        </a>

        <a
          className="cf-cta-card cf-cta-card--consultant"
          href={buildConsultantWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="cf-cta-card__icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.843L.057 23.5l5.823-1.527A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.37l-.36-.213-3.454.906.922-3.366-.234-.375A9.818 9.818 0 0 1 2.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
            </svg>
          </span>
          <div>
            <strong className="cf-cta-card__title">Chat with a Consultant</strong>
            <span className="cf-cta-card__sub">Discuss your plan with an Element Farms expert</span>
          </div>
        </a>

        <a
          className="cf-cta-card cf-cta-card--visit"
          href={FARM_VISIT_FORM}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="cf-cta-card__icon">🌾</span>
          <div>
            <strong className="cf-cta-card__title">Book a Farm Visit</strong>
            <span className="cf-cta-card__sub">We'll come to you — turn this plan into action</span>
          </div>
        </a>
      </div>
    </div>
  )
}

const WATER_LABELS = {
  'rainfed': { label: 'Rainfed', icon: '🌧️' },
  'limited-irrigation': { label: 'Limited irrigation', icon: '💧' },
  'reliable-irrigation': { label: 'Full irrigation', icon: '🚿' },
}
const MANAGEMENT_LABELS = {
  'low': { label: 'Low input', icon: '🌿' },
  'moderate': { label: 'Moderate management', icon: '⚙️' },
  'high': { label: 'High intensity', icon: '🏭' },
}
const SEASON_LABELS = {
  'summer': { label: 'Summer planting', icon: '☀️' },
  'autumn': { label: 'Autumn planting', icon: '🍂' },
  'winter': { label: 'Winter planting', icon: '❄️' },
  'spring': { label: 'Spring planting', icon: '🌸' },
}
const DURATION_LABELS = {
  'annual': { label: 'Annual crops', icon: '📅' },
  'short-perennial': { label: 'Short perennial', icon: '🌱' },
  'long-perennial': { label: 'Long perennial', icon: '🌳' },
}

function FarmInsights({ inputs, seasonAdvice }) {
  const chips = []

  if (inputs.regionLabel || inputs.region) {
    chips.push({ icon: '📍', label: inputs.regionLabel || inputs.region })
  }
  if (inputs.season && SEASON_LABELS[inputs.season]) {
    const s = SEASON_LABELS[inputs.season]
    chips.push({ icon: s.icon, label: s.label })
  }
  if (inputs.water_access && WATER_LABELS[inputs.water_access]) {
    const w = WATER_LABELS[inputs.water_access]
    chips.push({ icon: w.icon, label: w.label })
  }
  if (inputs.soil_type && inputs.soil_type !== 'unknown') {
    chips.push({ icon: '🪱', label: inputs.soil_type.replace('-', ' ') + ' soil' })
  }
  if (inputs.management && MANAGEMENT_LABELS[inputs.management]) {
    const m = MANAGEMENT_LABELS[inputs.management]
    chips.push({ icon: m.icon, label: m.label })
  }
  if (inputs.duration_type && DURATION_LABELS[inputs.duration_type]) {
    const d = DURATION_LABELS[inputs.duration_type]
    chips.push({ icon: d.icon, label: d.label })
  }

  return (
    <div className="cf-farm-insights">
      <div className="cf-farm-insights__chips">
        {chips.map((c, i) => (
          <span key={i} className="cf-insight-chip">
            <span className="cf-insight-chip__icon">{c.icon}</span>
            {c.label}
          </span>
        ))}
      </div>
      {seasonAdvice && (
        <p className="cf-farm-insights__advice">🌿 {seasonAdvice}</p>
      )}
    </div>
  )
}

function TopThreeHero({ crops }) {
  const top3 = [...crops].sort((a, b) => b.score - a.score).slice(0, 3)
  if (top3.length === 0) return null

  const medals = ['#C9A84C', '#A0A0A0', '#9B6E4A']
  const medalLabel = ['1st', '2nd', '3rd']

  return (
    <div className="cf-top3">
      <h2 className="cf-top3__heading">Your Top Picks</h2>
      <div className="cf-top3__grid">
        {top3.map((crop, i) => (
          <div key={crop.id} className={`cf-top3__card cf-top3__card--${i + 1}`}>
            <div className="cf-top3__rank" style={{ color: medals[i] }}>{medalLabel[i]}</div>
            <div className="cf-top3__score">{crop.score}<span>/100</span></div>
            <h3 className="cf-top3__name">{crop.name}</h3>
            {crop.reasons?.[0] && (
              <p className="cf-top3__reason">{crop.reasons[0]}</p>
            )}
            <div className="cf-top3__meta">
              {crop.timeToIncome && (
                <span className="cf-top3__tag">⏱ {crop.timeToIncome}</span>
              )}
              {crop.category && (
                <span className="cf-top3__tag">{crop.category}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ResultsView({ state, setView, resetPlanner, toggleCompare }) {
  const [sortBy, setSortBy] = useState('score')
  const [filterBy, setFilterBy] = useState('all')

  const {
    results = [],
    compareList = [],
    aiSummary,
    planUrl,
    seasonAdvice,
    inputs = {},
  } = state

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

      {/* Top 3 + CTA side by side */}
      <div className="cf-hero-row">
        <TopThreeHero crops={results} />
        <ResultsCTA
          planUrl={planUrl}
          topCrops={results.slice(0, 5).map(c => c.name)}
        />
      </div>

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

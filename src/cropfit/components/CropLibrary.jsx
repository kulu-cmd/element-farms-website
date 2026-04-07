import React, { useState, useMemo } from 'react'
import { crops } from '../data/crops.js'

const DURATION_FILTERS = [
  { value: 'all',       label: 'All' },
  { value: 'annual',    label: 'Annual' },
  { value: 'perennial', label: 'Perennial' },
  { value: 'tree',      label: 'Tree crop' },
]

function matchesDuration(crop, filter) {
  if (filter === 'all') return true
  const dt = (crop.durationType || '').toLowerCase()
  if (filter === 'tree') {
    return dt.includes('tree') || dt.includes('perennial tree') || dt.includes('fruit tree')
  }
  return dt.includes(filter)
}

export function CropLibrary() {
  const [search, setSearch] = useState('')
  const [durationFilter, setDurationFilter] = useState('all')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return crops.filter((crop) => {
      const matchesSearch =
        !q ||
        crop.name.toLowerCase().includes(q) ||
        (crop.category || '').toLowerCase().includes(q) ||
        (crop.description || '').toLowerCase().includes(q)

      const matchesDur = matchesDuration(crop, durationFilter)

      return matchesSearch && matchesDur
    })
  }, [search, durationFilter])

  return (
    <div className="cf-library">
      <div className="cf-library__controls">
        <div className="cf-library__search-wrap">
          <span className="cf-library__search-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            className="cf-library__search"
            placeholder="Search crops by name or category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search crop library"
          />
        </div>

        <div className="cf-library__filter-tabs" role="group" aria-label="Filter by duration type">
          {DURATION_FILTERS.map((f) => (
            <button
              key={f.value}
              className={`cf-filter-pill${durationFilter === f.value ? ' cf-filter-pill--active' : ''}`}
              onClick={() => setDurationFilter(f.value)}
              aria-pressed={durationFilter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>

        <span className="cf-library__count">
          {filtered.length} of {crops.length} crops
        </span>
      </div>

      <div className="cf-library-grid">
        {filtered.length === 0 ? (
          <div className="cf-library-empty">
            No crops match your search. Try a different term.
          </div>
        ) : (
          filtered.map((crop) => (
            <LibraryCard key={crop.id} crop={crop} />
          ))
        )}
      </div>
    </div>
  )
}

function LibraryCard({ crop }) {
  const climateLabel = Array.isArray(crop.climateZones)
    ? crop.climateZones.join(', ')
    : (crop.climateZones || '—')

  const marketLabel = Array.isArray(crop.marketChannels)
    ? crop.marketChannels.join(', ')
    : (crop.marketChannels || '—')

  const soilLabel = Array.isArray(crop.soilPreference)
    ? crop.soilPreference.join(', ')
    : (crop.soilPreference || '—')

  return (
    <article className="cf-library-card">
      <h3 className="cf-library-card__name">{crop.name}</h3>

      <div className="cf-library-card__tags">
        {crop.category && (
          <span className="cf-library-card__tag cf-library-card__tag--category">
            {crop.category}
          </span>
        )}
        {crop.durationType && (
          <span className="cf-library-card__tag cf-library-card__tag--duration">
            {crop.durationType}
          </span>
        )}
      </div>

      <div className="cf-library-card__meta">
        <div className="cf-library-card__meta-row">
          <span className="cf-library-card__meta-label">Water</span>
          <span className="cf-library-card__meta-value">{crop.waterRequirement || '—'}</span>
        </div>
        <div className="cf-library-card__meta-row">
          <span className="cf-library-card__meta-label">Management</span>
          <span className="cf-library-card__meta-value">{crop.managementLevel || '—'}</span>
        </div>
        <div className="cf-library-card__meta-row">
          <span className="cf-library-card__meta-label">Climate zones</span>
          <span className="cf-library-card__meta-value">{climateLabel}</span>
        </div>
        {crop.timeToIncome && (
          <div className="cf-library-card__meta-row">
            <span className="cf-library-card__meta-label">Time to income</span>
            <span className="cf-library-card__meta-value">{crop.timeToIncome}</span>
          </div>
        )}
        <div className="cf-library-card__meta-row">
          <span className="cf-library-card__meta-label">Soil</span>
          <span className="cf-library-card__meta-value">{soilLabel}</span>
        </div>
        <div className="cf-library-card__meta-row">
          <span className="cf-library-card__meta-label">Markets</span>
          <span className="cf-library-card__meta-value">{marketLabel}</span>
        </div>
      </div>

      {crop.description && (
        <p className="cf-library-card__desc">{crop.description}</p>
      )}
    </article>
  )
}

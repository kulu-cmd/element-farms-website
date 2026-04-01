/**
 * CropFit Planner — Multi-step Planner Form
 *
 * Props:
 *   state          — full state object from useCropFitState
 *   updateInputs   — merge patch into inputs
 *   setFormStep    — navigate between steps
 *   detectLocation — trigger browser geolocation
 *   runScoring     — execute scoring and navigate to results
 *
 * CSS classes follow the cf- prefix convention.
 * All class names are documented in the file header comment for Dev 2.
 *
 * ─── CLASS NAME REFERENCE ───────────────────────────────────────────────
 * Layout / container
 *   cf-form                      outer form wrapper
 *   cf-step                      content wrapper for a single step
 *   cf-step__title               h2 heading for each step
 *   cf-step__subtitle            optional sub-heading within a step
 *   cf-field-group               groups a label + input/control
 *   cf-field-group__label        <label> element
 *   cf-field-group__hint         helper text below an input
 *   cf-section                   groups a named group of controls (e.g. "Location")
 *   cf-section__heading          small uppercase heading above a cf-section
 *   cf-divider                   horizontal rule between sections
 *
 * Option buttons (large tap-friendly selectors)
 *   cf-option-grid               wraps a set of cf-option-btn items
 *   cf-option-grid--2col         2-column variant
 *   cf-option-grid--3col         3-column variant
 *   cf-option-grid--4col         4-column variant
 *   cf-option-btn                individual option button
 *   cf-option-btn--selected      modifier when button is active/selected
 *   cf-option-btn__icon          optional icon/emoji span inside option button
 *   cf-option-btn__label         primary label text
 *   cf-option-btn__sub           secondary helper text inside option button
 *
 * Location controls
 *   cf-location-section          wrapper for entire location block
 *   cf-location-auto             "detect location" row
 *   cf-location-divider          "OR" divider between auto and manual
 *   cf-location-manual           manual lat/lng row
 *   cf-location-coords           flex row holding lat + lng inputs
 *   cf-coord-input               individual lat or lng text input
 *   cf-location-pill             confirmation pill showing detected/entered location
 *   cf-location-pill--detected   modifier when location came from geolocation API
 *   cf-location-error            error message for location failures
 *   cf-location-loading          loading indicator during geolocation request
 *
 * Inputs
 *   cf-input                     standard text input
 *   cf-select                    standard <select> dropdown
 *   cf-region-description        description text shown below region selector
 *
 * Navigation
 *   cf-form-nav                  bottom navigation bar
 *   cf-form-nav__back            back/previous button
 *   cf-form-nav__next            next button
 *   cf-form-nav__submit          primary CTA submit button (Step 4)
 *
 * Progress indicator
 *   cf-progress                  progress bar/dots wrapper
 *   cf-progress__step            individual step dot
 *   cf-progress__step--active    modifier for current step dot
 *   cf-progress__step--done      modifier for completed step dot
 *   cf-progress__label           "Step X of 4" text
 *
 * Validation
 *   cf-validation-msg            inline validation error message
 *   cf-field-group--error        modifier on cf-field-group when field has error
 *
 * Advanced options
 *   cf-advanced-toggle           "Show advanced options" expand button
 *   cf-advanced-panel            collapsible advanced options container
 *   cf-advanced-panel--open      modifier when panel is visible
 * ────────────────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import { REGION_ARCHETYPES } from '../engine/regions.js'
import { getRegionFromText } from '../engine/regions.js'

// ─── CONSTANTS ────────────────────────────────────────────────────────────

const SEASONS = [
  { value: 'summer', label: 'Summer',  sub: 'Oct–Feb' },
  { value: 'autumn', label: 'Autumn',  sub: 'Mar–May' },
  { value: 'winter', label: 'Winter',  sub: 'Jun–Aug' },
  { value: 'spring', label: 'Spring',  sub: 'Sep–Nov' },
]

const DURATION_TYPES = [
  {
    value: 'annual',
    label: 'Annual / Seasonal',
    sub:   'Planted and harvested within one season',
  },
  {
    value: 'short-perennial',
    label: 'Short-term Perennial',
    sub:   '1–3 years to first income (banana, passionfruit, guava)',
  },
  {
    value: 'long-perennial',
    label: 'Long-term Perennial / Orchard',
    sub:   '3+ years investment (avocado, macadamia, citrus)',
  },
]

const WATER_ACCESS = [
  {
    value: 'rainfed',
    label: 'Rainfed only',
    sub:   'No irrigation — depends entirely on rainfall',
  },
  {
    value: 'limited-irrigation',
    label: 'Limited irrigation',
    sub:   'Some supplemental water available (borehole, small dam)',
  },
  {
    value: 'reliable-irrigation',
    label: 'Reliable irrigation',
    sub:   'Full irrigation infrastructure (drip, sprinkler)',
  },
]

const SOIL_TYPES = [
  { value: 'sandy',        label: 'Sandy',          sub: 'Drains very fast, low fertility' },
  { value: 'sandy-loam',   label: 'Sandy loam',     sub: 'Good drainage, moderate fertility' },
  { value: 'loam',         label: 'Loam',            sub: 'Best all-round — balanced texture' },
  { value: 'clay-loam',    label: 'Clay loam',       sub: 'Retains moisture, can compact' },
  { value: 'clay',         label: 'Clay',            sub: 'Waterlogging risk, heavy to work' },
  { value: 'shallow-rocky',label: 'Shallow & rocky', sub: 'Thin topsoil, drainage issues' },
  { value: 'unknown',      label: 'I don\'t know',   sub: 'Skip soil matching — results will be approximate' },
]

const MANAGEMENT_LEVELS = [
  {
    value: 'low',
    label: 'Low input',
    sub:   'Minimal labour, few inputs, basic equipment',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    sub:   'Regular monitoring, standard inputs, some skilled labour',
  },
  {
    value: 'high',
    label: 'High intensity',
    sub:   'Skilled management, precision inputs, significant labour',
  },
]

const FARM_SCALES = [
  { value: 'under-2', label: 'Under 2 ha',  sub: 'Small plot / home farm' },
  { value: '2-10',    label: '2–10 ha',     sub: 'Small commercial farm' },
  { value: '10-50',   label: '10–50 ha',    sub: 'Medium farm' },
  { value: '50+',     label: '50+ ha',      sub: 'Large commercial operation' },
]

const MARKETS = [
  { value: 'fresh-local',  label: 'Fresh local',     sub: 'Nearby consumers, restaurants' },
  { value: 'farmgate',     label: 'Farmgate & informal', sub: 'Sell on-site or at local markets' },
  { value: 'processor',    label: 'Processor',        sub: 'Factory / mill contracts' },
  { value: 'supermarket',  label: 'Supermarket',      sub: 'Retail chain supply' },
  { value: 'export',       label: 'Export',           sub: 'International buyers' },
]

const FROST_RISKS = [
  { value: 'low',    label: 'Low',    sub: 'Rare light frosts only' },
  { value: 'medium', label: 'Medium', sub: 'Occasional frosts in winter' },
  { value: 'high',   label: 'High',   sub: 'Regular hard frosts expected' },
]

const TIME_INCOME_PREFS = [
  { value: 'fast',   label: 'Fast',        sub: 'Under 3 months' },
  { value: 'medium', label: 'Medium',      sub: '3–8 months' },
  { value: 'long',   label: 'Long-term OK', sub: '1 year or more' },
]

const DRAINAGE_OPTIONS = [
  { value: 'poor',     label: 'Poor',     sub: 'Water pools, slow to drain' },
  { value: 'moderate', label: 'Moderate', sub: 'Drains within a day of rain' },
  { value: 'good',     label: 'Good',     sub: 'Free-draining, no pooling' },
]

const TOTAL_STEPS = 4


// ─── HELPER: OPTION BUTTON ────────────────────────────────────────────────
/**
 * Reusable option button component.
 * Single-select: pass value and selectedValue string.
 * Multi-select: pass value and selectedValues array.
 */
function OptionBtn({ value, label, sub, selectedValue, selectedValues, onSelect }) {
  const isSelected = selectedValues
    ? selectedValues.includes(value)
    : selectedValue === value

  return (
    <button
      type="button"
      className={`cf-option-btn${isSelected ? ' cf-option-btn--selected' : ''}`}
      onClick={() => onSelect(value)}
      aria-pressed={isSelected}
    >
      <span className="cf-option-btn__label">{label}</span>
      {sub && <span className="cf-option-btn__sub">{sub}</span>}
    </button>
  )
}


// ─── HELPER: STEP PROGRESS INDICATOR ─────────────────────────────────────
function StepProgress({ currentStep, totalSteps }) {
  return (
    <div className="cf-progress" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemax={totalSteps}>
      <span className="cf-progress__label">Step {currentStep + 1} of {totalSteps}</span>
      <div className="cf-progress__dots">
        {Array.from({ length: totalSteps }, (_, i) => (
          <span
            key={i}
            className={
              `cf-progress__step` +
              (i === currentStep ? ' cf-progress__step--active' : '') +
              (i < currentStep  ? ' cf-progress__step--done'   : '')
            }
            aria-label={`Step ${i + 1}${i < currentStep ? ' (complete)' : i === currentStep ? ' (current)' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}


// ─── HELPER: VALIDATION MESSAGE ───────────────────────────────────────────
function ValidationMsg({ message }) {
  if (!message) return null
  return <p className="cf-validation-msg" role="alert">{message}</p>
}


// ─── STEP 1: LOCATION & TIMING ────────────────────────────────────────────
function Step1Location({ state, updateInputs, detectLocation }) {
  const { inputs, locationLoading, locationError, locationMethod } = state
  // When region name text field changes, try text-based lookup
  function handleRegionTextChange(value) {
    updateInputs({ regionLabel: value })
    const regionKey = getRegionFromText(value)
    if (regionKey) {
      updateInputs({ region: regionKey })
    }
  }

  const hasLocationConfirmed = inputs.region !== ''
  const archetypeData = inputs.region ? REGION_ARCHETYPES[inputs.region] : null

  return (
    <div className="cf-step">
      <h2 className="cf-step__title">Location &amp; Timing</h2>
      <p className="cf-step__subtitle">
        Your location helps us match crops to your climate. We use your region to estimate
        rainfall, temperatures, and frost risk.
      </p>

      {/* ── LOCATION BLOCK ── */}
      <div className="cf-section cf-location-section">
        <p className="cf-section__heading">Your location</p>

        {/* Detect + manual entry row */}
        <div className="cf-location-row">
          <button
            type="button"
            className="cf-btn cf-btn--secondary cf-location-row__btn"
            onClick={detectLocation}
            disabled={locationLoading}
          >
            {locationLoading ? (
              <span className="cf-location-loading">Detecting…</span>
            ) : (
              'Detect my location'
            )}
          </button>
          <div className="cf-location-row__manual">
            <input
              id="region-name"
              type="text"
              className="cf-input"
              placeholder="or type province / region (e.g. Limpopo)"
              value={inputs.regionLabel || ''}
              onChange={e => handleRegionTextChange(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        {locationMethod === 'auto' && !locationLoading && inputs.lat && (
          <span className="cf-location-pill cf-location-pill--detected">
            GPS: {Number(inputs.lat).toFixed(3)}°S, {Number(inputs.lng).toFixed(3)}°E
          </span>
        )}

        {locationError && (
          <p className="cf-location-error">{locationError}</p>
        )}

        {/* Region archetype selector */}
        <div className="cf-field-group">
          <label className="cf-field-group__label" htmlFor="region-select">
            Climate zone
          </label>
          <select
            id="region-select"
            className="cf-select"
            value={inputs.region || ''}
            onChange={e => updateInputs({ region: e.target.value })}
          >
            <option value="">— Select climate zone —</option>
            {Object.entries(REGION_ARCHETYPES).map(([key, arch]) => (
              <option key={key} value={key}>{arch.label}</option>
            ))}
          </select>
          {archetypeData && (
            <p className="cf-region-description">{archetypeData.description}</p>
          )}
          {errors.region && <ValidationMsg message={errors.region} />}
        </div>

        {/* Confirmed location pill */}
        {hasLocationConfirmed && archetypeData && (
          <div className="cf-location-pill">
            Climate zone set: <strong>{archetypeData.label}</strong>
          </div>
        )}
      </div>

      <div className="cf-divider" />

      {/* ── PLANTING SEASON ── */}
      <div className="cf-section">
        <p className="cf-section__heading">Planting window</p>
        <div className="cf-field-group">
          <label className="cf-field-group__label">
            When do you plan to plant?
          </label>
          <div className="cf-option-grid cf-option-grid--4col">
            {SEASONS.map(s => (
              <OptionBtn
                key={s.value}
                value={s.value}
                label={s.label}
                sub={s.sub}
                selectedValue={inputs.season}
                onSelect={v => updateInputs({ season: v })}
              />
            ))}
          </div>
          {errors.season && <ValidationMsg message={errors.season} />}
        </div>
      </div>
    </div>
  )
}


// ─── STEP 2: CROP TYPE & WATER ────────────────────────────────────────────
function Step2CropWater({ state, updateInputs }) {
  const { inputs } = state

  return (
    <div className="cf-step">
      <h2 className="cf-step__title">Crop Type &amp; Water</h2>

      {/* ── DURATION TYPE ── */}
      <div className="cf-section">
        <p className="cf-section__heading">Production horizon</p>
        <div className="cf-field-group">
          <label className="cf-field-group__label">
            What type of crop are you looking for?
          </label>
          <div className="cf-option-grid cf-option-grid--3col">
            {DURATION_TYPES.map(d => (
              <OptionBtn
                key={d.value}
                value={d.value}
                label={d.label}
                sub={d.sub}
                selectedValue={inputs.duration_type}
                onSelect={v => updateInputs({ duration_type: v })}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="cf-divider" />

      {/* ── WATER ACCESS ── */}
      <div className="cf-section">
        <p className="cf-section__heading">Water availability</p>
        <div className="cf-field-group">
          <label className="cf-field-group__label">
            What water access do you have on this land?
          </label>
          <div className="cf-option-grid cf-option-grid--3col">
            {WATER_ACCESS.map(w => (
              <OptionBtn
                key={w.value}
                value={w.value}
                label={w.label}
                sub={w.sub}
                selectedValue={inputs.water_access}
                onSelect={v => updateInputs({ water_access: v })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


// ─── STEP 3: SOIL & MANAGEMENT ────────────────────────────────────────────
function Step3SoilManagement({ state, updateInputs }) {
  const { inputs } = state

  return (
    <div className="cf-step">
      <h2 className="cf-step__title">Soil &amp; Management</h2>

      {/* ── SOIL TYPE ── */}
      <div className="cf-section">
        <p className="cf-section__heading">Soil type</p>
        <div className="cf-field-group">
          <label className="cf-field-group__label">
            What type of soil do you have? (Select the closest match)
          </label>
          <div className="cf-option-grid cf-option-grid--2col">
            {SOIL_TYPES.map(s => (
              <OptionBtn
                key={s.value}
                value={s.value}
                label={s.label}
                sub={s.sub}
                selectedValue={inputs.soil_type}
                onSelect={v => updateInputs({ soil_type: v })}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="cf-divider" />

      {/* ── MANAGEMENT PREFERENCE ── */}
      <div className="cf-section">
        <p className="cf-section__heading">Management capacity</p>
        <div className="cf-field-group">
          <label className="cf-field-group__label">
            How much management effort can you apply?
          </label>
          <div className="cf-option-grid cf-option-grid--3col">
            {MANAGEMENT_LEVELS.map(m => (
              <OptionBtn
                key={m.value}
                value={m.value}
                label={m.label}
                sub={m.sub}
                selectedValue={inputs.management}
                onSelect={v => updateInputs({ management: v })}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="cf-divider" />

      {/* ── FARM SCALE ── */}
      <div className="cf-section">
        <p className="cf-section__heading">Farm scale</p>
        <div className="cf-field-group">
          <label className="cf-field-group__label">
            How much land are you planning to use for this crop?
          </label>
          <div className="cf-option-grid cf-option-grid--4col">
            {FARM_SCALES.map(sc => (
              <OptionBtn
                key={sc.value}
                value={sc.value}
                label={sc.label}
                sub={sc.sub}
                selectedValue={inputs.farm_scale}
                onSelect={v => updateInputs({ farm_scale: v })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


// ─── STEP 4: MARKET & ADVANCED ────────────────────────────────────────────
function Step4MarketAdvanced({ state, updateInputs }) {
  const { inputs } = state
  const [advancedOpen, setAdvancedOpen] = useState(false)

  // Multi-select toggle for market channels
  function toggleMarket(value) {
    const currentMarkets = inputs.market || []
    if (currentMarkets.includes(value)) {
      updateInputs({ market: currentMarkets.filter(m => m !== value) })
    } else {
      updateInputs({ market: [...currentMarkets, value] })
    }
  }

  return (
    <div className="cf-step">
      <h2 className="cf-step__title">Market &amp; Advanced</h2>

      {/* ── MARKET TARGET ── */}
      <div className="cf-section">
        <p className="cf-section__heading">Target market</p>
        <div className="cf-field-group">
          <label className="cf-field-group__label">
            Where do you plan to sell? (Select all that apply)
          </label>
          <div className="cf-option-grid cf-option-grid--3col">
            {MARKETS.map(m => (
              <OptionBtn
                key={m.value}
                value={m.value}
                label={m.label}
                sub={m.sub}
                selectedValues={inputs.market || []}
                onSelect={toggleMarket}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="cf-divider" />

      {/* ── ADVANCED OPTIONS (collapsed by default) ── */}
      <div className="cf-section">
        <button
          type="button"
          className="cf-advanced-toggle"
          onClick={() => setAdvancedOpen(prev => !prev)}
          aria-expanded={advancedOpen}
          aria-controls="cf-advanced-panel"
        >
          {advancedOpen ? 'Hide advanced options ▲' : 'Show advanced options ▼'}
        </button>

        <div
          id="cf-advanced-panel"
          className={`cf-advanced-panel${advancedOpen ? ' cf-advanced-panel--open' : ''}`}
          hidden={!advancedOpen}
        >
          {/* Frost risk */}
          <div className="cf-field-group">
            <label className="cf-field-group__label">
              Frost risk at your site
            </label>
            <span className="cf-field-group__hint">
              If your region archetype was auto-selected, frost risk is estimated
              automatically. Override here if you know your specific site.
            </span>
            <div className="cf-option-grid cf-option-grid--3col">
              {FROST_RISKS.map(f => (
                <OptionBtn
                  key={f.value}
                  value={f.value}
                  label={f.label}
                  sub={f.sub}
                  selectedValue={inputs.frost_risk || ''}
                  onSelect={v => updateInputs({
                    frost_risk: inputs.frost_risk === v ? null : v,
                  })}
                />
              ))}
            </div>
          </div>

          <div className="cf-divider" />

          {/* Time to income preference */}
          <div className="cf-field-group">
            <label className="cf-field-group__label">
              Time to first income preference
            </label>
            <div className="cf-option-grid cf-option-grid--3col">
              {TIME_INCOME_PREFS.map(t => (
                <OptionBtn
                  key={t.value}
                  value={t.value}
                  label={t.label}
                  sub={t.sub}
                  selectedValue={inputs.time_income_pref || ''}
                  onSelect={v => updateInputs({
                    time_income_pref: inputs.time_income_pref === v ? null : v,
                  })}
                />
              ))}
            </div>
          </div>

          <div className="cf-divider" />

          {/* Drainage */}
          <div className="cf-field-group">
            <label className="cf-field-group__label">
              Soil drainage at your site
            </label>
            <div className="cf-option-grid cf-option-grid--3col">
              {DRAINAGE_OPTIONS.map(d => (
                <OptionBtn
                  key={d.value}
                  value={d.value}
                  label={d.label}
                  sub={d.sub}
                  selectedValue={inputs.drainage || ''}
                  onSelect={v => updateInputs({
                    drainage: inputs.drainage === v ? null : v,
                  })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// ─── VALIDATION ───────────────────────────────────────────────────────────
/**
 * Returns an object of field-level error messages for the given step.
 * Returns empty object {} if all required fields are satisfied.
 */
function validateStep(step, inputs) {
  const errors = {}

  if (step === 0) {
    if (!inputs.region) {
      errors.region = 'Please select a climate zone before continuing.'
    }
    if (!inputs.season) {
      errors.season = 'Please select a planting season before continuing.'
    }
  }

  if (step === 1) {
    if (!inputs.duration_type) {
      errors.duration_type = 'Please select a crop type before continuing.'
    }
    if (!inputs.water_access) {
      errors.water_access = 'Please select your water access level before continuing.'
    }
  }

  return errors
}


// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export function PlannerForm({ state, updateInputs, setFormStep, detectLocation, runAnalysis, isLoading, analysisError }) {
  const { formStep, inputs } = state
  const [stepErrors, setStepErrors] = useState({})

  // ── Next step with validation ───────────────────────────────────────
  function handleNext() {
    const errors = validateStep(formStep, inputs)
    if (Object.keys(errors).length > 0) {
      setStepErrors(errors)
      // Scroll to top of form so error is visible
      document.querySelector('.cf-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    setStepErrors({})
    setFormStep(Math.min(formStep + 1, TOTAL_STEPS - 1))
  }

  // ── Back ────────────────────────────────────────────────────────────
  function handleBack() {
    setStepErrors({})
    setFormStep(Math.max(formStep - 1, 0))
  }

  // ── Final submit ────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault()
    runAnalysis()
  }

  // ── Render step content ─────────────────────────────────────────────
  function renderStep() {
    switch (formStep) {
      case 0:
        return (
          <Step1Location
            state={state}
            updateInputs={updateInputs}
            detectLocation={detectLocation}
            stepErrors={stepErrors}
          />
        )
      case 1:
        return (
          <Step2CropWater
            state={state}
            updateInputs={updateInputs}
            stepErrors={stepErrors}
          />
        )
      case 2:
        return (
          <Step3SoilManagement
            state={state}
            updateInputs={updateInputs}
            stepErrors={stepErrors}
          />
        )
      case 3:
        return (
          <Step4MarketAdvanced
            state={state}
            updateInputs={updateInputs}
            stepErrors={stepErrors}
          />
        )
      default:
        return null
    }
  }

  return (
    <form
      className="cf-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="CropFit crop suitability planner"
    >
      {/* Progress indicator */}
      <StepProgress currentStep={formStep} totalSteps={TOTAL_STEPS} />

      {/* Step errors summary (Step 1 & 2 only) */}
      {Object.keys(stepErrors).length > 0 && (
        <div className="cf-validation-msg" role="alert">
          {Object.values(stepErrors).map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>
      )}

      {/* Active step content */}
      {renderStep()}

      {/* Navigation bar */}
      <div className="cf-form-nav">
        {formStep > 0 && (
          <button
            type="button"
            className="cf-btn cf-form-nav__back"
            onClick={handleBack}
          >
            ← Previous
          </button>
        )}

        {formStep < TOTAL_STEPS - 1 && (
          <button
            type="button"
            className="cf-btn cf-btn--primary cf-form-nav__next"
            onClick={handleNext}
          >
            Next →
          </button>
        )}

        {formStep === TOTAL_STEPS - 1 && (
          <button
            type="submit"
            className="cf-btn cf-btn--primary cf-form-nav__submit"
            disabled={isLoading}
          >
            {isLoading ? 'Analysing…' : 'Analyse my farm →'}
          </button>
        )}
      </div>

      {analysisError && (
        <div className="cf-validation-msg" role="alert" style={{ marginTop: '0.75rem', padding: '0.5rem 0' }}>
          <p>{analysisError}</p>
        </div>
      )}
    </form>
  )
}

/**
 * CropFit Planner — App State Hook
 *
 * Single source of truth for all CropFit app state.
 * Uses useState for simple values and useReducer for the inputs sub-object.
 * Analysis is performed by the backend Claude API (POST /api/cropfit/analyze).
 */

import { useState, useReducer, useCallback } from 'react'
import { getRegionFromLatLng } from '../engine/regions.js'

// ─── INPUTS REDUCER ──────────────────────────────────────────────────────
const DEFAULT_INPUTS = {
  region:           '',
  regionLabel:      '',
  lat:              '',
  lng:              '',
  season:           '',
  duration_type:    '',
  water_access:     '',
  soil_type:        'unknown',
  management:       '',
  market:           [],
  farm_scale:       '',
  frost_risk:       null,
  time_income_pref: null,
  drainage:         null,
}

function inputsReducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.payload }
    case 'RESET':
      return { ...DEFAULT_INPUTS }
    default:
      return state
  }
}

// ─── TRANSFORM CLAUDE RECOMMENDATIONS ────────────────────────────────────
// Maps Claude API response format to the shape ResultsView expects.
function transformRecommendations(recommendations) {
  return (recommendations || []).map((rec, index) => ({
    id:              rec.crop_name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + index,
    name:            rec.crop_name,
    score:           rec.suitability_score,
    category:        rec.category,
    durationType:    null,
    explanation:     Array.isArray(rec.reasons) ? rec.reasons.join(' ') : '',
    waterRequirement: null,
    soilPreference:  null,
    timeToIncome:    rec.time_to_income || null,
    managementLevel: rec.management_notes || null,
    marketChannels:  rec.market_fit ? [rec.market_fit] : [],
    notes:           null,
    risks:           rec.warnings || [],
    // Extended Claude fields
    reasons:         rec.reasons || [],
    marketFit:       rec.market_fit || null,
    managementNotes: rec.management_notes || null,
    band:            rec.band || 'marginal',
  }))
}


// ─── MAIN HOOK ────────────────────────────────────────────────────────────
export function useCropFitState() {

  // ── Core navigation ──────────────────────────────────────────────────
  const [view, setView] = useState('planner')

  // ── Form wizard step ─────────────────────────────────────────────────
  const [formStep, setFormStep] = useState(0)

  // ── Farmer inputs ────────────────────────────────────────────────────
  const [inputs, dispatchInputs] = useReducer(inputsReducer, { ...DEFAULT_INPUTS })

  // ── Analysis results ─────────────────────────────────────────────────
  const [results, setResults]       = useState([])
  const [hasResults, setHasResults] = useState(false)

  // ── API state ────────────────────────────────────────────────────────
  const [isLoading, setIsLoading]         = useState(false)
  const [analysisError, setAnalysisError] = useState(null)

  // ── Plan metadata (returned by backend after successful analysis) ─────
  const [planId, setPlanId]   = useState(null)
  const [planUrl, setPlanUrl] = useState(null)

  // ── AI analysis context ──────────────────────────────────────────────
  const [aiSummary, setAiSummary]             = useState(null)
  const [actionPlan, setActionPlan]           = useState([])
  const [regionalContext, setRegionalContext] = useState(null)
  const [seasonAdvice, setSeasonAdvice]       = useState(null)

  // ── Results display controls ─────────────────────────────────────────
  const [sortBy, setSortBy]         = useState('suitability')
  const [filterBand, setFilterBand] = useState('all')

  // ── Compare list ─────────────────────────────────────────────────────
  const [compareList, setCompareList] = useState([])

  // ── Theme ─────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState('light')

  // ── Location state ────────────────────────────────────────────────────
  const [locationMethod, setLocationMethod]   = useState('manual')
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError]     = useState(null)


  // ─── ACTION: updateInputs ─────────────────────────────────────────────
  const updateInputs = useCallback((patch) => {
    dispatchInputs({ type: 'UPDATE', payload: patch })
  }, [])


  // ─── ACTION: runAnalysis ──────────────────────────────────────────────
  /**
   * Submit farm inputs to the backend Claude API.
   * Saves results to state and navigates to results view.
   */
  const runAnalysis = useCallback(async () => {
    setIsLoading(true)
    setAnalysisError(null)

    try {
      const response = await fetch('/api/cropfit/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || `Server error ${response.status}`)
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed')
      }

      const transformedResults = transformRecommendations(data.analysis.recommendations)

      setResults(transformedResults)
      setHasResults(true)
      setPlanId(data.planId)
      setPlanUrl(data.planUrl)
      setAiSummary(data.analysis.summary)
      setActionPlan(data.analysis.action_plan || [])
      setRegionalContext(data.analysis.regional_context)
      setSeasonAdvice(data.analysis.season_advice)
      setSortBy('suitability')
      setFilterBand('all')
      setView('results')

    } catch (error) {
      setAnalysisError(error.message || 'Analysis failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [inputs])


  // ─── ACTION: toggleCompare ────────────────────────────────────────────
  const toggleCompare = useCallback((cropId) => {
    setCompareList(prev => {
      if (prev.includes(cropId)) return prev.filter(id => id !== cropId)
      if (prev.length >= 3) return [...prev.slice(1), cropId]
      return [...prev, cropId]
    })
  }, [])


  // ─── ACTION: toggleTheme ──────────────────────────────────────────────
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])


  // ─── ACTION: detectLocation ───────────────────────────────────────────
  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.')
      return
    }

    setLocationLoading(true)
    setLocationError(null)
    setLocationMethod('auto')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        const regionKey = getRegionFromLatLng(lat, lng)

        dispatchInputs({
          type: 'UPDATE',
          payload: {
            lat:    String(lat.toFixed(5)),
            lng:    String(lng.toFixed(5)),
            region: regionKey,
          },
        })
        setLocationLoading(false)
      },
      (error) => {
        let message = 'Location detection failed.'
        if (error.code === 1) message = 'Location permission denied. Please enter coordinates manually.'
        else if (error.code === 2) message = 'Location unavailable. Please enter coordinates manually.'
        else if (error.code === 3) message = 'Location request timed out. Please enter coordinates manually.'
        setLocationError(message)
        setLocationLoading(false)
        setLocationMethod('manual')
      },
      { timeout: 10000, maximumAge: 60000 }
    )
  }, [])


  // ─── ACTION: resetPlanner ─────────────────────────────────────────────
  const resetPlanner = useCallback(() => {
    dispatchInputs({ type: 'RESET' })
    setResults([])
    setHasResults(false)
    setCompareList([])
    setSortBy('suitability')
    setFilterBand('all')
    setFormStep(0)
    setLocationMethod('manual')
    setLocationError(null)
    setIsLoading(false)
    setAnalysisError(null)
    setPlanId(null)
    setPlanUrl(null)
    setAiSummary(null)
    setActionPlan([])
    setRegionalContext(null)
    setSeasonAdvice(null)
    setView('planner')
  }, [])


  // ─── RETURN API ───────────────────────────────────────────────────────
  return {
    state: {
      view,
      inputs,
      results,
      compareList,
      sortBy,
      filterBand,
      theme,
      formStep,
      hasResults,
      locationMethod,
      locationLoading,
      locationError,
      // API state
      isLoading,
      analysisError,
      // Plan metadata
      planId,
      planUrl,
      // AI analysis context
      aiSummary,
      actionPlan,
      regionalContext,
      seasonAdvice,
    },

    // Actions
    setView,
    updateInputs,
    runAnalysis,
    toggleCompare,
    setSortBy,
    setFilterBand,
    toggleTheme,
    setFormStep,
    detectLocation,
    resetPlanner,
  }
}

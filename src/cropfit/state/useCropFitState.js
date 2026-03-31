/**
 * CropFit Planner — App State Hook
 *
 * Single source of truth for all CropFit app state.
 * Uses useState for simple values and useReducer for the inputs sub-object.
 * No localStorage — state is ephemeral per session.
 */

import { useState, useReducer, useCallback } from 'react'
import { scoreCrops } from '../engine/scoring.js'
import { getRegionFromLatLng } from '../engine/regions.js'
import { crops as allCrops } from '../data/crops.js'

// ─── INPUTS REDUCER ──────────────────────────────────────────────────────
// Manages the farmer's form inputs as a single nested object.
// Action: { type: 'UPDATE', payload: { key: value, ... } }
// Action: { type: 'RESET' }

const DEFAULT_INPUTS = {
  region:          '',       // archetype key
  regionLabel:     '',       // display label for selected region
  lat:             '',       // decimal string
  lng:             '',       // decimal string
  season:          '',       // 'summer' | 'autumn' | 'winter' | 'spring'
  duration_type:   '',       // 'annual' | 'short-perennial' | 'long-perennial'
  water_access:    '',       // 'rainfed' | 'limited-irrigation' | 'reliable-irrigation'
  soil_type:       'unknown', // soil key or 'unknown'
  management:      '',       // 'low' | 'moderate' | 'high'
  market:          [],       // array of market channel keys (multi-select)
  farm_scale:      '',       // scale key
  frost_risk:      null,     // 'low' | 'medium' | 'high' | null
  time_income_pref: null,    // 'fast' | 'medium' | 'long' | null
  drainage:        null,     // 'poor' | 'moderate' | 'good' | null
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


// ─── MAIN HOOK ────────────────────────────────────────────────────────────
export function useCropFitState() {

  // ── Core navigation state ────────────────────────────────────────────
  const [view, setView] = useState('planner')
  // 'planner' | 'results' | 'compare' | 'library' | 'methodology'

  // ── Form wizard step ─────────────────────────────────────────────────
  const [formStep, setFormStep] = useState(0)   // 0–3

  // ── Farmer inputs (managed by reducer) ──────────────────────────────
  const [inputs, dispatchInputs] = useReducer(inputsReducer, { ...DEFAULT_INPUTS })

  // ── Scoring results ───────────────────────────────────────────────────
  const [results, setResults] = useState([])
  // Array of: { crop, score, band, explanation, warnings, breakdown }

  const [hasResults, setHasResults] = useState(false)

  // ── Results display controls ─────────────────────────────────────────
  const [sortBy, setSortBy] = useState('suitability')
  // 'suitability' | 'ease' | 'income' | 'market' | 'water'

  const [filterBand, setFilterBand] = useState('all')
  // 'all' | 'best-fit' | 'caution' | 'not-recommended'

  // ── Compare list ─────────────────────────────────────────────────────
  const [compareList, setCompareList] = useState([])
  // Array of crop id strings (max 3)

  // ── Theme ─────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState('light')
  // 'light' | 'dark'

  // ── Location state ────────────────────────────────────────────────────
  const [locationMethod, setLocationMethod] = useState('manual')
  // 'auto' | 'manual'

  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError]     = useState(null)


  // ─── ACTION: updateInputs ─────────────────────────────────────────────
  /**
   * Merge one or more input fields into the inputs state.
   * @param {Object} patch  Key–value pairs to merge into inputs
   */
  const updateInputs = useCallback((patch) => {
    dispatchInputs({ type: 'UPDATE', payload: patch })
  }, [])


  // ─── ACTION: runScoring ───────────────────────────────────────────────
  /**
   * Run the scoring engine against all crops with current inputs,
   * store the results, and navigate to the results view.
   */
  const runScoring = useCallback(() => {
    const scored = scoreCrops(inputs, allCrops)
    setResults(scored)
    setHasResults(true)
    setSortBy('suitability')
    setFilterBand('all')
    setView('results')
  }, [inputs])


  // ─── ACTION: toggleCompare ────────────────────────────────────────────
  /**
   * Add a crop id to the compare list (max 3) or remove it if already present.
   * @param {string} cropId  The crop's id field
   */
  const toggleCompare = useCallback((cropId) => {
    setCompareList(prev => {
      if (prev.includes(cropId)) {
        // Remove from list
        return prev.filter(id => id !== cropId)
      }
      if (prev.length >= 3) {
        // At capacity — replace the oldest entry
        return [...prev.slice(1), cropId]
      }
      return [...prev, cropId]
    })
  }, [])


  // ─── ACTION: toggleTheme ──────────────────────────────────────────────
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])


  // ─── ACTION: detectLocation ───────────────────────────────────────────
  /**
   * Request browser geolocation, derive region archetype from coords,
   * and update inputs with lat, lng, and region.
   */
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
  /**
   * Clear all inputs and results, reset to form step 0, navigate to planner.
   */
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
    setView('planner')
  }, [])


  // ─── RETURN API ───────────────────────────────────────────────────────
  return {
    // State
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
    },

    // Actions
    setView,
    updateInputs,
    runScoring,
    toggleCompare,
    setSortBy,
    setFilterBand,
    toggleTheme,
    setFormStep,
    detectLocation,
    resetPlanner,
  }
}

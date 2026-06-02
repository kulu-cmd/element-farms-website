import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCropFitState } from './state/useCropFitState.js'
import { API } from '../api.js'
import { PlannerForm } from './components/PlannerForm.jsx'
import { ResultsView } from './components/ResultsView.jsx'
import { CompareView } from './components/CompareView.jsx'
import { CropLibrary } from './components/CropLibrary.jsx'
import { MethodologyView } from './components/MethodologyView.jsx'
import './CropFitApp.css'


const NAV_TABS = ['planner', 'results', 'compare', 'library', 'methodology']

export default function CropFitApp() {
  const cropFit = useCropFitState()
  const { state } = cropFit

  const [capturedEmail, setCapturedEmail] = useState('')
  const [showEmailPrompt, setShowEmailPrompt] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailCaptured, setEmailCaptured] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const loadingTimerRef = useRef(null)
  const successTimerRef = useRef(null)

  // Show email prompt after 10s of loading
  useEffect(() => {
    if (state.isLoading) {
      setShowEmailPrompt(false)
      loadingTimerRef.current = setTimeout(() => setShowEmailPrompt(true), 10000)
    } else {
      clearTimeout(loadingTimerRef.current)
      setShowEmailPrompt(false)
    }
    return () => clearTimeout(loadingTimerRef.current)
  }, [state.isLoading])

  // When a new analysis starts, reset email state
  useEffect(() => {
    if (state.isLoading) {
      setEmailSent(false)
      setEmailCaptured(false)
      setShowSuccessMessage(false)
    }
  }, [state.isLoading])

  // Show success message when email is captured, then hide prompt
  useEffect(() => {
    if (emailCaptured && !showSuccessMessage) {
      setShowSuccessMessage(true)
      successTimerRef.current = setTimeout(() => {
        setShowEmailPrompt(false)
      }, 2500)
    }
    return () => clearTimeout(successTimerRef.current)
  }, [emailCaptured, showSuccessMessage])

  // Send farmer email when results land and an email was captured
  useEffect(() => {
    if (state.hasResults && state.planId && emailCaptured && capturedEmail && !emailSent) {
      setEmailSent(true)
      fetch(API.sendFarmerEmail, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: state.planId, email: capturedEmail }),
      }).catch(() => {})
    }
  }, [state.hasResults, state.planId, capturedEmail, emailCaptured, emailSent])

  function isTabDisabled(tab) {
    if (tab === 'results' && !state.hasResults) return true
    if (tab === 'compare' && state.compareList.length < 2) return true
    return false
  }

  function tabLabel(tab) {
    switch (tab) {
      case 'planner':
        return 'Planner'
      case 'results':
        return state.hasResults ? `Results (${state.results.length})` : 'Results'
      case 'compare':
        return state.compareList.length > 0
          ? `Compare (${state.compareList.length})`
          : 'Compare'
      case 'library':
        return 'Crop Library'
      case 'methodology':
        return 'Methodology'
      default:
        return tab
    }
  }

  return (
    <div className={`cf-app${state.theme === 'dark' ? ' cf-dark' : ''}`}>
      {/* CropFit header bar */}
      <header className="cf-header">
        <div className="cf-header__inner">
          <div className="cf-header__brand">
            <Link to="/" className="cf-header__home-logo">
              <img
                src="/Element Farm Solutions_Final_Logo_Side_PNG.png"
                alt="Element Farm Solutions"
                className="cf-header__logo-img"
              />
            </Link>
            <div className="cf-header__divider" aria-hidden="true" />
            <span className="cf-header__title">CropFit</span>
          </div>
          <button
            className="cf-theme-toggle"
            onClick={cropFit.toggleTheme}
            aria-label="Toggle theme"
          >
            {state.theme === 'light' ? '☾' : '☀'}
          </button>
        </div>
      </header>

      {/* In-app nav tabs */}
      <nav className="cf-nav" aria-label="CropFit sections">
        <div className="cf-nav__inner">
          {NAV_TABS.map((tab) => (
            <button
              key={tab}
              className={`cf-nav__tab${state.view === tab ? ' cf-nav__tab--active' : ''}`}
              onClick={() => cropFit.setView(tab)}
              disabled={isTabDisabled(tab)}
              aria-current={state.view === tab ? 'page' : undefined}
            >
              {tabLabel(tab)}
            </button>
          ))}
        </div>
      </nav>

      {/* Loading overlay — shown while API processes */}
      {state.isLoading && (
        <div className="cf-loading-overlay" role="status" aria-live="polite">
          <div className="cf-loading-overlay__inner">
            <div className="cf-spinner" aria-hidden="true" />
            <p className="cf-loading-overlay__text">Analysing your farm…</p>
            {showEmailPrompt && (
              <div className="cf-email-capture">
                {showSuccessMessage ? (
                  <div className="cf-email-success">
                    <p className="cf-email-success__message">✓ Noted, you will be emailed shortly</p>
                  </div>
                ) : (
                  <>
                    <p className="cf-email-capture__text">Taking a moment — want results in your inbox?</p>
                    <div className="cf-email-capture__row">
                      <input
                        type="email"
                        className="cf-email-capture__input"
                        placeholder="your@email.com"
                        value={capturedEmail}
                        onChange={e => setCapturedEmail(e.target.value)}
                        aria-label="Email address for results"
                      />
                      <button
                        className="cf-email-capture__btn"
                        onClick={() => setEmailCaptured(true)}
                        disabled={!capturedEmail}
                        type="button"
                      >
                        Notify me
                      </button>
                    </div>
                    <p className="cf-email-capture__hint">We'll email your plan link when it's ready</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="cf-main">
        {state.view === 'planner' && (
          <div className="cf-layout">
            <div className="cf-layout__header">
              <span className="cf-empty-state__icon" aria-hidden="true">🌱</span>
              <h2 className="cf-empty-state__title">
                Start planning your crop selection
              </h2>
              <p className="cf-empty-state__text">
                Fill in the planner form to get ranked crop recommendations
                based on your farm conditions. This tool provides directional
                guidance — not a guarantee of outcome.
              </p>
            </div>
            <div className="cf-layout__form">
              <PlannerForm
                state={state}
                updateInputs={cropFit.updateInputs}
                setFormStep={cropFit.setFormStep}
                detectLocation={cropFit.detectLocation}
                runAnalysis={cropFit.runAnalysis}
                isLoading={state.isLoading}
                analysisError={state.analysisError}
              />
            </div>
          </div>
        )}

        {state.view === 'results' && <ResultsView {...cropFit} />}
        {state.view === 'compare' && <CompareView {...cropFit} />}
        {state.view === 'library' && <CropLibrary {...cropFit} />}
        {state.view === 'methodology' && <MethodologyView />}
      </main>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { useCropFitState } from './state/useCropFitState.js'
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
            <div className="cf-header__brand-text">
              <span className="cf-header__title">CropFit Planner</span>
              <span className="cf-header__subtitle">
                Crop suitability planning for real farm conditions
              </span>
            </div>
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

      {/* Loading overlay — shown while Claude API processes */}
      {state.isLoading && (
        <div className="cf-loading-overlay" role="status" aria-live="polite">
          <div className="cf-loading-overlay__inner">
            <div className="cf-spinner" aria-hidden="true" />
            <p className="cf-loading-overlay__text">Analysing your farm with Claude AI…</p>
            <p className="cf-loading-overlay__sub">This typically takes 15–30 seconds</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="cf-main">
        {state.view === 'planner' && (
          <div className="cf-layout">
            <aside className="cf-layout__sidebar">
              <PlannerForm
                state={state}
                updateInputs={cropFit.updateInputs}
                setFormStep={cropFit.setFormStep}
                detectLocation={cropFit.detectLocation}
                runAnalysis={cropFit.runAnalysis}
                isLoading={state.isLoading}
                analysisError={state.analysisError}
              />
            </aside>
            <div className="cf-layout__intro">
              <div className="cf-empty-state">
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

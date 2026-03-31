import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './CropFitPlanView.css'

function getBandColor(band) {
  switch (band) {
    case 'best-fit':        return '#2d7a4a'
    case 'good-fit':        return '#3fae5a'
    case 'marginal':        return '#e0a526'
    case 'not-recommended': return '#cc4444'
    default:                return '#888'
  }
}

function getBandLabel(band) {
  switch (band) {
    case 'best-fit':        return 'Best fit'
    case 'good-fit':        return 'Good fit'
    case 'marginal':        return 'Marginal'
    case 'not-recommended': return 'Not recommended'
    default:                return band || 'Unknown'
  }
}

function CropCard({ rec }) {
  return (
    <article className="cpv-crop-card">
      <div className="cpv-crop-card__top">
        <span className="cpv-score" style={{ color: getBandColor(rec.band) }}>
          {rec.suitability_score}
        </span>
        <span className="cpv-band" style={{ background: getBandColor(rec.band) }}>
          {getBandLabel(rec.band)}
        </span>
        {rec.category && (
          <span className="cpv-category">{rec.category}</span>
        )}
      </div>
      <h3 className="cpv-crop-card__name">{rec.crop_name}</h3>
      {rec.reasons?.length > 0 && (
        <ul className="cpv-reasons">
          {rec.reasons.map((r, j) => <li key={j}>{r}</li>)}
        </ul>
      )}
      <div className="cpv-crop-card__details">
        {rec.time_to_income && (
          <div className="cpv-detail">
            <span className="cpv-detail__label">Income</span>
            <span>{rec.time_to_income}</span>
          </div>
        )}
        {rec.market_fit && (
          <div className="cpv-detail">
            <span className="cpv-detail__label">Market fit</span>
            <span>{rec.market_fit}</span>
          </div>
        )}
        {rec.management_notes && (
          <div className="cpv-detail">
            <span className="cpv-detail__label">Management</span>
            <span>{rec.management_notes}</span>
          </div>
        )}
      </div>
      {rec.warnings?.length > 0 && (
        <div className="cpv-warnings">
          {rec.warnings.map((w, j) => (
            <span key={j} className="cpv-warning-pill">⚠ {w}</span>
          ))}
        </div>
      )}
    </article>
  )
}

export default function CropFitPlanView() {
  const { id } = useParams()
  const [plan, setPlan]     = useState(null)
  const [error, setError]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/cropfit/plan/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setPlan(data.plan)
        else setError(data.error || 'Plan not found')
      })
      .catch(() => setError('Failed to load plan. Please check your connection.'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="app">
      <Header />
      <main className="cpv-main">

        {loading && (
          <div className="cpv-loading" aria-live="polite">
            <div className="cpv-loading__spinner" />
            <p>Loading your crop plan…</p>
          </div>
        )}

        {!loading && error && (
          <div className="cpv-error">
            <h1>Plan not found</h1>
            <p>{error}</p>
            <Link to="/cropfit" className="cpv-btn cpv-btn--primary">
              Run your own analysis →
            </Link>
          </div>
        )}

        {!loading && plan && (
          <>
            {/* Plan hero */}
            <div className="cpv-hero">
              <div className="cpv-hero__inner">
                <div className="cpv-hero__badge">CropFit Analysis</div>
                <h1 className="cpv-hero__title">
                  {plan.farm_name || (plan.contact_name ? `${plan.contact_name}'s Farm` : 'Crop Suitability Plan')}
                </h1>
                <div className="cpv-hero__meta">
                  {plan.inputs?.regionLabel && <span>{plan.inputs.regionLabel}</span>}
                  {plan.season && (
                    <span>{plan.season.charAt(0).toUpperCase() + plan.season.slice(1)}</span>
                  )}
                  {plan.created_at && (
                    <span>
                      {new Date(plan.created_at).toLocaleDateString('en-ZA', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="cpv-content">

              {/* Analysis summary */}
              {plan.analysis?.summary && (
                <section className="cpv-section">
                  <h2 className="cpv-section__heading">Analysis Summary</h2>
                  <p className="cpv-summary">{plan.analysis.summary}</p>
                  {plan.analysis.regional_context && (
                    <p className="cpv-context">{plan.analysis.regional_context}</p>
                  )}
                  {plan.analysis.season_advice && (
                    <p className="cpv-season-advice">🌿 {plan.analysis.season_advice}</p>
                  )}
                </section>
              )}

              {/* Crop recommendations */}
              {plan.analysis?.recommendations?.length > 0 && (
                <section className="cpv-section">
                  <h2 className="cpv-section__heading">
                    Crop Recommendations
                    <span className="cpv-section__count">
                      {plan.analysis.recommendations.length} crops assessed
                    </span>
                  </h2>
                  <div className="cpv-crops">
                    {plan.analysis.recommendations.map((rec, i) => (
                      <CropCard key={i} rec={rec} />
                    ))}
                  </div>
                </section>
              )}

              {/* Action plan */}
              {plan.analysis?.action_plan?.length > 0 && (
                <section className="cpv-section">
                  <h2 className="cpv-section__heading">Your Action Plan</h2>
                  <ol className="cpv-action-list">
                    {plan.analysis.action_plan.map((step, i) => (
                      <li key={i} className="cpv-action-item">{step}</li>
                    ))}
                  </ol>
                </section>
              )}

              {/* CTA */}
              <section className="cpv-cta-section">
                <h2 className="cpv-cta-section__heading">Ready to take the next step?</h2>
                <p className="cpv-cta-section__text">
                  This analysis is a starting point. Our consultants can build a tailored
                  soil and crop regeneration plan specific to your farm conditions.
                </p>
                <div className="cpv-cta-section__actions">
                  <a href="/contact/agri-farms" className="cpv-btn cpv-btn--primary">
                    Talk to a consultant
                  </a>
                  <Link to="/cropfit" className="cpv-btn cpv-btn--secondary">
                    Run new analysis
                  </Link>
                </div>
              </section>

            </div>
          </>
        )}

      </main>
      <Footer />
    </div>
  )
}

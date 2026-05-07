import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArgyleDiamond, CircleDots } from './BrandMotifs'
import './CTABand.css'

/**
 * CTABand — full-width editorial call-to-action strip.
 *
 * Props:
 *   heading    — main heading text (supports __italic__ syntax)
 *   subtext    — optional supporting sentence
 *   primaryLabel / primaryTo — primary CTA
 *   secondaryLabel / secondaryTo — optional secondary CTA
 *   tone       — 'clay' (warm orange-tinted) | 'ink' (near-black) | 'moss' (dark green, default)
 */
const CTABand = ({
  heading = 'Ready to regenerate your land?',
  subtext = 'Start with a no-obligation farm assessment. We walk the fields, read the soil, and map a path forward.',
  primaryLabel = 'Start a farm trial',
  primaryTo = 'https://docs.google.com/forms/d/18f14G-hCciPDNnAgy9ITvT8iedrzmZ5K3zb37G_ca5Q/edit',
  secondaryLabel = 'Talk to us first',
  secondaryTo = '/contact/agri-farms',
  tone = 'clay',
}) => {
  const isExternalPrimary = primaryTo.startsWith('http')

  return (
    <section className={`cta-band cta-band--${tone}`}>
      {/* background texture */}
      <div className="cta-band__grain" aria-hidden="true" />
      <div className="cta-band__glow" aria-hidden="true" />

      {/* Brand motif accents */}
      <ArgyleDiamond
        className="cta-band__motif cta-band__motif--diamond"
        size={320}
        color="rgba(244, 239, 230, 0.09)"
        strokeWidth={2}
      />
      <CircleDots
        className="cta-band__motif cta-band__motif--circle"
        size={48}
        ringColor="rgba(244, 239, 230, 0.35)"
        dotColor="var(--clay)"
        strokeWidth={7}
      />

      <div className="cta-band__inner">
        <motion.div
          className="cta-band__copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="cta-band__heading">{heading}</h2>
          {subtext && <p className="cta-band__subtext">{subtext}</p>}
        </motion.div>

        <motion.div
          className="cta-band__actions"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {isExternalPrimary ? (
            <a
              href={primaryTo}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-band__btn cta-band__btn--primary"
            >
              <span>{primaryLabel}</span>
              <span className="cta-band__btn-arrow" aria-hidden="true">→</span>
            </a>
          ) : (
            <Link to={primaryTo} className="cta-band__btn cta-band__btn--primary">
              <span>{primaryLabel}</span>
              <span className="cta-band__btn-arrow" aria-hidden="true">→</span>
            </Link>
          )}

          {secondaryLabel && (
            <Link to={secondaryTo} className="cta-band__btn cta-band__btn--secondary">
              <span>{secondaryLabel}</span>
            </Link>
          )}
        </motion.div>
      </div>

      {/* Decorative diagonal rule */}
      <div className="cta-band__rule" aria-hidden="true" />
    </section>
  )
}

export default CTABand

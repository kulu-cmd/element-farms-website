import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import './KZNMapSection.css'

/**
 * Erosion-hotspot map of South Africa.
 * Uses the supplied PNG outline (transparent background) and overlays
 * three orange vibration hotspots over Limpopo, KwaZulu-Natal and the
 * Eastern Cape.
 */

/* Hotspot positions as percentages of the map container.
   Tuned to the supplied 2000x2000 SAmap.png. */
const HOTSPOTS = [
  {
    id: 'limpopo',
    name: 'Limpopo',
    leftPct: 63,
    topPct: 15,
  },
  {
    id: 'kzn',
    name: 'KZN',
    leftPct: 80,
    topPct: 46,
  },
  {
    id: 'eastern-cape',
    name: 'Eastern Cape',
    leftPct: 57,
    topPct: 71,
  },
]

const KZNMapSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0, margin: '0px 0px -10% 0px' })

  return (
    <section className="erosion" ref={ref}>
      <div className="erosion__inner">
        {/* LEFT — editorial header */}
        <motion.div
          className="erosion__head"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionLabel label="Erosion Hotspots" />
          <p className="erosion__lede">
            <em>KwaZulu-Natal,</em> <em>Limpopo</em> and the <em>Eastern Cape</em> are losing topsoil at <em>five times</em> the global average.
          </p>
        </motion.div>

        {/* RIGHT — map + animated hotspots */}
        <div className="erosion__map">
          <motion.img
            src="/sa-map.png"
            alt="Outline of South Africa with Limpopo, KwaZulu-Natal and Eastern Cape highlighted as erosion hotspots"
            className="erosion__map-img"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Animated hotspot overlays — pure CSS pulses */}
          {HOTSPOTS.map((h, i) => (
            <div
              key={h.id}
              className={`erosion__spot${isInView ? ' is-active' : ''}`}
              style={{
                left: `${h.leftPct}%`,
                top: `${h.topPct}%`,
                '--spot-delay': `${i * 0.5 + 1.4}s`,
              }}
              aria-hidden="true"
            >
              <span className="erosion__ring erosion__ring--1" />
              <span className="erosion__ring erosion__ring--2" />
              <span className="erosion__ring erosion__ring--3" />
              <span className="erosion__core" />
              <span className="erosion__spot-label">{h.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KZNMapSection

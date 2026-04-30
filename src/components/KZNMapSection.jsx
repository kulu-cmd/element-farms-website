import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import './KZNMapSection.css'

/**
 * Erosion-hotspot map of South Africa.
 *
 * Renders a recognisable SA outline with the nine provinces as subtle
 * hairline dividers, then animates three orange "vibration" hotspots
 * over Limpopo, KwaZulu-Natal and the Eastern Cape as the user scrolls
 * the section into view. No statistics, no bar charts — just the map
 * and the three pulses.
 */

/* ----------------------------------------------------------------------------
   SVG paths — viewBox 0 0 760 700, clockwise from NW corner
   --------------------------------------------------------------------------- */
const SA_OUTLINE =
  'M 22 322 ' +
  'L 30 282 ' +
  'L 52 232 ' +
  'L 92 196 ' +
  'L 142 184 ' +
  'L 204 178 ' +
  'L 282 178 ' +
  'L 348 192 ' +
  'L 416 178 ' +
  'L 478 162 ' +
  'L 542 96 ' +
  'C 562 64, 580 32, 598 12 ' +
  'L 642 30 ' +
  'L 690 80 ' +
  'L 696 152 ' +
  'L 706 222 ' +
  'L 728 282 ' +
  'L 700 318 ' +
  'L 690 342 ' +
  'L 650 374 ' +
  'L 600 412 ' +
  'L 514 480 ' +
  'L 412 542 ' +
  'L 348 590 ' +
  'L 250 608 ' +
  'L 156 612 ' +
  'L 90 592 ' +
  'L 82 562 ' +
  'L 58 510 ' +
  'L 36 420 ' +
  'L 26 364 ' +
  'Z'

/* Lesotho — enclosed by KZN / Free State / Eastern Cape */
const LESOTHO =
  'M 488 338 ' +
  'C 510 326, 540 332, 550 354 ' +
  'C 558 380, 548 402, 526 410 ' +
  'C 500 414, 478 400, 476 376 ' +
  'C 476 354, 480 344, 488 338 Z'

/* Suggested province dividers — hairline strokes that imply the 9 provinces.
   Drawn loose; the country outline carries the real geographic weight. */
const PROVINCE_LINES = [
  // Western Cape / Northern Cape (Karoo line)
  'M 60 502 L 200 502 L 326 528 L 412 542',
  // Northern Cape / Free State (vertical-ish through middle)
  'M 412 542 L 470 480 L 478 376 L 478 240 L 478 178',
  // North West / Free State / Gauteng (horizontal mid-north)
  'M 282 178 L 360 240 L 478 240',
  // North West / Limpopo (sloping from top to mid-east)
  'M 416 178 L 490 200 L 542 96',
  // Limpopo / Mpumalanga (around Polokwane south)
  'M 542 96 L 580 165 L 650 200',
  // Mpumalanga / Gauteng (small stub)
  'M 478 200 L 580 165',
  // Mpumalanga / KZN (Eswatini area)
  'M 650 200 L 706 222 L 700 318',
  // KZN / Free State (around Lesotho east)
  'M 700 318 L 600 412 L 550 354',
  // Free State / Eastern Cape (around Lesotho south)
  'M 488 338 L 470 480 L 412 542',
  // KZN / Eastern Cape (south of Lesotho)
  'M 526 410 L 514 480 L 412 542',
]

/* Hotspot positions, expressed as percentages of the SVG viewBox so the
   HTML overlay stays in lock-step with the map at any size. */
const HOTSPOTS = [
  {
    id: 'limpopo',
    name: 'Limpopo',
    leftPct: 71,
    topPct: 12,
  },
  {
    id: 'kzn',
    name: 'KZN',
    leftPct: 83,
    topPct: 43,
  },
  {
    id: 'eastern-cape',
    name: 'Eastern Cape',
    leftPct: 56,
    topPct: 73,
  },
]

const KZNMapSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })

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
          <h3 className="erosion__title">
            Where the topsoil is <em>going</em> first.
          </h3>
          <p className="erosion__sub">
            Three provinces carry South Africa's most degraded farmland.
            Limpopo, KwaZulu-Natal and the Eastern Cape are losing topsoil
            at <em>five times</em> the global average — the heat-spots that
            need rebuilding now.
          </p>
        </motion.div>

        {/* RIGHT — map + animated hotspots */}
        <div className="erosion__map">
          <svg
            viewBox="0 0 760 700"
            className="erosion__svg"
            aria-label="Map of South Africa with Limpopo, KwaZulu-Natal and Eastern Cape highlighted as erosion hotspots"
            role="img"
          >
            {/* faint grain — atmospheric */}
            <defs>
              <filter id="erosion-soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.4" />
              </filter>
            </defs>

            {/* country outline — bold ink */}
            <motion.path
              d={SA_OUTLINE}
              className="erosion__outline"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                pathLength: { duration: 2.0, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.4 },
              }}
            />

            {/* paper fill applied after stroke draws */}
            <motion.path
              d={SA_OUTLINE}
              className="erosion__country-fill"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 1.4 }}
            />

            {/* province dividers — drawn after the country outline finishes */}
            <motion.g
              className="erosion__provinces"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.55 } : {}}
              transition={{ duration: 1.0, delay: 1.4 }}
            >
              {PROVINCE_LINES.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.2, delay: 1.5 + i * 0.05 }}
                />
              ))}
            </motion.g>

            {/* Lesotho — enclosed cut-out */}
            <motion.path
              d={LESOTHO}
              className="erosion__lesotho"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 2.0 }}
            />
          </svg>

          {/* Animated hotspot overlays — pure CSS pulses */}
          {HOTSPOTS.map((h, i) => (
            <div
              key={h.id}
              className={`erosion__spot${isInView ? ' is-active' : ''}`}
              style={{
                left: `${h.leftPct}%`,
                top: `${h.topPct}%`,
                '--spot-delay': `${i * 0.5 + 2.2}s`,
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

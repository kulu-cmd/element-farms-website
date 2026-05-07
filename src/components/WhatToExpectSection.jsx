import React from 'react'
import { motion } from 'framer-motion'
import './WhatToExpectSection.css'

const milestones = [
  {
    season: 'Season 1',
    badge: '0–6 months',
    title: 'Biology activates.',
    body: 'Microbes colonise the root zone within days of application. Nursery seedlings show measurably stronger root development. First visible structural changes in heavy clay and compacted soils.',
    metric: '+40%',
    metricLabel: 'root-zone microbial activity',
  },
  {
    season: 'Season 2',
    badge: '6–18 months',
    title: 'Structure rebuilds.',
    body: 'Water-holding capacity improves. Topsoil begins to thicken — aggregate stability lifts, crumb structure returns. Organic matter percentage rises measurably against the baseline soil test.',
    metric: '+30%',
    metricLabel: 'water-holding capacity gain',
  },
  {
    season: 'Season 3',
    badge: '18–36 months',
    title: 'Yield lifts.',
    body: 'Chemical input volumes drop 25–40%. Crop response to organic nutrition improves season over season. Transplant shock falls. Harvest quality — brix, weight, shelf life — all lift.',
    metric: '25–40%',
    metricLabel: 'drop in chemical input cost',
  },
  {
    season: '3+ Years',
    badge: 'Long-term',
    title: 'Gains compound.',
    body: 'Soil resilience deepens. Drought tolerance improves without irrigation increases. The farm begins to feed itself — closed-loop composting reduces external input costs to near zero.',
    metric: 'Self-sustaining',
    metricLabel: 'closed-loop nutrient cycle',
  },
]

const WhatToExpectSection = () => {
  return (
    <section className="wte-x" id="what-to-expect">
      <div className="wte-x__inner">

        {/* Header block */}
        <motion.div
          className="wte-x__intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="wte-x__eyebrow">— Timeline</span>
          <h2 className="wte-x__heading">
            Soil doesn't recover overnight —<br />
            <em>but it compounds.</em>
          </h2>
          <p className="wte-x__subhead">
            A realistic progression of what to expect, season by season,
            when you adopt a regenerative system.
          </p>
        </motion.div>

        {/* Timeline grid */}
        <div className="wte-x__timeline">
          {/* Connector line */}
          <div className="wte-x__line" aria-hidden="true" />

          {milestones.map((m, i) => (
            <motion.div
              key={m.season}
              className="wte-x__milestone"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Node dot */}
              <div className="wte-x__node" aria-hidden="true">
                <span className="wte-x__node-dot" />
              </div>

              {/* Card content */}
              <div className="wte-x__card">
                <header className="wte-x__card-head">
                  <span className="wte-x__season">{m.season}</span>
                  <span className="wte-x__badge">{m.badge}</span>
                </header>

                <h3 className="wte-x__card-title">{m.title}</h3>
                <p className="wte-x__card-body">{m.body}</p>

                <div className="wte-x__card-metric">
                  <span className="wte-x__metric-num">{m.metric}</span>
                  <span className="wte-x__metric-label">{m.metricLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhatToExpectSection

import React from 'react'
import { motion } from 'framer-motion'
import StatIndex from './ui/StatIndex'
import './ResultsMetrics.css'

const metrics = [
  {
    value: 40,
    display: '40',
    suffix: '%',
    unit: 'lower fertiliser spend',
    label: 'average reduction in chemical fertiliser costs within 2 seasons',
    source: 'Based on trial farm data, KZN 2022–24',
  },
  {
    prefix: '+',
    value: 30,
    display: '30',
    suffix: '%',
    unit: 'water-holding capacity',
    label: 'improvement in water-holding capacity — less irrigation, more resilience',
    source: 'Soil test comparisons, ARC-aligned methodology',
  },
  {
    value: 2,
    display: '2',
    suffix: '',
    unit: 'seasons to recovery',
    label: 'to visible soil-structure recovery and measurable organic matter gains',
    source: 'Observation-based, composite farm data',
  },
  {
    prefix: '>',
    value: 80,
    display: '80',
    suffix: '%',
    unit: 'of SA soils',
    label: 'of SA soils below minimum organic matter threshold — every farm can improve',
    source: 'ARC, 2021',
  },
]

const ResultsMetrics = () => {
  return (
    <section className="rm-x">
      <div className="rm-x__inner">

        <motion.header
          className="rm-x__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="rm-x__heading">Numbers that hold.</h2>
        </motion.header>

        <StatIndex stats={metrics} />

      </div>
    </section>
  )
}

export default ResultsMetrics

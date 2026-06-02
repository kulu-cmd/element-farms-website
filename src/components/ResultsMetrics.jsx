import React, { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import './ResultsMetrics.css'

/* Animated count-up number */
const CountUp = ({ value, suffix = '', decimals = 0, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => v.toFixed(decimals))

  React.useEffect(() => {
    if (!isInView) return
    const controls = animate(mv, value, {
      duration: 1.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    })
    const unsub = rounded.on('change', (latest) => {
      if (ref.current) ref.current.textContent = latest + suffix
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [isInView, value, delay, mv, rounded, suffix])

  return <span ref={ref}>{decimals > 0 ? '0.0' : '0'}{suffix}</span>
}

const metrics = [
  {
    prefix: '',
    value: 40,
    suffix: '%',
    decimals: 0,
    label: 'average reduction in chemical fertiliser costs within 2 seasons',
    source: 'Based on trial farm data, KZN 2022–24',
  },
  {
    prefix: '+',
    value: 30,
    suffix: '%',
    decimals: 0,
    label: 'improvement in water-holding capacity — less irrigation, more resilience',
    source: 'Soil test comparisons, ARC-aligned methodology',
  },
  {
    prefix: '',
    value: 2,
    suffix: ' seasons',
    decimals: 0,
    label: 'to visible soil-structure recovery and measurable organic matter gains',
    source: 'Observation-based, composite farm data',
  },
  {
    prefix: '>',
    value: 80,
    suffix: '%',
    decimals: 0,
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
          <span className="rm-x__eyebrow">— Outcomes</span>
          <h2 className="rm-x__heading">Numbers that hold.</h2>
        </motion.header>

        <div className="rm-x__grid">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="rm-x__cell"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rm-x__figure">
                {m.prefix && <span className="rm-x__prefix">{m.prefix}</span>}
                <span className="rm-x__number">
                  <CountUp value={m.value} suffix={m.suffix} decimals={m.decimals} delay={i * 0.08 + 0.2} />
                </span>
              </div>
              <p className="rm-x__label">{m.label}</p>
              <span className="rm-x__source">— {m.source}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ResultsMetrics

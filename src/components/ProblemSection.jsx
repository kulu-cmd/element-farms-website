import React, { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import './ProblemSection.css'

/**
 * Visualised stat: each row gets a custom data indicator instead of being
 * a flat block of text. Indicators are chosen per-stat so the eye reads the
 * scale of the problem instantly.
 */
const stats = [
    {
        value: 70,
        display: '70',
        suffix: '%',
        unit: 'of farmland',
        label: 'in South Africa shows signs of degradation — biology stripped, minerals locked, margins eroding.',
        source: 'DFFE, 2022',
        // donut: 70% filled
        viz: { type: 'donut', pct: 70 },
    },
    {
        value: 58,
        display: '58',
        suffix: '%',
        unit: 'of farmed soil',
        label: 'contains less than 0.5% organic matter — far below the threshold for productive biological activity.',
        source: 'ARC, 2021',
        // diminishing-bar: 0.5 vs healthy threshold ~3%
        viz: { type: 'threshold', pct: 0.5, target: 3 },
    },
    {
        value: 12.6,
        display: '12.6',
        suffix: 't',
        unit: 'per ha / year',
        label: 'of fertile topsoil is lost to erosion — five times the world average of 2.4 t/ha.',
        source: 'Le Roux, 2014 · Wuepper et al., 2020',
        // multiple bar: SA bar vs world bar
        viz: { type: 'compare', sa: 12.6, world: 2.4 },
    },
    {
        value: 6,
        display: '6',
        suffix: '%',
        unit: 'of soil carbon',
        label: 'has been lost from agricultural soils in southern Africa due to continuous conventional cultivation.',
        source: 'Swanepoel et al., 2018',
        // descending dots: 6% loss visualised
        viz: { type: 'decay', pct: 6 },
    },
]

/* ---- count-up component ---- */
const CountUp = ({ to, duration = 1.6, decimals = 0, delay = 0, isInView }) => {
    const mv = useMotionValue(0)
    const rounded = useTransform(mv, (v) => v.toFixed(decimals))
    const ref = useRef(null)

    React.useEffect(() => {
        if (!isInView) return
        const controls = animate(mv, to, {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
        })
        const unsub = rounded.on('change', (latest) => {
            if (ref.current) ref.current.textContent = latest
        })
        return () => {
            controls.stop()
            unsub()
        }
    }, [isInView, to, duration, delay, mv, rounded])

    return <span ref={ref}>0{decimals > 0 ? '.0' : ''}</span>
}

/* ---- per-row visual indicators ---- */
const StatViz = ({ viz, isInView, delay }) => {
    if (viz.type === 'donut') {
        const C = 2 * Math.PI * 36
        const offset = C * (1 - viz.pct / 100)
        return (
            <svg viewBox="0 0 100 100" className="problem-x__viz problem-x__viz--donut">
                <circle cx="50" cy="50" r="36" className="problem-x__viz-track" />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="36"
                    className="problem-x__viz-arc"
                    strokeDasharray={C}
                    initial={{ strokeDashoffset: C }}
                    animate={isInView ? { strokeDashoffset: offset } : {}}
                    transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
                    transform="rotate(-90 50 50)"
                />
            </svg>
        )
    }

    if (viz.type === 'threshold') {
        // Tiny stack: current 0.5% vs threshold 3% → height ratio
        const have = (viz.pct / viz.target) * 100
        return (
            <svg viewBox="0 0 100 100" className="problem-x__viz problem-x__viz--threshold">
                {/* threshold line */}
                <motion.line
                    x1="10"
                    x2="90"
                    y1="20"
                    y2="20"
                    className="problem-x__viz-threshold-line"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, delay }}
                />
                <text x="90" y="14" className="problem-x__viz-threshold-label" textAnchor="end">
                    healthy threshold
                </text>
                {/* "have" bar */}
                <motion.rect
                    x="30"
                    width="40"
                    className="problem-x__viz-bar"
                    initial={{ y: 90, height: 0 }}
                    animate={isInView ? { y: 90 - (90 - 20) * (have / 100) * 0.95, height: (90 - 20) * (have / 100) * 0.95 } : {}}
                    transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <line x1="10" x2="90" y1="90" y2="90" className="problem-x__viz-baseline" />
            </svg>
        )
    }

    if (viz.type === 'compare') {
        const max = viz.sa
        const saH = (viz.sa / max) * 70
        const worldH = (viz.world / max) * 70
        return (
            <svg viewBox="0 0 100 100" className="problem-x__viz problem-x__viz--compare">
                {/* SA bar */}
                <motion.rect
                    x="20"
                    width="22"
                    className="problem-x__viz-bar"
                    initial={{ y: 90, height: 0 }}
                    animate={isInView ? { y: 90 - saH, height: saH } : {}}
                    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* World bar */}
                <motion.rect
                    x="58"
                    width="22"
                    className="problem-x__viz-bar problem-x__viz-bar--muted"
                    initial={{ y: 90, height: 0 }}
                    animate={isInView ? { y: 90 - worldH, height: worldH } : {}}
                    transition={{ duration: 1.2, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
                <line x1="10" x2="90" y1="90" y2="90" className="problem-x__viz-baseline" />
                <text x="31" y="98" className="problem-x__viz-bar-label" textAnchor="middle">SA</text>
                <text x="69" y="98" className="problem-x__viz-bar-label" textAnchor="middle">WORLD</text>
            </svg>
        )
    }

    if (viz.type === 'decay') {
        // 100 dots, 6% missing — visualised as a 10x10 grid where 6 are faded
        const total = 100
        const missing = viz.pct
        const dots = Array.from({ length: total }, (_, i) => i)
        return (
            <svg viewBox="0 0 100 100" className="problem-x__viz problem-x__viz--decay">
                {dots.map((d) => {
                    const col = d % 10
                    const row = Math.floor(d / 10)
                    const isMissing = d < missing
                    return (
                        <motion.circle
                            key={d}
                            cx={10 + col * 9}
                            cy={10 + row * 9}
                            r="2"
                            className={isMissing ? 'problem-x__viz-dot is-lost' : 'problem-x__viz-dot'}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: isMissing ? 0.18 : 1, scale: 1 } : {}}
                            transition={{ duration: 0.4, delay: delay + d * 0.005 }}
                        />
                    )
                })}
            </svg>
        )
    }

    return null
}

const ProblemSection = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    return (
        <section className="problem-x" id="problem" ref={sectionRef}>
            <div className="problem-x__inner">
                <div className="problem-x__header">
                    <SectionLabel number="01" label="The Problem" />
                    <motion.h2
                        className="problem-x__statement"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Modern farming has <em>mined</em> the soil.
                    </motion.h2>

                    <motion.p
                        className="problem-x__lede"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        Decades of synthetic fertiliser and chemical pesticide have stripped soil biology,
                        depleted organic matter, and locked critical minerals out of reach.
                    </motion.p>
                </div>

                <ol className="problem-x__index">
                    {stats.map((stat, i) => {
                        const decimals = String(stat.display).includes('.') ? 1 : 0
                        return (
                            <motion.li
                                key={stat.display}
                                className="problem-x__row"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="problem-x__row-n">0{i + 1}</span>

                                <div className="problem-x__row-viz">
                                    <StatViz viz={stat.viz} isInView={isInView} delay={0.4 + i * 0.12} />
                                </div>

                                <div className="problem-x__row-figures">
                                    <span className="problem-x__row-value">
                                        <CountUp
                                            to={stat.value}
                                            decimals={decimals}
                                            delay={0.3 + i * 0.1}
                                            isInView={isInView}
                                        />
                                        <span className="problem-x__row-suffix">{stat.suffix}</span>
                                    </span>
                                    <span className="problem-x__row-unit">{stat.unit}</span>
                                </div>

                                <div className="problem-x__row-text">
                                    <p className="problem-x__row-label">{stat.label}</p>
                                    <span className="problem-x__row-source">— {stat.source}</span>
                                </div>
                            </motion.li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}

export default ProblemSection

import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import './WhatToExpectSection.css'

/**
 * What To Expect — distinct identity from MissionSection.
 * Treatment: a growth-curve timeline. Three phases plotted along an
 * animated bezier "soil-health" curve. Each milestone has a tick on the
 * x-axis (time) and an editorial card hanging off the curve.
 */

const phases = [
    {
        num: '01',
        year: 'Year 1',
        kicker: 'Foundation',
        // y position on the chart (0 = baseline, 100 = ceiling)
        y: 28,
        // horizontal position (% of chart width)
        x: 18,
        teaser: '~30% reduction in fertiliser cost on targeted zones.',
        bullets: [
            'Targeting high-value crop zones, underperforming areas, and nursery',
            '~30% reduction in fertiliser cost on targeted land',
            'Improved yield and quality on treated zones',
        ],
        metric: { value: '−30%', label: 'fertiliser cost' },
    },
    {
        num: '02',
        year: 'Year 2+',
        kicker: 'Soil Recovery',
        y: 56,
        x: 50,
        teaser: 'Soil microbiology restored — nutrients cycling without chemistry.',
        bullets: [
            'Scaling to treat larger parts of the land — up to ~30%',
            'Soil microbiology restored and actively cycling nutrients',
            'Reduced chemical dependency across treated areas',
        ],
        metric: { value: '~30%', label: 'land treated' },
    },
    {
        num: '03',
        year: 'Year 3+',
        kicker: 'Land Regeneration',
        y: 84,
        x: 82,
        teaser: 'Up to ~60% reduction in fertiliser cost. Healthy, living soil.',
        bullets: [
            'Treating ~50%+ of total farmland',
            'Up to ~60% reduction in fertiliser cost',
            'Healthy, living soil with consistent yields season after season',
        ],
        metric: { value: '−60%', label: 'fertiliser cost' },
    },
]

// SVG chart geometry (viewBox 1000x420 with 60px padding)
const CHART_W = 1000
const CHART_H = 420
const PAD_L = 70
const PAD_R = 60
const PAD_T = 50
const PAD_B = 70
const innerW = CHART_W - PAD_L - PAD_R
const innerH = CHART_H - PAD_T - PAD_B

const toX = (xPct) => PAD_L + (xPct / 100) * innerW
const toY = (yPct) => PAD_T + innerH - (yPct / 100) * innerH

// Bezier path through baseline → phase1 → phase2 → phase3
const buildCurve = () => {
    const p0 = { x: PAD_L, y: toY(8) }
    const p1 = { x: toX(phases[0].x), y: toY(phases[0].y) }
    const p2 = { x: toX(phases[1].x), y: toY(phases[1].y) }
    const p3 = { x: toX(phases[2].x), y: toY(phases[2].y) }
    const p4 = { x: PAD_L + innerW, y: toY(92) }
    return (
        `M ${p0.x},${p0.y} ` +
        `C ${p0.x + 80},${p0.y} ${p1.x - 80},${p1.y} ${p1.x},${p1.y} ` +
        `S ${p2.x - 90},${p2.y} ${p2.x},${p2.y} ` +
        `S ${p3.x - 90},${p3.y} ${p3.x},${p3.y} ` +
        `S ${p4.x - 30},${p4.y - 8} ${p4.x},${p4.y}`
    )
}

const CURVE = buildCurve()

const WhatToExpectSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.25 })

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.85', 'end 0.4'],
    })
    const curveLength = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <section className="wte-x" id="what-to-expect" ref={ref}>
            <div className="wte-x__inner">
                <header className="wte-x__header">
                    <SectionLabel number="04" label="What to Expect" />
                </header>

                <motion.div
                    className="wte-x__intro"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="wte-x__heading">
                        Soil doesn't recover overnight — <em>but it compounds.</em>
                    </h2>
                </motion.div>

                {/* === Growth-curve chart === */}
                <div className="wte-x__chart-wrap" aria-hidden="false">
                    <svg
                        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                        className="wte-x__chart"
                        role="img"
                        aria-label="Soil-health growth curve across three phases of regeneration"
                    >
                        {/* gridlines */}
                        {[0, 25, 50, 75, 100].map((g) => (
                            <line
                                key={g}
                                x1={PAD_L}
                                x2={CHART_W - PAD_R}
                                y1={toY(g)}
                                y2={toY(g)}
                                className="wte-x__grid"
                            />
                        ))}

                        {/* y-axis labels */}
                        <text x={PAD_L - 14} y={toY(0) + 4} className="wte-x__axis-label" textAnchor="end">baseline</text>
                        <text x={PAD_L - 14} y={toY(50) + 4} className="wte-x__axis-label" textAnchor="end">recovering</text>
                        <text x={PAD_L - 14} y={toY(100) + 4} className="wte-x__axis-label" textAnchor="end">regenerated</text>

                        {/* x-axis */}
                        <line
                            x1={PAD_L}
                            x2={CHART_W - PAD_R}
                            y1={toY(0)}
                            y2={toY(0)}
                            className="wte-x__axis"
                        />

                        {/* y-axis title */}
                        <text
                            x={20}
                            y={PAD_T + innerH / 2}
                            className="wte-x__axis-title"
                            textAnchor="middle"
                            transform={`rotate(-90 20 ${PAD_T + innerH / 2})`}
                        >
                            SOIL HEALTH —→
                        </text>

                        {/* x-axis tick labels */}
                        {phases.map((p) => (
                            <g key={`xt-${p.num}`}>
                                <line
                                    x1={toX(p.x)}
                                    x2={toX(p.x)}
                                    y1={toY(0) - 4}
                                    y2={toY(0) + 6}
                                    className="wte-x__tick"
                                />
                                <text
                                    x={toX(p.x)}
                                    y={toY(0) + 24}
                                    className="wte-x__axis-label"
                                    textAnchor="middle"
                                >
                                    {p.year}
                                </text>
                            </g>
                        ))}

                        {/* shaded area under curve */}
                        <motion.path
                            d={`${CURVE} L ${CHART_W - PAD_R},${toY(0)} L ${PAD_L},${toY(0)} Z`}
                            className="wte-x__curve-fill"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 1.5, delay: 0.6 }}
                        />

                        {/* the curve itself — draws on scroll */}
                        <motion.path
                            d={CURVE}
                            className="wte-x__curve"
                            style={{ pathLength: curveLength }}
                        />

                        {/* phase nodes */}
                        {phases.map((p, i) => (
                            <g key={p.num}>
                                {/* dotted dropline to x-axis */}
                                <motion.line
                                    x1={toX(p.x)}
                                    x2={toX(p.x)}
                                    y1={toY(p.y)}
                                    y2={toY(0)}
                                    className="wte-x__dropline"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 1.0 + i * 0.25 }}
                                />
                                {/* node halo */}
                                <motion.circle
                                    cx={toX(p.x)}
                                    cy={toY(p.y)}
                                    r="14"
                                    className="wte-x__node-halo"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 1.1 + i * 0.25 }}
                                />
                                {/* node core */}
                                <motion.circle
                                    cx={toX(p.x)}
                                    cy={toY(p.y)}
                                    r="6"
                                    className="wte-x__node-core"
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 1.2 + i * 0.25 }}
                                />
                                {/* metric callout above */}
                                <motion.text
                                    x={toX(p.x)}
                                    y={toY(p.y) - 28}
                                    className="wte-x__node-metric"
                                    textAnchor="middle"
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 1.4 + i * 0.25 }}
                                >
                                    {p.metric.value}
                                </motion.text>
                                <motion.text
                                    x={toX(p.x)}
                                    y={toY(p.y) - 14}
                                    className="wte-x__node-metric-label"
                                    textAnchor="middle"
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 1.5 + i * 0.25 }}
                                >
                                    {p.metric.label}
                                </motion.text>
                            </g>
                        ))}
                    </svg>
                </div>

                {/* === Phase cards === */}
                <div className="wte-x__cards">
                    {phases.map((p, i) => (
                        <motion.article
                            key={p.num}
                            className="wte-x__card"
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <header className="wte-x__card-head">
                                <span className="wte-x__card-num">{p.num}</span>
                                <span className="wte-x__card-rule" />
                                <span className="wte-x__card-kicker">{p.kicker}</span>
                            </header>
                            <h3 className="wte-x__card-title">{p.year}</h3>
                            <p className="wte-x__card-teaser">{p.teaser}</p>
                            <ul className="wte-x__card-bullets">
                                {p.bullets.map((b) => (
                                    <li key={b}>{b}</li>
                                ))}
                            </ul>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhatToExpectSection

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './KZNMapSection.css'

/**
 * Editorial erosion-risk panel for South Africa.
 *
 * Approach: instead of attempting hand-drawn province polygons (which read
 * as inaccurate), we treat this as a piece of editorial infographic.
 *  – A simplified, recognisable SA outline (single path, bone fill).
 *  – Three radial-gradient "heat zones" where erosion is most severe.
 *  – Editorial labels with hairline connector lines.
 *  – A right-hand data ledger that does the credibility work.
 */

const HOT_ZONES = [
    {
        id: 'limpopo',
        name: 'Limpopo',
        share: '76%',
        copy: 'Northern bushveld — overgrazing and soil capping at scale.',
        cx: 388,
        cy: 118,
        radius: 70,
        labelX: 540,
        labelY: 112,
        anchor: 'start',
    },
    {
        id: 'kzn',
        name: 'KwaZulu-Natal',
        share: '71%',
        copy: 'Sub-tropical hill country — runoff and gully formation.',
        cx: 470,
        cy: 312,
        radius: 64,
        labelX: 555,
        labelY: 305,
        anchor: 'start',
    },
    {
        id: 'eastern-cape',
        name: 'Eastern Cape',
        share: '68%',
        copy: 'Communal lands — historic over-cultivation and topsoil loss.',
        cx: 348,
        cy: 442,
        radius: 72,
        labelX: 110,
        labelY: 488,
        anchor: 'end',
    },
]

const LEDGER = [
    { label: 'Limpopo', value: 76, source: 'DAFF land-care audit' },
    { label: 'KwaZulu-Natal', value: 71, source: 'ARC erosion atlas' },
    { label: 'Eastern Cape', value: 68, source: 'NRF / WRC mapping' },
    { label: 'National avg.', value: 47, source: 'DFFE, 2022', muted: true },
]

// Simplified-but-recognisable SA outline. Single closed path drawn from
// approximate geographic anchors (NW corner clockwise to Cape Point).
const SA_OUTLINE =
    'M 90 152 ' +
    'C 130 138, 178 130, 218 128 ' +
    'L 252 96 ' +
    'C 304 84, 360 80, 416 86 ' +
    'L 478 78 ' +
    'C 522 92, 552 118, 568 158 ' +
    'L 575 196 ' +
    'C 568 218, 548 230, 530 244 ' +
    'L 530 268 ' +
    'C 548 290, 552 318, 540 348 ' +
    'C 525 380, 510 408, 488 432 ' +
    'C 460 458, 428 478, 392 488 ' +
    'L 358 498 ' +
    'C 318 510, 274 514, 232 502 ' +
    'C 190 488, 154 462, 128 428 ' +
    'C 100 392, 82 348, 76 302 ' +
    'C 72 258, 76 212, 90 168 ' +
    'Z'

// Lesotho — the doughnut hole inside KZN/Free-State/EC.
const LESOTHO =
    'M 408 318 ' +
    'C 432 308, 458 314, 470 332 ' +
    'C 478 350, 470 368, 452 372 ' +
    'C 428 374, 408 364, 402 346 ' +
    'C 398 332, 400 322, 408 318 Z'

const KZNMapSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.25 })

    return (
        <section className="kzn-x" ref={ref}>
            <div className="kzn-x__inner">
                {/* LEFT — editorial header + ledger */}
                <motion.div
                    className="kzn-x__head"
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="kzn-x__eyebrow">Erosion Risk · 2022</span>
                    <h3 className="kzn-x__title">
                        Where the topsoil is <em>going</em> first.
                    </h3>
                    <p className="kzn-x__sub">
                        Three provinces carry the bulk of South Africa's most severely
                        degraded farmland. Limpopo, KwaZulu-Natal and the Eastern Cape
                        are losing topsoil at <em>five times</em> the global average.
                    </p>

                    <div className="kzn-x__ledger" role="table" aria-label="Share of degraded farmland by province">
                        {LEDGER.map((row, i) => (
                            <motion.div
                                key={row.label}
                                className={`kzn-x__ledger-row${row.muted ? ' is-muted' : ''}`}
                                initial={{ opacity: 0, x: -16 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                            >
                                <span className="kzn-x__ledger-label">{row.label}</span>
                                <div className="kzn-x__ledger-bar-wrap">
                                    <motion.div
                                        className="kzn-x__ledger-bar"
                                        initial={{ scaleX: 0 }}
                                        animate={isInView ? { scaleX: row.value / 100 } : {}}
                                        transition={{ duration: 1.1, delay: 0.7 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                </div>
                                <span className="kzn-x__ledger-value">{row.value}%</span>
                            </motion.div>
                        ))}
                        <p className="kzn-x__source">
                            Sources: DFFE 2022 · ARC erosion atlas · WRC / NRF mapping
                        </p>
                    </div>
                </motion.div>

                {/* RIGHT — map */}
                <div className="kzn-x__map-wrap">
                    <svg
                        viewBox="0 0 720 580"
                        className="kzn-x__svg"
                        aria-label="Map of South Africa highlighting Limpopo, KwaZulu-Natal and Eastern Cape as highest erosion-risk provinces"
                        role="img"
                    >
                        <defs>
                            {HOT_ZONES.map((z) => (
                                <radialGradient
                                    key={`grad-${z.id}`}
                                    id={`heat-${z.id}`}
                                    cx="50%"
                                    cy="50%"
                                    r="50%"
                                >
                                    <stop offset="0%" stopColor="var(--clay)" stopOpacity="0.95" />
                                    <stop offset="45%" stopColor="var(--clay)" stopOpacity="0.55" />
                                    <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
                                </radialGradient>
                            ))}
                            <pattern
                                id="kzn-grain"
                                x="0"
                                y="0"
                                width="3"
                                height="3"
                                patternUnits="userSpaceOnUse"
                            >
                                <circle cx="0.5" cy="0.5" r="0.4" fill="rgba(255,255,255,0.06)" />
                            </pattern>
                        </defs>

                        {/* faint contour rings — atmospheric */}
                        {[180, 240, 300].map((r, i) => (
                            <motion.circle
                                key={r}
                                cx="320"
                                cy="290"
                                r={r}
                                fill="none"
                                stroke="rgba(247,245,240,0.05)"
                                strokeWidth="1"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 1.4, delay: 0.2 + i * 0.12 }}
                            />
                        ))}

                        {/* country outline */}
                        <motion.path
                            d={SA_OUTLINE}
                            className="kzn-x__country"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                            transition={{ pathLength: { duration: 1.6, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.4 } }}
                        />

                        {/* fill — applied after outline draws */}
                        <motion.path
                            d={SA_OUTLINE}
                            className="kzn-x__country-fill"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        />

                        {/* grain overlay clipped to country */}
                        <motion.path
                            d={SA_OUTLINE}
                            fill="url(#kzn-grain)"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 1.4 }}
                        />

                        {/* Lesotho cut-out */}
                        <motion.path
                            d={LESOTHO}
                            className="kzn-x__lesotho"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 1.5 }}
                        />

                        {/* heat zones */}
                        {HOT_ZONES.map((z, i) => (
                            <motion.circle
                                key={z.id}
                                cx={z.cx}
                                cy={z.cy}
                                r={z.radius}
                                fill={`url(#heat-${z.id})`}
                                style={{ mixBlendMode: 'screen' }}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 1.0, delay: 1.6 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                            />
                        ))}

                        {/* pulse cores */}
                        {HOT_ZONES.map((z, i) => (
                            <g key={`core-${z.id}`}>
                                <motion.circle
                                    cx={z.cx}
                                    cy={z.cy}
                                    r="4"
                                    fill="var(--clay)"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 2.0 + i * 0.18 }}
                                />
                                <motion.circle
                                    cx={z.cx}
                                    cy={z.cy}
                                    r="4"
                                    fill="none"
                                    stroke="var(--clay)"
                                    strokeWidth="1.5"
                                    initial={{ scale: 1, opacity: 0 }}
                                    animate={isInView ? { scale: [1, 4], opacity: [0.7, 0] } : {}}
                                    transition={{ duration: 2.4, delay: 2.2 + i * 0.18, repeat: Infinity, repeatDelay: 0.8 }}
                                />
                            </g>
                        ))}

                        {/* connector lines + labels */}
                        {HOT_ZONES.map((z, i) => {
                            const x1 = z.cx
                            const y1 = z.cy
                            const x2 = z.labelX
                            const y2 = z.labelY
                            return (
                                <g key={`label-${z.id}`}>
                                    <motion.line
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke="rgba(247,245,240,0.4)"
                                        strokeWidth="1"
                                        strokeDasharray="2 3"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                        transition={{ duration: 0.7, delay: 2.2 + i * 0.18 }}
                                    />
                                    <motion.text
                                        x={x2}
                                        y={y2 - 6}
                                        textAnchor={z.anchor}
                                        className="kzn-x__label-name"
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 2.5 + i * 0.18 }}
                                    >
                                        {z.name}
                                    </motion.text>
                                    <motion.text
                                        x={x2}
                                        y={y2 + 16}
                                        textAnchor={z.anchor}
                                        className="kzn-x__label-share"
                                        initial={{ opacity: 0 }}
                                        animate={isInView ? { opacity: 1 } : {}}
                                        transition={{ duration: 0.5, delay: 2.65 + i * 0.18 }}
                                    >
                                        {z.share} degraded
                                    </motion.text>
                                </g>
                            )
                        })}

                        {/* compass + scale, decorative */}
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 3.0 }}
                        >
                            <text x="640" y="540" className="kzn-x__compass-n" textAnchor="middle">N</text>
                            <line x1="640" y1="510" x2="640" y2="528" stroke="rgba(247,245,240,0.5)" strokeWidth="1" />
                            <polygon points="636,514 640,506 644,514" fill="rgba(247,245,240,0.7)" />
                        </motion.g>
                    </svg>

                    <motion.div
                        className="kzn-x__map-caption"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 2.8 }}
                    >
                        <span className="kzn-x__caption-dot" />
                        <span>Highest erosion risk · share of provincial farmland degraded</span>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default KZNMapSection

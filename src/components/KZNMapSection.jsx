import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import './KZNMapSection.css'

const PROVINCES = [
    {
        id: 'northern-cape',
        name: 'Northern Cape',
        path: 'M 55 185 L 195 160 L 225 185 L 260 270 L 265 340 L 245 415 L 190 450 L 120 470 L 60 440 L 40 370 L 38 290 Z',
        highlight: false,
        labelX: 120, labelY: 330,
    },
    {
        id: 'western-cape',
        name: 'Western Cape',
        path: 'M 120 470 L 190 450 L 245 415 L 270 440 L 295 490 L 310 530 L 260 555 L 180 555 L 110 530 L 90 500 Z',
        highlight: false,
        labelX: 200, labelY: 510,
    },
    {
        id: 'eastern-cape',
        name: 'Eastern Cape',
        path: 'M 245 415 L 265 340 L 310 330 L 365 355 L 415 370 L 450 395 L 475 430 L 460 490 L 415 530 L 340 550 L 295 530 L 270 490 L 295 490 L 270 440 Z',
        highlight: true,
        labelX: 365, labelY: 460,
    },
    {
        id: 'free-state',
        name: 'Free State',
        path: 'M 260 270 L 310 250 L 365 255 L 405 245 L 440 265 L 455 305 L 450 345 L 415 370 L 365 355 L 310 330 L 265 340 Z',
        highlight: false,
        labelX: 355, labelY: 305,
    },
    {
        id: 'north-west',
        name: 'North West',
        path: 'M 225 185 L 285 195 L 325 215 L 340 250 L 310 250 L 260 270 L 225 260 L 195 245 L 185 210 Z',
        highlight: false,
        labelX: 265, labelY: 228,
    },
    {
        id: 'gauteng',
        name: 'Gauteng',
        path: 'M 340 215 L 390 205 L 405 230 L 405 245 L 365 255 L 340 250 L 325 215 Z',
        highlight: false,
        labelX: 368, labelY: 235,
    },
    {
        id: 'mpumalanga',
        name: 'Mpumalanga',
        path: 'M 390 205 L 460 170 L 510 190 L 520 245 L 500 280 L 460 285 L 440 265 L 405 245 L 405 230 Z',
        highlight: false,
        labelX: 455, labelY: 240,
    },
    {
        id: 'limpopo',
        name: 'Limpopo',
        path: 'M 205 60 L 555 60 L 565 175 L 510 190 L 460 170 L 390 205 L 340 215 L 285 195 L 225 185 L 195 160 Z',
        highlight: true,
        labelX: 370, labelY: 125,
    },
    {
        id: 'kwazulu-natal',
        name: 'KwaZulu-Natal',
        path: 'M 390 205 L 405 230 L 440 265 L 460 285 L 500 280 L 530 310 L 545 355 L 530 400 L 510 425 L 475 430 L 450 395 L 415 370 L 450 345 L 455 305 L 440 265 L 405 245 L 405 230 Z',
        highlight: true,
        labelX: 480, labelY: 345,
    },
]

const LEGEND = [
    { color: 'var(--clay)', label: 'Highest erosion risk' },
    { color: 'var(--bone)', label: 'Other provinces' },
]

const KZNMapSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    return (
        <section className="kzn-x" ref={ref}>
            <div className="kzn-x__inner">
                <motion.div
                    className="kzn-x__head"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="kzn-x__eyebrow">Erosion Risk</span>
                    <h3 className="kzn-x__title">
                        Areas with the highest <em>erosion risk</em> potential
                    </h3>
                    <p className="kzn-x__sub">
                        Limpopo, KwaZulu-Natal and the Eastern Cape carry the highest concentration
                        of severely degraded farmland in South Africa.
                    </p>
                </motion.div>

                <div className="kzn-x__map-wrap">
                    <svg
                        viewBox="0 0 620 580"
                        className="kzn-x__svg"
                        aria-label="Map of South Africa showing provinces with highest erosion risk"
                        role="img"
                    >
                        {/* Base provinces */}
                        {PROVINCES.map((p, i) => (
                            <motion.path
                                key={p.id}
                                d={p.path}
                                className={`kzn-x__province${p.highlight ? ' kzn-x__province--hi' : ''}`}
                                initial={{ opacity: 0 }}
                                animate={isInView ? {
                                    opacity: 1,
                                    fill: p.highlight ? 'var(--clay)' : 'var(--bone)',
                                } : {}}
                                transition={{
                                    opacity: { duration: 0.5, delay: i * 0.06 },
                                    fill: { duration: 0.9, delay: 0.4 + i * 0.06, ease: 'easeOut' },
                                }}
                            />
                        ))}

                        {/* Province border outlines */}
                        {PROVINCES.map((p) => (
                            <path
                                key={`border-${p.id}`}
                                d={p.path}
                                className="kzn-x__border"
                            />
                        ))}

                        {/* Labels for highlighted provinces */}
                        {PROVINCES.filter(p => p.highlight).map((p, i) => (
                            <motion.text
                                key={`label-${p.id}`}
                                x={p.labelX}
                                y={p.labelY}
                                className="kzn-x__label"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.6, delay: 1.0 + i * 0.15 }}
                                textAnchor="middle"
                            >
                                {p.name}
                            </motion.text>
                        ))}

                        {/* Pulse dots on highlighted provinces */}
                        {[
                            { cx: 370, cy: 125 },
                            { cx: 480, cy: 345 },
                            { cx: 365, cy: 460 },
                        ].map((dot, i) => (
                            <motion.circle
                                key={i}
                                cx={dot.cx}
                                cy={dot.cy}
                                r={5}
                                className="kzn-x__dot"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                transition={{ duration: 0.4, delay: 1.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            />
                        ))}
                    </svg>

                    {/* Legend */}
                    <motion.div
                        className="kzn-x__legend"
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 1.3 }}
                    >
                        {LEGEND.map(l => (
                            <div key={l.label} className="kzn-x__legend-item">
                                <span className="kzn-x__legend-dot" style={{ background: l.color }} />
                                <span>{l.label}</span>
                            </div>
                        ))}
                        <p className="kzn-x__source">
                            Source: Dept. of Agriculture / ARC, South Africa
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default KZNMapSection

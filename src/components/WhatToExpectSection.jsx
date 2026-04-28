import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import './WhatToExpectSection.css'

const phases = [
    {
        num: '01',
        year: 'Year 1',
        kicker: 'Foundation',
        teaser: '~30% reduction in fertiliser cost on targeted zones.',
        bullets: [
            'Targeting high-value crop zones, underperforming areas, and nursery',
            '~30% reduction in fertiliser cost on targeted land',
            'Improved yield and quality on treated zones',
        ],
    },
    {
        num: '02',
        year: 'Year 2+',
        kicker: 'Soil Recovery',
        teaser: 'Soil microbiology restored — nutrients cycling without chemistry.',
        bullets: [
            'Scaling to treat larger parts of the land — up to ~30%',
            'Soil microbiology restored and actively cycling nutrients',
            'Reduced chemical dependency across treated areas',
        ],
    },
    {
        num: '03',
        year: 'Year 3+',
        kicker: 'Land Regeneration',
        teaser: 'Up to ~60% reduction in fertiliser cost. Healthy, living soil.',
        bullets: [
            'Treating ~50%+ of total farmland',
            'Up to ~60% reduction in fertiliser cost',
            'Healthy, living soil with consistent yields season after season',
        ],
    },
]

const WhatToExpectSection = () => {
    const [open, setOpen] = useState(0)

    return (
        <section className="wte-x" id="what-to-expect">
            <div className="wte-x__inner">
                <header className="wte-x__header">
                    <SectionLabel number="04" label="What to Expect" />
                </header>

                <motion.blockquote
                    className="wte-x__quote"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="wte-x__drop">S</span>oil doesn't recover overnight —<br />
                    <em>but it compounds.</em>
                </motion.blockquote>

                <motion.p
                    className="wte-x__deck"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    Simple implementation. Measurable results. Scalable growth — year on year, the returns
                    increase as your soil biology rebuilds from the ground up.
                </motion.p>

                <div className="wte-x__pillars" role="list">
                    {phases.map((phase, i) => {
                        const isOpen = open === i
                        return (
                            <motion.div
                                key={phase.num}
                                className={`wte-x__row${isOpen ? ' is-open' : ''}`}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                onMouseEnter={() => setOpen(i)}
                                onClick={() => setOpen(i)}
                                role="listitem"
                            >
                                <span className="wte-x__row-num">{phase.num}</span>

                                <div className="wte-x__row-head">
                                    <span className="wte-x__row-kicker">{phase.kicker}</span>
                                    <h3 className="wte-x__row-title">{phase.year}</h3>
                                </div>

                                <p className="wte-x__row-teaser">{phase.teaser}</p>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.ul
                                            key="bullets"
                                            className="wte-x__row-body"
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: 'auto', marginTop: '1.4rem' }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            {phase.bullets.map((b) => (
                                                <li key={b}>{b}</li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default WhatToExpectSection

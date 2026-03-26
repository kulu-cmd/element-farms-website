import React from 'react'
import { motion } from 'framer-motion'
import './WhatToExpectSection.css'

const cards = [
    {
        year: 'Year 1',
        label: 'Foundation',
        bullets: [
            'Targeting high-value crop zones, underperforming areas, and nursery',
            '30% reduction in fertiliser cost on targeted land',
            'Improved yield and quality on treated zones',
        ],
    },
    {
        year: 'Year 2+',
        label: 'Soil Recovery',
        bullets: [
            'Scaling to treat larger parts of the land — up to 30%',
            'Soil microbiology restored and actively cycling nutrients',
            'Reduced chemical dependency across treated areas',
        ],
    },
    {
        year: 'Year 3+',
        label: 'Land Regeneration',
        bullets: [
            'Treating 50%+ of total farmland',
            'Up to 60% reduction in fertiliser cost',
            'Healthy, living soil with consistent yields season after season',
        ],
    },
]

const cardVariants = {
    hidden: (i) => ({ opacity: 0, y: 50, x: i === 0 ? -30 : i === 2 ? 30 : 0, scale: 0.95 }),
    visible: (i) => ({
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 },
    }),
}

const WhatToExpectSection = () => {
    return (
        <>
            {/* Sub-section A */}
            <section className="wte-a">
                <div className="wte-a__inner">
                    <h2 className="wte-a__heading">What to Expect</h2>

                    <div className="wte-a__pills">
                        <span className="wte-a__pill">Simple Implementation</span>
                        <span className="wte-a__dot">·</span>
                        <span className="wte-a__pill">Measurable Results</span>
                        <span className="wte-a__dot">·</span>
                        <span className="wte-a__pill">Scalable Growth</span>
                    </div>

                    <div className="wte-a__grid">
                        {cards.map((card, i) => (
                            <motion.div
                                key={card.year}
                                className="wte-a__card"
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <h3 className="wte-a__card-year">{card.year}</h3>
                                <span className="wte-a__card-label">{card.label}</span>
                                <hr className="wte-a__card-rule" />
                                <ul className="wte-a__card-list">
                                    {card.bullets.map((bullet) => (
                                        <li key={bullet} className="wte-a__card-item">
                                            <span className="wte-a__bullet">●</span>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    )
}

export default WhatToExpectSection

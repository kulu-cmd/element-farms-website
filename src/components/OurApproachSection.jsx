import React from 'react'
import { motion } from 'framer-motion'
import './OurApproachSection.css'

const steps = [
    {
        num: '01',
        label: 'Diagnose',
        kicker: 'The land first',
        body: "We walk the fields. We sample the soil. We assess flooding, sun stress, biology, mineral balance, and the wider environmental pressures acting on your farm. Nothing is prescribed before the diagnosis is honest.",
        image: '/approach/diagnose.jpg',
    },
    {
        num: '02',
        label: 'Design',
        kicker: 'A plan, not a product',
        body: "From the diagnosis we design a regenerative plan — targeted soil amendments, biological inputs, protective treatments, and sequencing — shaped by what this specific land needs to return to health.",
        image: '/approach/design.jpg',
    },
    {
        num: '03',
        label: 'Recycle',
        kicker: 'Close the nutrient loop',
        body: "Where possible, we convert your own agricultural waste into high-value compost and regenerative inputs. The nutrient loop closes, the input bill falls, and the farm begins to feed itself.",
        image: '/approach/recycle.jpg',
    },
    {
        num: '04',
        label: 'Restore',
        kicker: 'Compound the gains',
        body: "We implement, monitor, and adjust. Soil biology rebuilds season by season. Chemical dependence drops. Resilience — and profitability — compounds year over year.",
        image: '/approach/restore.jpg',
    },
]

const OurApproachSection = () => {
    return (
        <section className="approach-x" id="about-us">
            <div className="approach-x__inner">

                {/* Header */}
                <motion.header
                    className="approach-x__header"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="approach-x__eyebrow">— Our Approach</span>
                    <h2 className="approach-x__heading">
                        A four-step <em>method</em><br />
                        built for the long <em>view</em>.
                    </h2>
                </motion.header>

                {/* Photo cards grid */}
                <div className="approach-x__cards">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            className="approach-x__card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.18 }}
                            transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Full-bleed photo */}
                            <img
                                src={step.image}
                                alt={`${step.label} — Element Farm Solutions`}
                                className="approach-x__card-photo"
                                loading="lazy"
                            />

                            {/* Dark gradient overlay */}
                            <div className="approach-x__card-overlay" aria-hidden="true" />

                            {/* Card content */}
                            <div className="approach-x__card-content">
                                {/* Top row: number + kicker / label */}
                                <div className="approach-x__card-top">
                                    <span className="approach-x__card-num">{step.num}</span>
                                    <div className="approach-x__card-meta">
                                        <span className="approach-x__card-kicker">{step.kicker}</span>
                                        <span className="approach-x__card-label">{step.label}</span>
                                    </div>
                                </div>

                                {/* Bottom: description */}
                                <div className="approach-x__card-bottom">
                                    <p className="approach-x__card-body">{step.body}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default OurApproachSection

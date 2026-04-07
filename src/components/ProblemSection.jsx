import React from 'react'
import { motion } from 'framer-motion'
import './ProblemSection.css'

const stats = [
    {
        value: '~ 70 %',
        label: 'of South Africa farmland shows signs of degradation',
    },
    {
        value: '~ 2–5 %',
        label: 'annual yield loss from poor soil health',
    },
    {
        value: '$ 68 B',
        label: 'cost of soil degradation across Africa yearly',
    },
]

const ProblemSection = () => {
    return (
        <section className="problem-section">
            <div className="problem-section__inner">
                <motion.h2
                    className="problem-section__heading"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    The Problem With Modern Farming
                </motion.h2>
                <motion.p
                    className="problem-section__body"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Decades of synthetic fertilisers and chemical pesticides have degraded South Africa's farmland.<br />
                    Soil biology has been stripped, organic matter depleted, and minerals locked out of reach. The result?<br />
                    Farmers spend more every season on inputs that deliver diminishing returns.
                </motion.p>

                <div className="problem-section__grid">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.value}
                            className="problem-section__card"
                            initial={{ opacity: 0, y: 48, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="problem-section__card-value">{stat.value}</span>
                            <span className="problem-section__card-label">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProblemSection

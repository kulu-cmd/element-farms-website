import React from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import './ProblemSection.css'

const stats = [
    {
        value: '70%',
        unit: 'of farmland',
        label: 'in South Africa shows signs of degradation — biology stripped, minerals locked, margins eroding.',
        source: 'DFFE, 2022',
    },
    {
        value: '58%',
        unit: 'of farmed soil',
        label: 'contains less than 0.5% organic matter — far below the threshold for productive biological activity.',
        source: 'ARC, 2021',
    },
    {
        value: '12.6 t/ha',
        unit: 'per year',
        label: 'of fertile topsoil is lost to erosion — five times the world average of 2.4 t/ha.',
        source: 'Le Roux, 2014 · Wuepper et al., 2020',
    },
    {
        value: '6%',
        unit: 'of soil carbon',
        label: 'has been lost from agricultural soils in southern Africa due to continuous conventional cultivation.',
        source: 'Swanepoel et al., 2018',
    },
]

const ProblemSection = () => {
    return (
        <section className="problem-x" id="problem">
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
                    {stats.map((stat, i) => (
                        <motion.li
                            key={stat.value}
                            className="problem-x__row"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="problem-x__row-n">0{i + 1}</span>
                            <div className="problem-x__row-figures">
                                <span className="problem-x__row-value">{stat.value}</span>
                                <span className="problem-x__row-unit">{stat.unit}</span>
                            </div>
                            <p className="problem-x__row-label">{stat.label}</p>
                            <span className="problem-x__row-source">— {stat.source}</span>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

export default ProblemSection

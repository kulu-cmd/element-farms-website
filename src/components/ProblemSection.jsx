import React from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import StatIndex from './ui/StatIndex'
import './ProblemSection.css'

const stats = [
    {
        value: 70,
        display: '70',
        suffix: '%',
        unit: 'of farmland',
        label: 'in South Africa shows signs of degradation — biology stripped, minerals locked, margins eroding.',
        source: 'DFFE, 2022',
    },
    {
        value: 58,
        display: '58',
        suffix: '%',
        unit: 'of farmed soil',
        label: 'contains less than 0.5% organic matter — far below the threshold for productive biological activity.',
        source: 'ARC, 2021',
    },
    {
        value: 12.6,
        display: '12.6',
        suffix: 't',
        unit: 'per ha / year',
        label: 'of fertile topsoil is lost to erosion — five times the world average of 2.4 t/ha.',
        source: 'Le Roux, 2014 · Wuepper et al., 2020',
    },
    {
        value: 46,
        display: '46',
        suffix: '%',
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
                    <SectionLabel label="The Problem" />
                    <motion.h2
                        className="problem-x__statement"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Modern farming has <em>mined</em> the soil.
                    </motion.h2>
                </div>

                <StatIndex stats={stats} className="problem-x__index" />
            </div>
        </section>
    )
}

export default ProblemSection

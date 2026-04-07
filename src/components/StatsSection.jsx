import React from 'react'
import { motion } from 'framer-motion'
import './StatsSection.css'

const StatsSection = () => {
    const stats = [
        {
            value: '~ 70 %',
            label: "of South Africa's land surface is affected by some form of soil erosion",
        },
        {
            value: '300 - 400 million tonnes',
            label: 'of fertile top soil is lost annually in South Africa',
        },
        {
            value: '> ~ 80 %',
            label: 'of South African soils are classified as low or moderate agricultural potential',
        },
    ]

    return (
        <section className="stats">
            <div className="stats__container">
                <motion.h2
                    className="stats__heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                >
                    South African soil is under pressure
                </motion.h2>

                <div className="stats__grid">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stats__card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <h3 className="stats__value">{stat.value}</h3>
                            <p className="stats__label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StatsSection

import React from 'react'
import { motion } from 'framer-motion'
import './ErosionRiskSection.css'

const ErosionRiskSection = () => {
    return (
        <section className="erosion">
            <div className="erosion__header">
                <h2 className="erosion__title">Areas with the highest erosion risk potential</h2>
            </div>
            
            <div className="erosion__container">
                <div className="erosion__content">
                    <motion.div
                        className="erosion__stat"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="erosion__stat-text">Farmers can lose <span className="erosion__highlight">~2–5%</span> yield annually</p>
                        <p className="erosion__stat-subtext">on moderately eroding land without conservation practices.</p>
                    </motion.div>

                    <motion.div
                        className="erosion__stat"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                    >
                        <p className="erosion__stat-text">Soil degradation in Africa causes</p>
                        <p className="erosion__highlight-large">~$68 billion</p>
                        <p className="erosion__stat-subtext text-center">annual losses in crop productivity.</p>
                    </motion.div>
                </div>

                <div className="erosion__map-side">
                    <motion.div
                        className="erosion__map-container"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7 }}
                    >
                        <img src="/erode_map.png" alt="South Africa Map with Erosion Risk" className="erosion__map-img" />
                    </motion.div>
                    <p className="erosion__source" style={{ textAlign: 'right', fontSize: '0.8rem', color: 'rgba(43,43,43,0.45)', marginTop: '20px' }}>
                        South African Dept. of Agriculture / Agricultural Research Council (ARC)
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ErosionRiskSection

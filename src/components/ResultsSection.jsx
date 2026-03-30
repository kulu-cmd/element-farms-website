import React from 'react'
import { motion } from 'framer-motion'
import './ResultsSection.css'

const ResultsSection = () => {
    return (
        <section className="results">
            <div className="results__header">
                <div className="results__header-inner">
                    <h2 className="results__title">See the Results</h2>
                </div>
            </div>
            
            <div className="results__intro-container">
                <p className="results__intro-text">
                    Our regenerative solutions help farms rebuild soil biology, reduce dependency on synthetic inputs, and improve long-term crop performance.
                </p>
            </div>

            <div className="results__cards-container">
                <motion.div 
                    className="results__card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="results__card-value">~30 - 50<span className="results__percent">%</span></h3>
                    <p className="results__card-label">decrease in chemical<br/>fertilizer output</p>
                </motion.div>

                <motion.div 
                    className="results__card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="results__card-value">~+1 - 2<span className="results__percent">%</span></h3>
                    <p className="results__card-label">increase in soil organic matter</p>
                </motion.div>

                <motion.div 
                    className="results__card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="results__card-value">~10 - 25<span className="results__percent">%</span></h3>
                    <p className="results__card-label">crop yield improvement</p>
                </motion.div>
            </div>

            <div className="results__image-container">
                <motion.img 
                    src="/3.png" 
                    alt="Farming Results" 
                    className="results__image"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                />
            </div>
        </section>
    )
}

export default ResultsSection

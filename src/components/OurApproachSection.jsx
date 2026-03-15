import React from 'react'
import { motion } from 'framer-motion'
import './OurApproachSection.css'

const OurApproachSection = () => {
    return (
        <section className="approach">
            <div className="approach__header">
                <h2 className="approach__title">Our Approach</h2>
            </div>
            
            <div className="approach__container">
                <div className="approach__column approach__column--left">
                    <motion.div 
                        className="approach__card"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="approach__card-title">Diagnose</h3>
                        <p className="approach__card-text">
                            We begin by evaluating your farm's soil health, crop conditions, and 
                            environmental pressures such as flooding, sun stress, and nutrient imbalance.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="approach__card"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="approach__card-title">Restore</h3>
                        <p className="approach__card-text">
                            Our regenerative inputs improve soil structure, increase nutrient retention, and 
                            strengthen crop resilience, supporting higher yields with fewer chemical inputs.
                        </p>
                    </motion.div>
                </div>

                <motion.div 
                    className="approach__column approach__column--center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <img src="/5.png" alt="Regenerative Cycle" className="approach__center-image" 
                         onError={(e) => { e.target.src = '/1.png' }} />
                </motion.div>

                <div className="approach__column approach__column--right">
                    <motion.div 
                        className="approach__card"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="approach__card-title">Design</h3>
                        <p className="approach__card-text text-right">
                            Based on your farm's needs, we recommend targeted solutions including 
                            organic soil amendments, anti-flooding treatments and sun protection.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="approach__card"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="approach__card-title">Recycle</h3>
                        <p className="approach__card-text text-right">
                            Where suitable, we help farms convert agricultural waste into high-value 
                            compost, closing the nutrient loop and reducing input costs.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default OurApproachSection

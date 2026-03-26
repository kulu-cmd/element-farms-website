import React from 'react'
import { motion } from 'framer-motion'
import StatsSection from './StatsSection'
import ErosionRiskSection from './ErosionRiskSection'
import OurApproachSection from './OurApproachSection'
import Footer from './Footer'
import Header from './Header'
import './LandRejuvenationPage.css'

const LandRejuvenationPage = () => {
    return (
        <div className="land-regen">
            <Header />
            {/* Hero Banner */}
            <section className="land-regen__hero">
                <div className="land-regen__hero-inner">
                    <motion.div
                        className="land-regen__icon"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="19" stroke="white" strokeWidth="2"/>
                            <line x1="20" y1="10" x2="20" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            <line x1="10" y1="20" x2="30" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </motion.div>

                    <motion.h1
                        className="land-regen__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Land Rejuvenation
                    </motion.h1>

                    <motion.p
                        className="land-regen__subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Not all soil is created equal. We help farms build regenerative systems that
                        restore soil biology, unlock nutrients, and break free from chemical dependence.
                    </motion.p>
                </div>
            </section>

            {/* Soil Stats — South African Soil is under pressure */}
            <StatsSection />

            {/* Problem heading + Erosion Risk */}
            <div className="land-regen__problem-heading">
                <h2>The Problem With Modern Farming</h2>
            </div>
            <ErosionRiskSection />

            {/* Approach & rest of page */}
            <OurApproachSection />
            <Footer />
        </div>
    )
}

export default LandRejuvenationPage

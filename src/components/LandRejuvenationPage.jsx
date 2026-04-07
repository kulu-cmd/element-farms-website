import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import StatsSection from './StatsSection'
import ErosionRiskSection from './ErosionRiskSection'
import ProblemSection from './ProblemSection'
import TailoredSolutionSection from './TailoredSolutionSection'
import VideoSection from './VideoSection'
import WhatToExpectSection from './WhatToExpectSection'
import Footer from './Footer'
import Header from './Header'
import './LandRejuvenationPage.css'

const LandRejuvenationPage = () => {
    const { scrollY } = useScroll()
    const heroY = useTransform(scrollY, [0, 400], [0, 80])
    const heroOpacity = useTransform(scrollY, [0, 350], [1, 0])

    return (
        <div className="land-regen">
            <Header />

            {/* Hero Banner */}
            <section className="land-regen__hero">
                <motion.div
                    className="land-regen__hero-inner"
                    style={{ y: heroY, opacity: heroOpacity }}
                >
                    <motion.h1
                        className="land-regen__title"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Land Rejuvenation
                    </motion.h1>

                    <motion.p
                        className="land-regen__subtitle"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                    >
                        We teach and implement highly effective regenerative farming systems to small and medium-sized farms. Our goal is to empower farmers and not rely on large corporation supply chains of expensive chemical fertiliser.
                    </motion.p>

                    <motion.div
                        className="land-regen__hero-scroll-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                    >
                        <motion.span
                            animate={{ y: [0, 6, 0] }}
                            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                        >
                            ↓
                        </motion.span>
                    </motion.div>
                </motion.div>
            </section>

            {/* Soil Stats */}
            <StatsSection />

            {/* Erosion Risk */}
            <ErosionRiskSection />

            {/* Problem Stats */}
            <ProblemSection />

            {/* Our Process */}
            <TailoredSolutionSection />

            {/* Video */}
            <VideoSection />

            {/* What to Expect */}
            <WhatToExpectSection />

            <Footer />
        </div>
    )
}

export default LandRejuvenationPage

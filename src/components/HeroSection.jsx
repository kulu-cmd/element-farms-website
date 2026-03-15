import React from 'react'
import { motion } from 'framer-motion'
import './HeroSection.css'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: 'easeOut', delay },
    }),
}

const HeroSection = () => {
    return (
        <section className="hero" id="home">
            {/* Background glow / depth layer */}
            <div className="hero__bg-overlay" />

            <div className="hero__content">
                {/* Text side */}
                <div className="hero__text">
                    <motion.h1
                        className="hero__headline"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.3}
                    >
                        Regenerating Soil,<br />
                        Restoring Profitability.
                    </motion.h1>

                    <motion.p
                        className="hero__subtext"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.55}
                    >
                        Transform agricultural waste into regenerative soil inputs that rebuild
                        fertility and reduce chemical dependence.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.75}
                    >
                        <a 
                            href="https://docs.google.com/forms/d/18f14G-hCciPDNnAgy9ITvT8iedrzmZ5K3zb37G_ca5Q/edit" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hero__cta" 
                            id="start-farm-trial-btn"
                            style={{ display: 'inline-block', textDecoration: 'none' }}
                        >
                            START A FARM TRIAL
                        </a>
                    </motion.div>
                </div>

                {/* Image side */}
                <motion.div
                    className="hero__image-wrap"
                    initial={{ opacity: 0, x: 60, rotate: -4 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
                >
                    <img
                        src="/1.png"
                        alt="Flowering plant branch"
                        className="hero__flower"
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection

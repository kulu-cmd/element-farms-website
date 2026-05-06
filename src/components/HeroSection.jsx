import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import './HeroSection.css'

/* Split headline — each word renders as a rising mask reveal */
const HeadlineWord = ({ children, delay, italic }) => {
    return (
        <span className="hero-x__mask">
            <motion.span
                className={`hero-x__word ${italic ? 'hero-x__word--italic' : ''}`}
                initial={{ y: '110%', rotate: 5 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay }}
            >
                {children}
            </motion.span>
        </span>
    )
}

const HeroSection = () => {
    const heroRef = useRef(null)
    const prefersReduced = useReducedMotion()

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })

    const bgY     = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
    const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

    return (
        <section className="hero-x" id="home" ref={heroRef}>
            {/* Duotone background photo */}
            <motion.div
                className="hero-x__bg"
                style={prefersReduced ? undefined : { y: bgY, scale: bgScale }}
            >
                <div className="hero-x__bg-image" />
                <div className="hero-x__bg-ink" />
                <div className="hero-x__bg-clay" />
                <div className="hero-x__bg-vignette" />
            </motion.div>

            {/* Editorial grid content */}
            <motion.div
                className="hero-x__grid"
                style={prefersReduced ? undefined : { y: textY }}
            >
                {/* Eyebrow, top-left */}
                <motion.div
                    className="hero-x__eyebrow"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                >
                    <span className="hero-x__eyebrow-mark">◦</span>
                    <span>Regenerative Agriculture, est. KZN · Free State · Gauteng</span>
                </motion.div>

                {/* Headline */}
                <h1 className="hero-x__headline">
                    <span className="hero-x__line">
                        <HeadlineWord delay={0.35}>Regenerating</HeadlineWord>{' '}
                        <HeadlineWord delay={0.48} italic>soil,</HeadlineWord>
                    </span>
                    <span className="hero-x__line">
                        <HeadlineWord delay={0.62}>restoring</HeadlineWord>{' '}
                        <HeadlineWord delay={0.76} italic>profitability.</HeadlineWord>
                    </span>
                </h1>

                {/* CTA */}
                <motion.div
                    className="hero-x__deck"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                >
                    <a
                        href="https://docs.google.com/forms/d/18f14G-hCciPDNnAgy9ITvT8iedrzmZ5K3zb37G_ca5Q/edit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-x__cta"
                        id="start-farm-trial-btn"
                    >
                        <span className="hero-x__cta-text">Start a farm trial</span>
                        <span className="hero-x__cta-arrow" aria-hidden="true">→</span>
                    </a>
                </motion.div>

            </motion.div>
        </section>
    )
}

export default HeroSection

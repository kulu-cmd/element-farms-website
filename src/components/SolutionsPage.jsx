import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import './SolutionsPage.css'

const SOLUTIONS = [
    {
        id: 'land',
        category: 'Agriculture',
        title: 'Land Rejuvenation',
        sub: 'Soil restoration & organic matter',
        to: '/solutions/land-rejuvenation',
        accent: 'moss',
    },
    {
        id: 'flood',
        category: 'Agriculture',
        title: 'Anti-Flooding',
        sub: 'Water retention & drainage',
        to: '/solutions/anti-flooding',
        accent: 'clay',
    },
    {
        id: 'uv',
        category: 'Agriculture',
        title: 'Sun & Pest Shield',
        sub: 'UV protection for orchards',
        to: '/solutions/uv-protection',
        accent: 'ochre',
    },
    {
        id: 'poultry',
        category: 'Livestock',
        title: 'Poultry Solutions',
        sub: 'Mineral bedding treatment',
        to: '/solutions/poultry',
        accent: 'bone',
    },
]

const EASE = [0.22, 1, 0.36, 1]

/* ── page curtain — sweeps up from bottom ── */
const Curtain = () => (
    <motion.div
        className="sol-curtain"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
    />
)

/* ── individual solution card ── */
const SolCard = ({ solution, index }) => (
    <motion.div
        className={`sol-card sol-card--${solution.accent}`}
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: EASE, delay: 0.6 + index * 0.1 }}
    >
        <Link to={solution.to} className="sol-card__inner">
            <div className="sol-card__top">
                <span className="sol-card__category">{solution.category}</span>
            </div>

            <div className="sol-card__body">
                <h2 className="sol-card__title">{solution.title}</h2>
                <p className="sol-card__sub">{solution.sub}</p>
            </div>

            <div className="sol-card__foot">
                <span className="sol-card__cta">
                    Explore
                    <svg className="sol-card__arrow" viewBox="0 0 20 10" fill="none">
                        <path d="M0 5h18M13 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                <span className="sol-card__line" aria-hidden="true" />
            </div>
        </Link>
    </motion.div>
)

const SolutionsPage = () => (
    <motion.div
        className="sol-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
    >
        <Curtain />

        <Header />

        <main className="sol-main">
            {/* ── hero text ── */}
            <div className="sol-hero">
                <motion.span
                    className="sol-hero__eyebrow"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
                >
                    Our Solutions
                </motion.span>

                <motion.h1
                    className="sol-hero__heading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: EASE, delay: 0.65 }}
                >
                    What we do<br /><em>for your land.</em>
                </motion.h1>

                <motion.p
                    className="sol-hero__sub"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
                >
                    Regenerative systems, tailored to your operation.
                </motion.p>
            </div>

            {/* ── grid ── */}
            <div className="sol-grid">
                {SOLUTIONS.map((s, i) => (
                    <SolCard key={s.id} solution={s} index={i} />
                ))}
            </div>
        </main>

        <Footer />
    </motion.div>
)

export default SolutionsPage

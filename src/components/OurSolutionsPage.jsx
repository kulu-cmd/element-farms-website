import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Header from './Header'
import SolutionsTabs from './SolutionsTabs'
import ResultsMetrics from './ResultsMetrics'
import OurProcessSection from './OurProcessSection'
import CTABand from './CTABand'
import Footer from './Footer'
import { SOLUTION_CATEGORIES, solutionsByCategory } from '../data/solutionsData'
import './OurSolutionsPage.css'

/*
 * /solutions — the standalone Solutions overview.
 *
 * Replaces the header mega-menu that used to carry this content. The hero
 * keeps that menu's editorial composition (kicker + split headline with the
 * clay italic), and the category columns are expanded into photo cards that
 * link out to each solution's own page. SolutionsTabs below the hero is the
 * same bar the four solution pages carry, so the section navigates as one.
 */

const EASE = [0.22, 1, 0.36, 1]

const SolutionCard = ({ solution, index, prefersReduced }) => (
    <motion.article
        className="os-card"
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
    >
        <Link to={solution.to} className="os-card__link">
            <div className="os-card__media">
                <img src={solution.image} alt="" loading="lazy" />
            </div>
            <div className="os-card__body">
                <span className="os-card__num">{solution.num}</span>
                <h3 className="os-card__title">{solution.title}</h3>
                <p className="os-card__hint">{solution.hint}</p>
                <p className="os-card__blurb">{solution.blurb}</p>
                <span className="os-card__cta">
                    Explore solution
                    <span className="os-card__arrow" aria-hidden="true">&#8594;</span>
                </span>
            </div>
        </Link>
    </motion.article>
)

const OurSolutionsPage = () => {
    const prefersReduced = useReducedMotion()

    return (
        <div className="our-solutions compact-header">
            <Header />

            {/* Hero — the mega-menu's composition, given a full page to breathe */}
            <section className="os-hero">
                <div className="os-hero__inner">
                    <motion.span
                        className="os-hero__kicker"
                        initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                    >
                        &mdash; Our Solutions
                    </motion.span>

                    <motion.h1
                        className="os-hero__heading"
                        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                    >
                        Regenerative systems,<br />
                        <em>tailored to your land.</em>
                    </motion.h1>

                    <motion.p
                        className="os-hero__lede"
                        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                    >
                        We read your soil, your water and your climate first, then build
                        the treatment around what the land is actually short of.
                    </motion.p>
                </div>
            </section>

            <SolutionsTabs />

            {/* The four solutions, grouped as they were in the menu */}
            <section className="os-solutions">
                {SOLUTION_CATEGORIES.map((cat) => {
                    const items = solutionsByCategory(cat.id)
                    if (!items.length) return null
                    return (
                        <div key={cat.id} className="os-group">
                            <div className="os-group__header">
                                <span className={`os-group__label os-group__label--${cat.tone}`}>
                                    {cat.label}
                                </span>
                                <span className="os-group__desc">{cat.desc}</span>
                            </div>
                            <div className="os-group__grid">
                                {items.map((solution, i) => (
                                    <SolutionCard
                                        key={solution.id}
                                        solution={solution}
                                        index={i}
                                        prefersReduced={prefersReduced}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </section>

            <ResultsMetrics />

            <OurProcessSection />

            <CTABand
                heading="Not sure which system fits?"
                subtext="Book a farm assessment. We walk the fields, read the soil, and map a path forward before recommending anything."
                primaryLabel="Book an assessment"
                primaryTo="/contact/agri-farms"
                secondaryLabel="Talk to us first"
                secondaryTo="/contact"
                tone="moss"
            />

            <Footer />
        </div>
    )
}

export default OurSolutionsPage

import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CircleDots } from './BrandMotifs'
import './TailoredSolutionSection.css'

const items = [
    {
        problem: "My soils are dead. Nothing holds moisture, yields are dropping, and I can't afford to keep buying inputs that don't work.",
        solution: {
            tag: 'Regenerative Systems',
            title: 'On-farm composting that closes the loop.',
            body: 'Closed-loop compost that rebuilds microbial life — produced on-farm from your own waste.',
            href: '/contact/agri-farms',
            isExternal: false,
        },
    },
    {
        problem: "I've done soil tests but can't figure out what's actually missing — and I keep throwing money at more urea or NPK fertilisers.",
        solution: {
            tag: 'M-TerraBoost',
            title: 'A mineral blend built for our soils.',
            body: 'A slow-release blend restoring the four minerals South African soils are missing.',
            href: '#mterra-detail',
            isExternal: false,
            isAnchor: true,
        },
    },
    {
        problem: "We're losing seedlings to transplant shock. By the time roots establish, we've already lost the season.",
        solution: {
            tag: 'Combined System',
            title: 'A nursery-stage stimulus medium.',
            body: 'Compost biology + M-TerraBoost minerals — deeper roots, less transplant shock.',
            href: '/contact/agri-farms',
            isExternal: false,
        },
    },
]

const FindOutMore = ({ href, isAnchor }) => {
    if (isAnchor) {
        return (
            <a href={href} className="solutions-x__more">
                <span>Find out more</span>
                <span className="solutions-x__more-arrow" aria-hidden="true">→</span>
            </a>
        )
    }
    return (
        <Link to={href} className="solutions-x__more">
            <span>Find out more</span>
            <span className="solutions-x__more-arrow" aria-hidden="true">→</span>
        </Link>
    )
}

const TailoredSolutionSection = () => {
    const slideIn = {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    }

    return (
        <section className="solutions-x" id="solutions">
            <div className="solutions-x__inner">

                {/* Section eyebrow only — no left lede column */}
                <motion.div
                    className="solutions-x__eyebrow-row"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <CircleDots size={26} strokeWidth={9} />
                    <span className="solutions-x__eyebrow-label">Our Solutions</span>
                </motion.div>

                {/* Problem → Solution rows */}
                <motion.ol
                    className="solutions-x__list"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
                    }}
                >
                    {items.map((item, i) => (
                        <motion.li
                            key={item.solution.tag}
                            className="solutions-x__row"
                            variants={slideIn}
                        >
                            <span className="solutions-x__num">{String(i + 1).padStart(2, '0')}</span>

                            <div className="solutions-x__pair">
                                <div className="solutions-x__col solutions-x__col--problem">
                                    <span className="solutions-x__col-tag">Problem</span>
                                    <p className="solutions-x__quote">
                                        <span className="solutions-x__quote-mark" aria-hidden="true">“</span>
                                        {item.problem}
                                        <span className="solutions-x__quote-mark solutions-x__quote-mark--close" aria-hidden="true">”</span>
                                    </p>
                                </div>

                                <div className="solutions-x__arrow" aria-hidden="true">
                                    <svg viewBox="0 0 40 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 8 H36" />
                                        <path d="M28 2 L36 8 L28 14" />
                                    </svg>
                                </div>

                                <div className="solutions-x__col solutions-x__col--solution">
                                    <span className="solutions-x__col-tag solutions-x__col-tag--solution">{item.solution.tag}</span>
                                    <h3 className="solutions-x__col-title">{item.solution.title}</h3>
                                    <p className="solutions-x__col-body">{item.solution.body}</p>
                                    <div className="solutions-x__col-cta">
                                        <FindOutMore href={item.solution.href} isAnchor={item.solution.isAnchor} />
                                    </div>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </motion.ol>

            </div>
        </section>
    )
}

export default TailoredSolutionSection

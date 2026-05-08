import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CircleDots } from './BrandMotifs'
import './TailoredSolutionSection.css'

const NURSERY_BULLETS = [
    {
        title: 'Biology activates instantly.',
        body: 'Microbes colonise the root zone the day a seedling is potted.',
    },
    {
        title: 'Minerals build the structure.',
        body: 'Silica and calcium drive cell division and root-wall integrity from day one.',
    },
    {
        title: 'Roots go deeper, faster.',
        body: 'Plants leave the nursery with the root system of a much older seedling — transplant shock drops, survival rates rise.',
    },
    {
        title: 'Works across all crop types.',
        body: 'Vegetables, orchards, lucerne, ornamentals — the same stimulus medium accelerates every nursery stage.',
    },
]

const items = [
    {
        problem: "My soils are dead. Nothing holds moisture, yields are dropping, and I can't afford to keep buying inputs that don't work.",
        solution: {
            tag: 'Regenerative Systems',
            title: 'On-farm composting that closes the loop.',
            body: 'Closed-loop compost that rebuilds microbial life — produced on-farm from your own waste.',
            href: '/contact/agri-farms',
        },
    },
    {
        problem: "I've done soil tests but can't figure out what's actually missing — and I keep throwing money at more urea or NPK fertilisers.",
        solution: {
            tag: 'M-TerraBoost',
            title: 'A mineral blend built for our soils.',
            body: 'A slow-release blend restoring the four minerals South African soils are missing.',
            href: '#mterra-detail',
            isAnchor: true,
        },
    },
    {
        problem: "We're losing seedlings to transplant shock. By the time roots establish, we've already lost the season.",
        solution: {
            tag: 'Combined System',
            title: 'A nursery-stage stimulus medium.',
            body: 'Compost biology + M-TerraBoost minerals — deeper roots, less transplant shock.',
            isModal: true,
        },
    },
]

const FindOutMore = ({ href, isAnchor, isModal, onOpen }) => {
    const arrow = <span className="solutions-x__more-arrow" aria-hidden="true">→</span>
    if (isModal) {
        return (
            <button type="button" className="solutions-x__more" onClick={onOpen}>
                <span>Find out more</span>
                {arrow}
            </button>
        )
    }
    if (isAnchor) {
        return (
            <a href={href} className="solutions-x__more">
                <span>Find out more</span>
                {arrow}
            </a>
        )
    }
    return (
        <Link to={href} className="solutions-x__more">
            <span>Find out more</span>
            {arrow}
        </Link>
    )
}

const NurseryModal = ({ open, onClose }) => {
    useEffect(() => {
        if (!open) return
        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
        }
    }, [open, onClose])

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="nursery-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="nursery-modal-title"
                >
                    <motion.div
                        className="nursery-modal__panel"
                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.97 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="nursery-modal__close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <span>Close</span>
                            <span aria-hidden="true">×</span>
                        </button>

                        <div className="nursery-modal__grid">
                            <div className="nursery-modal__copy">
                                <header className="nursery-modal__head">
                                    <span className="nursery-modal__num">03</span>
                                    <span className="nursery-modal__rule" aria-hidden="true" />
                                    <span className="nursery-modal__tag">Combined System</span>
                                </header>

                                <h2 id="nursery-modal-title" className="nursery-modal__title">
                                    Supercharge your <em>nurseries.</em>
                                </h2>

                                <p className="nursery-modal__lede">
                                    The first 30 days of root development determine the entire
                                    season. We combine composting systems and M-TerraBoost into a
                                    nursery-stage stimulus medium that gives seedlings the strongest
                                    possible start.
                                </p>

                                <ul className="nursery-modal__list">
                                    {NURSERY_BULLETS.map((b) => (
                                        <li key={b.title}>
                                            <strong>{b.title}</strong> {b.body}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <figure className="nursery-modal__figure">
                                <img
                                    src="/land_rejuv/nurseries.png"
                                    alt="Nursery seedlings — root development"
                                    loading="lazy"
                                />
                            </figure>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const TailoredSolutionSection = () => {
    const [modalOpen, setModalOpen] = useState(false)
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
                                        <FindOutMore
                                            href={item.solution.href}
                                            isAnchor={item.solution.isAnchor}
                                            isModal={item.solution.isModal}
                                            onOpen={() => setModalOpen(true)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </motion.ol>

            </div>

            <NurseryModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    )
}

export default TailoredSolutionSection

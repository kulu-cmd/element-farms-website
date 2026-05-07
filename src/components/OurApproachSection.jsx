import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CircleDots } from './BrandMotifs'
import './OurApproachSection.css'

const steps = [
    {
        num: '01',
        label: 'Diagnose',
        kicker: 'Pinpoint Issues',
        body: "We walk the fields, sample the soil, assess flooding, sun stress, biology, mineral balance, and the wider environmental pressures acting on your farm. Nothing is prescribed before the diagnosis.",
        image: '/approach/diagnose.jpg',
    },
    {
        num: '02',
        label: 'Design',
        kicker: 'A plan, not a product',
        body: "From the diagnosis we design a regenerative plan — targeted soil amendments, biological inputs and protective treatments — shaped by what this specific land needs to return to health.",
        image: '/approach/design.jpg',
    },
    {
        num: '03',
        label: 'Recycle',
        kicker: 'Close the nutrient loop',
        body: "Where possible, we convert your own agricultural waste into high-value compost and regenerative inputs. The nutrient loop closes, the input cost decreases, and the farm begins to feed itself.",
        image: '/approach/recycle.jpg',
    },
    {
        num: '04',
        label: 'Restore',
        kicker: 'Sustainable Farming',
        body: "We implement, monitor, and adjust so that soil biology rebuilds season by season. Chemical dependence drops; resilience and profitability compounds year over year.",
        image: '/approach/restore.jpg',
    },
]

const OurApproachSection = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const handleToggle = (i) => {
        setOpenIndex((prev) => (prev === i ? null : i))
    }

    return (
        <section className="approach-x" id="about-us">
            <div className="approach-x__inner">

                {/* Header */}
                <motion.header
                    className="approach-x__header"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="approach-x__eyebrow">
                        <CircleDots size={22} strokeWidth={11} />
                        Our Approach
                    </span>
                    <h2 className="approach-x__heading">
                        A practical <em>four-step framework</em><br />
                        for the <em>long run</em>.
                    </h2>
                    <p className="approach-x__hint">
                        <span className="approach-x__hint-dot" aria-hidden="true">＋</span>
                        Tap any card to read the detail
                    </p>
                </motion.header>

                {/* Photo cards grid */}
                <div className="approach-x__cards">
                    {steps.map((step, i) => {
                        const isOpen = openIndex === i
                        return (
                            <motion.button
                                key={step.num}
                                type="button"
                                onClick={() => handleToggle(i)}
                                aria-expanded={isOpen}
                                aria-label={`${step.label} — ${isOpen ? 'hide' : 'reveal'} detail`}
                                className={`approach-x__card ${isOpen ? 'is-open' : ''}`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.18 }}
                                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Full-bleed photo */}
                                <img
                                    src={step.image}
                                    alt={`${step.label} — Element Farm Solutions`}
                                    className="approach-x__card-photo"
                                    loading="lazy"
                                />

                                {/* Dark gradient overlay */}
                                <div className="approach-x__card-overlay" aria-hidden="true" />

                                {/* DEFAULT (closed) state */}
                                <div className="approach-x__card-default">
                                    <div className="approach-x__card-top">
                                        <span className="approach-x__card-num">{step.num}</span>
                                        <span className="approach-x__card-kicker-frame">
                                            <span className="approach-x__card-kicker">{step.kicker}</span>
                                        </span>
                                    </div>
                                    <h3 className="approach-x__card-label">{step.label}</h3>
                                    <span className="approach-x__card-cue" aria-hidden="true">
                                        <span className="approach-x__card-cue-mark">+</span>
                                        Read more
                                    </span>
                                </div>

                                {/* REVEAL (open) state */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            className="approach-x__card-reveal"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="approach-x__card-reveal-inner">
                                                <div className="approach-x__card-reveal-meta">
                                                    <span className="approach-x__card-reveal-num">{step.num}</span>
                                                    <span className="approach-x__card-reveal-divider" aria-hidden="true" />
                                                    <span className="approach-x__card-reveal-label">{step.label}</span>
                                                </div>
                                                <motion.p
                                                    className="approach-x__card-reveal-body"
                                                    initial={{ opacity: 0, y: 12 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                                >
                                                    {step.body}
                                                </motion.p>
                                                <span className="approach-x__card-reveal-close" aria-hidden="true">
                                                    <span className="approach-x__card-reveal-close-mark">×</span>
                                                    Close
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

export default OurApproachSection

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import './OurApproachSection.css'

const steps = [
    {
        num: '01',
        label: 'Diagnose',
        kicker: 'The land first',
        body: "We walk the fields. We sample the soil. We assess flooding, sun stress, biology, mineral balance, and the wider environmental pressures acting on your farm. Nothing is prescribed before the diagnosis is honest.",
        image: '/approach/diagnose.jpg',
    },
    {
        num: '02',
        label: 'Design',
        kicker: 'A plan, not a product',
        body: "From the diagnosis we design a regenerative plan — targeted soil amendments, biological inputs, protective treatments, and sequencing — shaped by what this specific land needs to return to health.",
        image: '/approach/design.jpg',
    },
    {
        num: '03',
        label: 'Recycle',
        kicker: 'Close the nutrient loop',
        body: "Where possible, we convert your own agricultural waste into high-value compost and regenerative inputs. The nutrient loop closes, the input bill falls, and the farm begins to feed itself.",
        image: '/approach/recycle.jpg',
    },
    {
        num: '04',
        label: 'Restore',
        kicker: 'Compound the gains',
        body: "We implement, monitor, and adjust. Soil biology rebuilds season by season. Chemical dependence drops. Resilience — and profitability — compounds year over year.",
        image: '/approach/restore.jpg',
    },
]

const OurApproachSection = () => {
    const [active, setActive] = useState(0)
    const step = steps[active]

    return (
        <section className="approach-x" id="about-us">
            <div className="approach-x__inner">
                <header className="approach-x__header">
                    <SectionLabel label="Our Approach" tone="paper" />
                    <motion.h2
                        className="approach-x__heading"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        A four-step <em>method</em><br/>
                        built for the long <em>view</em>.
                    </motion.h2>
                </header>

                <div className="approach-x__tabs" role="tablist" aria-label="Approach steps">
                    {steps.map((s, i) => (
                        <button
                            key={s.num}
                            type="button"
                            role="tab"
                            aria-selected={active === i}
                            className={`approach-x__tab ${active === i ? 'is-active' : ''}`}
                            onClick={() => setActive(i)}
                        >
                            <span className="approach-x__tab-num">{s.num}</span>
                            <span className="approach-x__tab-label">{s.label}</span>
                            {active === i && (
                                <motion.span
                                    className="approach-x__tab-bar"
                                    layoutId="approach-tab-bar"
                                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="approach-x__panel" role="tabpanel">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step.num}
                            className="approach-x__slide is-active"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="approach-x__icon-frame">
                                <img
                                    className="approach-x__icon-photo"
                                    src={step.image}
                                    alt={`${step.label} — Element Farm Solutions approach step`}
                                    loading="lazy"
                                />
                                <span className="approach-x__icon-num">{step.num}</span>
                                <span className="approach-x__icon-caption">{step.label}</span>
                            </div>
                            <div className="approach-x__copy">
                                <span className="approach-x__step-kicker">{step.kicker}</span>
                                <h3 className="approach-x__step-title">
                                    {step.label}<span className="approach-x__step-period">.</span>
                                </h3>
                                <p className="approach-x__step-body">{step.body}</p>
                                <span className="approach-x__step-marker">— {step.num} / 04</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

export default OurApproachSection

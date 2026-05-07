import React from 'react'
import { motion } from 'framer-motion'
import { CircleDots } from './BrandMotifs'
import './OurApproachSection.css'

const steps = [
    {
        num: '01',
        label: 'Diagnose',
        kicker: 'Pinpoint Issues',
        body: (
            <>
                We walk the fields, sample the soil, assess flooding, sun stress, biology, mineral balance, and the wider environmental pressures acting on your farm. <mark>Nothing is prescribed before the diagnosis.</mark>
            </>
        ),
        image: '/approach/diagnose.jpg',
    },
    {
        num: '02',
        label: 'Design',
        kicker: 'A plan, not a product',
        body: (
            <>
                From the diagnosis we design a regenerative plan — <mark>targeted soil amendments, biological inputs and protective treatments</mark> — shaped by what this specific land needs to return to health.
            </>
        ),
        image: '/approach/design.jpg',
    },
    {
        num: '03',
        label: 'Recycle',
        kicker: 'Close the nutrient loop',
        body: (
            <>
                Where possible, we convert your own agricultural waste into high-value compost and regenerative inputs. <mark>The nutrient loop closes, the input cost decreases, and the farm begins to feed itself.</mark>
            </>
        ),
        image: '/approach/recycle.jpg',
    },
    {
        num: '04',
        label: 'Restore',
        kicker: 'Sustainable Farming',
        body: (
            <>
                We implement, monitor, and adjust so that soil biology rebuilds season by season. <mark>Chemical dependence drops; resilience and profitability compounds year over year.</mark>
            </>
        ),
        image: '/approach/restore.jpg',
    },
]

const OurApproachSection = () => {
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
                </motion.header>

                {/* Photo cards grid */}
                <div className="approach-x__cards">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            className="approach-x__card"
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

                            {/* Dark gradient overlay (front) */}
                            <div className="approach-x__card-overlay" aria-hidden="true" />

                            {/* FRONT (resting) */}
                            <div className="approach-x__card-front">
                                <div className="approach-x__card-top">
                                    <span className="approach-x__card-num">{step.num}</span>
                                    <span className="approach-x__card-kicker">{step.kicker}</span>
                                </div>

                                <div className="approach-x__card-titleblock">
                                    <h3 className="approach-x__card-label">{step.label}</h3>
                                </div>
                            </div>

                            {/* BACK (hover) — moss panel + body */}
                            <div className="approach-x__card-back" aria-hidden="true">
                                <div className="approach-x__card-back-meta">
                                    <span className="approach-x__card-back-num">{step.num}</span>
                                    <span className="approach-x__card-back-label">{step.label}</span>
                                </div>
                                <p className="approach-x__card-body">{step.body}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default OurApproachSection

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import './OurApproachSection.css'

const steps = [
    {
        num: '01',
        label: 'Diagnose',
        kicker: 'The land first',
        body: "We walk the fields. We sample the soil. We assess flooding, sun stress, biology, mineral balance, and the wider environmental pressures acting on your farm. Nothing is prescribed before the diagnosis is honest.",
        icon: 'magnifier',
    },
    {
        num: '02',
        label: 'Design',
        kicker: 'A plan, not a product',
        body: "From the diagnosis we design a regenerative plan — targeted soil amendments, biological inputs, protective treatments, and sequencing — shaped by what this specific land needs to return to health.",
        icon: 'compass',
    },
    {
        num: '03',
        label: 'Recycle',
        kicker: 'Close the nutrient loop',
        body: "Where possible, we convert your own agricultural waste into high-value compost and regenerative inputs. The nutrient loop closes, the input bill falls, and the farm begins to feed itself.",
        icon: 'loop',
    },
    {
        num: '04',
        label: 'Restore',
        kicker: 'Compound the gains',
        body: "We implement, monitor, and adjust. Soil biology rebuilds season by season. Chemical dependence drops. Resilience — and profitability — compounds year over year.",
        icon: 'sprout',
    },
]

const StepIcon = ({ name }) => {
    const common = { width: 64, height: 64, viewBox: '0 0 64 64', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }
    switch (name) {
        case 'magnifier':
            return (
                <svg {...common}>
                    <circle cx="27" cy="27" r="14" />
                    <path d="M37 37 L52 52" />
                    <path d="M21 27 H33 M27 21 V33" />
                </svg>
            )
        case 'compass':
            return (
                <svg {...common}>
                    <circle cx="32" cy="32" r="22" />
                    <path d="M32 14 L38 32 L32 50 L26 32 Z" />
                    <circle cx="32" cy="32" r="2" fill="currentColor" />
                </svg>
            )
        case 'loop':
            return (
                <svg {...common}>
                    <path d="M14 32 a18 18 0 0 1 36 0" />
                    <path d="M50 32 a18 18 0 0 1 -36 0" />
                    <path d="M44 22 L50 22 L50 16" />
                    <path d="M20 42 L14 42 L14 48" />
                </svg>
            )
        case 'sprout':
            return (
                <svg {...common}>
                    <path d="M32 52 V30" />
                    <path d="M32 32 C20 32 16 22 16 14 C28 14 32 22 32 30" />
                    <path d="M32 30 C44 30 48 20 48 12 C36 12 32 20 32 28" />
                    <path d="M16 52 H48" />
                </svg>
            )
        default:
            return null
    }
}

const OurApproachSection = () => {
    const trackRef = useRef(null)
    const [active, setActive] = useState(0)

    const scrollToIndex = useCallback((i) => {
        const el = trackRef.current
        if (!el) return
        const slide = el.querySelector('.approach-x__slide')
        if (!slide) return
        const w = slide.getBoundingClientRect().width
        const gap = parseFloat(getComputedStyle(el).columnGap || 0) || 0
        el.scrollTo({ left: i * (w + gap), behavior: 'smooth' })
    }, [])

    const goPrev = () => scrollToIndex(Math.max(0, active - 1))
    const goNext = () => scrollToIndex(Math.min(steps.length - 1, active + 1))

    useEffect(() => {
        const el = trackRef.current
        if (!el) return
        const onScroll = () => {
            const slide = el.querySelector('.approach-x__slide')
            if (!slide) return
            const w = slide.getBoundingClientRect().width
            const gap = parseFloat(getComputedStyle(el).columnGap || 0) || 0
            const i = Math.round(el.scrollLeft / (w + gap))
            setActive(Math.min(steps.length - 1, Math.max(0, i)))
        }
        el.addEventListener('scroll', onScroll, { passive: true })
        return () => el.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <section className="approach-x" id="about-us">
            <div className="approach-x__inner">
                <header className="approach-x__header">
                    <SectionLabel number="03" label="Our Approach" tone="paper" />
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

                <div className="approach-x__controls" role="group" aria-label="Approach steps navigation">
                    <button
                        type="button"
                        className="approach-x__ctrl"
                        onClick={goPrev}
                        disabled={active === 0}
                        aria-label="Previous step"
                    >
                        ←
                    </button>
                    <ul className="approach-x__dots" aria-hidden="true">
                        {steps.map((s, i) => (
                            <li key={s.num}>
                                <button
                                    type="button"
                                    className={`approach-x__dot ${active === i ? 'is-active' : ''}`}
                                    onClick={() => scrollToIndex(i)}
                                    aria-label={`Go to step ${i + 1}: ${s.label}`}
                                />
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        className="approach-x__ctrl"
                        onClick={goNext}
                        disabled={active === steps.length - 1}
                        aria-label="Next step"
                    >
                        →
                    </button>
                </div>

                <div className="approach-x__track" ref={trackRef}>
                    {steps.map((step, i) => (
                        <article key={step.num} className={`approach-x__slide ${active === i ? 'is-active' : ''}`}>
                            <div className="approach-x__icon-frame">
                                <span className="approach-x__icon-num">{step.num}</span>
                                <div className="approach-x__icon-glyph">
                                    <StepIcon name={step.icon} />
                                </div>
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
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurApproachSection

import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionLabel from './ui/SectionLabel'
import './CallToAction.css'

const CallToAction = () => {
    return (
        <section className="cta-x" id="contact-us">
            <div className="cta-x__inner">
                <header className="cta-x__header">
                    <SectionLabel label="Begin the trial" tone="paper" />
                </header>

                <motion.h2
                    className="cta-x__heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                    Every field is different.<br/>
                    <em>Let's talk about yours.</em>
                </motion.h2>

                <motion.p
                    className="cta-x__deck"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    A short conversation, a soil sample, a walk of the fields. That's how every trial begins —
                    and how we build a plan that works for the land you actually farm.
                </motion.p>

                <motion.div
                    className="cta-x__actions"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                >
                    <a
                        href="https://docs.google.com/forms/d/18f14G-hCciPDNnAgy9ITvT8iedrzmZ5K3zb37G_ca5Q/edit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-x__primary"
                    >
                        <span className="cta-x__primary-text">Book a farm trial</span>
                        <span className="cta-x__primary-arrow" aria-hidden="true">→</span>
                    </a>
                    <Link to="/solutions/land-rejuvenation" className="cta-x__secondary">
                        <span>Browse our solutions</span>
                        <span aria-hidden="true">→</span>
                    </Link>
                </motion.div>

                <div className="cta-x__meta">
                    <div className="cta-x__meta-item">
                        <span className="cta-x__meta-label">Write</span>
                        <a href="mailto:kamil@elementfarmsolutions.co.za" className="cta-x__meta-value">
                            kamil@elementfarmsolutions.co.za
                        </a>
                    </div>
                    <div className="cta-x__meta-item">
                        <span className="cta-x__meta-label">Call</span>
                        <a href="tel:+27613889339" className="cta-x__meta-value">+27 61 388 9339</a>
                    </div>
                    <div className="cta-x__meta-item">
                        <span className="cta-x__meta-label">Located</span>
                        <span className="cta-x__meta-value">KwaZulu-Natal, South Africa</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CallToAction

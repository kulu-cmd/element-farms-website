import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import './OrganicFarmingPage.css'

const SPRING = [0.22, 1, 0.36, 1]

const offerings = [
    {
        icon: '🌿',
        title: 'Natural Pest Control',
        desc: 'Keep pests off your crops — without a single chemical. Our natural mineral approach protects your yield while keeping your soil and pollinators healthy.',
        accent: 'var(--green-dark)',
    },
    {
        icon: '🌱',
        title: 'Organic Fertiliser',
        desc: 'Feed your soil, not just your crop. Our organic fertiliser solutions build long-term soil health and reduce your dependence on expensive synthetic inputs.',
        accent: 'var(--orange-main)',
    },
]

const reasons = [
    { value: '40%', label: 'lower input costs reported by farms that transition to organic systems within 3 years' },
    { value: '2×', label: 'longer soil water retention with improved organic matter — reducing irrigation dependency' },
    { value: '100%', label: 'natural, zero-chemical formulations — safe for workers, consumers, and ecosystems' },
]

const whoFor = [
    { icon: '🌾', title: 'Crop Farmers', desc: 'Grain, vegetable & field crop operations looking to cut input costs without sacrificing yield.' },
    { icon: '🍊', title: 'Orchards & Fruit', desc: 'Reduce sunburn, pest pressure and chemical use across citrus, mango, apple and stone fruit.' },
    { icon: '🌿', title: 'Nurseries & Herbs', desc: 'Sensitive operations that can\'t afford chemical residues on produce sold direct to consumers.' },
]

const steps = [
    { num: '01', title: 'Farm Assessment', desc: 'We assess your current inputs, soil health and pest pressure to understand your baseline.' },
    { num: '02', title: 'Tailored Programme', desc: 'A phased transition plan — replacing chemical inputs one by one with natural alternatives.' },
    { num: '03', title: 'On-Farm Support', desc: 'We walk the fields with you. Not a brochure drop — real, hands-on implementation support.' },
    { num: '04', title: 'Measure & Refine', desc: 'Track soil health, yield and input cost savings season by season as the farm transforms.' },
]

const interests = [
    'Natural Pest Control',
    'Organic Fertiliser Programme',
    'Full Organic Transition Plan',
    'Farm Assessment Visit',
]

const OrganicFarmingPage = () => {
    const [form, setForm] = useState({ name: '', mobile: '', email: '', interests: [], message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleInterest = (interest) => {
        setForm(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest],
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const body = [
            `Name: ${form.name}`,
            `Mobile: ${form.mobile}`,
            `Email: ${form.email}`,
            `Interested in: ${form.interests.join(', ') || 'Not specified'}`,
            form.message ? `Message: ${form.message}` : '',
        ].filter(Boolean).join('\n')
        window.location.href = `mailto:kamil@elementfarmsolutions.co.za?subject=Organic%20Farming%20Enquiry&body=${encodeURIComponent(body)}`
        setSubmitted(true)
    }

    return (
        <div className="organic">
            <Header />

            {/* Hero */}
            <section className="organic__hero">
                <div className="organic__hero-inner">
                    <div className="organic__hero-text">
                        <motion.span
                            className="organic__hero-badge"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: SPRING }}
                        >
                            Organic Farming
                        </motion.span>
                        <motion.h1
                            className="organic__hero-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: SPRING }}
                        >
                            Grow Your Farm.<br />Naturally.
                        </motion.h1>
                        <motion.p
                            className="organic__hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: SPRING }}
                        >
                            Complete natural pest control and fertiliser systems for small to medium farms
                            ready to break free from chemical dependency.
                        </motion.p>
                        <motion.a
                            href="#organic-form"
                            className="organic__hero-cta"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35, ease: SPRING }}
                        >
                            Start Your Organic Journey →
                        </motion.a>
                    </div>
                    <motion.div
                        className="organic__hero-deco"
                        aria-hidden="true"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: SPRING }}
                    >
                        <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
                            <circle cx="110" cy="110" r="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
                            <circle cx="110" cy="110" r="65" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5"/>
                            <circle cx="110" cy="110" r="40" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
                            <circle cx="110" cy="110" r="18" fill="rgba(14,90,54,0.5)" stroke="rgba(14,90,54,0.8)" strokeWidth="1.5"/>
                            <text x="110" y="116" textAnchor="middle" fontSize="14" fill="white" opacity="0.8">🌿</text>
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* Stats / Why */}
            <section className="organic__stats">
                <div className="organic__stats-intro">
                    <motion.span
                        className="organic__stats-eyebrow"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Why Go Organic?
                    </motion.span>
                    <motion.h2
                        className="organic__stats-headline"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: SPRING }}
                    >
                        Chemical farming is getting more expensive.<br />
                        Your soil is paying the price.
                    </motion.h2>
                    <motion.div
                        className="organic__stats-rule"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{ transformOrigin: 'left' }}
                    />
                </div>
                <div className="organic__stats-grid">
                    {reasons.map((r, i) => (
                        <motion.div
                            key={i}
                            className="organic__stat-card"
                            initial={{ opacity: 0, y: 40, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: i * 0.12, ease: SPRING }}
                        >
                            <span className="organic__stat-value">{r.value}</span>
                            <p className="organic__stat-label">{r.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Offerings */}
            <section className="organic__offerings">
                <div className="organic__offerings-inner">
                    <motion.h2
                        className="organic__offerings-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: SPRING }}
                    >
                        What We Provide
                    </motion.h2>
                    <div className="organic__offerings-grid">
                        {offerings.map((o, i) => (
                            <motion.div
                                key={i}
                                className="organic__offering-card"
                                style={{ '--card-accent': o.accent }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.65, delay: i * 0.15, ease: SPRING }}
                            >
                                <div className="organic__offering-top">
                                    <span className="organic__offering-icon">{o.icon}</span>
                                    <h3 className="organic__offering-title">{o.title}</h3>
                                </div>
                                <p className="organic__offering-desc">{o.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who it's for */}
            <section className="organic__who">
                <div className="organic__who-inner">
                    <motion.div
                        className="organic__who-text"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.7, ease: SPRING }}
                    >
                        <span className="organic__who-eyebrow">Designed For</span>
                        <h2 className="organic__who-heading">Built for small to<br />medium farms.</h2>
                        <p className="organic__who-body">
                            We don't work with large corporate operations. Our systems are built for the farmer
                            who works their own land, knows their soil, and wants a real partnership — not a product
                            brochure.
                        </p>
                    </motion.div>
                    <div className="organic__who-cards">
                        {whoFor.map((w, i) => (
                            <motion.div
                                key={i}
                                className="organic__who-card"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: SPRING }}
                            >
                                <span className="organic__who-icon">{w.icon}</span>
                                <div>
                                    <h4 className="organic__who-card-title">{w.title}</h4>
                                    <p className="organic__who-card-desc">{w.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="organic__steps">
                <div className="organic__steps-inner">
                    <motion.h2
                        className="organic__steps-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        How the Transition Works
                    </motion.h2>
                    <div className="organic__steps-grid">
                        {steps.map((s, i) => (
                            <motion.div
                                key={i}
                                className="organic__step"
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: SPRING }}
                            >
                                <span className="organic__step-num">{s.num}</span>
                                <h4 className="organic__step-title">{s.title}</h4>
                                <p className="organic__step-desc">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Did you know */}
            <section className="organic__dyk">
                <motion.div
                    className="organic__dyk-box"
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: SPRING }}
                >
                    <span className="organic__dyk-eyebrow">Did you know...</span>
                    <p className="organic__dyk-text">
                        Healthy soil with just <strong>1% more organic matter</strong> can hold an additional
                        170,000 litres of water per hectare — reducing irrigation costs and making your farm
                        more resilient to drought.
                    </p>
                </motion.div>
            </section>

            {/* Contact Form */}
            <section className="organic__form-section" id="organic-form">
                <div className="organic__form-inner">
                    <motion.div
                        className="organic__form-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: SPRING }}
                    >
                        <h2 className="organic__form-heading">Ready to Grow Organically?</h2>
                        <p className="organic__form-sub">
                            Tell us about your farm and we'll reach out to discuss the right programme for you.
                        </p>
                    </motion.div>

                    <div className="organic__form-body">
                        <motion.div
                            className="organic__form-card"
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.7, ease: SPRING }}
                        >
                            {submitted ? (
                                <div className="organic__success">
                                    <motion.div
                                        className="organic__success-icon"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, ease: SPRING }}
                                    >
                                        🌱
                                    </motion.div>
                                    <h3>You're on your way.</h3>
                                    <p>Kamil will be in touch within 24 hours to discuss your farm.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="organic__form">
                                    <div className="organic__form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input id="name" type="text" name="name" required placeholder="Your full name" value={form.name} onChange={handleChange} />
                                    </div>
                                    <div className="organic__form-row">
                                        <div className="organic__form-group">
                                            <label htmlFor="mobile">Mobile Number</label>
                                            <input id="mobile" type="tel" name="mobile" required placeholder="+27 ..." value={form.mobile} onChange={handleChange} />
                                        </div>
                                        <div className="organic__form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input id="email" type="email" name="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="organic__form-group">
                                        <label>I'm interested in</label>
                                        <div className="organic__checkboxes">
                                            {interests.map(interest => (
                                                <button
                                                    key={interest}
                                                    type="button"
                                                    className={`organic__interest-pill${form.interests.includes(interest) ? ' organic__interest-pill--active' : ''}`}
                                                    onClick={() => handleInterest(interest)}
                                                >
                                                    <span className="organic__interest-check">{form.interests.includes(interest) ? '✓' : '+'}</span>
                                                    {interest}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="organic__form-group">
                                        <label htmlFor="message">Tell us about your farm <span className="organic__optional">(optional)</span></label>
                                        <textarea id="message" name="message" rows={4} placeholder="Farm size, current inputs, main challenges, crop types..." value={form.message} onChange={handleChange} />
                                    </div>
                                    <button type="submit" className="organic__submit">Send Enquiry →</button>
                                </form>
                            )}
                        </motion.div>

                        <motion.div
                            className="organic__form-contact"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: SPRING }}
                        >
                            <div className="organic__contact-card">
                                <span className="organic__contact-eyebrow">Speak Directly</span>
                                <h3 className="organic__contact-name">Kamil</h3>
                                <p className="organic__contact-role">Element Farm Solutions</p>
                                <div className="organic__contact-items">
                                    <a href="tel:+27613889339" className="organic__contact-item">
                                        <span>📞</span><span>061 388 9339</span>
                                    </a>
                                    <a href="mailto:kamil@elementfarmsolutions.co.za" className="organic__contact-item">
                                        <span>✉️</span><span>kamil@elementfarmsolutions.co.za</span>
                                    </a>
                                    <div className="organic__contact-item">
                                        <span>📍</span><span>KwaZulu-Natal, South Africa</span>
                                    </div>
                                </div>
                            </div>
                            <div className="organic__contact-note">
                                <p>We respond within <strong>24 hours</strong> on business days.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default OrganicFarmingPage

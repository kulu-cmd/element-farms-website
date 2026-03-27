import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import './ContactPage.css'

const PAGE_CONFIG = {
    'poultry-dairy': {
        badge: 'POULTRY & DAIRY',
        title: 'Poultry & Dairy Solutions',
        subtitle: 'Tell us about your operation and we\'ll put together a tailored solution for your farm.',
        interests: [
            'Biogas / Renewable Energy',
            'Broiler Farm Solutions',
            'Organic Waste Management',
            'Dairy Waste Management',
        ],
    },
    'agri-farms': {
        badge: 'AGRI FARMS',
        title: 'Agri Farm Solutions',
        subtitle: 'Tell us about your land and we\'ll design the right regenerative solution for your operation.',
        interests: [
            'Land Rejuvenation',
            'UV & Sunburn Protection',
            'Anti-Flooding Systems',
            'Waste Management',
        ],
    },
}

const SPRING = [0.22, 1, 0.36, 1]

const ContactPage = ({ type }) => {
    const config = PAGE_CONFIG[type]
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

        window.location.href = `mailto:kamil@elementfarmsolutions.co.za?subject=Enquiry%3A%20${encodeURIComponent(config.title)}&body=${encodeURIComponent(body)}`
        setSubmitted(true)
    }

    return (
        <div className="contact-page">
            <Header />

            {/* Hero */}
            <section className="contact-page__hero">
                <div className="contact-page__hero-inner">
                    <div className="contact-page__hero-text">
                        <motion.span
                            className="contact-page__hero-badge"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: SPRING }}
                        >
                            {config.badge}
                        </motion.span>
                        <motion.h1
                            className="contact-page__hero-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: SPRING }}
                        >
                            {config.title}
                        </motion.h1>
                        <motion.p
                            className="contact-page__hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: SPRING }}
                        >
                            {config.subtitle}
                        </motion.p>
                    </div>
                    <motion.div
                        className="contact-page__hero-deco"
                        aria-hidden="true"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 0.5, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <rect x="2" y="2" width="36" height="36" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
                            <rect x="22" y="22" width="36" height="36" rx="4" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none"/>
                            <rect x="42" y="2" width="36" height="36" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none"/>
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* Body */}
            <section className="contact-page__body">
                <div className="contact-page__body-inner">

                    {/* Form card */}
                    <motion.div
                        className="contact-page__form-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7, ease: SPRING }}
                    >
                        {submitted ? (
                            <div className="contact-page__success">
                                <motion.div
                                    className="contact-page__success-icon"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, ease: SPRING }}
                                >
                                    ✓
                                </motion.div>
                                <h3>Thank you!</h3>
                                <p>Your enquiry is on its way to Kamil. We'll be in touch within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-page__form">
                                <div className="contact-page__form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Your full name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="contact-page__form-row">
                                    <div className="contact-page__form-group">
                                        <label htmlFor="mobile">Mobile Number</label>
                                        <input
                                            id="mobile"
                                            type="tel"
                                            name="mobile"
                                            required
                                            placeholder="+27 ..."
                                            value={form.mobile}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="contact-page__form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="your@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="contact-page__form-group">
                                    <label>I'm interested in</label>
                                    <div className="contact-page__checkboxes">
                                        {config.interests.map(interest => (
                                            <button
                                                key={interest}
                                                type="button"
                                                className={`contact-page__interest-pill${form.interests.includes(interest) ? ' contact-page__interest-pill--active' : ''}`}
                                                onClick={() => handleInterest(interest)}
                                            >
                                                <span className="contact-page__interest-check">
                                                    {form.interests.includes(interest) ? '✓' : '+'}
                                                </span>
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="contact-page__form-group">
                                    <label htmlFor="message">
                                        Message <span className="contact-page__optional">(optional)</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        placeholder="Tell us about your farm, size of operation, or any specific challenges you're facing..."
                                        value={form.message}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className="contact-page__submit">
                                    Send Enquiry →
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact info panel */}
                    <motion.div
                        className="contact-page__info"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: SPRING }}
                    >
                        <div className="contact-page__info-card">
                            <span className="contact-page__info-eyebrow">Direct Contact</span>
                            <h3 className="contact-page__info-name">Kamil</h3>
                            <p className="contact-page__info-role">Element Farm Solutions</p>
                            <div className="contact-page__info-items">
                                <a href="tel:+27613889339" className="contact-page__info-item">
                                    <span className="contact-page__info-icon">📞</span>
                                    <span>061 388 9339</span>
                                </a>
                                <a href="mailto:kamil@elementfarmsolutions.co.za" className="contact-page__info-item">
                                    <span className="contact-page__info-icon">✉️</span>
                                    <span>kamil@elementfarmsolutions.co.za</span>
                                </a>
                                <div className="contact-page__info-item">
                                    <span className="contact-page__info-icon">📍</span>
                                    <span>KwaZulu-Natal, South Africa</span>
                                </div>
                            </div>
                        </div>

                        <div className="contact-page__info-note">
                            <p>We typically respond within <strong>24 hours</strong> on business days.</p>
                        </div>

                        <div className="contact-page__info-tagline">
                            <p>Every farm is different.<br />Every solution is tailored.</p>
                        </div>
                    </motion.div>

                </div>
            </section>

            <Footer />
        </div>
    )
}

export default ContactPage

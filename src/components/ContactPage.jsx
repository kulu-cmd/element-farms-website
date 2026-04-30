import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import PageHero from './PageHero'
import './ContactPage.css'

const PAGE_CONFIG = {
    'agri-farms': {
        badge: 'COMMERCIAL AGRICULTURE FARMS',
        title: 'Commercial Agriculture Farms',
        heroTitle: 'Commercial Agriculture __Farms__',
        subtitle: 'If you wish to book a farm visit please fill in the form below and we will get back to you shortly.',
        useGoogleForm: true,
        interests: [
            'Land Rejuvenation',
            'UV & Sunburn Protection',
            'Anti-Flooding Systems',
            'Waste Management',
        ],
    },
    'dairy-horses': {
        badge: 'DAIRY & HORSES',
        title: 'Dairy and Horses',
        heroTitle: 'Dairy and __Horses__',
        subtitle: 'Tell us about your operation and we\'ll put together a tailored solution for your farm.',
        interests: [
            'Pasture Health',
            'Manure Management',
            'Hoof Health',
            'Water Management',
        ],
    },
    'poultry': {
        badge: 'POULTRY FARMS',
        title: 'Poultry Farms',
        heroTitle: 'Poultry __Farms__',
        subtitle: 'Tell us about your operation and we\'ll put together a tailored solution for your farm.',
        interests: [
            'Biogas / Renewable Energy',
            'Broiler Farm Solutions',
            'Organic Waste Management',
            'Litter Management',
        ],
    },
}

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/18f14G-hCciPDNnAgy9ITvT8iedrzmZ5K3zb37G_ca5Q/viewform?embedded=true'

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

            <PageHero
                title={config.heroTitle || config.title}
                subtitle={config.subtitle}
                tone="moss"
            />

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
                        {config.useGoogleForm ? (
                            <div className="contact-page__gform">
                                <p className="contact-page__gform-intro">
                                    If you wish to book a farm visit please fill in this form and we will get back to you shortly.
                                </p>
                                <iframe
                                    src={GOOGLE_FORM_URL}
                                    title="Commercial Agriculture Farms enquiry form"
                                    className="contact-page__gform-iframe"
                                    loading="lazy"
                                    frameBorder="0"
                                    marginHeight="0"
                                    marginWidth="0"
                                >
                                    Loading…
                                </iframe>
                            </div>
                        ) : submitted ? (
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

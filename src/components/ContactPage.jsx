import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import PageHero from './PageHero'
import WhatsAppWidget from './WhatsAppWidget'
import './ContactPage.css'

/* Operations that use the direct enquiry form rather than the questionnaire. */
const OPERATION_TYPES = [
    {
        id: 'dairy-horses',
        label: 'Dairy and Stables',
        interests: ['Pasture Health', 'Manure Management', 'Hoof Health', 'Water Management'],
    },
    {
        id: 'poultry',
        label: 'Poultry Farm',
        interests: ['Bedding Treatment', 'Bulk Orders'],
    },
]

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/18f14G-hCciPDNnAgy9ITvT8iedrzmZ5K3zb37G_ca5Q/viewform?embedded=true'
const SPRING = [0.22, 1, 0.36, 1]

const EMPTY_FORM = { name: '', mobile: '', email: '', interests: [], message: '' }

const ContactPage = () => {
    const [operation, setOperation] = useState('')
    const [form, setForm] = useState(EMPTY_FORM)
    const [submitted, setSubmitted] = useState(false)

    const config = OPERATION_TYPES.find(o => o.id === operation)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleOperation = (e) => {
        setOperation(e.target.value)
        setForm(EMPTY_FORM)
        setSubmitted(false)
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
            `Operation: ${config?.label}`,
            `Name: ${form.name}`,
            `Mobile: ${form.mobile}`,
            `Email: ${form.email}`,
            `Interested in: ${form.interests.join(', ') || 'Not specified'}`,
            form.message ? `Message: ${form.message}` : '',
        ].filter(Boolean).join('\n')

        window.location.href = `mailto:kamil@elementfarmsolutions.co.za?subject=Enquiry%3A%20${encodeURIComponent(config?.label || 'General')}&body=${encodeURIComponent(body)}`
        setSubmitted(true)
    }

    return (
        <div className="contact-page compact-header">
            <Header />

            <PageHero
                title="Get in __Touch__"
                subtitle="Tell us about your operation and we'll put together a tailored solution."
                tone="moss"
            />

            <section className="contact-page__body">
                <div className="contact-page__body-inner">

                    {/* ── Section 1 — Farm Pre-Visit Questionnaire ── */}
                    <motion.div
                        className="contact-page__form-card"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, ease: SPRING }}
                    >
                        <div className="contact-page__gform">
                            <h2 className="contact-page__section-title">Farm Pre-Visit Questionnaire</h2>
                            <p className="contact-page__gform-intro">
                                If you wish to book a farm visit please fill in this form and we will get back to you shortly.
                            </p>
                            <iframe
                                src={GOOGLE_FORM_URL}
                                title="Farm Pre-Visit Questionnaire"
                                className="contact-page__gform-iframe"
                                loading="lazy"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                            >
                                Loading…
                            </iframe>
                        </div>
                    </motion.div>

                    {/* ── Section 2 — Contact us ── */}
                    <motion.div
                        className="contact-page__info"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: SPRING }}
                    >
                        <div className="contact-page__info-card">
                            <span className="contact-page__info-eyebrow">Contact us</span>
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

                        {/* Operation-type dropdown — reveals that operation's enquiry form */}
                        <div className="contact-page__op-card">
                            <label htmlFor="operation" className="contact-page__op-label">
                                Dairy or poultry operation?
                            </label>
                            <div className="contact-page__op-select-wrap">
                                <select
                                    id="operation"
                                    className="contact-page__op-select"
                                    value={operation}
                                    onChange={handleOperation}
                                >
                                    <option value="">Select your operation…</option>
                                    {OPERATION_TYPES.map(o => (
                                        <option key={o.id} value={o.id}>{o.label}</option>
                                    ))}
                                </select>
                                <span className="contact-page__op-caret" aria-hidden="true">↓</span>
                            </div>

                            <AnimatePresence mode="wait">
                                {config && (
                                    <motion.div
                                        key={config.id}
                                        className="contact-page__op-body"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4, ease: SPRING }}
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
                                                    <input id="name" type="text" name="name" required placeholder="Your full name" value={form.name} onChange={handleChange} />
                                                </div>

                                                <div className="contact-page__form-group">
                                                    <label htmlFor="mobile">Mobile Number</label>
                                                    <input id="mobile" type="tel" name="mobile" required placeholder="+27 ..." value={form.mobile} onChange={handleChange} />
                                                </div>

                                                <div className="contact-page__form-group">
                                                    <label htmlFor="email">Email Address</label>
                                                    <input id="email" type="email" name="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} />
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
                                                                <span className="contact-page__interest-check">{form.interests.includes(interest) ? '✓' : '+'}</span>
                                                                {interest}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="contact-page__form-group">
                                                    <label htmlFor="message">
                                                        Message <span className="contact-page__optional">(optional)</span>
                                                    </label>
                                                    <textarea id="message" name="message" rows={4} placeholder="Tell us about your farm, size of operation, or any specific challenges..." value={form.message} onChange={handleChange} />
                                                </div>

                                                <button type="submit" className="contact-page__submit">
                                                    Send Enquiry →
                                                </button>
                                            </form>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
            <WhatsAppWidget />
        </div>
    )
}

export default ContactPage

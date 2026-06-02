import React from 'react'
import { motion } from 'framer-motion'
import './ContactProcessSteps.css'

const STEPS = [
    {
        num: '01',
        title: 'Get in Touch',
        body: 'WhatsApp, call, or email us to chat about your farm and the challenges you\'re facing.',
    },
    {
        num: '02',
        title: 'Book a Farm Visit',
        body: 'We come to you — walk the land, understand the operation, and assess the soil firsthand.',
    },
    {
        num: '03',
        title: 'Trials & Samples',
        body: 'Conduct soil sampling and initiate tailored on-farm trials to measure real results.',
    },
]

const CHANNELS = [
    {
        id: 'whatsapp',
        label: 'WhatsApp',
        detail: '+27 61 388 9339',
        href: 'https://wa.me/27613889339',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.526 5.849L.057 23.07a.75.75 0 0 0 .921.921l5.221-1.47A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.954 9.954 0 0 1-5.09-1.394l-.364-.217-3.773 1.062 1.062-3.773-.217-.364A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
        ),
    },
    {
        id: 'call',
        label: 'Call Us',
        detail: '+27 61 388 9339',
        href: 'tel:+27613889339',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
        ),
    },
    {
        id: 'email',
        label: 'Email',
        detail: 'kamil@elementfarmsolutions.co.za',
        href: 'mailto:kamil@elementfarmsolutions.co.za',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
        ),
    },
]

const SPRING = [0.22, 1, 0.36, 1]

const ContactProcessSteps = () => (
    <section className="cps">
        <div className="cps__inner">

            {/* ── Steps ── */}
            <div className="cps__steps">
                {STEPS.map((step, i) => (
                    <React.Fragment key={step.num}>
                        <motion.div
                            className="cps__step"
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.75, ease: SPRING, delay: i * 0.12 }}
                        >
                            <div className="cps__step-body">
                                <h3 className="cps__step-title">{step.title}</h3>
                                <p className="cps__step-text">{step.body}</p>
                            </div>
                        </motion.div>


                        {i < STEPS.length - 1 && (
                            <div className="cps__connector" aria-hidden="true">
                                <svg viewBox="0 0 60 12" fill="none" preserveAspectRatio="none">
                                    <path d="M0 6 Q15 1 30 6 Q45 11 60 6" stroke="var(--bone)" strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
                                </svg>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* ── Divider ── */}
            <div className="cps__divider" aria-hidden="true" />

            {/* ── Contact channels ── */}
            <motion.div
                className="cps__channels-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: SPRING, delay: 0.2 }}
            >
                <p className="cps__channels-label">Reach us directly</p>
                <div className="cps__channels">
                    {CHANNELS.map((ch, i) => (
                        <motion.a
                            key={ch.id}
                            href={ch.href}
                            className={`cps__channel cps__channel--${ch.id}`}
                            target={ch.id === 'whatsapp' ? '_blank' : undefined}
                            rel={ch.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: SPRING, delay: 0.3 + i * 0.1 }}
                            whileHover={{ y: -3 }}
                        >
                            <span className="cps__channel-icon">{ch.icon}</span>
                            <span className="cps__channel-label">{ch.label}</span>
                            <span className="cps__channel-detail">{ch.detail}</span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>

        </div>
    </section>
)

export default ContactProcessSteps

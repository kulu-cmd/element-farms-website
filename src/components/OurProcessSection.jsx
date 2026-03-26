import React from 'react'
import { motion } from 'framer-motion'
import './OurProcessSection.css'

const steps = [
    {
        id: 'diagnose',
        title: 'DIAGNOSE',
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="2.5"/>
                <line x1="29" y1="29" x2="40" y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
        ),
        body: 'Analyse your soil and farm needs through comprehensive testing and on-site assessment.',
    },
    {
        id: 'design',
        title: 'DESIGN',
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8 C24 8 12 22 12 30 C12 37 17.4 42 24 42 C30.6 42 36 37 36 30 C36 22 24 8 24 8Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
            </svg>
        ),
        body: 'A tailored system for your farm to treat 25% of your land, starting with highest-impact zones.',
    },
    {
        id: 'recycle',
        title: 'RECYCLE',
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 10 L28 6 M28 6 L32 10 M28 6 C28 6 38 12 38 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M38 24 C38 32.8 30.8 40 22 40" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M10 24 C10 15.2 17.2 8 26 8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M10 24 L6 20 M6 20 L10 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
        body: 'Installation and on-site training with your team to convert farm waste into regenerative inputs.',
    },
    {
        id: 'restore',
        title: 'RESTORE',
        icon: (
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="12" r="5" stroke="white" strokeWidth="2.5"/>
                <line x1="24" y1="17" x2="24" y2="34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M14 24 L24 20 L34 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 34 L24 34 L30 34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
        ),
        body: 'Monitor results, adjust the system, and scale up to treat more of your land each season.',
    },
]

const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.12 },
    }),
}

const OurProcessSection = () => {
    return (
        <section className="our-process">
            <div className="our-process__inner">
                <h2 className="our-process__heading">Our Process</h2>
                <p className="our-process__subtitle">
                    We help small to medium commercial farms turn agricultural waste into
                    regenerative inputs using a proven, scalable system.
                </p>

                <div className="our-process__grid">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            className="our-process__column"
                            custom={i}
                            variants={columnVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className="our-process__icon">{step.icon}</div>
                            <h3 className="our-process__step-title">{step.title}</h3>
                            <div className="our-process__divider" />
                            <p className="our-process__step-body">{step.body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurProcessSection

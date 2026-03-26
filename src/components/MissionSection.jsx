import React from 'react'
import { motion } from 'framer-motion'
import './MissionSection.css'

const pillars = [
    {
        title: 'Restore Soil Health',
        body: "We rebuild depleted farmland using regenerative inputs that revive soil biology, restore organic matter, and unlock nutrients that costly fertilisers have been masking for years.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4 C14 4 6 10 6 17 C6 21.4 9.6 25 14 25 C18.4 25 22 21.4 22 17 C22 10 14 4 14 4Z" stroke="#f36f21" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M14 25 L14 16" stroke="#f36f21" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 20 L10 16" stroke="#f36f21" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 18 L18 14" stroke="#f36f21" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        ),
    },
    {
        title: 'Empower Farmers',
        body: "We give farmers the knowledge, tools, and systems to take control of their land — creating real independence from the chemical supply chains that erode margins season after season.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="7" r="4" stroke="#f36f21" strokeWidth="2"/>
                <path d="M6 24 C6 19.6 9.6 16 14 16 C18.4 16 22 19.6 22 24" stroke="#f36f21" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 13 L14 16" stroke="#f36f21" strokeWidth="2" strokeLinecap="round"/>
                <path d="M19 10 L22 7" stroke="#f36f21" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 7 L22 10" stroke="#f36f21" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 7 L19 7" stroke="#f36f21" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        ),
    },
    {
        title: 'Sustain Future Generations',
        body: "We farm for tomorrow. Our systems improve soil quality with every harvest, building land that grows more fertile, more profitable, and more resilient with each passing season.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 24 L14 12" stroke="#f36f21" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 12 C14 12 8 10 6 5 C10 4 15 7 14 12" stroke="#f36f21" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M14 15 C14 15 19 12 22 7 C18 6 13 10 14 15" stroke="#f36f21" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M8 24 L20 24" stroke="#f36f21" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        ),
    },
]

const MissionSection = () => {
    return (
        <section className="mission">
            <div className="mission__inner">

                {/* Part 1 — Centered header block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center' }}
                >
                    <span className="mission__eyebrow">WHO WE ARE</span>
                    <h2 className="mission__heading">Restoring South African Soil at Scale.</h2>
                    <div className="mission__rule" />
                    <p className="mission__intro">
                        We are agriculture farm consultants with a singular focus: rebuild South Africa's soil health at scale. Through proven regenerative systems, we help small to medium commercial farms break their dependence on chemical fertilisers — saving money each season while creating land that sustains future generations.
                    </p>
                </motion.div>

                {/* Part 2 — Three pillars grid */}
                <div className="mission__pillars">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            className="mission__pillar"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.14 }}
                        >
                            <div className="mission__pillar-icon">
                                {pillar.icon}
                            </div>
                            <h3 className="mission__pillar-title">{pillar.title}</h3>
                            <p className="mission__pillar-body">{pillar.body}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default MissionSection

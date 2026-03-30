import React from 'react'
import { motion } from 'framer-motion'
import './MissionSection.css'

const pillars = [
    {
        title: 'Restore Soil Health',
        body: "We rebuild depleted farmland using regenerative inputs that revive soil biology, restore organic matter, and unlock nutrients that costly fertilisers have been masking for years.",
        icon: '🌍',
    },
    {
        title: 'Empower Farmers',
        body: "We give farmers the knowledge, tools, and systems to take control of their land — creating real independence from the chemical supply chains that erode margins season after season.",
        icon: '🌱',
    },
    {
        title: 'Sustain Future Generations',
        body: "We farm for tomorrow. Our systems improve soil quality with every harvest, building land that grows more fertile, more profitable, and more resilient with each passing season.",
        icon: '🌾',
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
                    <span className="mission__eyebrow">OUR MISSION</span>
                    <h2 className="mission__heading">Our Mission</h2>
                    <div className="mission__rule" />
                    <p className="mission__intro">
                        We are agriculture farm consultants with a singular focus; <strong>rebuild South Africa's soil health at scale.</strong> Through proven regenerative systems, we help small to medium commercial farms break their dependence on chemical fertilisers, saving money each season while <strong>creating land that sustains future generations</strong>.
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

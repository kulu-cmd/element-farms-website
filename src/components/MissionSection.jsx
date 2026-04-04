import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './MissionSection.css'

const pillars = [
    {
        title: 'Restore Soil Health',
        body: "We rebuild depleted farmland using regenerative inputs that revive soil biology, restore organic matter, and unlock nutrients that costly fertilisers have been masking for years.",
        icon: '🌍',
        link: '/solutions/land-rejuvenation',
    },
    {
        title: 'Empower Farmers',
        body: "We give farmers the knowledge, tools, and systems to take control of their land — creating real independence from the chemical supply chains that erode margins season after season.",
        icon: '🌱',
        link: '/cropfit',
    },
    {
        title: 'Sustain Future Generations',
        body: "We farm for tomorrow. Our systems improve soil quality with every harvest, building land that grows more fertile, more profitable, and more resilient with each passing season.",
        icon: '🌾',
        link: null,
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
                    <h2 className="mission__heading">How we help farmers</h2>
                    <div className="mission__rule" />
                    <div className="mission__intro">
                        <p className="mission__intro-headline">Break the chemical cycle. Rebuild your soil.</p>
                        <p className="mission__intro-body">Regenerative systems that slash input costs, restore soil biology, and make your land more productive every season.</p>
                    </div>
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
                            {...(pillar.link ? { as: Link, to: pillar.link } : {})}
                        >
                            {pillar.link ? (
                                <Link to={pillar.link} className="mission__pillar-link">
                                    <div className="mission__pillar-icon">{pillar.icon}</div>
                                    <h3 className="mission__pillar-title">{pillar.title}</h3>
                                    <p className="mission__pillar-body">{pillar.body}</p>
                                </Link>
                            ) : (
                                <>
                                    <div className="mission__pillar-icon">{pillar.icon}</div>
                                    <h3 className="mission__pillar-title">{pillar.title}</h3>
                                    <p className="mission__pillar-body">{pillar.body}</p>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default MissionSection

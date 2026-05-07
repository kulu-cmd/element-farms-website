import React from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import './MissionSection.css'

const goals = [
    {
        title: 'Rejuvenate heavily eroded soils',
        gloss: 'Restore biology, structure, and mineral balance.',
        glyph: '🏜️',
    },
    {
        title: 'Break the chemical cycle',
        gloss: 'Move farms off synthetic dependency.',
        glyph: '🧪',
    },
    {
        title: 'Supercharge your nurseries',
        gloss: 'Stronger root mass from day one.',
        glyph: '🌱',
    },
    {
        title: 'Turn farm waste into rich fertile inputs',
        gloss: 'Closed-loop systems — manure, compost, biogas.',
        glyph: '♻️',
    },
]

const MissionSection = () => {
    const slideIn = {
        hidden: { opacity: 0, x: -80 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    }

    return (
        <section className="mission-x" id="mission">
            <div className="mission-x__inner">
                <motion.div
                    className="mission-x__reveal"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
                    }}
                >
                    <motion.header className="mission-x__header" variants={slideIn}>
                        <SectionLabel label="The Mission" />
                    </motion.header>

                    <motion.blockquote className="mission-x__quote" variants={slideIn}>
                        <span className="mission-x__quote-kicker">
                            <span className="mission-x__quote-rule" aria-hidden="true" />
                            <span>We are on a mission</span>
                        </span>
                        <h2 className="mission-x__quote-heading">
                            To empower farms to adopt<br /><em>regenerative</em> farming systems.
                        </h2>
                    </motion.blockquote>

                    <motion.ul
                        className="mission-x__goals"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.08 } },
                        }}
                    >
                        {goals.map((goal) => (
                            <motion.li
                                key={goal.title}
                                className="mission-x__goal"
                                variants={slideIn}
                            >
                                <span className="mission-x__goal-glyph" aria-hidden="true">{goal.glyph}</span>
                                <span className="mission-x__goal-text">
                                    <span className="mission-x__goal-title">{goal.title}</span>
                                    <span className="mission-x__goal-gloss">{goal.gloss}</span>
                                </span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            </div>
        </section>
    )
}

export default MissionSection

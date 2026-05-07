import React from 'react'
import { motion } from 'framer-motion'
import './MissionSection.css'

const IconSoil = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 34 Q12 28 18 34 Q24 40 30 34 Q36 28 42 34" />
    <path d="M6 40 Q12 34 18 40 Q24 46 30 40 Q36 34 42 40" />
    <path d="M10 22 C10 14 18 8 24 8 C30 8 38 14 38 22" />
    <line x1="24" y1="8" x2="24" y2="26" />
  </svg>
)

const IconChemical = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8 L18 24 L8 40 L40 40 L30 24 L30 8 Z" />
    <line x1="18" y1="8" x2="30" y2="8" />
    <path d="M14 32 Q18 28 22 32 Q26 36 30 32 Q34 28 38 32" />
    <circle cx="34" cy="16" r="3" fill="currentColor" stroke="none" opacity="0.35" />
    <circle cx="38" cy="10" r="2" fill="currentColor" stroke="none" opacity="0.25" />
  </svg>
)

const IconSeedling = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="24" y1="44" x2="24" y2="20" />
    <path d="M24 22 C14 22 8 14 8 6 C22 6 24 16 24 22" />
    <path d="M24 28 C34 28 40 20 40 12 C26 12 24 22 24 26" />
    <line x1="12" y1="44" x2="36" y2="44" />
  </svg>
)

const IconCycle = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 8 C33.9 8 42 16.1 42 26" />
    <path d="M42 26 C42 35.9 33.9 44 24 44 C14.1 44 6 35.9 6 26 C6 16.1 14.1 8 24 8" />
    <polyline points="20,4 24,8 20,12" />
    <polyline points="28,42 24,44 28,46" />
    <line x1="24" y1="26" x2="24" y2="20" />
    <line x1="19" y1="23" x2="29" y2="23" />
  </svg>
)

const goals = [
    {
        title: 'Rejuvenate heavily eroded soils',
        gloss: 'Restore biology, structure, and mineral balance.',
        Icon: IconSoil,
    },
    {
        title: 'Break the chemical cycle',
        gloss: 'Move farms off synthetic dependency.',
        Icon: IconChemical,
    },
    {
        title: 'Supercharge your nurseries',
        gloss: 'Stronger root mass from day one.',
        Icon: IconSeedling,
    },
    {
        title: 'Turn farm waste into rich fertile inputs',
        gloss: 'Closed-loop systems — manure, compost, biogas.',
        Icon: IconCycle,
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
                        <span className="mission-x__stamp" aria-label="Mission">
                            <span className="mission-x__stamp-glyph" aria-hidden="true">§</span>
                            <span className="mission-x__stamp-label">Mission</span>
                            <span className="mission-x__stamp-rule" aria-hidden="true" />
                            <span className="mission-x__stamp-tag">A regenerative imperative</span>
                        </span>
                    </motion.header>

                    <motion.blockquote className="mission-x__quote" variants={slideIn}>
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
                                <span className="mission-x__goal-icon" aria-hidden="true">
                                    <goal.Icon />
                                </span>
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

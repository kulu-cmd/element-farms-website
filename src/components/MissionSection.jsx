import React from 'react'
import { motion } from 'framer-motion'
import { CircleDots } from './BrandMotifs'
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
        title: 'Empower farms to be self-sufficient',
        gloss: 'Closed-loop systems for long term sustainability.',
        glyph: '♻️',
    },
]

const MissionSection = () => {
    const slideIn = {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    }

    return (
        <section className="mission-x" id="mission">
            <div className="mission-x__inner">
                {/* LEFT — eyebrow + display heading */}
                <motion.div
                    className="mission-x__lede"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
                    }}
                >
                    <motion.div className="mission-x__eyebrow-row" variants={slideIn}>
                        <CircleDots size={28} strokeWidth={9} />
                        <span className="mission-x__eyebrow-label">Our mission is to</span>
                    </motion.div>

                    <motion.h2 className="mission-x__quote-heading" variants={slideIn}>
                        Empower farms to adopt<br />
                        <em>regenerative</em><br />
                        farming systems.
                    </motion.h2>
                </motion.div>

                {/* RIGHT — vertical numbered list */}
                <motion.ol
                    className="mission-x__goals"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
                    }}
                >
                    {goals.map((goal, i) => (
                        <motion.li
                            key={goal.title}
                            className="mission-x__goal"
                            variants={slideIn}
                        >
                            <span className="mission-x__goal-num">{String(i + 1).padStart(2, '0')}</span>
                            <div className="mission-x__goal-body">
                                <span className="mission-x__goal-glyph" aria-hidden="true">{goal.glyph}</span>
                                <span className="mission-x__goal-title">{goal.title}</span>
                                <span className="mission-x__goal-gloss">{goal.gloss}</span>
                            </div>
                        </motion.li>
                    ))}
                </motion.ol>
            </div>
        </section>
    )
}

export default MissionSection

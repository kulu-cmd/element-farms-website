import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionLabel from './ui/SectionLabel'
import './MissionSection.css'

// Each goal carries its own glyph (drawn inline so we control stroke / colour)
// and a tiny italic gloss that gives the row some editorial breathing room.
const goals = [
    {
        title: 'Rejuvenate heavily eroded soils',
        gloss: 'Restore biology, structure, and mineral balance.',
        glyph: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                {/* horizon */}
                <path d="M4 30 Q 24 22 44 30" />
                {/* roots radiating down */}
                <path d="M24 30 L 24 42" />
                <path d="M24 32 L 16 40" />
                <path d="M24 32 L 32 40" />
                <path d="M24 34 L 12 41" opacity="0.55" />
                <path d="M24 34 L 36 41" opacity="0.55" />
                {/* sprout */}
                <path d="M24 30 Q 22 22 18 22" />
                <path d="M24 30 Q 26 24 30 22" />
                <circle cx="18" cy="22" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="30" cy="22" r="1.5" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        title: 'Break the chemical cycle',
        gloss: 'Move farms off synthetic dependency.',
        glyph: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                {/* broken chain */}
                <path d="M10 22 a6 6 0 0 1 6 -6 h4 a6 6 0 0 1 6 6 v4" />
                <path d="M38 26 a6 6 0 0 1 -6 6 h-4 a6 6 0 0 1 -6 -6 v-4" />
                {/* slash */}
                <line x1="14" y1="38" x2="34" y2="10" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
    },
    {
        title: 'Supercharge your nurseries',
        gloss: 'Stronger root mass from day one.',
        glyph: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                {/* pot */}
                <path d="M14 28 L 16 42 H 32 L 34 28 Z" />
                <line x1="12" y1="28" x2="36" y2="28" />
                {/* sprout — three leaves */}
                <path d="M24 28 Q 24 16 16 12" />
                <path d="M24 28 Q 24 18 30 14" />
                <path d="M24 28 L 24 8" />
                <circle cx="24" cy="6" r="1.6" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        title: 'Turn farm waste into rich fertile inputs',
        gloss: 'Closed-loop systems — manure, compost, biogas.',
        glyph: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                {/* circular flow */}
                <path d="M38 24 a14 14 0 1 0 -4 9.9" />
                <polyline points="32,28 34,34 40,32" />
                {/* leaf at center */}
                <path d="M24 18 Q 30 22 24 30 Q 18 22 24 18 Z" />
                <line x1="24" y1="20" x2="24" y2="28" opacity="0.6" />
            </svg>
        ),
    },
]

const pillars = [
    {
        title: 'Restore soil health',
        kicker: 'Regenerative inputs',
        teaser: 'We target heavily eroded land and nurseries, using regenerative farming techniques and mineral science.',
        body: 'Vermicompost, silica-rich mineral blends, and closed-loop organic matter revive the microbial life that does the heavy lifting — unlocking nutrients that costly fertilisers have only been masking.',
        link: '/solutions/land-rejuvenation',
        cta: 'Land rejuvenation',
    },
    {
        title: 'Empower farmers',
        kicker: 'Knowledge & systems',
        teaser: 'We guide and teach you every step of the way. Routine check-ins. Ongoing support. Anything you need to become self-sufficient.',
        body: 'Farm education and training is our priority. We wish to spread and teach our systems to as many farms open-minded enough to adopt the future of farming.',
        link: '/cropfit',
        cta: 'Try CropFit',
    },
    {
        title: 'Sustain future generations',
        kicker: 'Long-horizon farming',
        teaser: 'We farm for soil that is richer with each harvest.',
        body: 'Chemicals might give you fast yields now. Take a look at your land and compare it to 10 years ago — can you say there is any longevity? Our systems are designed for the compound: soil that improves year over year, producing more resilient yields — productive for the next generation.',
        link: null,
        cta: null,
    },
]

const MissionSection = () => {
    const [open, setOpen] = useState(0)

    return (
        <section className="mission-x" id="mission">
            <div className="mission-x__inner">
                <header className="mission-x__header">
                    <SectionLabel number="02" label="The Mission" />
                </header>

                <motion.blockquote
                    className="mission-x__quote"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="mission-x__drop">W</span>e are on a mission to empower farms<br/>
                    <em>to adopt regenerative farming systems.</em>
                </motion.blockquote>

                <motion.p
                    className="mission-x__intro"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    No-one likes being forced to use chemicals and we want to help farmers take their
                    produce to the next level — whether it's rejuvenating land, protecting from sunburn
                    or pests.
                </motion.p>

                <motion.ul
                    className="mission-x__goals"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                    }}
                >
                    {goals.map((goal, i) => (
                        <motion.li
                            key={goal.title}
                            className="mission-x__goal"
                            variants={{
                                hidden: { opacity: 0, y: 24 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                            }}
                        >
                            <span className="mission-x__goal-n">0{i + 1}</span>
                            <span className="mission-x__goal-glyph" aria-hidden="true">{goal.glyph}</span>
                            <span className="mission-x__goal-text">
                                <span className="mission-x__goal-title">{goal.title}</span>
                                <span className="mission-x__goal-gloss">{goal.gloss}</span>
                            </span>
                        </motion.li>
                    ))}
                </motion.ul>

                <motion.p
                    className="mission-x__deck"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                >
                    We build regenerative systems designed to restore soil biology and mineral content,
                    making your land more productive every season. Taking your waste and turning it into
                    organic gold — the perfect closed loop — whilst slashing input chemical fertilizer costs.
                </motion.p>

                <div className="mission-x__pillars" role="list">
                    {pillars.map((pillar, i) => {
                        const isOpen = open === i
                        return (
                            <motion.div
                                key={pillar.title}
                                className={`mission-x__row ${isOpen ? 'is-open' : ''}`}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                onMouseEnter={() => setOpen(i)}
                                onClick={() => setOpen(i)}
                                role="listitem"
                            >
                                <span className="mission-x__row-num">0{i + 1}</span>

                                <div className="mission-x__row-head">
                                    <span className="mission-x__row-kicker">{pillar.kicker}</span>
                                    <h3 className="mission-x__row-title">{pillar.title}</h3>
                                </div>

                                <p className="mission-x__row-teaser">{pillar.teaser}</p>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="body"
                                            className="mission-x__row-body"
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: 'auto', marginTop: '1.4rem' }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <p>{pillar.body}</p>
                                            {pillar.link && (
                                                <Link to={pillar.link} className="mission-x__row-link">
                                                    <span>{pillar.cta}</span>
                                                    <span className="mission-x__row-arrow" aria-hidden="true">→</span>
                                                </Link>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default MissionSection

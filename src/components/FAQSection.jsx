import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './FAQSection.css'

const faqs = [
    {
        q: 'Does this system affect my organic certification?',
        a: 'No, our techniques are fully compliant with GLOBAL G.A.P., USDA Organic, and SAOSA standards, provided feedstock inputs are certified clean. We document your feedstock source and process for your certification audit trail.',
    },
    {
        q: 'How does it interact with my existing compost programme?',
        a: 'They complement each other well. Bulk compost builds organic matter; vermicompost delivers the biological nutrients. Most farms use compost for bulk applications and vermicompost for nursery, transplants, and high-value blends.',
    },
    {
        q: 'Why switch if my chemical NPK is working fine?',
        a: 'Soil erosion and chemical-fertiliser burn deplete soil quality for the next harvest, and NPK prices fluctuate. This is the best biological fertiliser made in-house — fresh, potent, and consistent. Studies show vermicompost can replace NPK at almost 1:1 in correct doses. Reduce your fertiliser bill and fix your land at the same time.',
    },
    {
        q: "I'm not ready to fully replace my NPK programme.",
        a: "This system doesn't fully replace chemical fertilisers — it reduces chemical inputs by up to 50%. We sit down with you and work out the optimal chemical-fertiliser replacement schedule. Save money and your soil at the same time.",
    },
    {
        q: 'My soil is already in bad shape — is it too late?',
        a: "Nurseries and heavily distressed land are our first priority. It's never too late to regenerate your land — the beautiful thing about nature is that it's healing. If you've been wanting to take a step away from chemicals, this is a good start.",
    },
    {
        q: 'How long before I see results?',
        a: 'Nursery results are visible within weeks — root development is the first noticeable change. Field results show on the first harvest and following seasons as biology is restored. We do soil tests along the way to monitor progress.',
    },
]

const Chevron = () => (
    <svg viewBox="0 0 14 14" aria-hidden="true">
        <path d="M2 5 L7 10 L12 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0)

    return (
        <section className="faq-x" id="faqs">
            <div className="faq-x__inner">
                <header className="faq-x__header">
                    <motion.h2
                        className="faq-x__heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Frequently asked questions
                    </motion.h2>
                </header>

                <ul className="faq-x__list">
                    {faqs.map((item, i) => {
                        const isOpen = openIndex === i
                        return (
                            <motion.li
                                key={item.q}
                                className={`faq-x__item ${isOpen ? 'is-open' : ''}`}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <button
                                    type="button"
                                    className="faq-x__question"
                                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="faq-x__question-num">0{i + 1}</span>
                                    <span className="faq-x__question-text">{item.q}</span>
                                    <span className="faq-x__question-icon" aria-hidden="true">
                                        <Chevron />
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="answer"
                                            className="faq-x__answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <p>{item.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

export default FAQSection

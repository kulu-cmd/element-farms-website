import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './NurseryDetailModal.css'

const WA_NUMBER = '27613889339'
const EMAIL = 'kamil@elementfarmsolutions.co.za'

const bullets = [
    {
        lead: 'Biology activates instantly.',
        body: 'Microbes colonise the root zone the day a seedling is potted.',
    },
    {
        lead: 'Minerals build the structure.',
        body: 'Silica and calcium drive cell division and root-wall integrity from day one.',
    },
    {
        lead: 'Roots go deeper, faster.',
        body: 'Plants leave the nursery with the root system of a much older seedling — transplant shock drops, survival rates rise.',
    },
    {
        lead: 'Works across all crop types.',
        body: 'Vegetables, orchards, lucerne, ornamentals — the same stimulus medium accelerates every nursery stage.',
    },
]

const NurseryDetailModal = ({ open, onClose }) => {
    useEffect(() => {
        if (!open) return
        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKey)
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = prevOverflow
        }
    }, [open, onClose])

    const waMessage = encodeURIComponent(
        "Hi, I'd like to enquire about Nursery Systems from Element Farm Solutions."
    )

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="nursery-modal__backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="nursery-modal-title"
                >
                    <motion.article
                        className="nursery-modal"
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="nursery-modal__close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                                <path d="M5 5l14 14M19 5L5 19" />
                            </svg>
                        </button>

                        <header className="nursery-modal__head">
                            <span className="nursery-modal__num">03</span>
                            <span className="nursery-modal__eyebrow">Combining Systems</span>
                        </header>

                        <div className="nursery-modal__body">
                            <div className="nursery-modal__copy">
                                <h2 id="nursery-modal-title" className="nursery-modal__title">
                                    Supercharge your <em>nurseries.</em>
                                </h2>

                                <p className="nursery-modal__lede">
                                    The first 30 days of root development determine the entire
                                    season. We combine composting systems and M-TerraBoost into
                                    a nursery-stage stimulus medium that gives seedlings the
                                    strongest possible start.
                                </p>

                                <ul className="nursery-modal__list">
                                    {bullets.map((b) => (
                                        <li key={b.lead}>
                                            <strong>{b.lead}</strong> {b.body}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="nursery-modal__media" aria-hidden="true">
                                <span className="nursery-modal__bracket nursery-modal__bracket--tl" />
                                <span className="nursery-modal__bracket nursery-modal__bracket--tr" />
                                <span className="nursery-modal__bracket nursery-modal__bracket--bl" />
                                <span className="nursery-modal__bracket nursery-modal__bracket--br" />
                                <div className="nursery-modal__collage">
                                    <img src="/land_rejuv/basil_comparison.png" alt="" loading="lazy" />
                                    <img src="/roots/terraboost_powder.jpg" alt="" loading="lazy" />
                                    <img src="/roots/cabbage.jpg" alt="" loading="lazy" />
                                    <img src="/roots/basil_nursery.jpg" alt="" loading="lazy" />
                                </div>
                            </div>
                        </div>

                        <footer className="nursery-modal__foot">
                            <span className="nursery-modal__foot-label">
                                Enquire about Nursery Systems
                            </span>
                            <div className="nursery-modal__foot-actions">
                                <a
                                    className="nursery-modal__btn nursery-modal__btn--wa"
                                    href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg className="nursery-modal__btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </a>
                                <a
                                    className="nursery-modal__btn nursery-modal__btn--email"
                                    href={`mailto:${EMAIL}?subject=Enquiry: Nursery Systems&body=Hi,%0A%0AI'd like to enquire about Nursery Systems.%0A%0A`}
                                >
                                    <svg className="nursery-modal__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="M22 7l-10 7L2 7" />
                                    </svg>
                                    Email
                                </a>
                            </div>
                        </footer>

                        <span className="nursery-modal__bignum" aria-hidden="true">03</span>
                    </motion.article>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default NurseryDetailModal

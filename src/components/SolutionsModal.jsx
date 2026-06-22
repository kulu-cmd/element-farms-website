import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './SolutionsModal.css'

const CATEGORIES = [
    {
        id: 'agri',
        label: 'Agriculture',
        desc: 'Soil, water & crop protection systems',
        solutions: [
            { num: '01', title: 'Land Rejuvenation', desc: 'Restore organic matter and revive degraded soil', to: '/solutions/land-rejuvenation' },
            { num: '02', title: 'Anti-Flooding',     desc: 'Improve water retention and drainage on your land', to: '/solutions/anti-flooding' },
            { num: '03', title: 'Sun & Pest Shield', desc: 'UV and pest protection systems for orchards',       to: '/solutions/uv-protection' },
        ],
    },
    {
        id: 'livestock',
        label: 'Livestock',
        desc: 'Mineral treatment for poultry & stables',
        solutions: [
            { num: '01', title: 'Poultry Solutions', desc: 'Mineral bedding treatment for broiler and layer houses', to: '/solutions/poultry' },
        ],
    },
]

const EASE = [0.22, 1, 0.36, 1]

const SolutionsModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isOpen) return
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [isOpen, onClose])

    const handleSolution = (to) => {
        onClose()
        navigate(to)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="sm-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
                >
                    <motion.div
                        className="sm-panel"
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                    >
                        <button className="sm-close" onClick={onClose} aria-label="Close">
                            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                <path d="M4 4l12 12M16 4L4 16"/>
                            </svg>
                        </button>

                        <p className="sm-eyebrow">Our Solutions</p>
                        <h2 className="sm-heading">Regenerative systems,<br /><em>tailored to your land.</em></h2>

                        <div className="sm-columns">
                            {CATEGORIES.map((cat, ci) => (
                                <motion.div
                                    key={cat.id}
                                    className="sm-col"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 + ci * 0.1 }}
                                >
                                    <div className="sm-col__header">
                                        <span className="sm-col__label">{cat.label}</span>
                                        <span className="sm-col__desc">{cat.desc}</span>
                                    </div>

                                    <ul className="sm-col__list">
                                        {cat.solutions.map((sol, si) => (
                                            <motion.li
                                                key={sol.to}
                                                initial={{ opacity: 0, x: 16 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, ease: EASE, delay: 0.2 + ci * 0.1 + si * 0.07 }}
                                            >
                                                <button className="sm-sol-row" onClick={() => handleSolution(sol.to)}>
                                                    <span className="sm-sol-row__num">{sol.num}</span>
                                                    <span className="sm-sol-row__body">
                                                        <span className="sm-sol-row__title">{sol.title}</span>
                                                        <span className="sm-sol-row__desc">{sol.desc}</span>
                                                    </span>
                                                    <span className="sm-sol-row__arrow" aria-hidden="true">&#8594;</span>
                                                </button>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SolutionsModal

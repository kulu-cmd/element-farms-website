import React from 'react'
import { motion } from 'framer-motion'
import { CircleDots } from '../BrandMotifs'
import './SectionLabel.css'

const SectionLabel = ({ number, label, align = 'left', tone = 'ink' }) => {
    const ringColor = tone === 'paper' ? 'rgba(244, 239, 230, 0.65)' : 'var(--moss)'
    const dotColor = tone === 'paper' ? 'var(--ochre)' : 'var(--clay)'
    return (
        <motion.div
            className={`section-label section-label--${align} section-label--${tone}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <CircleDots size={22} strokeWidth={11} ringColor={ringColor} dotColor={dotColor} className="section-label__motif" />
            {number && <span className="section-label__num">{number}</span>}
            {number && <span className="section-label__rule" aria-hidden="true" />}
            <span className="section-label__text">{label}</span>
        </motion.div>
    )
}

export default SectionLabel

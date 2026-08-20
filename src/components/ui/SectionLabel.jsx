import React from 'react'
import { motion } from 'framer-motion'
import './SectionLabel.css'

const SectionLabel = ({ number, label, align = 'left', tone = 'ink' }) => {
    return (
        <motion.div
            className={`section-label section-label--${align} section-label--${tone}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {number && <span className="section-label__num">{number}</span>}
            {number && <span className="section-label__rule" aria-hidden="true" />}
            <span className="section-label__text">{label}</span>
        </motion.div>
    )
}

export default SectionLabel

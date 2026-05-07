import React from 'react'
import { motion } from 'framer-motion'
import './WhatToExpectSection.css'

const WhatToExpectSection = () => {
  return (
    <section className="wte-x" id="what-to-expect">
      <div className="wte-x__inner">
        <motion.figure
          className="wte-x__quote"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="wte-x__quote-mark" aria-hidden="true">“</span>
          <blockquote className="wte-x__heading">
            Soil doesn't recover overnight — <em>but it compounds.</em>
          </blockquote>
        </motion.figure>
      </div>
    </section>
  )
}

export default WhatToExpectSection

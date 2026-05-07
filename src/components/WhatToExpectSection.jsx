import React from 'react'
import { motion } from 'framer-motion'
import './WhatToExpectSection.css'

const WhatToExpectSection = () => {
  return (
    <section className="wte-x" id="what-to-expect">
      <div className="wte-x__inner">
        <motion.div
          className="wte-x__intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="wte-x__heading">
            Soil doesn't recover overnight —<br />
            <em>but it compounds.</em>
          </h2>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatToExpectSection

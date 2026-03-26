import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './OurApproachSection.css'

const steps = [
  {
    number: '01',
    title: 'Diagnose',
    description: "We evaluate your farm's soil health, crop conditions, and environmental pressures — flooding, sun stress, nutrient imbalance — to understand exactly what your land needs.",
  },
  {
    number: '02',
    title: 'Design',
    description: "Based on the diagnosis, we design a targeted regenerative plan — recommending specific soil amendments, organic inputs, and protective treatments suited to your farm.",
  },
  {
    number: '03',
    title: 'Recycle',
    description: "Where possible, we convert your own agricultural waste into high-value compost and regenerative inputs — closing the nutrient loop and cutting your input costs.",
  },
  {
    number: '04',
    title: 'Restore',
    description: "We implement the system, monitor results, and adjust. Soil biology rebuilds season by season — reducing chemical dependency and increasing long-term farm profitability.",
  },
]

const OurApproachSection = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="approach" id="about-us">
      {/* Grey header bar */}
      <div className="approach__header">
        <h2 className="approach__title">Our Approach</h2>
      </div>

      {/* Steps row */}
      <div className="approach__steps">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step card */}
            <motion.div
              className={`approach__step ${activeStep === index ? 'approach__step--active' : ''}`}
              onClick={() => setActiveStep(index)}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.12 }}
            >
              <span className="approach__step-number">{step.number}</span>
              <h3 className="approach__step-title">{step.title}</h3>

              <AnimatePresence>
                {activeStep === index && (
                  <motion.p
                    className="approach__step-desc"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    {step.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Arrow connector between steps (not after last) */}
            {index < steps.length - 1 && (
              <div className="approach__connector">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 14 H22" stroke="#f36f21" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 8 L22 14 L16 20" stroke="#f36f21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

export default OurApproachSection

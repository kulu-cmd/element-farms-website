import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './TailoredSolutionSection.css'

const cards = [
  {
    accentColor: '#3fae5a',
    icon: '🌱',
    label: 'ORGANIC MATTER',
    heading: "Rebuild Your Soil's Biodiversity",
    teaser:
      'Depleted soils lack the microbial activity needed to feed crops naturally. We restore it from the ground up.',
    modal: {
      title: 'Vermicomposting Systems',
      subtitle: null,
      body: (
        <p>
          We teach and implement farm-scale vermicomposting systems that convert agricultural
          waste — manure, crop residues, organic off-cuts — into high-quality worm castings.
          These castings are rich in plant-available nutrients, beneficial microbes, and humic
          acids that rebuild soil structure and biology season by season. The result is a
          closed-loop system where your farm feeds itself.
        </p>
      ),
    },
  },
  {
    accentColor: '#c49a3c',
    icon: '⚗️',
    label: 'MINERAL DEFICIENCIES',
    heading: "Restore What's Missing",
    teaser:
      'Soil mineral imbalances silently reduce yields, water retention, and crop quality. M-TerraBoost targets the root cause.',
    modal: {
      title: 'M-TerraBoost — Silica Mineral Fertiliser',
      subtitle: 'Scientifically formulated blend of minerals to target nutrient uptake and water retention.',
      body: (
        <>
          <p>M-TerraBoost delivers four critical minerals your soil may be lacking:</p>
          <ul className="tailored__modal-list">
            <li>
              <strong>Silica</strong> — Strengthens plant cell walls, improves drought and
              disease resistance, and increases water use efficiency.
            </li>
            <li>
              <strong>Calcium</strong> — Essential for root development, cell wall integrity,
              and reducing soil acidity.
            </li>
            <li>
              <strong>Magnesium</strong> — The core of chlorophyll; drives photosynthesis,
              energy transfer, and phosphorus uptake.
            </li>
            <li>
              <strong>Sulphur</strong> — Key for protein synthesis, enzyme function, and
              nitrogen efficiency.
            </li>
          </ul>
          <p>
            Together these minerals improve crop quality, increase yield potential, and reduce
            long-term input dependency.
          </p>
        </>
      ),
    },
  },
  {
    accentColor: '#b5451b',
    icon: '🌿',
    label: 'NURSERY ROOTS',
    heading: 'Supercharge Early Growth',
    teaser:
      'The first 30 days of root development determine the entire season. Give your seedlings the strongest possible start.',
    modal: {
      title: 'Vermicompost + Mineral Blend',
      subtitle: null,
      body: (
        <p>
          Combining our vermicompost inoculation with M-TerraBoost creates an exceptional root
          stimulus medium. The biological life in worm castings activates immediately around the
          seedling root zone, while the mineral blend provides the structural nutrients needed
          for rapid cell division and root elongation. Plants establish faster, show stronger
          early growth, and enter the season with a resilient, deep root system — reducing
          transplant shock and improving survival rates across all crop types.
        </p>
      ),
    },
  },
]

const TailoredSolutionSection = () => {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (index) => setActiveModal(index)
  const closeModal = () => setActiveModal(null)

  return (
    <section className="tailored">
      <div className="tailored__inner">

        {/* Section header */}
        <motion.div
          className="tailored__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="tailored__heading">Your Tailored Solution</h2>
          <p className="tailored__subheading">
            We identify what's holding your farm back and apply the right solution.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="tailored__grid">
          {cards.map((card, index) => (
            <motion.div
              key={card.label}
              className="tailored__card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.12 }}
              whileHover={{ y: -4 }}
              onClick={() => openModal(index)}
            >
              {/* Accent bar */}
              <div
                className="tailored__card-bar"
                style={{ background: card.accentColor }}
              />

              {/* Card body */}
              <div className="tailored__card-body">
                <div className="tailored__card-icon" aria-hidden="true">
                  {card.icon}
                </div>
                <span className="tailored__card-label" style={{ color: card.accentColor }}>
                  {card.label}
                </span>
                <h3 className="tailored__card-heading">{card.heading}</h3>
                <p className="tailored__card-teaser">{card.teaser}</p>
                <span className="tailored__card-link">Learn more →</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal !== null && (
          <motion.div
            className="tailored__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
          >
            <motion.div
              className="tailored__modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent bar inside modal */}
              <div
                className="tailored__modal-bar"
                style={{ background: cards[activeModal].accentColor }}
              />

              {/* Close button */}
              <button
                className="tailored__modal-close"
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>

              {/* Modal content */}
              <div className="tailored__modal-content">
                <span
                  className="tailored__modal-label"
                  style={{ color: cards[activeModal].accentColor }}
                >
                  {cards[activeModal].label}
                </span>
                <h3 className="tailored__modal-title">
                  {cards[activeModal].modal.title}
                </h3>
                {cards[activeModal].modal.subtitle && (
                  <p className="tailored__modal-subtitle">
                    {cards[activeModal].modal.subtitle}
                  </p>
                )}
                <div className="tailored__modal-body">
                  {cards[activeModal].modal.body}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default TailoredSolutionSection

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './TailoredSolutionSection.css'

const SproutIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M32 56 V32" />
    <path d="M32 34 C20 34 14 24 14 14 C28 14 32 24 32 32" />
    <path d="M32 32 C44 32 50 22 50 12 C36 12 32 22 32 30" />
    <path d="M14 56 H50" />
  </svg>
)

const MineralIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M32 8 L52 22 L44 50 H20 L12 22 Z" />
    <path d="M32 8 V50" />
    <path d="M12 22 L32 30 L52 22" />
    <path d="M20 50 L32 30 L44 50" />
  </svg>
)

const RootIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M32 8 V36" />
    <path d="M32 36 C24 38 20 44 20 54" />
    <path d="M32 36 C40 38 44 44 44 54" />
    <path d="M32 36 C30 44 26 50 14 54" />
    <path d="M32 36 C34 44 38 50 50 54" />
    <circle cx="32" cy="8" r="3" />
  </svg>
)

const cards = [
  {
    accentColor: '#3fae5a',
    Icon: SproutIcon,
    label: 'ORGANIC MATTER',
    heading: "Rebuild Your Soil's Biodiversity",
    teaser:
      'Depleted soils lack the microbial activity needed to feed crops naturally. We restore it from the ground up — closed-loop, farm-scale, season after season.',
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
    accentColor: '#cdc56c',
    Icon: MineralIcon,
    label: 'MINERAL DEFICIENCIES',
    heading: "Restore What's Missing",
    teaser:
      'Soil mineral imbalances silently reduce yields, water retention, and crop quality. M-TerraBoost targets the root cause with four critical minerals.',
    modal: {
      title: 'M-TerraBoost — Silica Mineral Fertiliser',
      subtitle: 'Scientifically formulated blend of minerals to target nutrient uptake and water retention.',
      body: (
        <>
          <p>M-TerraBoost delivers four critical minerals your soil may be lacking:</p>
          <ul className="tailored__modal-list">
            <li><strong>Silica</strong> — Strengthens plant cell walls, improves drought and disease resistance, and increases water use efficiency.</li>
            <li><strong>Calcium</strong> — Essential for root development, cell wall integrity, and reducing soil acidity.</li>
            <li><strong>Magnesium</strong> — The core of chlorophyll; drives photosynthesis, energy transfer, and phosphorus uptake.</li>
            <li><strong>Sulphur</strong> — Key for protein synthesis, enzyme function, and nitrogen efficiency.</li>
          </ul>
          <p>Together these minerals improve crop quality, increase yield potential, and reduce long-term input dependency.</p>
        </>
      ),
    },
  },
]

const nurseryCard = {
  accentColor: '#f36f21',
  Icon: RootIcon,
  label: 'NURSERY ROOTS',
  heading: 'Supercharge Early Growth',
  teaser:
    'The first 30 days of root development determine the entire season. We combine vermicompost and M-TerraBoost into a nursery-stage stimulus medium that gives seedlings the strongest possible start.',
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
}

const TailoredSolutionSection = () => {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (key) => setActiveModal(key)
  const closeModal = () => setActiveModal(null)

  const activeCard = activeModal === 'nursery'
    ? nurseryCard
    : (typeof activeModal === 'number' ? cards[activeModal] : null)

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
          <span className="tailored__eyebrow">— Your Tailored Solution</span>
          <h2 className="tailored__heading">Two pillars of <em>regenerative</em> soil.</h2>
          <p className="tailored__subheading">
            We identify what's holding your farm back and apply the right solution.
          </p>
        </motion.div>

        {/* Two main feature cards */}
        <div className="tailored__features">
          {cards.map((card, index) => (
            <motion.button
              type="button"
              key={card.label}
              className="tailored__feature"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
              onClick={() => openModal(index)}
              style={{ '--feature-accent': card.accentColor }}
            >
              <div className="tailored__feature-frame">
                <div className="tailored__feature-icon">
                  <card.Icon />
                </div>
                <span className="tailored__feature-num">0{index + 1}</span>
              </div>
              <div className="tailored__feature-body">
                <span className="tailored__feature-label">{card.label}</span>
                <h3 className="tailored__feature-heading">{card.heading}</h3>
                <p className="tailored__feature-teaser">{card.teaser}</p>
                <span className="tailored__feature-link">Explore →</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Nursery Roots reveal */}
        <motion.div
          className="tailored__nursery"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="tailored__nursery-divider">
            <span className="tailored__nursery-divider-line" />
            <span className="tailored__nursery-divider-label">Then — at the seedling stage</span>
            <span className="tailored__nursery-divider-line" />
          </div>

          <button
            type="button"
            className="tailored__nursery-card"
            onClick={() => openModal('nursery')}
            style={{ '--feature-accent': nurseryCard.accentColor }}
          >
            <div className="tailored__nursery-icon">
              <nurseryCard.Icon />
            </div>
            <div className="tailored__nursery-copy">
              <span className="tailored__feature-label">{nurseryCard.label}</span>
              <h3 className="tailored__feature-heading">{nurseryCard.heading}</h3>
              <p className="tailored__feature-teaser">{nurseryCard.teaser}</p>
              <span className="tailored__feature-link">Explore →</span>
            </div>
          </button>
        </motion.div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeCard && (
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
              <div className="tailored__modal-bar" style={{ background: activeCard.accentColor }} />
              <button className="tailored__modal-close" onClick={closeModal} aria-label="Close">✕</button>
              <div className="tailored__modal-content">
                <span className="tailored__modal-label" style={{ color: activeCard.accentColor }}>
                  {activeCard.label}
                </span>
                <h3 className="tailored__modal-title">{activeCard.modal.title}</h3>
                {activeCard.modal.subtitle && (
                  <p className="tailored__modal-subtitle">{activeCard.modal.subtitle}</p>
                )}
                <div className="tailored__modal-body">{activeCard.modal.body}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default TailoredSolutionSection

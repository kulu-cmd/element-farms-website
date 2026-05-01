import React, { useState, useEffect } from 'react'
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

const Placeholder = ({ tone = 'moss', label, aspect = '4 / 3', className = '' }) => (
  <div
    className={`flyer__placeholder flyer__placeholder--${tone} ${className}`}
    style={{ aspectRatio: aspect }}
    role="img"
    aria-label={label}
  >
    <span className="flyer__placeholder-corner flyer__placeholder-corner--tl" />
    <span className="flyer__placeholder-corner flyer__placeholder-corner--tr" />
    <span className="flyer__placeholder-corner flyer__placeholder-corner--bl" />
    <span className="flyer__placeholder-corner flyer__placeholder-corner--br" />
    <span className="flyer__placeholder-mark">PHOTO</span>
    <span className="flyer__placeholder-caption">{label}</span>
  </div>
)

/* ----------------------------------------------------------------------------
   FLYER CONTENT — Organic Matter (Card 0)
   --------------------------------------------------------------------------- */
const vermicompostFlyer = (
  <div className="flyer flyer--moss flyer--card-v2">
    <div className="flyer__topbar">
      <span className="flyer__kicker">Organic Matter · 1-Pager</span>
      <span className="flyer__brandmark">Element Farm Solutions</span>
    </div>

    <div className="flyer__lede">
      <h2 className="flyer__lede-title">
        We are here to help you set up a regenerative system to recycle your own farm
        waste — and produce your own potent bio-fertilisers.
      </h2>
      <p className="flyer__lede-deck">
        <em>If you currently use chemical fertilisers, manure, or regular compost — this is for you. Level up your fertiliser game.</em>
      </p>
    </div>

    <div className="flyer__pillars flyer__pillars--card">
      <div className="flyer__pillar">
        <span className="flyer__pillar-num">01</span>
        <h3>Living biology</h3>
        <p>Bacteria, fungi, protozoa and humic acids that unlock nutrients chemicals only mask.</p>
      </div>
      <div className="flyer__pillar">
        <span className="flyer__pillar-num">02</span>
        <h3>Plant-ready nutrients</h3>
        <p>NPK plus micros in stable, slow-release form. No leaching, no shock loading.</p>
      </div>
      <div className="flyer__pillar">
        <span className="flyer__pillar-num">03</span>
        <h3>Soil structure</h3>
        <p>Aggregate stability, water-holding capacity, and aeration — the foundations of yield.</p>
      </div>
    </div>

    <div className="flyer__body">
      <p>
        Chemical fertilisers are getting expensive. Farms who <strong>produce their own in-house fertiliser</strong> reduce an otherwise hefty fertiliser bill.
      </p>
      <p>
        Farms who directly spread manure risk soil-burn if not handled or over-applied. Regular compost lacks the mineral and nutrient profile for proper fertilising.
      </p>
      <p>
        We work with curated farms — empowering them with knowledge, training and setup of their own organic fertiliser production area. Using farm waste and organic material we work with you to turn this into a variety of potent organic inoculants.
      </p>
      <p>
        We target heavily distressed soils and your nursery first. Ensuring the babies of today become champions for the future — giving priority to your most eroded farmland.
      </p>
    </div>

    <div className="flyer__statblock">
      <div className="flyer__statblock-cols">
        <div className="flyer__statblock-col">
          <span className="flyer__statblock-tag">Chemical / NPK Burns</span>
          <ul>
            <li>Salt build-up, biology suppressed</li>
            <li>Yield ceiling stays the same — input cost climbs</li>
            <li>Soil thins each season</li>
          </ul>
        </div>
        <div className="flyer__statblock-col">
          <span className="flyer__statblock-tag">Organic Gains</span>
          <ul>
            <li>Microbiome restored, slow-release nutrients</li>
            <li>Yield compounds, input cost drops</li>
            <li>Soil thickens, holds more water</li>
          </ul>
        </div>
      </div>
      <div className="flyer__statblock-stats">
        <div>
          <span className="flyer__statblock-num">25–40%</span>
          <span className="flyer__statblock-label">drop in chemical input cost</span>
        </div>
        <div>
          <span className="flyer__statblock-num">+30%</span>
          <span className="flyer__statblock-label">water-holding capacity gain</span>
        </div>
        <div>
          <span className="flyer__statblock-num">2 seasons</span>
          <span className="flyer__statblock-label">to visible soil-structure recovery</span>
        </div>
      </div>
    </div>

    <div className="flyer__cta">
      <p><em>"Stop feeding the plant. Feed the soil — and the soil will feed everything else."</em></p>
      <a className="flyer__cta-btn" href="/contact/agri-farms">Book a farm assessment →</a>
    </div>
  </div>
)

/* ----------------------------------------------------------------------------
   FLYER CONTENT — Mineral Deficiencies (Card 1)
   --------------------------------------------------------------------------- */
const mineralFlyer = (
  <div className="flyer flyer--ochre flyer--card-v2">
    <div className="flyer__topbar">
      <span className="flyer__kicker">Mineral Deficiencies · 1-Pager</span>
      <span className="flyer__brandmark">Element Farm Solutions</span>
    </div>

    <div className="flyer__lede">
      <h2 className="flyer__lede-title">
        Soil isn't just dirt with NPK in it — it's a mineral matrix, and most South
        African soils are missing the four pieces that matter most.
      </h2>
      <p className="flyer__lede-deck">
        <em>If your yields have plateaued and your fertiliser bill keeps climbing — your soil is missing minerals, not nitrogen. M-TerraBoost restores what's been lost.</em>
      </p>
    </div>

    <div className="flyer__pillars flyer__pillars--card">
      <div className="flyer__pillar">
        <span className="flyer__pillar-num">Si</span>
        <h3>Silica</h3>
        <p>Strengthens cell walls — drives drought and disease resistance, lifts water-use efficiency.</p>
      </div>
      <div className="flyer__pillar">
        <span className="flyer__pillar-num">Ca</span>
        <h3>Calcium</h3>
        <p>Builds root architecture and cell integrity. Reduces soil acidity, unlocks micronutrient uptake.</p>
      </div>
      <div className="flyer__pillar">
        <span className="flyer__pillar-num">Mg</span>
        <h3>Magnesium &amp; Sulphur</h3>
        <p>The chlorophyll core + protein builder. Powers photosynthesis and unlocks nitrogen efficiency.</p>
      </div>
    </div>

    <div className="flyer__body">
      <p>
        Soil mineral imbalances silently reduce yields, water retention, and crop quality. Most growers don't see the cost — they just keep adding NPK to mask it.
      </p>
      <p>
        <strong>M-TerraBoost is a silica-rich mineral blend</strong> targeting the four deficiencies eroding South African yields most. Slow-release, plant-available, formulated for our soils.
      </p>
      <p>
        We start with a soil-test review of your fields, identify the missing pieces, and prescribe the right rate per crop. Broadcast pre-plant, banded under orchards, mixed into nursery media — the application meets the operation.
      </p>
      <p>
        Within two seasons, growers typically report stronger root systems, less lodging, better stress tolerance, and a lower fertiliser load. The minerals do the work the NPK was masking.
      </p>
    </div>

    <div className="flyer__statblock">
      <div className="flyer__statblock-cols">
        <div className="flyer__statblock-col">
          <span className="flyer__statblock-tag">Without M-TerraBoost</span>
          <ul>
            <li>Weaker cell walls — more lodging, more disease</li>
            <li>Mineral lock-out keeps nutrients unavailable</li>
            <li>Heavy reliance on synthetic NPK to compensate</li>
          </ul>
        </div>
        <div className="flyer__statblock-col">
          <span className="flyer__statblock-tag">With M-TerraBoost</span>
          <ul>
            <li>Structural integrity — crops stand up to weather</li>
            <li>Mineral balance restored, uptake unlocked</li>
            <li>Lower fertiliser load, higher response</li>
          </ul>
        </div>
      </div>
      <div className="flyer__statblock-stats">
        <div>
          <span className="flyer__statblock-num">4 minerals</span>
          <span className="flyer__statblock-label">Si · Ca · Mg · S — the missing pieces</span>
        </div>
        <div>
          <span className="flyer__statblock-num">2 seasons</span>
          <span className="flyer__statblock-label">to a measurable yield-ceiling lift</span>
        </div>
        <div>
          <span className="flyer__statblock-num">Lower</span>
          <span className="flyer__statblock-label">NPK load, higher fertiliser response</span>
        </div>
      </div>
    </div>

    <div className="flyer__cta">
      <p><em>"Soil isn't just dirt with NPK in it. It's a mineral matrix — and it's missing pieces."</em></p>
      <a className="flyer__cta-btn" href="/contact/agri-farms">Request a soil-test review →</a>
    </div>
  </div>
)

const cards = [
  {
    accentColor: '#3fae5a',
    Icon: SproutIcon,
    image: '/land_rejuv/microbiology.jpeg',
    label: 'ORGANIC MATTER',
    heading: "Rebuild Your Soil's Biodiversity",
    teaser:
      'Depleted soils lack the microbial activity needed to feed crops naturally. We restore it from the ground up — closed-loop, farm-scale, season after season.',
    flyer: vermicompostFlyer,
  },
  {
    accentColor: '#cdc56c',
    Icon: MineralIcon,
    image: '/land_rejuv/mineral_science.png',
    label: 'MINERAL DEFICIENCIES',
    heading: "Restore What's Missing",
    teaser:
      'Soil mineral imbalances silently reduce yields, water retention, and crop quality. M-TerraBoost targets the root cause with four critical minerals.',
    flyer: mineralFlyer,
  },
]

const TailoredSolutionSection = () => {
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (key) => setActiveModal(key)
  const closeModal = () => setActiveModal(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModal !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeModal])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const activeCard = typeof activeModal === 'number' ? cards[activeModal] : null

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
                {card.image ? (
                  <img
                    className="tailored__feature-photo"
                    src={card.image}
                    alt={card.heading}
                    loading="lazy"
                  />
                ) : (
                  <div className="tailored__feature-icon">
                    <card.Icon />
                  </div>
                )}
              </div>
              <div className="tailored__feature-body">
                <span className="tailored__feature-label">{card.label}</span>
                <h3 className="tailored__feature-heading">{card.heading}</h3>
                <p className="tailored__feature-teaser">{card.teaser}</p>
                <span className="tailored__feature-link">Open the 1-pager →</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Nursery Roots — now an inline open band, not a popup */}
        <motion.div
          className="tailored__nursery-band"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="tailored__nursery-divider">
            <span className="tailored__nursery-divider-line" />
            <span className="tailored__nursery-divider-label">Then — at the seedling stage</span>
            <span className="tailored__nursery-divider-line" />
          </div>

          <div className="tailored__nursery-content">
            <div className="tailored__nursery-copy">
              <span className="tailored__feature-label" style={{ color: '#f36f21' }}>NURSERY ROOTS</span>
              <h3 className="tailored__nursery-heading">
                Supercharge <em>early growth.</em>
              </h3>
              <p className="tailored__nursery-lede">
                The first 30 days of root development determine the entire season. We combine
                vermicompost and M-TerraBoost into a nursery-stage stimulus medium that gives
                seedlings the strongest possible start.
              </p>
              <ul className="tailored__nursery-list">
                <li>
                  <strong>Biology activates instantly.</strong> Worm-casting microbes colonise
                  the root zone the day a seedling is potted.
                </li>
                <li>
                  <strong>Minerals build the structure.</strong> Silica and calcium drive cell
                  division and root-wall integrity from day one.
                </li>
                <li>
                  <strong>Roots go deeper, faster.</strong> Plants leave the nursery with the
                  root system of a much older seedling — transplant shock drops, survival
                  rates rise.
                </li>
                <li>
                  <strong>Works across all crop types.</strong> Vegetables, orchards, lucerne,
                  ornamentals — the same stimulus medium accelerates every nursery stage.
                </li>
              </ul>
            </div>
            <div className="tailored__nursery-visual">
              <div className="nursery-collage" style={{ aspectRatio: '4 / 5' }} aria-label="Nursery growth photos: roots, cabbage, basil comparison">
                <span className="nursery-collage__corner nursery-collage__corner--tl" />
                <span className="nursery-collage__corner nursery-collage__corner--tr" />
                <span className="nursery-collage__corner nursery-collage__corner--bl" />
                <span className="nursery-collage__corner nursery-collage__corner--br" />
                <figure className="nursery-collage__cell nursery-collage__cell--hero">
                  <img src="/land_rejuv/nursery_roots.png" alt="Seedling root system at 14 days" loading="lazy" />
                </figure>
                <figure className="nursery-collage__cell nursery-collage__cell--top">
                  <img src="/land_rejuv/cabbage.jpg" alt="Cabbage grown with EFS stimulus medium" loading="lazy" />
                </figure>
                <figure className="nursery-collage__cell nursery-collage__cell--bottom">
                  <img src="/land_rejuv/basil_comparison.png" alt="Basil growth comparison" loading="lazy" />
                </figure>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Flyer modal — full-screen 1-pager */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            className="tailored__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="tailored__flyer-modal"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="tailored__modal-close" onClick={closeModal} aria-label="Close 1-pager">
                <span aria-hidden="true">✕</span>
                <span className="tailored__modal-close-label">Close</span>
              </button>
              {activeCard.flyer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default TailoredSolutionSection

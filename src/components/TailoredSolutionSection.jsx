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
   FLYER CONTENT — Vermicompost (Card 0)
   Sourced from Chemical NPK Vermicompost Flyer + Organic Farms Vermicompost Flyer
   --------------------------------------------------------------------------- */
const vermicompostFlyer = (
  <div className="flyer flyer--moss">
    {/* Hero strip */}
    <div className="flyer__hero">
      <div className="flyer__hero-copy">
        <span className="flyer__kicker">Element Farm Solutions · 1-Pager</span>
        <h2 className="flyer__hero-title">
          Vermicompost.<br/><em>Black gold, made on your farm.</em>
        </h2>
        <p className="flyer__hero-deck">
          A closed-loop, farm-scale system that turns your manure, crop residues and organic
          waste into living, plant-available worm castings — rebuilding soil biology season
          after season.
        </p>
      </div>
      <Placeholder tone="moss" label="Hero — vermicompost beds at full production" aspect="4 / 5" />
    </div>

    {/* Pillars row — what's in it */}
    <div className="flyer__pillars">
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

    {/* Two-column: NPK comparison */}
    <div className="flyer__compare">
      <div className="flyer__compare-col flyer__compare-col--chemical">
        <span className="flyer__compare-tag">Synthetic NPK</span>
        <ul>
          <li>Three nutrients, fast release</li>
          <li>Salt build-up, biology suppressed</li>
          <li>Yield stays the same — input cost climbs</li>
          <li>Soil thins each season</li>
        </ul>
      </div>
      <div className="flyer__compare-col flyer__compare-col--vermi">
        <span className="flyer__compare-tag">Vermicompost</span>
        <ul>
          <li>Full nutrient profile + microbiome</li>
          <li>Slow release, no salt loading</li>
          <li>Yield compounds — input cost drops</li>
          <li>Soil thickens, holds more water</li>
        </ul>
      </div>
    </div>

    {/* Process strip — 4 stages */}
    <div className="flyer__process">
      <span className="flyer__section-label">— The Process</span>
      <div className="flyer__process-steps">
        <div className="flyer__process-step">
          <Placeholder tone="moss" label="Stage 1 — windrow + manure intake" aspect="1 / 1" />
          <span className="flyer__process-step-num">01</span>
          <h4>Intake</h4>
          <p>Manure, crop residue, organic waste — pre-conditioned and stacked.</p>
        </div>
        <div className="flyer__process-step">
          <Placeholder tone="moss" label="Stage 2 — worm inoculation" aspect="1 / 1" />
          <span className="flyer__process-step-num">02</span>
          <h4>Inoculate</h4>
          <p>Eisenia fetida cultures introduced into managed beds.</p>
        </div>
        <div className="flyer__process-step">
          <Placeholder tone="moss" label="Stage 3 — castings building up" aspect="1 / 1" />
          <span className="flyer__process-step-num">03</span>
          <h4>Convert</h4>
          <p>60–90 days. Worms digest, microbes proliferate, castings build.</p>
        </div>
        <div className="flyer__process-step">
          <Placeholder tone="moss" label="Stage 4 — harvested castings ready for application" aspect="1 / 1" />
          <span className="flyer__process-step-num">04</span>
          <h4>Apply</h4>
          <p>Side-dress, broadcast, or brewed into a liquid drench at planting.</p>
        </div>
      </div>
    </div>

    {/* Use cases — chemical farms vs organic farms */}
    <div className="flyer__usecases">
      <span className="flyer__section-label">— Where It Fits</span>
      <div className="flyer__usecase-grid">
        <div className="flyer__usecase">
          <h4>Chemical / NPK farms</h4>
          <p>
            Layer vermicompost alongside your existing programme. We typically see input
            costs drop 25–40% inside two seasons while yield holds or improves — biology
            does the work fertiliser was masking.
          </p>
          <ul>
            <li>Reduced fertiliser bill, season on season</li>
            <li>Healthier crop response in dry weeks</li>
            <li>Soil structure rebuilds without taking land out of production</li>
          </ul>
        </div>
        <div className="flyer__usecase">
          <h4>Organic farms</h4>
          <p>
            Vermicompost replaces or amplifies your compost programme — denser nutrient
            content, higher microbial counts, and a closed-loop system that turns farm
            waste into your most valuable input.
          </p>
          <ul>
            <li>On-farm production from existing waste streams</li>
            <li>Stronger seedling establishment and root depth</li>
            <li>Premium-grade castings for high-value crops</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Proof bar */}
    <div className="flyer__proof">
      <Placeholder tone="moss" label="Field photo — KZN trial site, year 2 results" aspect="16 / 9" className="flyer__proof-photo" />
      <div className="flyer__proof-stats">
        <div>
          <span className="flyer__proof-num">25–40%</span>
          <span className="flyer__proof-label">drop in chemical input cost</span>
        </div>
        <div>
          <span className="flyer__proof-num">+30%</span>
          <span className="flyer__proof-label">water-holding capacity gain</span>
        </div>
        <div>
          <span className="flyer__proof-num">2 seasons</span>
          <span className="flyer__proof-label">to visible soil-structure recovery</span>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="flyer__cta">
      <p><em>"Stop feeding the plant. Feed the soil — and the soil will feed everything else."</em></p>
      <a className="flyer__cta-btn" href="/contact/agri-farms">Book a farm assessment →</a>
    </div>
  </div>
)

/* ----------------------------------------------------------------------------
   FLYER CONTENT — M-TerraBoost (Card 1)
   Sourced from M-TerraBoost_Flyer.pdf
   --------------------------------------------------------------------------- */
const mineralFlyer = (
  <div className="flyer flyer--ochre">
    {/* Hero */}
    <div className="flyer__hero">
      <div className="flyer__hero-copy">
        <span className="flyer__kicker">Element Farm Solutions · 1-Pager</span>
        <h2 className="flyer__hero-title">
          M-TerraBoost.<br/><em>The four minerals your soil is missing.</em>
        </h2>
        <p className="flyer__hero-deck">
          A scientifically formulated silica-rich mineral blend that targets the most
          common deficiencies eroding South African yields — silica, calcium, magnesium
          and sulphur, in a stable, plant-available form.
        </p>
      </div>
      <Placeholder tone="ochre" label="Hero — M-TerraBoost product shot in field" aspect="4 / 5" />
    </div>

    {/* Four mineral pillars */}
    <div className="flyer__minerals">
      <span className="flyer__section-label">— What's Inside</span>
      <div className="flyer__minerals-grid">
        <div className="flyer__mineral">
          <span className="flyer__mineral-symbol">Si</span>
          <h4>Silica</h4>
          <p>
            Strengthens cell walls. Drives drought and disease resistance. Improves water-use
            efficiency in dry conditions.
          </p>
        </div>
        <div className="flyer__mineral">
          <span className="flyer__mineral-symbol">Ca</span>
          <h4>Calcium</h4>
          <p>
            Essential for root architecture and cell integrity. Reduces soil acidity and
            unlocks micronutrient uptake.
          </p>
        </div>
        <div className="flyer__mineral">
          <span className="flyer__mineral-symbol">Mg</span>
          <h4>Magnesium</h4>
          <p>
            The core atom of chlorophyll. Powers photosynthesis, energy transfer, and
            phosphorus mobility.
          </p>
        </div>
        <div className="flyer__mineral">
          <span className="flyer__mineral-symbol">S</span>
          <h4>Sulphur</h4>
          <p>
            Builds proteins. Triggers enzyme function and dramatically improves nitrogen
            efficiency — less waste, more yield.
          </p>
        </div>
      </div>
    </div>

    {/* Why silica matters */}
    <div className="flyer__compare">
      <div className="flyer__compare-col flyer__compare-col--chemical">
        <span className="flyer__compare-tag">Without M-TerraBoost</span>
        <ul>
          <li>Weaker cell walls — more lodging, more disease</li>
          <li>Mineral lock-out keeps nutrients unavailable</li>
          <li>Heavy reliance on synthetic NPK to compensate</li>
          <li>Yield ceiling stays where it is</li>
        </ul>
      </div>
      <div className="flyer__compare-col flyer__compare-col--vermi">
        <span className="flyer__compare-tag">With M-TerraBoost</span>
        <ul>
          <li>Structural integrity — crops stand up to weather</li>
          <li>Mineral balance restored, uptake unlocked</li>
          <li>Lower fertiliser load, higher response</li>
          <li>Yield ceiling lifts, season after season</li>
        </ul>
      </div>
    </div>

    {/* Application table */}
    <div className="flyer__application">
      <span className="flyer__section-label">— How It's Applied</span>
      <div className="flyer__app-table">
        <div className="flyer__app-row flyer__app-row--head">
          <span>Crop type</span><span>Application</span><span>Timing</span>
        </div>
        <div className="flyer__app-row">
          <span>Row crops</span><span>Broadcast + incorporate</span><span>Pre-plant</span>
        </div>
        <div className="flyer__app-row">
          <span>Orchards</span><span>Banded under canopy</span><span>Late winter / early spring</span>
        </div>
        <div className="flyer__app-row">
          <span>Vegetable nurseries</span><span>Mixed into media</span><span>At seeding</span>
        </div>
        <div className="flyer__app-row">
          <span>Pasture / lucerne</span><span>Surface broadcast</span><span>After cut, before rain</span>
        </div>
      </div>
    </div>

    {/* Soil-test before/after photos */}
    <div className="flyer__beforeafter">
      <div>
        <span className="flyer__beforeafter-tag">Before</span>
        <Placeholder tone="ochre" label="Soil test result — pre-application baseline" aspect="4 / 3" />
        <p>Imbalanced minerals, low silica, locked phosphorus.</p>
      </div>
      <div>
        <span className="flyer__beforeafter-tag flyer__beforeafter-tag--after">After 2 seasons</span>
        <Placeholder tone="ochre" label="Soil test result — post-application 2 seasons" aspect="4 / 3" />
        <p>Mineral balance restored, biology returning, water retention improved.</p>
      </div>
    </div>

    {/* CTA */}
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

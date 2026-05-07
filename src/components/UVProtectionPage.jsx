import React, { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import PageHero from './PageHero'
import EnquiryButton from './ui/EnquiryButton'
import SectionLabel from './ui/SectionLabel'
import './UVProtectionPage.css'

/* ----------------------------------------------------------------------------
   Count-up — same primitive used in ProblemSection
   --------------------------------------------------------------------------- */
const CountUp = ({ to, duration = 1.6, decimals = 0, delay = 0, isInView }) => {
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => v.toFixed(decimals))
  const ref = useRef(null)

  React.useEffect(() => {
    if (!isInView) return
    const controls = animate(mv, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    })
    const unsub = rounded.on('change', (latest) => {
      if (ref.current) ref.current.textContent = latest
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [isInView, to, duration, delay, mv, rounded])

  return <span ref={ref}>0{decimals > 0 ? '.0' : ''}</span>
}

/* ----------------------------------------------------------------------------
   Editorial facts — sourced from the EFS pitch deck (Pitch Deck Agriculture)
   --------------------------------------------------------------------------- */
const facts = [
  {
    value: 40,
    display: '40',
    prefix: 'up to ',
    suffix: '%',
    unit: 'Granny Smith rejection',
    label: 'of \'Granny Smith\' apples cannot be exported due to sunburn — climate volatility makes this worse every season.',
    source: 'EFS pitch deck',
  },
  {
    value: 20,
    display: '20',
    suffix: '%',
    unit: 'Golden Delicious',
    label: 'of \'Golden Delicious\' apples are lost to sunburn surface damage at grading.',
    source: 'Hortgro / EFS deck',
  },
  {
    value: 50,
    display: '50',
    prefix: '~',
    suffix: '%',
    unit: 'sunburn cut',
    label: 'reduction in sunburn incidence per tree, with measured canopy and fruit-surface temperature drops.',
    source: 'Citrus mitigation trials',
  },
]

/* ----------------------------------------------------------------------------
   Pest categories M-Defend works against (per the pitch deck)
   --------------------------------------------------------------------------- */
const pestCategories = [
  { name: 'Beetles', glyph: '⏃' },
  { name: 'Moths', glyph: '⏆' },
  { name: 'Weevils', glyph: '⏃' },
  { name: 'Flies', glyph: '⏈' },
  { name: 'Gnats', glyph: '⏈' },
  { name: 'Maggots', glyph: '⏃' },
  { name: 'Slugs', glyph: '⏃' },
  { name: 'Caterpillars', glyph: '⏆' },
  { name: 'Scale & Mites', glyph: '⏃' },
]

/* ----------------------------------------------------------------------------
   Specific named pests M-Defend protects against in SA
   --------------------------------------------------------------------------- */
const pestsByCrop = [
  { crop: 'Citrus',     pests: ['False Codling Moth', 'Citrus Leafhopper', 'Citrus Leaf Miner'] },
  { crop: 'Orchard',   pests: ['Cherry Fly', 'Olive Fly'] },
  { crop: 'Apple',     pests: ['Apple Aphid', 'Apple Psyllid'] },
  { crop: 'Stone Fruit', pests: ['Peach Aphid', 'Plum Aphid'] },
  { crop: 'Vine',      pests: ['Vine Leafhopper'] },
  { crop: 'Mango',     pests: ['Mango Mealybug'] },
  { crop: 'Macadamia', pests: ['Macadamia Nut Borer'] },
  { crop: 'Maize / Cereal', pests: ['Stalk Borer'] },
]

/* ----------------------------------------------------------------------------
   Photo placeholder
   --------------------------------------------------------------------------- */
const Placeholder = ({ tone = 'clay', label, aspect = '4 / 3', className = '' }) => (
  <div
    className={`uv__placeholder uv__placeholder--${tone} ${className}`}
    style={{ aspectRatio: aspect }}
    role="img"
    aria-label={label}
  >
    <span className="uv__placeholder-corner uv__placeholder-corner--tl" />
    <span className="uv__placeholder-corner uv__placeholder-corner--tr" />
    <span className="uv__placeholder-corner uv__placeholder-corner--bl" />
    <span className="uv__placeholder-corner uv__placeholder-corner--br" />
    <span className="uv__placeholder-mark">PHOTO</span>
    <span className="uv__placeholder-caption">{label}</span>
  </div>
)

const UVProtectionPage = () => {
  const factsRef = useRef(null)
  const factsInView = useInView(factsRef, { once: true, amount: 0.15 })

  return (
    <div className="uv">
      <Header />

      <PageHero
        title="Sun &amp; Pest __Shield__"
        subtitle="Two mineral foliar coatings for high-value crops — M-GeoShade for sunburn, M-Defend for 140+ pest species. Physical, non-chemical, resistance-proof."
        tone="clay"
      />

      {/* ──────────────────────────────────────────────────────────────
          1.  Editorial facts — same row layout as ProblemSection
          ────────────────────────────────────────────────────────────── */}
      <section className="uv__facts" ref={factsRef}>
        <div className="uv__facts-inner">
          <div className="uv__facts-header">
            <SectionLabel label="The Problem" />
            <motion.h2
              className="uv__facts-statement"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              The sun and the swarm — <em>two silent</em> tax-collectors on every harvest.
            </motion.h2>
          </div>

          <ol className="uv__facts-index">
            {facts.map((stat, i) => {
              const decimals = String(stat.display).includes('.') ? 1 : 0
              return (
                <motion.li
                  key={`${stat.display}-${i}`}
                  className="uv__facts-row"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="uv__facts-row-n">0{i + 1}</span>

                  <div className="uv__facts-row-figures">
                    <span className="uv__facts-row-value">
                      {stat.prefix && (
                        <span className="uv__facts-row-prefix">{stat.prefix}</span>
                      )}
                      <CountUp
                        to={stat.value}
                        decimals={decimals}
                        delay={0.3 + i * 0.08}
                        isInView={factsInView}
                      />
                      {stat.suffix && (
                        <span className="uv__facts-row-suffix">{stat.suffix}</span>
                      )}
                    </span>
                    <span className="uv__facts-row-unit">{stat.unit}</span>
                  </div>

                  <div className="uv__facts-row-text">
                    <p className="uv__facts-row-label">{stat.label}</p>
                    <span className="uv__facts-row-source">— {stat.source}</span>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          2.  Two-pillar overview — sunburn vs pest
          ────────────────────────────────────────────────────────────── */}
      <section className="uv__pillars">
        <div className="uv__pillars-inner">
          <div className="uv__pillars-grid">
            <motion.a
              href="#shade"
              className="uv__pillar uv__pillar--shade"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.05 }}
            >
              <span className="uv__pillar-num">01</span>
              <span className="uv__pillar-tag">For Sunburn</span>
              <h3 className="uv__pillar-name">M-GeoShade</h3>
              <p className="uv__pillar-desc">
                A reflective mineral sunscreen — drops fruit-surface temperature,
                prevents UV scarring, and protects exportable grade. ~50% sunburn
                reduction in trial.
              </p>
              <span className="uv__pillar-link">Read more ↓</span>
            </motion.a>

            <motion.a
              href="#defend"
              className="uv__pillar uv__pillar--defend"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              <span className="uv__pillar-num">02</span>
              <span className="uv__pillar-tag">For Pest Protection</span>
              <h3 className="uv__pillar-name">M-Defend</h3>
              <p className="uv__pillar-desc">
                A physical pest dehydrator — pests landing on the coating lose moisture
                rapidly. Works on 140+ species. No immunity, no withdrawal period.
              </p>
              <span className="uv__pillar-link">Read more ↓</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          3.  M-GeoShade detail (Sunburn)
          ────────────────────────────────────────────────────────────── */}
      <section className="uv__detail uv__detail--shade" id="shade">
        <div className="uv__detail-inner">
          <motion.div
            className="uv__detail-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <span className="uv__detail-banner uv__detail-banner--clay">For Sunburn</span>
            <h2 className="uv__detail-heading">
              <em>~50%</em> less sunburn — research-grade <em>protection</em> in a foliar spray.
            </h2>
            <p className="uv__detail-deck">
              Citrus and pome-fruit trials report a ~50% reduction in sunburn incidence
              per tree, alongside measurable canopy and fruit-surface temperature drops.
              M-GeoShade is our specifically formulated mineral blend — reflective, inert,
              and washable at packing.
            </p>
          </motion.div>

          <div className="uv__detail-product">
            <img
              src="/geoshield/apple_covered.png"
              alt="Apple coated with M-GeoShade — visible reflective mineral layer on the fruit skin"
              className="uv__detail-product-img"
            />
            <div className="uv__detail-product-copy">
              <span className="uv__detail-product-tag">Mineral Sunscreen · Foliar Spray</span>
              <h3 className="uv__detail-product-name">M-GeoShade</h3>
              <p>
                A reflective mineral coat that bounces UV away from the fruit skin. Mix
                into water, apply through standard foliar equipment, refresh during peak
                heat events.
              </p>
              <ul className="uv__detail-list">
                <li>
                  <strong>Reduces fruit-surface temperature.</strong> Verified in field-trial
                  thermal imaging.
                </li>
                <li>
                  <strong>Protects exportable grade.</strong> Critical for Granny Smith,
                  Golden Delicious, citrus and stone fruit.
                </li>
                <li>
                  <strong>Safe for bees & pollinators.</strong> No insecticidal action.
                </li>
                <li>
                  <strong>Washes off cleanly at packing.</strong> No residue, no flavour
                  or ripening impact.
                </li>
              </ul>
              <EnquiryButton product="M-GeoShade" />
            </div>
          </div>

          {/* Thermal proof images */}
          <div className="uv__thermal">
            <span className="uv__thermal-label">— Thermal-imaging proof</span>
            <div className="uv__thermal-grid">
              <motion.figure
                className="uv__thermal-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <img src="/geoshield/uv-1.jpg" alt="Higher fruit-surface temperatures without M-GeoShade applied" />
                <figcaption>
                  <span className="uv__thermal-tag uv__thermal-tag--hot">Without M-GeoShade</span>
                  Higher fruit-surface temperatures — sunburn risk peaks here.
                </figcaption>
              </motion.figure>
              <motion.figure
                className="uv__thermal-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <img src="/geoshield/uv-2.jpg" alt="Lower fruit-surface temperatures with M-GeoShade applied" />
                <figcaption>
                  <span className="uv__thermal-tag uv__thermal-tag--cool">With M-GeoShade</span>
                  Lower fruit-surface temperatures — sunburn incidence drops by half.
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          4.  M-Defend detail (Pest)
          ────────────────────────────────────────────────────────────── */}
      <section className="uv__detail uv__detail--defend" id="defend">
        <div className="uv__detail-inner">
          <motion.div
            className="uv__detail-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <span className="uv__detail-banner uv__detail-banner--moss">For Pest Protection</span>
            <h2 className="uv__detail-heading">
              Effective pest control on <em>140+ species.</em>
            </h2>
            <p className="uv__detail-deck">
              No chemical additives. Inert, harmless to humans and pollinators. Pests
              cannot develop immunity — M-Defend works <em>physically.</em> When a pest
              lands on a treated surface, it dehydrates rapidly. Eggs laid on the coating
              fail to develop. The reproductive cycle breaks at the source.
            </p>
          </motion.div>

          <div className="uv__detail-product">
            <Placeholder
              tone="moss"
              label="M-Defend product bag — front label"
              aspect="4 / 5"
              className="uv__detail-product-img"
            />
            <div className="uv__detail-product-copy">
              <span className="uv__detail-product-tag uv__detail-product-tag--moss">Pest Dehydrator · Foliar Spray</span>
              <h3 className="uv__detail-product-name">M-Defend</h3>
              <p>
                Mix M-Defend into water and apply as a foliar spray. A visible white
                mineral layer settles on the canopy — that's the active barrier. It
                continues working until the coating is no longer visible, at which point
                you reapply. Simple, mechanical, repeatable.
              </p>
              <ul className="uv__detail-list uv__detail-list--moss">
                <li>
                  <strong>Dehydrates pests on contact.</strong> Beetles, moths, weevils,
                  flies, gnats, maggots, slugs, caterpillars, scale and mites.
                </li>
                <li>
                  <strong>Disrupts the pest life cycle.</strong> Eggs laid on a coated
                  surface cannot develop.
                </li>
                <li>
                  <strong>Zero immunity build-up.</strong> Mechanical action, not
                  chemistry — pests cannot adapt.
                </li>
                <li>
                  <strong>Bee- and pollinator-safe.</strong> No insecticidal residue, no
                  withdrawal period.
                </li>
              </ul>
              <EnquiryButton product="M-Defend" tone="moss" />
            </div>
          </div>

          {/* Pest categories — the 9 from the deck */}
          <div className="uv__pest-cats">
            <span className="uv__pest-cats-label">— Categories M-Defend dehydrates</span>
            <div className="uv__pest-cats-grid">
              {pestCategories.map((c, i) => (
                <motion.div
                  key={c.name}
                  className="uv__pest-cat"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                >
                  <span className="uv__pest-cat-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="uv__pest-cat-name">{c.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pests by crop type */}
          <div className="uv__pests">
            <span className="uv__pests-label">— Pests M-Defend controls, by crop</span>
            <div className="uv__crop-groups">
              {pestsByCrop.map((group, i) => (
                <motion.div
                  key={group.crop}
                  className="uv__crop-group"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <span className="uv__crop-name">{group.crop}</span>
                  <ul className="uv__crop-pests">
                    {group.pests.map((pest) => (
                      <li key={pest} className="uv__crop-pest">{pest}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <p className="uv__pests-footnote">
              Full species list available on request.
            </p>
          </div>

          {/* Application note + before/after photo */}
          <div className="uv__apply-row">
            <aside className="uv__app-note">
              <span className="uv__app-note-label">— Application</span>
              <p>
                Mix M-Defend into water. Spray onto the canopy through standard foliar
                equipment. A visible white mineral layer settles on the leaves and fruit
                — that's the working barrier. M-Defend functions until the coating is no
                longer visible.
              </p>
            </aside>
            <figure className="uv__apply-figure">
              <img
                src="/geoshield/defend_before_After.png"
                alt="Before / after M-Defend application — visible mineral coating on fruit"
              />
              <figcaption>Before · After M-Defend</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          5.  Closing CTA
          ────────────────────────────────────────────────────────────── */}
      <section className="uv__cta">
        <motion.div
          className="uv__cta-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="uv__cta-statement">
            Every challenge is unique. <em>Let's talk about yours.</em>
          </h2>

          <div className="uv__cta-actions">
            <p className="uv__cta-prompt">
              Whether it's UV stress on Granny Smith, citrus leaf miner pressure, or
              something else eating into your packout — our team will design a
              customised foliar programme for your crop, your block, and your packout
              standards.
            </p>
            <div className="uv__cta-buttons">
              <a className="uv__cta-btn uv__cta-btn--primary" href="/contact/agri-farms">
                Contact us for trials →
              </a>
              <a className="uv__cta-btn" href="/solutions/land-rejuvenation">
                Browse other solutions
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

export default UVProtectionPage

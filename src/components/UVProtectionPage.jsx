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
const CountUp = ({ to, duration = 2.4, decimals = 0, delay = 0, isInView }) => {
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
    suffix: '%',
    unit: 'grape harvest value lost',
    label: 'of a sunburned grape harvest\'s commercial value can be wiped out — A-grade fruit downgraded to C/D-grade in high-radiation vintages.',
    source: 'Gambetta et al., 2021 — Frontiers in Plant Science',
  },
  {
    value: 20,
    display: '20',
    suffix: '%',
    unit: 'FCM yield loss',
    label: 'of a citrus crop can be destroyed by False Codling Moth — costing South Africa\'s industry an estimated US$14 million per year.',
    source: 'IAEA / USDA',
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
  const shadeRef = useRef(null)
  const shadeInView = useInView(shadeRef, { once: true, amount: 0.3 })
  const defendRef = useRef(null)
  const defendInView = useInView(defendRef, { once: true, amount: 0.3 })
  const pillarsRef = useRef(null)
  const pillarsInView = useInView(pillarsRef, { once: true, amount: 0.3 })

  return (
    <div className="uv">
      <Header />

      <PageHero
        title="Sun &amp; Pest __Shield__"
        subtitle="Two mineral foliar coatings for high-value crops — M-GeoShade for sunburn, M-Defend for 140+ pest species. Physical, non-chemical, resistance-proof."
        tone="clay"
      />

      {/* ──────────────────────────────────────────────────────────────
          1.  Editorial facts — the problem, with quote
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
      <section className="uv__pillars" ref={pillarsRef}>
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
              <figure className="uv__pillar-photo">
                <img src="/geoshield/M-Geoshade.png" alt="M-GeoShade product bag" loading="lazy" />
              </figure>

              <div className="uv__pillar-copy">
                <header className="uv__pillar-head">
                  <span className="uv__pillar-num">01</span>
                  <span className="uv__pillar-rule" aria-hidden="true" />
                  <span className="uv__pillar-tag">For Sunburn</span>
                </header>

                <h3 className="uv__pillar-name">M-GeoShade</h3>

                <p className="uv__pillar-desc">
                  A reflective mineral sunscreen — drops fruit-surface temperature,
                  prevents UV scarring, and protects exportable grade.{' '}
                  <strong>~50%</strong> sunburn reduction in trial.
                </p>

                <span className="uv__pillar-link">
                  Read more
                  <span className="uv__pillar-link-arrow" aria-hidden="true">↓</span>
                </span>
              </div>
            </motion.a>

            <motion.a
              href="#defend"
              className="uv__pillar uv__pillar--defend"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              <figure className="uv__pillar-photo">
                <img src="/geoshield/M-Defend.png" alt="M-Defend product bag" loading="lazy" />
              </figure>

              <div className="uv__pillar-copy">
                <header className="uv__pillar-head">
                  <span className="uv__pillar-num">02</span>
                  <span className="uv__pillar-rule" aria-hidden="true" />
                  <span className="uv__pillar-tag">For Pest Protection</span>
                </header>

                <h3 className="uv__pillar-name">M-Defend</h3>

                <p className="uv__pillar-desc">
                  A physical pest dehydrator — pests landing on the coating lose moisture
                  rapidly. Works on <strong>140+ species</strong>. No immunity, no
                  withdrawal period.
                </p>

                <span className="uv__pillar-link">
                  Read more
                  <span className="uv__pillar-link-arrow" aria-hidden="true">↓</span>
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          3.  M-GeoShade detail (Sunburn)
          ────────────────────────────────────────────────────────────── */}
      <section className="uv__detail uv__detail--shade" id="shade" ref={shadeRef}>
        <div className="uv__detail-inner">
          <motion.div
            className="uv__detail-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel label="For Sunburn" />
            <h2 className="uv__detail-heading">
              Built to <em>shield exportable fruit.</em>
            </h2>
            <p className="uv__detail-deck">
              Citrus and pome-fruit trials report a ~50% reduction in sunburn incidence
              per tree, alongside measurable canopy and fruit-surface temperature drops.
              M-GeoShade is our specifically formulated mineral blend — reflective, inert,
              and washable at packing.
            </p>
          </motion.div>

          <div className="uv__detail-product">
            <div className="uv__detail-media">
              <figure className="uv__detail-product-img">
                <img
                  src="/geoshield/M-Geoshade.png"
                  alt="M-GeoShade product bag — mineral sunscreen for high-value crops"
                />
              </figure>
              <img
                className="uv__detail-seal"
                src="/land_rejuv/stamp.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
            </div>
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
            <div className="uv__thermal-header">
              <div className="uv__thermal-header-top">
                <span className="uv__thermal-badge" aria-hidden="true">● Field Data</span>
                <span className="uv__thermal-header-rule" aria-hidden="true" />
              </div>
              <h3 className="uv__thermal-title">Thermal-Imaging <em>Proof</em></h3>
            </div>
            <div className="uv__thermal-grid uv__thermal-grid--three">
              <motion.figure
                className="uv__thermal-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <div className="uv__thermal-img photo-frame">
                  <span className="photo-frame__corner photo-frame__corner--tl" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--tr" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--bl" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--br" aria-hidden="true" />
                  <img src="/geoshield/apple_covered.png" alt="Apple coated with M-GeoShade — visible reflective mineral layer on the fruit skin" />
                </div>
                <figcaption>
                  <span className="uv__thermal-tag uv__thermal-tag--cool">M-GeoShade Applied</span>
                  Reflective mineral layer visible on the fruit skin — UV bounces away.
                </figcaption>
              </motion.figure>
              <motion.figure
                className="uv__thermal-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="uv__thermal-img photo-frame">
                  <span className="photo-frame__corner photo-frame__corner--tl" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--tr" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--bl" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--br" aria-hidden="true" />
                  <img src="/geoshield/uv-1.jpg" alt="Lower fruit-surface temperatures with M-GeoShade applied" />
                </div>
                <figcaption>
                  <span className="uv__thermal-tag uv__thermal-tag--cool">With M-GeoShade</span>
                  Lower fruit-surface temperatures — sunburn incidence drops by half.
                </figcaption>
              </motion.figure>
              <motion.figure
                className="uv__thermal-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="uv__thermal-img photo-frame">
                  <span className="photo-frame__corner photo-frame__corner--tl" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--tr" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--bl" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--br" aria-hidden="true" />
                  <img src="/geoshield/uv-2.jpg" alt="Higher fruit-surface temperatures without M-GeoShade applied" />
                </div>
                <figcaption>
                  <span className="uv__thermal-tag uv__thermal-tag--hot">Without M-GeoShade</span>
                  Higher fruit-surface temperatures — sunburn risk peaks here.
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          4.  M-Defend detail (Pest)
          ────────────────────────────────────────────────────────────── */}
      <section className="uv__detail uv__detail--defend" id="defend" ref={defendRef}>
        <div className="uv__detail-inner">
          <motion.div
            className="uv__detail-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel label="For Pest Protection" />
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
            <div className="uv__detail-media">
              <figure className="uv__detail-product-img">
                <img
                  src="/geoshield/M-Defend.png"
                  alt="M-Defend product bag — physical pest dehydrator"
                />
              </figure>
              <img
                className="uv__detail-seal"
                src="/land_rejuv/stamp.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
            </div>
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

          {/* Application steps + before/after photo */}
          <div className="uv__apply">
            <header className="uv__apply-header">
              <SectionLabel label="Application" />
              <h3 className="uv__apply-heading">
                Three steps, <em>nothing chemical.</em>
              </h3>
            </header>

            <div className="uv__apply-row">
              <ol className="uv__app-cards">
                <li className="uv__app-card uv__app-card--mix">
                  <span className="uv__app-card-badge" aria-hidden="true">
                    <span className="uv__app-card-num">01</span>
                  </span>
                  <div className="uv__app-card-body">
                    <h4 className="uv__app-card-title">Mix</h4>
                    <p className="uv__app-card-text">
                      Mix M-Defend concentrate into water at the recommended
                      dilution rate.
                    </p>
                  </div>
                </li>
                <li className="uv__app-card uv__app-card--spray">
                  <span className="uv__app-card-badge" aria-hidden="true">
                    <span className="uv__app-card-num">02</span>
                  </span>
                  <div className="uv__app-card-body">
                    <h4 className="uv__app-card-title">Spray</h4>
                    <p className="uv__app-card-text">
                      Spray onto the canopy using standard foliar equipment
                      until coverage is complete.
                    </p>
                  </div>
                </li>
                <li className="uv__app-card uv__app-card--coat">
                  <span className="uv__app-card-badge" aria-hidden="true">
                    <span className="uv__app-card-num">03</span>
                  </span>
                  <div className="uv__app-card-body">
                    <h4 className="uv__app-card-title">Coat</h4>
                    <p className="uv__app-card-text">
                      A white mineral layer settles on leaves and fruit —
                      <em> the coating is the working barrier.</em> Re-apply
                      when no longer visible.
                    </p>
                  </div>
                </li>
              </ol>

              <figure className="uv__apply-figure">
                <div className="uv__apply-figure-frame photo-frame">
                  <span className="photo-frame__corner photo-frame__corner--tl" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--tr" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--bl" aria-hidden="true" />
                  <span className="photo-frame__corner photo-frame__corner--br" aria-hidden="true" />
                  <img
                    src="/geoshield/defend_before_After.png"
                    alt="Before / after M-Defend application — visible mineral coating on fruit"
                  />
                </div>
                <figcaption>Before · After M-Defend</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default UVProtectionPage

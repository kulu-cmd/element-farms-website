import React, { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import PageHero from './PageHero'
import SectionLabel from './ui/SectionLabel'
import FAQSection from './FAQSection'
import './PoultryPage.css'

const SPRING = [0.22, 1, 0.36, 1]

/* ----------------------------------------------------------------------------
   Count-up — same primitive used in UVProtectionPage / ProblemSection
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
      ease: SPRING,
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
   Photo placeholder — corner-bracket style, matches UVProtectionPage
   --------------------------------------------------------------------------- */
const Placeholder = ({ tone = 'clay', label, aspect = '4 / 3', className = '' }) => (
  <div
    className={`poultry__placeholder poultry__placeholder--${tone} ${className}`}
    style={{ aspectRatio: aspect }}
    role="img"
    aria-label={label}
  >
    <span className="poultry__placeholder-corner poultry__placeholder-corner--tl" />
    <span className="poultry__placeholder-corner poultry__placeholder-corner--tr" />
    <span className="poultry__placeholder-corner poultry__placeholder-corner--bl" />
    <span className="poultry__placeholder-corner poultry__placeholder-corner--br" />
    <span className="poultry__placeholder-mark">PHOTO</span>
    <span className="poultry__placeholder-caption">{label}</span>
  </div>
)

/* ----------------------------------------------------------------------------
   Editorial facts — opening problem scan
   --------------------------------------------------------------------------- */
const facts = [
  {
    value: 25,
    display: '25',
    prefix: '~',
    suffix: ' ppm',
    unit: 'Stress threshold',
    label: 'Ammonia level where birds begin showing respiratory stress and reduced feed intake.',
    source: 'Industry threshold',
  },
  {
    value: 40,
    display: '40',
    prefix: '',
    suffix: '+ ppm',
    unit: 'Worker hazard',
    label: 'Ammonia concentration that becomes unsafe for farm workers and causes severe bird mortality.',
    source: 'OSHA / poultry health',
  },
  {
    value: 0,
    display: '',
    prefix: '',
    suffix: 'Wet seasons',
    unit: 'Mortality spikes',
    label: 'Mortality spikes can wipe out entire stock when litter humidity and bacteria go unmanaged.',
    source: 'Field observations',
    nonNumeric: true,
  },
  {
    value: 12,
    display: '12',
    prefix: '+',
    suffix: '%',
    unit: 'Live trial result',
    label: 'Raw weight gain across 7,600 broiler birds — measured against an untreated control flock.',
    source: 'EFS field trial',
  },
]

/* ----------------------------------------------------------------------------
   NH₃ bullet list
   --------------------------------------------------------------------------- */
const ammoniaList = [
  { strong: 'Starts irritating birds at just 20–25 ppm.', tail: 'Long before the smell registers to a human nose.' },
  { strong: 'Above 40 ppm — respiratory disease, unsafe for workers.', tail: 'OSHA-flagged exposure level for farm staff.' },
  { strong: 'Damages footpads, causes breast blisters, raises coccidiosis risk.', tail: 'Direct hits to bird welfare and grading scores.' },
  { strong: 'Mortality spikes during wet seasons can wipe out entire stock.', tail: 'Wet litter is the trigger — not the symptom.' },
]

/* ----------------------------------------------------------------------------
   Three-job pillars (one product, three concurrent jobs)
   --------------------------------------------------------------------------- */
const pillars = [
  {
    accent: 'clay',
    num: '01',
    tag: 'Ammonia Control',
    name: 'Neutralise NH₃',
    desc: 'Locks down uric acid before it volatilises — keeping ammonia under the stress threshold across the cycle.',
  },
  {
    accent: 'moss',
    num: '02',
    tag: 'Moisture Management',
    name: 'Absorb the wet',
    desc: 'Pulls water out of caked litter and damp patches around drinker lines, breaking the wet-litter feedback loop.',
  },
  {
    accent: 'ink',
    num: '03',
    tag: 'Bacteria Reduction',
    name: 'Hostile to pathogens',
    desc: 'Mineral surface chemistry creates an environment where harmful bacteria struggle to colonise and bloom.',
  },
]

/* ----------------------------------------------------------------------------
   Product-detail bullets for M-LitterGuard
   --------------------------------------------------------------------------- */
const productBullets = [
  { strong: 'Safe for birds, workers and environment.', tail: 'No harsh chemicals, no synthetic compounds.' },
  { strong: 'Absorbs moisture on contact.', tail: 'Targets wet patches, drinker lines and condensation zones.' },
  { strong: 'Neutralises ammonia at the source.', tail: 'Stops the uric-acid → NH₃ reaction before it releases.' },
  { strong: 'Hostile to harmful bacteria.', tail: 'Mineral chemistry suppresses the wet-litter pathogen bloom.' },
]

/* ----------------------------------------------------------------------------
   Trial proof — 7,600 birds
   --------------------------------------------------------------------------- */
const trialProof = [
  {
    tag: 'Weight gain',
    value: 12,
    suffix: '%',
    caption: 'Raw weight gain in poultry, measured across 7,600 birds vs. an untreated control flock.',
  },
  {
    tag: 'Litter quality',
    valueGlyph: '✓',
    caption: 'Significantly improved odour and moisture-assessment scores across the trial barn.',
  },
]

/* ----------------------------------------------------------------------------
   Application guide — three modes
   --------------------------------------------------------------------------- */
const applicationCards = [
  {
    accent: 'clay',
    num: '01',
    heading: 'During Grow-Out',
    sub: 'Active flock present',
    bullets: [
      'Apply to wet patches as they appear.',
      'Focus on drinker lines and nipple areas.',
      'Treat near walls where condensation forms.',
      'Re-apply after wet weather events.',
    ],
  },
  {
    accent: 'moss',
    num: '02',
    heading: 'Pre-Placement',
    sub: 'Before chicks arrive',
    bullets: [
      'Spread evenly across full floor area.',
      'Absorbs residual moisture from previous flock.',
      'Reduces microbial load before day-old chicks arrive.',
      'Creates a clean, dry environment from day one.',
    ],
  },
  {
    accent: 'ink',
    num: '03',
    heading: 'Between Cycles',
    sub: 'Litter management',
    bullets: [
      'Mix into reused litter before restocking.',
      'Controls ammonia release from built-up uric acid.',
      'Extends litter usability across multiple cycles.',
      'Reduces litter disposal costs.',
    ],
  },
]

/* ----------------------------------------------------------------------------
   Field-photo strip
   --------------------------------------------------------------------------- */
const imagePlaceholders = [
  { tone: 'clay', label: 'Broiler house environment — pre-treatment baseline.' },
  { tone: 'moss', label: 'Litter treatment application — operator broadcast pass.' },
  { tone: 'clay', label: 'Healthy flock at grading — uniform plumage, dry footpads.' },
]

const PoultryPage = () => {
  const factsRef = useRef(null)
  const factsInView = useInView(factsRef, { once: true, amount: 0.15 })

  const trialRef = useRef(null)
  const trialInView = useInView(trialRef, { once: true, amount: 0.3 })

  return (
    <div className="poultry">
      <Header />

      <PageHero
        title="Poultry Farm __Solutions__"
        subtitle="A scientifically formulated mineral solution that tackles ammonia, moisture, and bacteria — protecting your flock and your bottom line."
        tone="clay"
      />

      {/* ──────────────────────────────────────────────────────────────
          1.  Editorial facts — the problem, in numbers
          ────────────────────────────────────────────────────────────── */}
      <section className="poultry__facts" ref={factsRef}>
        <div className="poultry__facts-inner">
          <div className="poultry__facts-header">
            <SectionLabel label="The Problem" />
            <motion.h2
              className="poultry__facts-statement"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: SPRING }}
            >
              Wet litter and ammonia are silently <em>costing you birds</em> every season.
            </motion.h2>
          </div>

          <ol className="poultry__facts-index">
            {facts.map((stat, i) => {
              const decimals = String(stat.display).includes('.') ? 1 : 0
              return (
                <motion.li
                  key={`${stat.unit}-${i}`}
                  className="poultry__facts-row"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.75, delay: i * 0.08, ease: SPRING }}
                >
                  <span className="poultry__facts-row-n">0{i + 1}</span>

                  <div className="poultry__facts-row-figures">
                    <span className="poultry__facts-row-value">
                      {stat.prefix && (
                        <span className="poultry__facts-row-prefix">{stat.prefix}</span>
                      )}
                      {stat.nonNumeric ? (
                        <span className="poultry__facts-row-word">{stat.suffix}</span>
                      ) : (
                        <>
                          <CountUp
                            to={stat.value}
                            decimals={decimals}
                            delay={0.3 + i * 0.08}
                            isInView={factsInView}
                          />
                          {stat.suffix && (
                            <span className="poultry__facts-row-suffix">{stat.suffix}</span>
                          )}
                        </>
                      )}
                    </span>
                    <span className="poultry__facts-row-unit">{stat.unit}</span>
                  </div>

                  <div className="poultry__facts-row-text">
                    <p className="poultry__facts-row-label">{stat.label}</p>
                    <span className="poultry__facts-row-source">— {stat.source}</span>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          2.  NH₃ headline callout — dark band
          ────────────────────────────────────────────────────────────── */}
      <section className="poultry__nh3">
        <div className="poultry__nh3-inner">
          <motion.div
            className="poultry__nh3-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: SPRING }}
          >
            <div className="poultry__nh3-text">
              <span className="poultry__nh3-tag">Why ammonia is your biggest enemy</span>
              <h3 className="poultry__nh3-heading">
                From <em>irritation</em> to fatality — ammonia doesn't give you a warning.
              </h3>
              <ul className="poultry__nh3-list">
                {ammoniaList.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: SPRING }}
                  >
                    <strong>{item.strong}</strong> {item.tail}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="poultry__nh3-visual">
              <Placeholder
                tone="clay"
                label="NH₃ — ammonia meter / broiler house interior"
                aspect="4 / 3"
                className="poultry__nh3-img"
              />
              <span className="poultry__nh3-glyph" aria-hidden="true">NH₃</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          3.  Three-job pillars
          ────────────────────────────────────────────────────────────── */}
      <section className="poultry__pillars">
        <div className="poultry__pillars-inner">
          <motion.div
            className="poultry__pillars-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel label="Our Solution" />
            <h2 className="poultry__pillars-heading">
              One mineral blend. <em>Three jobs.</em>
            </h2>
            <p className="poultry__pillars-deck">
              M-LitterGuard is a single formulated mineral blend, applied directly to litter, that
              works on the three root causes of broiler-house failure simultaneously — through the
              grow-out cycle and between flocks.
            </p>
          </motion.div>

          <div className="poultry__pillars-grid">
            {pillars.map((p, i) => (
              <motion.a
                key={p.tag}
                href="#litterguard"
                className={`poultry__pillar poultry__pillar--${p.accent}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.12 }}
              >
                <span className="poultry__pillar-num">{p.num}</span>
                <span className="poultry__pillar-tag">{p.tag}</span>
                <h3 className="poultry__pillar-name">{p.name}</h3>
                <p className="poultry__pillar-desc">{p.desc}</p>
                <span className="poultry__pillar-link">Read more ↓</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          4.  M-LitterGuard product detail
          ────────────────────────────────────────────────────────────── */}
      <section className="poultry__detail" id="litterguard">
        <div className="poultry__detail-inner">
          <motion.div
            className="poultry__detail-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <span className="poultry__detail-banner">For Broiler Houses</span>
            <h2 className="poultry__detail-heading">
              Naturally formulated. <em>Scientifically proven.</em>
            </h2>
            <p className="poultry__detail-deck">
              We have formulated a natural mineral blend specifically targeting the three root
              causes of broiler-house failure — ammonia spikes, excess moisture, and bacterial load.
              Applied directly to litter, it works immediately and continues to protect throughout
              the growth cycle and between flocks.
            </p>
          </motion.div>

          <div className="poultry__detail-product">
            <Placeholder
              tone="clay"
              label="M-LitterGuard product bag — front label"
              aspect="4 / 5"
              className="poultry__detail-product-img"
            />
            <div className="poultry__detail-product-copy">
              <span className="poultry__detail-product-tag">Mineral Blend · Litter Treatment</span>
              <h3 className="poultry__detail-product-name">M-LitterGuard</h3>
              <p>
                Our mineral blend is safe for birds, workers, and the environment. No harsh
                chemicals. No synthetic compounds. Just a targeted mineral formulation that absorbs
                moisture, neutralises ammonia, and creates a hostile environment for harmful
                bacteria — all while being gentle on your flock.
              </p>
              <ul className="poultry__detail-list">
                {productBullets.map((b, i) => (
                  <li key={i}>
                    <strong>{b.strong}</strong> {b.tail}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trial proof — 7,600 birds */}
          <div className="poultry__trial" ref={trialRef}>
            <span className="poultry__trial-label">— Trial proof, 7,600 birds</span>
            <div className="poultry__trial-grid">
              {trialProof.map((t, i) => (
                <motion.figure
                  key={t.tag}
                  className="poultry__trial-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                >
                  <span className="poultry__trial-tag">{t.tag}</span>
                  <span className="poultry__trial-value">
                    {t.valueGlyph ? (
                      t.valueGlyph
                    ) : (
                      <>
                        <CountUp
                          to={t.value}
                          decimals={0}
                          delay={0.3 + i * 0.15}
                          isInView={trialInView}
                        />
                        <span className="poultry__trial-suffix">{t.suffix}</span>
                      </>
                    )}
                  </span>
                  <figcaption>{t.caption}</figcaption>
                </motion.figure>
              ))}
            </div>
            <p className="poultry__trial-quote">
              "Results recorded across a live trial of 7,600 broiler birds."
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          5.  Application guide — three modes
          ────────────────────────────────────────────────────────────── */}
      <section className="poultry__application">
        <div className="poultry__application-inner">
          <motion.div
            className="poultry__application-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel label="Application Guide" />
            <h2 className="poultry__application-heading">
              How to apply <em>M-LitterGuard.</em>
            </h2>
            <p className="poultry__application-deck">
              Three concurrent modes of use — across the active flock, between cycles, and ahead of
              new placement. Same product, three application protocols.
            </p>
          </motion.div>

          <div className="poultry__application-grid">
            {applicationCards.map((card, i) => (
              <motion.div
                key={card.heading}
                className={`poultry__app-card poultry__app-card--${card.accent}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.13, ease: SPRING }}
              >
                <span className="poultry__app-card-num">{card.num}</span>
                <span className="poultry__app-card-sub">{card.sub}</span>
                <h3 className="poultry__app-card-heading">{card.heading}</h3>
                <ul className="poultry__app-card-list">
                  {card.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          6.  Field photos
          ────────────────────────────────────────────────────────────── */}
      <section className="poultry__images">
        <div className="poultry__images-inner">
          <span className="poultry__images-label">— From the field</span>
          <div className="poultry__images-grid">
            {imagePlaceholders.map((item, i) => (
              <motion.div
                key={i}
                className="poultry__image-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: SPRING }}
              >
                <Placeholder tone={item.tone} label={item.label} aspect="4 / 3" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          7.  Did You Know — closing insight
          ────────────────────────────────────────────────────────────── */}
      <section className="poultry__dyk">
        <div className="poultry__dyk-inner">
          <motion.div
            className="poultry__dyk-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: SPRING }}
          >
            <span className="poultry__dyk-tag">Did you know…</span>
            <h3 className="poultry__dyk-heading">
              The by-product? <em>A second income stream.</em>
            </h3>
            <p className="poultry__dyk-text">
              The by-product of effective litter management isn't just a healthier flock — treated
              litter becomes a nutrient-rich organic fertiliser that can be applied directly to
              your crops or sold as a premium soil amendment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          8.  FAQ
          ────────────────────────────────────────────────────────────── */}
      <FAQSection />

      {/* ──────────────────────────────────────────────────────────────
          9.  Closing CTA
          ────────────────────────────────────────────────────────────── */}
      <section className="poultry__cta">
        <motion.div
          className="poultry__cta-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: SPRING }}
        >
          <h2 className="poultry__cta-statement">
            Every flock is unique. <em>Let's talk about yours.</em>
          </h2>

          <div className="poultry__cta-actions">
            <p className="poultry__cta-prompt">
              Whether it's wet-season ammonia spikes, recurring footpad issues, or a litter
              management programme that's not quite working — our team will design a tailored
              M-LitterGuard protocol for your barn, your flock size, and your cycle calendar.
            </p>
            <div className="poultry__cta-buttons">
              <a className="poultry__cta-btn poultry__cta-btn--primary" href="/contact/agri-farms">
                Contact us for trials →
              </a>
              <a className="poultry__cta-btn" href="/solutions/uv-protection">
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

export default PoultryPage

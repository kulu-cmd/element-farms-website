import React from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import PageHero from './PageHero'
import EnquiryButton from './ui/EnquiryButton'
import SectionLabel from './ui/SectionLabel'
import './AntiFloodingPage.css'

/* ----------------------------------------------------------------------------
   Inline icons — match site's editorial/line-drawn style
   --------------------------------------------------------------------------- */
const AerationIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="22" cy="22" r="6" />
    <circle cx="44" cy="20" r="4" />
    <circle cx="32" cy="38" r="5" />
    <circle cx="18" cy="44" r="3.5" />
    <circle cx="46" cy="44" r="4.5" />
    <path d="M8 56 H56" />
  </svg>
)

const NutrientIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M32 8 V36" />
    <path d="M32 22 C24 22 18 18 14 14" />
    <path d="M32 22 C40 22 46 18 50 14" />
    <path d="M22 36 C22 46 28 52 32 56 C36 52 42 46 42 36" />
  </svg>
)

const WaterIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M32 8 C24 22 16 32 16 42 C16 51 23 56 32 56 C41 56 48 51 48 42 C48 32 40 22 32 8 Z" />
    <path d="M22 42 C24 46 28 48 32 48" />
  </svg>
)

const OrchardIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="32" cy="22" r="14" />
    <path d="M32 36 V56" />
    <path d="M32 44 L24 38" />
    <path d="M32 44 L40 38" />
  </svg>
)

const FieldIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 56 V32 C16 24 22 18 26 12" />
    <path d="M28 56 V32 C28 24 34 18 38 12" />
    <path d="M40 56 V32 C40 24 46 18 50 12" />
    <path d="M8 56 H56" />
  </svg>
)

const HerbsIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 50 H48 L46 56 H18 Z" />
    <path d="M22 50 V36 C22 30 26 26 32 26 C38 26 42 30 42 36 V50" />
    <path d="M32 26 V14" />
    <path d="M32 18 C28 18 26 16 26 12" />
    <path d="M32 22 C36 22 38 20 38 16" />
  </svg>
)

/* ----------------------------------------------------------------------------
   Photo placeholder for assets the user will fill later
   --------------------------------------------------------------------------- */
const PhotoPlaceholder = ({ label, aspect = '4 / 3', className = '' }) => (
  <div
    className={`flood__placeholder ${className}`}
    style={{ aspectRatio: aspect }}
    role="img"
    aria-label={label}
  >
    <span className="flood__placeholder-corner flood__placeholder-corner--tl" />
    <span className="flood__placeholder-corner flood__placeholder-corner--tr" />
    <span className="flood__placeholder-corner flood__placeholder-corner--bl" />
    <span className="flood__placeholder-corner flood__placeholder-corner--br" />
    <span className="flood__placeholder-mark">PHOTO</span>
    <span className="flood__placeholder-caption">{label}</span>
  </div>
)

const AntiFloodingPage = () => {
  return (
    <div className="flood">
      <Header />

      <PageHero
        title="Anti-Flooding __Systems__"
        subtitle="Manufactured for aeration, nutrient and water retention."
        tone="moss"
      />

      {/* ──────────────────────────────────────────────────────────────
          1.  Manufactured banner + intro + 3 feature thumbnails
          ────────────────────────────────────────────────────────────── */}
      <section className="flood__intro">
        <div className="flood__intro-inner">
          <motion.div
            className="flood__intro-copy"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel label="Meet M-Hive" />
            <h2 className="flood__intro-statement">
              Our LECA ball, engineered for farms with <em>waterlogged soils</em> — and crops that crave aeration.
            </h2>
            <p className="flood__intro-deck">
              M-Hive is a permanent addition to your soil. Each ball stores water and fertiliser
              while draining excess moisture, becoming a long-term home for roots and the
              biological communities that feed them.
            </p>
          </motion.div>

          <div className="flood__intro-features">
            <motion.div
              className="flood__feature"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="flood__feature-icon"><AerationIcon /></div>
              <h4>Aeration</h4>
              <p>Permanent pore space — roots breathe, microbes thrive.</p>
            </motion.div>

            <motion.div
              className="flood__feature"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="flood__feature-icon"><NutrientIcon /></div>
              <h4>Nutrient retention</h4>
              <p>Locks in fertiliser and biology where roots can use it.</p>
            </motion.div>

            <motion.div
              className="flood__feature"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="flood__feature-icon"><WaterIcon /></div>
              <h4>Water storage</h4>
              <p>Stores excess water, drains overload, releases when dry.</p>
            </motion.div>
          </div>
        </div>

        {/* LECA ball size strip — small / medium / large */}
        <motion.div
          className="flood__leca-strip"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <figure className="flood__leca-cell">
            <img src="/hive/small.jpg" alt="Small LECA ball aggregate" loading="lazy" />
            <figcaption>Small</figcaption>
          </figure>
          <figure className="flood__leca-cell">
            <img src="/hive/medium.jpg" alt="Medium LECA ball aggregate" loading="lazy" />
            <figcaption>Medium</figcaption>
          </figure>
          <figure className="flood__leca-cell">
            <img src="/hive/large.jpg" alt="Large LECA ball aggregate" loading="lazy" />
            <figcaption>Large</figcaption>
          </figure>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1.5rem' }}>
          <EnquiryButton product="M-Hive" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          2.  "Plant roots find a home" — explanation + 2-photo grid
              Uses the new WhatsApp pics moved into /hive/
          ────────────────────────────────────────────────────────────── */}
      <section className="flood__roots">
        <div className="flood__roots-inner">
          <motion.div
            className="flood__roots-copy"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="flood__roots-heading">
              Plant roots find a <em>home.</em>
            </h2>
            <p className="flood__roots-lede">
              Roots move into M-Hive because each ball stores fertiliser and water while
              draining excess moisture. Organic matter and beneficial microbes form
              communities inside every ball — building a complex network of biological
              activity working alongside your roots.
            </p>
            <ul className="flood__roots-list">
              <li>
                <span className="flood__roots-num">01</span>
                Stores water and fertiliser inside each ball.
              </li>
              <li>
                <span className="flood__roots-num">02</span>
                Microbes and organic matter colonise the cavities.
              </li>
              <li>
                <span className="flood__roots-num">03</span>
                Roots find a permanent home — and stay there.
              </li>
            </ul>
          </motion.div>

          <div className="flood__roots-photos">
            <motion.figure
              className="flood__roots-photo flood__roots-photo--lg"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/hive/roots-in-mhive-tree.jpg"
                alt="Tree seedling pulled from M-Hive medium showing dense root colonisation through the LECA balls"
              />
              <figcaption>Tree roots inside M-Hive — a permanent root home.</figcaption>
            </motion.figure>
            <motion.figure
              className="flood__roots-photo"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/hive/roots-in-mhive-strand.jpg"
                alt="Hand holding a single root strand wrapped around M-Hive balls — biological communities visible"
              />
              <figcaption>A single root strand, woven through M-Hive.</figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          3.  We Have Developed a System For — three category cards
          ────────────────────────────────────────────────────────────── */}
      <section className="flood__systems">
        <div className="flood__systems-inner">
          <motion.div
            className="flood__systems-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel label="The System" />
            <h2 className="flood__systems-heading">
              We have developed a <em>system</em> for —
            </h2>
          </motion.div>

          <div className="flood__systems-grid">
            <motion.a
              href="#orchards"
              className="flood__system-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.05 }}
            >
              <span className="flood__system-num">01</span>
              <div className="flood__system-icon flood__system-icon--emoji">🌳</div>
              <h3>Orchards & Tree Crops</h3>
              <p>Avocado, citrus, dragon fruit, macadamia — deep root systems that need long-term aeration and a permanent root home.</p>
              <span className="flood__system-link">Read more ↓</span>
            </motion.a>

            <motion.a
              href="#herbs"
              className="flood__system-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              <span className="flood__system-num">02</span>
              <div className="flood__system-icon flood__system-icon--emoji">🌿</div>
              <h3>Herbs, Tunnels & Nurseries</h3>
              <p>High-value herbs, flowers and aromatics in tunnels or raised beds — re-usable, weather-proof, permanent.</p>
              <span className="flood__system-link">Read more ↓</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          4.  For Orchards & Tree Crops — detail section + 4 photos
              Includes the Root Snorkel content (was previously a modal)
          ────────────────────────────────────────────────────────────── */}
      <section className="flood__detail flood__detail--orchards" id="orchards">
        <div className="flood__detail-inner">
          <motion.div
            className="flood__detail-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <span className="flood__detail-banner">For Orchards &amp; Tree Crops</span>
            <h2 className="flood__detail-heading">
              One install.<br />Decades of <em>flood-protection.</em>
            </h2>
            <p className="flood__detail-deck">
              For orchards with crops that produce fruit for more than five years, M-Hive is a
              one-time treatment that protects your crop from flood and compaction risk for
              its entire commercial lifespan. Installed beneath the canopy at the root zone,
              the M-Hive Root Snorkel delivers air, water and biology directly where your
              roots are working.
            </p>
          </motion.div>

          <div className="flood__detail-photos flood__detail-photos--three">
            <figure className="flood__detail-photo">
              <img src="/hive/root snorkel.jpg" alt="M-Hive Root Snorkel installed at orchard tree base" />
              <figcaption>Root Snorkel installed under the canopy.</figcaption>
            </figure>
            <figure className="flood__detail-photo">
              <img src="/hive/snorkel_Dragonfruit.png" alt="Snorkel installed at dragon fruit base" />
              <figcaption>Dragon fruit — flood-prone crop, permanent fix.</figcaption>
            </figure>
            <figure className="flood__detail-photo">
              <img src="/hive/root_snorkel_baby.png" alt="Young tree planted into M-Hive Root Snorkel" />
              <figcaption>Young trees planted directly into the snorkel.</figcaption>
            </figure>
          </div>

          <div className="flood__detail-bullets">
            <div>
              <span className="flood__detail-bullet-num">→</span>
              <h4>Permanent root home</h4>
              <p>Once installed, M-Hive stays in the soil for the life of the tree.</p>
            </div>
            <div>
              <span className="flood__detail-bullet-num">→</span>
              <h4>Zero compaction risk</h4>
              <p>The structure resists collapse — air space stays open, year after year.</p>
            </div>
            <div>
              <span className="flood__detail-bullet-num">→</span>
              <h4>Fertiliser stays put</h4>
              <p>Nutrients lock into the M-Hive cavities instead of leaching past the root zone.</p>
            </div>
          </div>

          <EnquiryButton product="M-Hive for Orchards" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          5.  For Herbs / Tunnels / Nurseries
          ────────────────────────────────────────────────────────────── */}
      <section className="flood__detail flood__detail--herbs" id="herbs">
        <div className="flood__detail-inner">
          <motion.div
            className="flood__detail-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <span className="flood__detail-banner">For Herbs, Tunnels &amp; Nurseries</span>
            <h2 className="flood__detail-heading">
              Re-usable. Weatherproof. <em>Permanent.</em>
            </h2>
            <p className="flood__detail-deck">
              Built to weather any storm — perfect for high-value horticulture, herbs,
              flowers and aromatics grown in tunnels or raised beds. Because you rarely
              change soil in tunnel production, M-Hive locks into your medium and becomes
              a permanent addition. When you do swap soil, simply filter the M-Hive out
              and re-use it in the next batch.
            </p>
          </motion.div>

          <div className="flood__detail-photos flood__detail-photos--three">
            <PhotoPlaceholder label="Tunnel raised bed with M-Hive in production" aspect="4 / 5" />
            <PhotoPlaceholder label="Herbs in green planter — M-Hive locked into soil medium" aspect="4 / 5" />
            <PhotoPlaceholder label="M-Hive being filtered for re-use into next batch" aspect="4 / 5" />
          </div>

          <div className="flood__detail-bullets">
            <div>
              <span className="flood__detail-bullet-num">→</span>
              <h4>Built to last</h4>
              <p>UV-stable, weatherproof — won't break down in the tunnel environment.</p>
            </div>
            <div>
              <span className="flood__detail-bullet-num">→</span>
              <h4>100% re-usable</h4>
              <p>Filter, rinse, drop into the next planting cycle. Indefinite working life.</p>
            </div>
            <div>
              <span className="flood__detail-bullet-num">→</span>
              <h4>High-value crops, low-risk medium</h4>
              <p>Stable aeration and water-holding for the crops where every plant counts.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          6.  Closing CTA banner
          ────────────────────────────────────────────────────────────── */}
      <section className="flood__cta">
        <motion.div
          className="flood__cta-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="flood__cta-statement">
            Ensure your soil is aerated, your roots well-sheltered, and your crops safe from
            flood risk for their <em>entire lifespan.</em>
          </h2>

          <div className="flood__cta-actions">
            <p className="flood__cta-prompt">
              Keen to trial M-Hive on your farm or learn more? Get in touch — we'll start with a
              site assessment and design a system around your crop.
            </p>
            <div className="flood__cta-buttons">
              <a className="flood__cta-btn flood__cta-btn--primary" href="/contact/agri-farms">
                Request a trial →
              </a>
              <a className="flood__cta-btn" href="mailto:kamil@elementfarmsolutions.co.za">
                kamil@elementfarmsolutions.co.za
              </a>
              <a className="flood__cta-btn" href="https://wa.me/27613889339">
                WhatsApp +27 61 388 9339
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

export default AntiFloodingPage

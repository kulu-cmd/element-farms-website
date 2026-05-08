import React from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import PageHero from './PageHero'
import SectionLabel from './ui/SectionLabel'
import EnquiryButton from './ui/EnquiryButton'
import './PoultryPage.css'

const SPRING = [0.22, 1, 0.36, 1]

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

const PoultryPage = () => {
  return (
    <div className="poultry">
      <Header />

      <PageHero
        title="Moisture __Control__"
        subtitle="A scientifically formulated mineral blend designed for use as a poultry bedding treatment."
        tone="clay"
      />

      {/* ──────────────────────────────────────────────────────────────
          Product detail
          ────────────────────────────────────────────────────────────── */}
      <section className="poultry__detail" id="terradry">
        <div className="poultry__detail-inner">
          <motion.div
            className="poultry__detail-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel label="The Product" />
            <h2 className="poultry__detail-heading">
              Formulated for <em>moisture absorption.</em>
            </h2>
          </motion.div>

          <div className="poultry__detail-product">
            <Placeholder
              tone="clay"
              label="M-TerraDry product bag — front label"
              aspect="4 / 5"
              className="poultry__detail-product-img"
            />
            <div className="poultry__detail-product-copy">
              <span className="poultry__detail-product-tag">Mineral Blend · Bedding Treatment</span>
              <h3 className="poultry__detail-product-name">M-TerraDry</h3>
              <p>
                A formulated mineral blend applied directly to poultry bedding to absorb
                moisture. M-TerraDry can help extend bedding life by keeping it drier
                between cycles.
              </p>
              <p>No harsh chemicals. No synthetic compounds.</p>

              <div className="poultry__detail-apply">
                <h4 className="poultry__detail-apply-heading">How to apply</h4>
                <p>
                  Spread evenly over bedding surface. Reapply as needed between cycles.
                </p>
              </div>
            </div>
          </div>

          <EnquiryButton product="M-TerraDry" />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PoultryPage

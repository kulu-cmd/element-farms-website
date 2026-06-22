import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './AboutUsPage.css'

const chemicals = [
  { name: 'Urea 46-0-0', size: 28, color: '#555', weight: 500 },
  { name: 'LAN 28%', size: 15, color: '#aaa', weight: 400 },
  { name: 'Glyphosate', size: 24, color: '#666', weight: 500 },
  { name: 'Potash 0-0-60', size: 13, color: '#bbb', weight: 400 },
  { name: 'Di-Ammonium Phosphate', size: 20, color: '#666', weight: 400 },
  { name: 'MAP 11-52-0', size: 13, color: '#ccc', weight: 400 },
  { name: 'Chlorpyrifos 480EC', size: 26, color: '#555', weight: 500 },
  { name: 'NPK 3:2:1(30)', size: 16, color: '#999', weight: 400 },
  { name: 'CAN', size: 12, color: '#ccc', weight: 400 },
  { name: 'Paraquat 200SL', size: 22, color: '#777', weight: 400 },
  { name: '2,4-D', size: 12, color: '#ccc', weight: 400 },
  { name: 'Superphosphate', size: 17, color: '#888', weight: 400 },
  { name: 'Triclopyr', size: 12, color: '#ccc', weight: 400 },
  { name: 'Monoammonium Phosphate', size: 19, color: '#777', weight: 400 },
  { name: 'DSMA', size: 12, color: '#ddd', weight: 400 },
  { name: 'Copper Sulphate', size: 13, color: '#bbb', weight: 400 },
  { name: 'Sodium Molybdate', size: 12, color: '#ddd', weight: 400 },
]

const missions = [
  { num: '01', text: 'Reduce chemical fertiliser and pesticide usage on commercial farms.' },
  { num: '02', text: 'Empower farms to produce their own in-house organic fertilisers.' },
  { num: '03', text: 'Recycle farm waste into rich biological inputs that feed the soil.' },
]

const countries = [
  { name: 'India' },
  { name: 'United Arab Emirates' },
  { name: 'United Kingdom' },
  { name: 'South Africa', active: true },
]

/* ---- Inline SVG icons (from reference HTML) ---- */

const LeafIcon = () => (
  <svg className="au-icon" viewBox="0 0 24 24" fill="none" stroke="#E8722C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8C8 10 5.9 16.17 3.82 22M9.1 9.1C9.1 9.1 7 13.5 6 17" />
    <path d="M14.5 11.5C14.5 11.5 14 16 11 19" />
    <path d="M22 2s-5 2-7 5" />
  </svg>
)

const SunIcon = () => (
  <svg className="au-icon" viewBox="0 0 24 24" fill="none" stroke="#C18B35" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="au-icon" viewBox="0 0 24 24" fill="none" stroke="#A87028" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)

const PlantIcon = () => (
  <svg className="au-icon" viewBox="0 0 24 24" fill="none" stroke="#3A7A45" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2c0 4 4 6 4 6s4-2 4-6" />
    <path d="M12 8v14" />
    <path d="M8 12s-4 1-4 5c0 2 4 4 8 4s8-2 8-4c0-4-4-5-4-5" />
  </svg>
)

const HexIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 19.07 6 19.07 14 12 18 4.93 14 4.93 6 12 2" />
  </svg>
)

/* ---- Sections ---- */

function ChemicalsSection() {
  return (
    <section className="au-chemicals">
      <p className="au-chem-label">What goes into your soil today</p>
      <div className="au-chem-cloud">
        {chemicals.map((c) => (
          <span
            key={c.name}
            style={{ fontSize: c.size, color: c.color, fontWeight: c.weight }}
          >
            {c.name}
          </span>
        ))}
      </div>
      <p className="au-chem-caption">
        Lab experiments. Random number combinations. Funny-sounding chemicals
        nobody's grandfather ever heard of.
        <br />
        Nobody wants this in their food. And the land is starting to agree.
      </p>
    </section>
  )
}

function PivotSection() {
  return (
    <section className="au-pivot">
      <p className="au-pivot-headline">
        THERE IS<br />ANOTHER WAY.
      </p>
      <p className="au-pivot-sub">
        One that reduces your input bill, rebuilds your soil, and still delivers
        commercially viable yields. Yes — all at the same time.
      </p>
    </section>
  )
}

function StorySection() {
  return (
    <section className="au-story">
      <p className="au-section-label" style={{ color: 'var(--ef-green)' }}>
        Why we exist
      </p>
      <div className="au-story-grid">
        <div>
          <h2 className="au-story-headline">
            Regenerative farming for the commercial world.
          </h2>
        </div>
        <div>
          <p className="au-story-body">
            Farms that switched to synthetic fertilisers decades ago are now
            facing a reckoning. Short-term yields ticked up. Long-term, soil
            biology has collapsed. The land is no longer responsive to any input
            at all.
          </p>
          <p className="au-story-body">
            Element Farm Solutions was built to prove that commercial farms can
            reduce chemical dependency, maintain yield, and rebuild the land —
            simultaneously. Our products are formulated using the latest soil
            science, working alongside leading experts, and are deployed across
            farms on multiple continents.
          </p>
        </div>
      </div>
      <div className="au-deployed-strip">
        <span className="au-label">Deployed in</span>
        {countries.map((c, i) => (
          <React.Fragment key={c.name}>
            {i > 0 && <span className="au-dot">&middot;</span>}
            <span className={`au-country${c.active ? ' au-active' : ''}`}>
              {c.name}
            </span>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

function MissionSection() {
  return (
    <section className="au-mission">
      <p className="au-mission-label">Our mission at EFS</p>
      <div className="au-mission-grid">
        {missions.map((m) => (
          <div key={m.num}>
            <p className="au-mission-num">{m.num}</p>
            <p className="au-mission-text">{m.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProductsSection() {
  return (
    <section className="au-products">
      {/* Header */}
      <div className="au-products-header">
        <div>
          <p className="au-section-label" style={{ color: 'var(--ef-green)' }}>
            Our product range
          </p>
          <p className="au-products-headline">
            100% natural.<br />No exceptions.
          </p>
        </div>
        <p className="au-products-sub">
          Every EFS product is formulated without synthetic chemicals — tested
          globally, proven in the field, ready for South African soil.
        </p>
      </div>

      {/* M-TerraBoost — flagship */}
      <div className="au-card-flagship">
        <div>
          <div className="au-product-name-row">
            <LeafIcon />
            <p className="au-product-name" style={{ fontSize: 32 }}>M-TerraBoost</p>
            <span className="au-badge">Flagship</span>
          </div>
          <p className="au-product-type">Biological Soil Conditioner</p>
          <p className="au-product-desc">
            Restores microbial life, unlocks trapped minerals, and rebuilds the
            structural integrity of soils depleted by years of synthetic inputs.
            Our most-deployed product globally — the first step for any farm
            serious about soil recovery.
          </p>
        </div>
        <div className="au-card-aside" style={{ background: '#FDF6F0' }}>
          <p className="au-card-aside-label" style={{ color: '#E8722C' }}>Best for</p>
          <ul>
            <li>Depleted soils</li>
            <li>Yield recovery</li>
            <li>Reducing inputs</li>
            <li>Long-term soil health</li>
          </ul>
        </div>
      </div>

      {/* Trio: GeoShade, GeoShield, Defend */}
      <div className="au-card-trio">
        <div className="au-card-sm" style={{ borderTop: '3px solid #C18B35' }}>
          <div className="au-icon-row">
            <SunIcon />
            <p className="au-card-sm-name">M-GeoShade</p>
          </div>
          <p className="au-product-type">Natural Sun Protection</p>
          <p className="au-product-desc">
            Mineral-based foliar application that reflects excess UV, reducing
            heat stress in crops without synthetic coatings.
          </p>
        </div>

        <div className="au-card-sm" style={{ borderTop: '3px solid #A87028' }}>
          <div className="au-icon-row">
            <ShieldIcon />
            <p className="au-card-sm-name">M-GeoShield</p>
          </div>
          <p className="au-product-type">Root Zone Protection</p>
          <p className="au-product-desc">
            Natural protection for root zones and exposed soil surfaces —
            reducing temperature extremes and evaporation stress.
          </p>
        </div>

        <div className="au-card-sm" style={{ borderTop: '3px solid #3A7A45' }}>
          <div className="au-icon-row">
            <PlantIcon />
            <p className="au-card-sm-name">M-Defend</p>
          </div>
          <p className="au-product-type">Natural Pest Protection</p>
          <p className="au-product-desc">
            Disrupts pest cycles without harming beneficial organisms or leaving
            chemical residue in your harvest.
          </p>
        </div>
      </div>

      {/* M-Hive — innovation card */}
      <div className="au-card-hive">
        <div className="au-hive-header">
          <HexIcon />
          <span className="au-hive-header-text">New Innovation &middot; Orchard Solution</span>
        </div>
        <div className="au-hive-body">
          <div>
            <div className="au-product-name-row" style={{ marginBottom: 4 }}>
              <p className="au-product-name" style={{ fontSize: 32 }}>M-Hive</p>
            </div>
            <p className="au-product-type">Lightweight Expanded Clay Aggregate (LECA)</p>
            <p className="au-product-desc">
              Engineered for superior aeration, drainage, and root architecture.
              Our orchard installation method is redefining how permanent crops
              are established in challenging soils. We are seriously innovating
              here — come see what we're building with tree fruits.
            </p>
          </div>
          <div
            className="au-card-aside"
            style={{
              background: '#FFF8F5',
              border: '1px solid rgba(181,87,15,0.12)',
            }}
          >
            <p className="au-card-aside-label" style={{ color: '#B5570F' }}>
              Applications
            </p>
            <ul>
              <li>Orchards</li>
              <li>Container growing</li>
              <li>Hydroponics</li>
              <li>Specialty crops</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- Page ---- */

const AboutUsPage = () => {
  return (
    <div className="app about-us-page compact-header">
      <Header />
      <main>
        <ChemicalsSection />
        <PivotSection />
        <StorySection />
        <MissionSection />
        <ProductsSection />
      </main>
      <Footer />
    </div>
  )
}

export default AboutUsPage

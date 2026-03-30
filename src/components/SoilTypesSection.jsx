import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './SoilTypesSection.css'

const soilTypes = [
  {
    number: '01',
    color: '#b5451b',
    image: '/soils/soil-01.png',
    name: 'Deep Red Apedal Soils',
    region: 'KwaZulu-Natal Midlands & Highveld slopes',
    description: 'Deep, well-drained red soils with excellent structure — some of the most productive agricultural land in South Africa.',
    pros: ['High arable potential', 'Suits maize, soya, cane, veg & orchards'],
    cons: ['Needs regular organic matter to maintain fertility', 'Can compact under heavy machinery'],
  },
  {
    number: '02',
    color: '#c49a3c',
    image: '/soils/soil-02%20Background%20Removed.png',
    name: 'Deep Yellow & Brown Apedal',
    region: 'KwaZulu-Natal Cane Belt & Midlands',
    description: 'Yellow-brown sands and loams common in the cane belt and Midlands — well-drained with good workability.',
    pros: ['Good to high arable potential', 'Easy to till and manage'],
    cons: ['Lower nutrient retention than red soils', 'Prone to leaching under heavy rain'],
  },
  {
    number: '03',
    color: '#3d2b1f',
    image: '/soils/soil-03%20Background%20Removed.png',
    name: 'Dark Humic & Melanic Clays',
    region: 'Drakensberg foothills & Midlands',
    description: 'Dark, clay-rich soils formed on basic and amphibolite geology — naturally fertile and rich in organic matter.',
    pros: ['Very fertile — prime crop & pasture land', 'High natural nutrient content'],
    cons: ['Often acidic — regular liming needed', 'Can waterlog if drainage is poor'],
  },
  {
    number: '04',
    color: '#8c7355',
    image: '/soils/soil-04%20Background%20Removed.png',
    name: 'Duplex (Textural-Contrast)',
    region: 'Widespread across KwaZulu-Natal',
    description: 'Sandy or loamy topsoil sitting abruptly over a dense clay subsoil — a common challenge for KwaZulu-Natal farmers.',
    pros: ['Workable in dry conditions', 'Moderate arable potential with management'],
    cons: ['Prone to waterlogging & compaction', 'Topsoil crusts easily under rain'],
  },
  {
    number: '05',
    color: '#7a7a7a',
    image: '/soils/soil-5%20Background%20Removed.png',
    name: 'Shallow & Rocky (Lithic)',
    region: 'KwaZulu-Natal Highlands & Drakensberg escarpment',
    description: 'Thin soils over bedrock on steep or rocky terrain — limited depth for roots and water retention.',
    pros: ['Suited to grazing and some forestry', 'Low input required for ground cover'],
    cons: ['Low arable potential', 'Root depth and moisture severely restricted'],
  },
  {
    number: '06',
    color: '#c8a96e',
    image: '/soils/soil-06%20Background%20Removed.png',
    name: 'Coastal & Dune Sands',
    region: 'KwaZulu-Natal Coastline — Durban to Richards Bay',
    description: 'Leached, acidic sands along the KwaZulu-Natal coast — low in nutrients but responsive to intensive management.',
    pros: ['Can support crops under high management', 'Good drainage and workability'],
    cons: ['Very low natural fertility', 'Requires lime, fertiliser, organic matter & irrigation'],
  },
  {
    number: '07',
    color: '#3a7d5e',
    image: '/soils/soil-07%20Background%20Removed.png',
    name: 'Hydromorphic & Wetland',
    region: 'Valley bottoms throughout KwaZulu-Natal',
    description: 'Waterlogged, gleyed profiles found in valley bottoms and wetlands — important ecological features.',
    pros: ['Valuable for grazing in dry seasons', 'Critical for water conservation'],
    cons: ['Unsuited to conventional cropping', 'Drainage is expensive and ecologically sensitive'],
  },
  {
    number: '08',
    color: '#8fa870',
    image: '/soils/soil-08%20Background%20Removed.png',
    name: 'Calcareous & Lime-Rich',
    region: 'Northern KwaZulu-Natal & Zululand',
    description: 'Soils with free lime or calcrete layers on certain KwaZulu-Natal geologies — highly variable in farming potential.',
    pros: ['Good for specific crops where soil is deep', 'Natural calcium reduces acidification'],
    cons: ['Shallow calcrete severely limits root growth', 'Variable potential — needs site assessment'],
  },
]

const SoilTypesSection = () => {
  const [flipped, setFlipped] = useState({})

  const toggle = (index) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <section className="soils">
      <div className="soils__inner">

        {/* Header — unchanged from current */}
        <motion.div
          className="soils__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="soils__eyebrow">Did you know?</span>
          <h2 className="soils__heading">There are 8 different soil types just in KwaZulu-Natal.</h2>
          <p className="soils__subtext">
            Each soil type has unique characteristics that affect how your farm responds to inputs, water, and management. Knowing your soil is the first step to restoring it.
          </p>
        </motion.div>

        {/* Rejuvenation nudge */}
        <motion.div
          className="soils__nudge"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="soils__nudge-text">
            Interested in restoring your land?
          </span>
          <Link to="/solutions/land-rejuvenation" className="soils__nudge-link">
            Explore Land Rejuvenation →
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="soils__grid">
          {soilTypes.map((soil, index) => (
            <motion.div
              key={soil.number}
              className={`soils__card-scene${flipped[index] ? ' soils__card-scene--flipped' : ''}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.07 }}
              onClick={() => toggle(index)}
            >
              <div className="soils__card-flipper">

                {/* FRONT FACE */}
                <div
                  className="soils__card-front"
                  style={soil.image ? {
                    backgroundImage: `url(${soil.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } : { background: soil.color }}
                >
                  <span className="soils__front-number">{soil.number}</span>
                  <h3 className="soils__front-name">{soil.name}</h3>
                  <span className="soils__front-region">{soil.region}</span>
                  <span className="soils__front-hint">Tap to discover →</span>
                </div>

                {/* BACK FACE */}
                <div className="soils__card-back">
                  <div className="soils__back-bar" style={{ background: soil.color }} />
                  <div className="soils__back-body">
                    <h3 className="soils__back-name">{soil.name}</h3>
                    <p className="soils__back-desc">{soil.description}</p>
                    <div className="soils__back-pnc">
                      <ul className="soils__list">
                        {soil.pros.map(p => (
                          <li key={p} className="soils__list-item">
                            <span className="soils__icon soils__icon--pro">✓</span>{p}
                          </li>
                        ))}
                      </ul>
                      <ul className="soils__list">
                        {soil.cons.map(c => (
                          <li key={c} className="soils__list-item">
                            <span className="soils__icon soils__icon--con">✕</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default SoilTypesSection

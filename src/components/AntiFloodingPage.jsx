import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import './AntiFloodingPage.css'

const AntiFloodingPage = () => {
    const [activeModal, setActiveModal] = useState(null)

    const stats = [
        {
            value: '20 – 30 %',
            label: 'reduction in compaction and waterlogging in treated soils',
        },
        {
            value: '40 tonnes',
            label: 'of water stored per hectare in saturated conditions',
        },
        {
            value: '4 000 +',
            label: 'hectares of KwaZulu-Natal farmland at high flooding risk annually',
        },
    ]

    const systems = [
        {
            icon: '🍊',
            name: 'Orchards',
            desc: 'Deep root systems benefit most from improved aeration and drainage at the root zone.',
            modalTitle: 'M-Hive in Orchards',
            modalImage: '/hive/root%20snorkel.jpg',
            modalImageAlt: 'Root Snorkel installed in orchard soil',
            modalImageCaption: 'Root Snorkel — subsurface aeration system',
            modalBody: 'The M-Hive Root Snorkel is designed specifically for orchard environments. Installed vertically into the root zone, it allows oxygen to reach deep into compacted, waterlogged soils — directly where fruit tree roots need it most. The honeycomb clay structure stores and slowly releases water and nutrients even during dry spells following flood events, keeping root health stable season to season. Particularly effective for mango, citrus, avocado, and stone fruit orchards across KwaZulu-Natal.',
        },
        {
            icon: '🌾',
            name: 'Field Crops',
            desc: 'Prevent seasonal waterlogging that costs yield on maize, soya, and vegetable crops.',
            modalTitle: 'M-Hive for Field Crops',
            modalImage: '/hive/cross-section.png',
            modalImageAlt: 'Cross-section diagram of M-Hive in field soil',
            modalImageCaption: 'Subsurface cross-section — water drainage pathway',
            modalBody: 'For row crops like maize, soya, and vegetables, waterlogging during the KwaZulu-Natal wet season is one of the leading causes of yield loss. M-Hive units are placed at row intervals below the plough layer, creating a subsurface drainage network that pulls excess water away from the root zone. The clay structure retains nutrients that would otherwise leach out, ensuring crops continue to access what they need even after heavy rainfall.',
        },
        {
            icon: '🌿',
            name: 'Herbs & Sprouts',
            desc: 'Sensitive root systems thrive in well-aerated, consistently moist growing media.',
            modalTitle: 'M-Hive for Herbs & Sprouts',
            modalImage: '/hive/small.jpg',
            modalImageAlt: 'Small M-Hive unit for nursery use',
            modalImageCaption: 'Small M-Hive unit — ideal for nursery beds',
            modalBody: 'Herbs, sprouts, and seedlings have highly sensitive root systems that are easily damaged by both waterlogging and drought. The small M-Hive unit is sized for nursery beds and propagation trays, providing a consistent moisture buffer around developing roots. By maintaining optimal aeration and preventing standing water, M-Hive reduces damping-off, root rot, and transplant failure — giving young plants the strongest possible start.',
        },
    ]

    const applicationImages = [
        { src: '/hive/cross-section.png', caption: 'Soil Cross-Section View' },
        { src: '/hive/root%20snorkel.jpg', caption: 'Root Snorkel Integration' },
        { src: '/hive/hive_open.jpg', caption: 'Honeycomb Structure' },
    ]

    return (
        <div className="flood">
            <Header />

            {/* Hero */}
            <section className="flood__hero">
                <div className="flood__hero-inner">
                    <div className="flood__hero-text">
                        <motion.h1
                            className="flood__hero-title"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Anti-Flooding Systems
                        </motion.h1>
                        <motion.p
                            className="flood__hero-subtitle"
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.18, ease: 'easeOut' }}
                        >
                            Engineered to protect waterlogged farmland — draining excess water while locking in the nutrients your crops need.
                        </motion.p>
                        <motion.div
                            className="flood__hero-scroll-hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.1 }}
                        >
                            <motion.span
                                animate={{ y: [0, 6, 0] }}
                                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                            >↓</motion.span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats intro */}
            <section className="flood__stats-intro">
                <div className="flood__stats-intro-inner">
                    <motion.h2
                        className="flood__stats-headline"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                    >
                        Flooding is becoming increasingly more deadly.
                    </motion.h2>
                    <motion.div
                        className="flood__stats-rule"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </section>

            {/* Stats */}
            <section className="flood__stats">
                <div className="flood__stats-grid">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="flood__stat-card"
                            initial={{ opacity: 0, y: 50, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="flood__stat-value">{stat.value}</span>
                            <p className="flood__stat-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Product Intro + Sizes */}
            <section className="flood__solution">
                <div className="flood__solution-header">
                    <h2 className="flood__solution-title">Our Solution</h2>
                    <div className="flood__solution-tags">
                        <span className="flood__tag">Aeration</span>
                        <span className="flood__tag-dot">●</span>
                        <span className="flood__tag">Nutrient Retention</span>
                        <span className="flood__tag-dot">●</span>
                        <span className="flood__tag">Drainage</span>
                    </div>
                </div>

                <div className="flood__solution-body">
                    <p className="flood__eyebrow">MANUFACTURED FOR AERATION, NUTRIENT AND WATER RETENTION</p>

                    <motion.p
                        className="flood__intro-text"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                        M-Hive is made from clay with a hardened honeycomb structure — engineered to store nutrients and water whilst providing drainage during flooding. For water-logged soils we have found this to be particularly effective for draining and maintaining soil structure.
                    </motion.p>

                    <div className="flood__product-row">
                        <motion.img
                            className="flood__product-img"
                            src="/hive/hive_open.jpg"
                            alt="M-Hive clay honeycomb unit"
                            initial={{ opacity: 0, x: -40, scale: 0.96 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <motion.p
                            className="flood__product-desc"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        >
                            The M-Hive system uses a fired clay honeycomb design that acts as a subsurface reservoir — absorbing excess water during flood events and slowly releasing it back into the root zone. The structure promotes drainage through the soil profile while retaining nutrients that would otherwise be lost to runoff. Suitable for a wide range of crop types and soil conditions, M-Hive is installed below the surface and requires no ongoing maintenance once placed.
                        </motion.p>
                    </div>

                    {/* Sizes Table */}
                    <h3 className="flood__section-heading">Available Sizes</h3>
                    <div className="flood__table-wrap">
                        <table className="flood__table">
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Dimensions</th>
                                    <th>Best For</th>
                                    <th>Pricing</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Small</td>
                                    <td>10cm diameter</td>
                                    <td>Nursery beds &amp; seedling trays</td>
                                    <td>Contact for quote</td>
                                </tr>
                                <tr>
                                    <td>Medium</td>
                                    <td>20cm diameter</td>
                                    <td>Row crops &amp; vegetables</td>
                                    <td>Contact for quote</td>
                                </tr>
                                <tr>
                                    <td>Large</td>
                                    <td>35cm diameter</td>
                                    <td>Orchards &amp; field crops</td>
                                    <td>Contact for quote</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Application Images */}
            <section className="flood__applications">
                <div className="flood__applications-inner">
                    <h2 className="flood__section-heading">Where M-Hive Works Best</h2>
                    <div className="flood__image-grid">
                        {applicationImages.map((item, i) => (
                            <motion.div
                                key={i}
                                className="flood__image-card"
                                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <img src={item.src} alt={item.caption} />
                                <p className="flood__image-caption">{item.caption}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Systems */}
            <section className="flood__systems">
                <div className="flood__systems-inner">
                    <h2 className="flood__section-heading">We Have Developed a System For</h2>
                    <div className="flood__systems-grid">
                        {systems.map((item, i) => (
                            <motion.div
                                key={i}
                                className="flood__system-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                onClick={() => setActiveModal(i)}
                                whileHover={{ y: -4 }}
                            >
                                <div className="flood__system-icon">{item.icon}</div>
                                <h3 className="flood__system-name">{item.name}</h3>
                                <p className="flood__system-desc">{item.desc}</p>
                                <span className="flood__system-cta">Learn more →</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            {/* System card modals */}
            <AnimatePresence>
                {activeModal !== null && (
                    <motion.div
                        className="flood__overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            className="flood__modal"
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flood__modal-bar" />
                            <button className="flood__modal-close" onClick={() => setActiveModal(null)} aria-label="Close">✕</button>
                            <img
                                src={systems[activeModal].modalImage}
                                alt={systems[activeModal].modalImageAlt}
                                className="flood__modal-img"
                            />
                            <p className="flood__modal-img-caption">{systems[activeModal].modalImageCaption}</p>
                            <div className="flood__modal-content">
                                <span className="flood__modal-icon">{systems[activeModal].icon}</span>
                                <h3 className="flood__modal-title">{systems[activeModal].modalTitle}</h3>
                                <p className="flood__modal-body">{systems[activeModal].modalBody}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AntiFloodingPage

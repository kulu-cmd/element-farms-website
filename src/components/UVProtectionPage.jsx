import React from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import './UVProtectionPage.css'

const UVProtectionPage = () => {
    const stats = [
        {
            value: '6–30%',
            label: 'of fruit yield is lost globally to sunburn',
        },
        {
            value: '~10%',
            label: 'of exportable mango crops from SA is lost due to sunburn',
        },
        {
            value: '20%',
            label: "of 'Golden Delicious' apples may be rejected due to sunburn",
        },
    ]

    const benefits = [
        'Safe for Bees and Pollinators',
        'Reduces Fruit Surface Temperature',
        'Disperse Pests with Visual Camouflage',
    ]

    return (
        <div className="uv">
            <Header />

            {/* Hero */}
            <section className="uv__hero">
                <div className="uv__hero-inner">
                    <div className="uv__hero-text">
                        <motion.h1
                            className="uv__hero-title"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            UV Protection
                        </motion.h1>
                        <motion.p
                            className="uv__hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        >
                            Protecting your harvest from harsh UV stress — safely, naturally, and at scale.
                        </motion.p>
                    </div>
                    <motion.div
                        className="uv__hero-deco"
                        aria-hidden="true"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 0.6, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <rect x="2" y="2" width="36" height="36" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
                            <rect x="22" y="22" width="36" height="36" rx="4" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none"/>
                            <rect x="42" y="2" width="36" height="36" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none"/>
                        </svg>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="uv__stats">
                <div className="uv__stats-grid">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="uv__stat-card"
                            initial={{ opacity: 0, y: 50, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="uv__stat-value">{stat.value}</span>
                            <p className="uv__stat-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Our Solution */}
            <section className="uv__solution">
                <div className="uv__solution-header">
                    <h2 className="uv__solution-title">Our Solution</h2>
                    <div className="uv__solution-tags">
                        <span className="uv__tag">Simple Implementation</span>
                        <span className="uv__tag-dot">●</span>
                        <span className="uv__tag">Measurable Results</span>
                        <span className="uv__tag-dot">●</span>
                        <span className="uv__tag">Scalable Growth</span>
                    </div>
                </div>

                <div className="uv__solution-body">
                    <motion.p
                        className="uv__research-text"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Research trials show protective treatments can cut sunburn incidence by{' '}
                        <span className="uv__highlight-50">50%</span>
                    </motion.p>

                    <div className="uv__product-row">
                        <motion.div
                            className="uv__product-img-wrap"
                            initial={{ opacity: 0, x: -40, scale: 0.96 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Placeholder for M-GeoShade product bag */}
                            <div className="uv__product-placeholder">
                                <span>M-GeoShade</span>
                                <small>Product image</small>
                            </div>
                        </motion.div>

                        <motion.p
                            className="uv__product-desc"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Our specifically formulated mineral blend,{' '}
                            <strong className="uv__brand">M-GeoShade</strong> reduces fruit
                            surface temperature and protects them from harsh UV stress burns.
                        </motion.p>
                    </div>

                    {/* Benefits + Thermal images */}
                    <div className="uv__benefits-row">
                        <motion.div
                            className="uv__benefits-box"
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h3 className="uv__benefits-title">Benefits of M-Geoshade</h3>
                            <ul className="uv__benefits-list">
                                {benefits.map((b, i) => (
                                    <li key={i} className="uv__benefit-item">
                                        <span className="uv__diamond" aria-hidden="true">◇</span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <div className="uv__thermal-images">
                            {[
                                {
                                    src: '/geoshield/uv-1.jpg',
                                    alt: 'Higher Fruit Temperatures without M-GeoShade',
                                    caption: 'Higher Fruit Temperatures observed Without M-GeoShade',
                                },
                                {
                                    src: '/geoshield/uv-2.jpg',
                                    alt: 'Lower Fruit Temperatures with M-GeoShade',
                                    caption: 'Lower Fruit Temperatures observed with M-GeoShade',
                                },
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    className="uv__thermal-card"
                                    initial={{ opacity: 0, y: 28, scale: 0.97 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <img
                                        src={card.src}
                                        alt={card.alt}
                                        className="uv__thermal-img"
                                    />
                                    <p className="uv__thermal-caption">{card.caption}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default UVProtectionPage

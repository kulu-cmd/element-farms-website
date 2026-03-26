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
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            UV Protection
                        </motion.h1>
                    </div>
                    <div className="uv__hero-deco" aria-hidden="true">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <rect x="2" y="2" width="36" height="36" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
                            <rect x="22" y="22" width="36" height="36" rx="4" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none"/>
                            <rect x="42" y="2" width="36" height="36" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none"/>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="uv__stats">
                <div className="uv__stats-grid">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="uv__stat-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Research trials show protective treatments can cut sunburn incidence by{' '}
                        <span className="uv__highlight-50">50%</span>
                    </motion.p>

                    <div className="uv__product-row">
                        <motion.div
                            className="uv__product-img-wrap"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Placeholder for M-GeoShade product bag */}
                            <div className="uv__product-placeholder">
                                <span>M-GeoShade</span>
                                <small>Product image</small>
                            </div>
                        </motion.div>

                        <motion.p
                            className="uv__product-desc"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
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
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
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
                            <motion.div
                                className="uv__thermal-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src="/thermal-high-temp.png"
                                    alt="Higher Fruit Temperatures without M-GeoShade"
                                    className="uv__thermal-img"
                                />
                                <p className="uv__thermal-caption">
                                    Higher Fruit Temperatures observed Without M-GeoShade
                                </p>
                            </motion.div>

                            <motion.div
                                className="uv__thermal-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                            >
                                <img
                                    src="/thermal-low-temp.png"
                                    alt="Lower Fruit Temperatures with M-GeoShade"
                                    className="uv__thermal-img"
                                />
                                <p className="uv__thermal-caption">
                                    Lower Fruit Temperatures observed with M-GeoShade
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default UVProtectionPage

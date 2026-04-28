import React from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import PageHero from './PageHero'
import useCountUp from '../hooks/useCountUp'
import './UVProtectionPage.css'

const UVStat = ({ kicker, to, suffix = '%', label }) => {
    const [ref, value] = useCountUp(to)
    return (
        <motion.div
            ref={ref}
            className="uv__stat-card"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <span className="uv__stat-kicker">{kicker}</span>
            <span className="uv__stat-value">{value}{suffix}</span>
            <span className="uv__stat-rule" />
            <p className="uv__stat-label">{label}</p>
        </motion.div>
    )
}

const UVProtectionPage = () => {
    const stats = [
        {
            kicker: 'Global yield loss',
            to: 30,
            suffix: '%',
            label: 'of fruit yield can be lost globally to sunburn each season.',
        },
        {
            kicker: 'SA mangoes',
            to: 10,
            suffix: '%',
            label: 'of exportable mango crops from SA are lost due to sunburn.',
        },
        {
            kicker: 'Apple rejection',
            to: 20,
            suffix: '%',
            label: "of 'Golden Delicious' apples may be rejected due to sunburn.",
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

            <PageHero
                eyebrow="Solutions / Sun & Pest Shield"
                title="UV __Protection__"
                subtitle="Protecting your harvest from harsh UV stress — safely, naturally, and at scale."
                note="Field trials. KZN orchards."
                tone="clay"
            />

            {/* Stats */}
            <section className="uv__stats">
                <div className="uv__stats-grid">
                    {stats.map((stat, i) => (
                        <UVStat key={i} {...stat} />
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

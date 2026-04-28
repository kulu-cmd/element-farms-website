import React from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import CallToAction from './CallToAction'
import Footer from './Footer'
import PageHero from './PageHero'
import { Link } from 'react-router-dom'
import './WasteManagementPage.css'

const WasteManagementPage = () => {
    const stats = [
        {
            value: '6–30%',
            label: 'of fruit & crop waste during processing and packaging accounts for ~49% of total food losses',
        },
        {
            value: '< 10%',
            label: 'of agricultural organic waste is recycled — the rest is landfilled or illegally dumped',
        },
        {
            value: '100%',
            label: 'organic, zero-chemical by-product fertiliser from every biogas cycle',
        },
    ]

    const energyCards = [
        {
            icon: '⚡',
            title: 'Energy Independence',
            desc: 'Generate your own biogas electricity. No grid dependency, no load shedding.',
        },
        {
            icon: '♻️',
            title: 'Zero Waste Farm',
            desc: 'Every tonne of organic waste becomes a resource, not a liability.',
        },
        {
            icon: '🌱',
            title: 'Liquid Gold Fertiliser',
            desc: 'The digestate by-product is a high-value, nitrogen-rich organic fertiliser.',
        },
    ]

    return (
        <div className="waste">
            <Header />

            <PageHero
                eyebrow="Solutions / Renewable Energy"
                title="Waste __Management__"
                subtitle="Turning agricultural waste into clean energy and premium organic fertiliser — closing the loop on your farm's most valuable resource."
                note="Closed-loop systems."
                tone="moss"
            />

            {/* Stats */}
            <section className="waste__stats">
                <div className="waste__stats-grid">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="waste__stat-card"
                            initial={{ opacity: 0, y: 50, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="waste__stat-value">{stat.value}</span>
                            <p className="waste__stat-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section className="waste__mission">
                <div className="waste__mission-inner">
                    <motion.p
                        className="waste__mission-para"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0 }}
                    >
                        We want to partner with cattle, dairy and farms to help manage their
                        organic waste.
                    </motion.p>
                    <motion.hr
                        className="waste__divider"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{ transformOrigin: 'center' }}
                    />
                    <motion.p
                        className="waste__mission-para"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        Together we will turn this organic waste into precious renewable energy.
                    </motion.p>
                </div>
            </section>

            {/* Biogas */}
            <section className="waste__biogas">
                <div className="waste__biogas-inner">
                    <motion.div
                        className="waste__biogas-text"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="waste__biogas-eyebrow">HOW IT WORKS</span>
                        <h2 className="waste__biogas-heading">From Waste to Energy</h2>
                        <p className="waste__biogas-text">
                            We design and implement on-farm anaerobic digestion systems (biogas
                            digesters) that convert cattle manure, food waste, and crop residues
                            into: Biogas (methane) for cooking, heating, and electricity generation
                            — and Rich liquid digestate, a highly organic nitrogen-rich liquid
                            fertiliser for your crops.
                        </p>
                        <div className="waste__biogas-pills">
                            <span className="waste__biogas-pill">Biogas Energy</span>
                            <span className="waste__biogas-pill">Zero Waste</span>
                            <span className="waste__biogas-pill">Liquid Fertiliser</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="waste__biogas-img"
                        initial={{ opacity: 0, x: 40, scale: 0.97 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <svg
                            width="160"
                            height="120"
                            viewBox="0 0 160 120"
                            fill="none"
                            aria-label="Concrete biogas dome digester illustration"
                        >
                            {/* Cylinder body */}
                            <rect x="30" y="60" width="100" height="50" rx="4" fill="#3a3a3a" stroke="#555" strokeWidth="1.5"/>
                            {/* Dome top */}
                            <ellipse cx="80" cy="60" rx="50" ry="12" fill="#444" stroke="#555" strokeWidth="1.5"/>
                            <path d="M30 60 Q80 18 130 60" fill="#4a4a4a" stroke="#555" strokeWidth="1.5"/>
                            {/* Gas outlet pipe on top */}
                            <rect x="74" y="8" width="12" height="22" rx="3" fill="#555" stroke="#666" strokeWidth="1"/>
                            <rect x="70" y="6" width="20" height="5" rx="2" fill="#666" stroke="#666" strokeWidth="1"/>
                            {/* Inlet pipe left */}
                            <rect x="8" y="72" width="24" height="10" rx="3" fill="#555" stroke="#666" strokeWidth="1"/>
                            <rect x="6" y="68" width="8" height="18" rx="2" fill="#555" stroke="#666" strokeWidth="1"/>
                            {/* Outlet pipe right */}
                            <rect x="128" y="72" width="24" height="10" rx="3" fill="#555" stroke="#666" strokeWidth="1"/>
                            <rect x="146" y="68" width="8" height="18" rx="2" fill="#555" stroke="#666" strokeWidth="1"/>
                            {/* Surface texture lines on cylinder */}
                            <line x1="30" y1="75" x2="130" y2="75" stroke="#555" strokeWidth="0.75" strokeDasharray="4 3"/>
                            <line x1="30" y1="90" x2="130" y2="90" stroke="#555" strokeWidth="0.75" strokeDasharray="4 3"/>
                        </svg>
                        <p className="waste__biogas-img-caption">
                            Concrete Biogas Digester — On-Farm System
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Energy Independence */}
            <section className="waste__energy">
                <div className="waste__energy-inner">
                    <motion.h2
                        className="waste__energy-heading"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Imagine your operation running completely off organic waste
                    </motion.h2>
                    <motion.p
                        className="waste__energy-sub"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Not relying on external factors and load shedding. More reliant than solar.
                    </motion.p>
                    <div className="waste__energy-grid">
                        {energyCards.map((card, i) => (
                            <motion.div
                                key={i}
                                className="waste__energy-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="waste__energy-icon">{card.icon}</div>
                                <h3 className="waste__energy-title">{card.title}</h3>
                                <p className="waste__energy-desc">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Did You Know */}
            <section className="waste__didyouknow">
                <motion.div
                    className="waste__dyk-box"
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="waste__dyk-eyebrow">Did you know...</span>
                    <p className="waste__dyk-text">
                        The by-product from biogas production is a highly organic, nitrogen-rich
                        liquid fertiliser — feeding your crops while eliminating chemical input
                        costs.
                    </p>
                </motion.div>
            </section>

            {/* CTA */}
            <section className="waste__cta">
                <motion.div
                    className="waste__cta-inner"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="waste__cta-heading">Ready to Go Off the Grid?</h2>
                    <p className="waste__cta-text">
                        If you are interested to learn more about implementing a biogas system on
                        your farm, please reach out to us.
                    </p>
                    <Link to="/contact">
                        <button className="waste__cta-btn">Get in Touch →</button>
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </div>
    )
}

export default WasteManagementPage

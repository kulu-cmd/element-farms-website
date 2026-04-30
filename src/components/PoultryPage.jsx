import React from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import PageHero from './PageHero'
import './PoultryPage.css'

const SPRING = [0.22, 1, 0.36, 1]

const stats = [
    {
        value: '~25 ppm',
        label: 'ammonia level where birds begin showing respiratory stress and reduced feed intake',
    },
    {
        value: '40+ ppm',
        label: 'ammonia concentration that becomes unsafe for farm workers and causes severe bird mortality',
    },
    {
        value: 'Wet seasons',
        label: 'mortality spikes can wipe out entire stock when litter humidity and bacteria go unmanaged',
    },
]

const ammoniaList = [
    'Starts irritating birds at just 20–25 ppm',
    'Above 40 ppm — respiratory disease, unsafe for workers',
    'Damages footpads, causes breast blisters, raises coccidiosis risk',
    'Mortality spikes during wet seasons can wipe out entire stock',
]

const applicationCards = [
    {
        accent: 'var(--orange-main)',
        icon: '🐔',
        heading: 'During Grow-Out',
        sub: 'Active flock present',
        bullets: [
            'Apply to wet patches as they appear',
            'Focus on drinker lines and nipple areas',
            'Treat near walls where condensation forms',
            'Re-apply after wet weather events',
        ],
    },
    {
        accent: 'var(--green-dark)',
        icon: '🌿',
        heading: 'Pre-Placement',
        sub: 'Before chicks arrive',
        bullets: [
            'Spread evenly across full floor area',
            'Absorbs residual moisture from previous flock',
            'Reduces microbial load before day-old chicks arrive',
            'Creates a clean, dry environment from day one',
        ],
    },
    {
        accent: 'var(--charcoal)',
        icon: '♻️',
        heading: 'Between Cycles',
        sub: 'Litter management',
        bullets: [
            'Mix into reused litter before restocking',
            'Controls ammonia release from built-up uric acid',
            'Extends litter usability across multiple cycles',
            'Reduces litter disposal costs',
        ],
    },
]

const imagePlaceholders = [
    { src: '/poultry/broiler-house.jpg', caption: 'Broiler House Environment', label: '[ Photo: Broiler House ]' },
    { src: '/poultry/litter-treatment.jpg', caption: 'Litter Treatment Application', label: '[ Photo: Litter Treatment ]' },
    { src: '/poultry/healthy-flock.jpg', caption: 'Healthy Flock Results', label: '[ Photo: Healthy Flock ]' },
]

const PoultryPage = () => {
    return (
        <div className="poultry">
            <Header />

            <PageHero
                title="Poultry Farm __Solutions__"
                subtitle="A scientifically formulated mineral solution that tackles ammonia, moisture, and bacteria — protecting your flock and your bottom line."
                tone="clay"
            />

            {/* ── 2. Problem intro + Stats ── */}
            <section className="poultry__problem">
                <div className="poultry__problem-inner">
                    <motion.span
                        className="poultry__problem-eyebrow"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease: SPRING }}
                    >
                        THE BIGGEST PROBLEM BROILER FARMS FACE
                    </motion.span>
                    <motion.h2
                        className="poultry__problem-headline"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: SPRING, delay: 0.08 }}
                    >
                        Wet litter and ammonia are silently costing you birds every season.
                    </motion.h2>
                    <motion.div
                        className="poultry__problem-rule"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: 0.25, ease: SPRING }}
                    />
                </div>
            </section>

            <section className="poultry__stats">
                <div className="poultry__stats-grid">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="poultry__stat-card"
                            initial={{ opacity: 0, y: 50, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: SPRING }}
                        >
                            <span className="poultry__stat-value">{stat.value}</span>
                            <p className="poultry__stat-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── 3. Ammonia danger ── */}
            <section className="poultry__ammonia">
                <div className="poultry__ammonia-inner">
                    <motion.div
                        className="poultry__ammonia-text"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.75, ease: SPRING }}
                    >
                        <span className="poultry__ammonia-eyebrow">WHY AMMONIA IS YOUR BIGGEST ENEMY</span>
                        <h2 className="poultry__ammonia-heading">
                            From irritation to fatality — ammonia doesn't give you a warning.
                        </h2>
                        <ul className="poultry__ammonia-list">
                            {ammoniaList.map((item, i) => (
                                <motion.li
                                    key={i}
                                    className="poultry__ammonia-list-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: i * 0.1, ease: SPRING }}
                                >
                                    <span className="poultry__ammonia-bullet">—</span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="poultry__ammonia-visual"
                        initial={{ opacity: 0, x: 40, scale: 0.97 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.75, ease: SPRING }}
                    >
                        <span className="poultry__ammonia-symbol">NH₃</span>
                        <p className="poultry__ammonia-visual-title">Ammonia — The Silent Flock Killer</p>
                        <p className="poultry__ammonia-visual-note">[ Photo: ammonia meter / broiler house ]</p>
                    </motion.div>
                </div>
            </section>

            {/* ── 4. Our Solution ── */}
            <section className="poultry__solution">
                <div className="poultry__solution-header">
                    <h2 className="poultry__solution-title">Our Solution</h2>
                    <div className="poultry__solution-tags">
                        <span className="poultry__tag">Ammonia Control</span>
                        <span className="poultry__tag-dot">·</span>
                        <span className="poultry__tag">Moisture Management</span>
                        <span className="poultry__tag-dot">·</span>
                        <span className="poultry__tag">Bacteria Reduction</span>
                    </div>
                </div>

                <div className="poultry__solution-body">
                    <span className="poultry__solution-eyebrow">NATURALLY FORMULATED. SCIENTIFICALLY PROVEN.</span>

                    <motion.p
                        className="poultry__solution-intro"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.65, ease: SPRING }}
                    >
                        We have formulated a natural mineral blend specifically targeting the three
                        root causes of broiler house failure — ammonia spikes, excess moisture, and
                        bacterial load. Applied directly to litter, it works immediately and
                        continues to protect throughout the growth cycle and between flocks.
                    </motion.p>

                    <div className="poultry__product-row">
                        <motion.div
                            className="poultry__product-img-placeholder"
                            initial={{ opacity: 0, x: -40, scale: 0.96 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.75, ease: SPRING }}
                        >
                            <span className="poultry__product-img-label">Product Image</span>
                        </motion.div>
                        <motion.p
                            className="poultry__product-desc"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.65, ease: SPRING }}
                        >
                            Our mineral blend is safe for birds, workers, and the environment. No
                            harsh chemicals. No synthetic compounds. Just a targeted mineral
                            formulation that absorbs moisture, neutralises ammonia, and creates a
                            hostile environment for harmful bacteria — all while being gentle on
                            your flock.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* ── 5. Trial Results ── */}
            <section className="poultry__trials">
                <div className="poultry__trials-inner">
                    <motion.span
                        className="poultry__trials-eyebrow"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease: SPRING }}
                    >
                        OUR TRIALS HAVE SHOWED
                    </motion.span>
                    <motion.h2
                        className="poultry__trials-heading"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: SPRING, delay: 0.08 }}
                    >
                        The numbers speak for themselves.
                    </motion.h2>
                    <div className="poultry__trials-cards">
                        <motion.div
                            className="poultry__trial-card"
                            initial={{ opacity: 0, y: 40, scale: 0.92 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.65, delay: 0, ease: SPRING }}
                        >
                            <span className="poultry__trial-value">12%</span>
                            <p className="poultry__trial-label">
                                raw weight gain in poultry across 7,600 birds
                            </p>
                        </motion.div>
                        <motion.div
                            className="poultry__trial-card"
                            initial={{ opacity: 0, y: 40, scale: 0.92 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.65, delay: 0.15, ease: SPRING }}
                        >
                            <span className="poultry__trial-value">✓</span>
                            <p className="poultry__trial-label">
                                Significantly improved odour and moisture assessment scores
                            </p>
                        </motion.div>
                    </div>
                    <motion.p
                        className="poultry__trials-quote"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: SPRING }}
                    >
                        "Results recorded across a live trial of 7,600 broiler birds."
                    </motion.p>
                </div>
            </section>

            {/* ── 6. Application — 3-column cards ── */}
            <section className="poultry__application">
                <div className="poultry__application-inner">
                    <motion.span
                        className="poultry__application-eyebrow"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, ease: SPRING }}
                    >
                        APPLICATION GUIDE
                    </motion.span>
                    <motion.h2
                        className="poultry__application-heading"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.65, ease: SPRING, delay: 0.06 }}
                    >
                        How to Apply M-LitterGuard
                    </motion.h2>
                    <div className="poultry__application-grid">
                        {applicationCards.map((card, i) => (
                            <motion.div
                                key={i}
                                className="poultry__app-card"
                                style={{ '--card-accent': card.accent }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: i * 0.13, ease: SPRING }}
                            >
                                <div className="poultry__app-card-accent" />
                                <div className="poultry__app-card-icon">{card.icon}</div>
                                <h3 className="poultry__app-card-heading">{card.heading}</h3>
                                <p className="poultry__app-card-sub">{card.sub}</p>
                                <ul className="poultry__app-card-list">
                                    {card.bullets.map((b, j) => (
                                        <li key={j} className="poultry__app-card-item">
                                            <span className="poultry__app-card-check">✓</span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. Image placeholder strip ── */}
            <section className="poultry__images">
                <div className="poultry__images-inner">
                    <div className="poultry__images-grid">
                        {imagePlaceholders.map((item, i) => (
                            <motion.div
                                key={i}
                                className="poultry__image-card"
                                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: i * 0.13, ease: SPRING }}
                            >
                                <div className="poultry__img-placeholder">
                                    <span className="poultry__img-placeholder-label">{item.label}</span>
                                </div>
                                <p className="poultry__image-caption">{item.caption}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 8. Did You Know ── */}
            <section className="poultry__didyouknow">
                <motion.div
                    className="poultry__dyk-box"
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: SPRING }}
                >
                    <span className="poultry__dyk-eyebrow">DID YOU KNOW...</span>
                    <p className="poultry__dyk-text">
                        The by-product of effective litter management isn't just a healthier
                        flock — treated litter becomes a nutrient-rich organic fertiliser that can
                        be applied directly to your crops or sold as a premium soil amendment.
                    </p>
                </motion.div>
            </section>

            {/* ── 9. Footer ── */}
            <Footer />
        </div>
    )
}

export default PoultryPage

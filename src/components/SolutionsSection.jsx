import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import './SolutionsSection.css'

const SOLUTIONS = [
    {
        id: 'land',
        category: 'Agriculture',
        title: 'Land Rejuvenation',
        sub: 'Soil restoration & organic matter',
        to: '/solutions/land-rejuvenation',
    },
    {
        id: 'flood',
        category: 'Agriculture',
        title: 'Anti-Flooding',
        sub: 'Water retention & drainage',
        to: '/solutions/anti-flooding',
    },
    {
        id: 'uv',
        category: 'Agriculture',
        title: 'Sun & Pest Shield',
        sub: 'UV protection for orchards',
        to: '/solutions/uv-protection',
    },
    {
        id: 'poultry',
        category: 'Livestock',
        title: 'Poultry Solutions',
        sub: 'Mineral bedding treatment',
        to: '/solutions/poultry',
    },
]

const EASE = [0.22, 1, 0.36, 1]

/* ── Animated divider line ── */
const DrawLine = () => {
    const ref = React.useRef(null)
    const inView = useInView(ref, { once: true, amount: 0.5 })
    return (
        <div ref={ref} className="ss__divider" aria-hidden="true">
            <svg viewBox="0 0 1200 2" preserveAspectRatio="none">
                <motion.line
                    x1="0" y1="1" x2="1200" y2="1"
                    stroke="rgba(217,205,184,0.25)"
                    strokeWidth="1"
                    strokeDasharray="1200"
                    initial={{ strokeDashoffset: 1200 }}
                    animate={inView ? { strokeDashoffset: 0 } : {}}
                    transition={{ duration: 1.4, ease: EASE }}
                />
            </svg>
        </div>
    )
}

/* ── Solution card ── */
const SolCard = ({ s, index }) => (
    <motion.div
        className="ss__card"
        initial={{ opacity: 0, y: 52 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASE, delay: index * 0.12 }}
    >
        <Link to={s.to} className="ss__card-link">
            {/* top */}
            <div className="ss__card-top">
                <span className="ss__card-tag">{s.category}</span>
            </div>

            {/* body */}
            <div className="ss__card-body">
                <h3 className="ss__card-title">{s.title}</h3>
                <p className="ss__card-sub">{s.sub}</p>
            </div>

            {/* foot */}
            <div className="ss__card-foot">
                <span className="ss__card-cta">
                    Explore
                    <svg className="ss__card-arrow" viewBox="0 0 22 10" fill="none">
                        <path d="M0 5h20M15 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                <span className="ss__card-underline" aria-hidden="true" />
            </div>
        </Link>
    </motion.div>
)

/* ── Section ── */
const SolutionsSection = () => (
    <section className="ss" id="solutions">
        {/* clay glow */}
        <div className="ss__glow" aria-hidden="true" />

        <div className="ss__inner">
            <DrawLine />

            {/* header */}
            <motion.div
                className="ss__head"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: EASE }}
            >
                <span className="ss__eyebrow">What we do</span>
                <h2 className="ss__heading">Solutions for<br /><em>every farm.</em></h2>
            </motion.div>

            {/* cards */}
            <div className="ss__grid">
                {SOLUTIONS.map((s, i) => (
                    <SolCard key={s.id} s={s} index={i} />
                ))}
            </div>

            {/* footer tagline */}
            <motion.p
                className="ss__tagline"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            >
                Regenerating <em>KZN</em> · <em>Free State</em> · <em>Gauteng</em>
            </motion.p>
        </div>
    </section>
)

export default SolutionsSection

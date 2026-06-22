import React, { useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import SolutionsModal from './SolutionsModal'
import './HeroSection.css'

/* ─── Pod icons — orange outlined, matching reference ──────── */

const IconGradCap = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10L12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
    </svg>
)

const IconEnvelope = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
    </svg>
)

const IconUsers = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
)

const IconSprout = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M12 20v-8" />
        <path d="M12 12c-3-4-8-4.5-9-1.5s3 4.5 9 1.5z" />
        <path d="M12 12c3-4 8-4.5 9-1.5s-3 4.5-9 1.5z" />
    </svg>
)

const IconLeaf = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 17 3.5 17 3.5s2 4.9 2 9.5a7 7 0 01-7 7h-1z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12 13" />
    </svg>
)

/* ─── Nav zone data ───────────────────────────────────────── */

const ZONES = [
    { id: 'education', label: 'Education',     desc: 'Knowledge, training and learning for regenerative agriculture.',                 to: '/education',          pos: 'tl', Icon: IconGradCap,  delay: 0.6 },
    { id: 'contact',   label: 'Contact Us',    desc: "Let's start a conversation. We'd love to hear from you.",                        to: '/contact/agri-farms', pos: 'tr', Icon: IconEnvelope,  delay: 0.7 },
    { id: 'about',     label: 'About Us',      desc: 'Who we are, our mission and our passion for healthy land.',                      to: '/about',              pos: 'bl', Icon: IconUsers,     delay: 0.8 },
    { id: 'solutions', label: 'Our Solutions',  desc: 'Integrated, practical solutions tailored to your land and regenerative goals.',  to: '#',                   pos: 'bc', Icon: IconSprout,    delay: 0.9, solutions: true },
    { id: 'cropfit',   label: 'Crop Fit',      desc: 'Matching the right crops and practices to your soils, climate and context.',     to: '/cropfit',            pos: 'br', Icon: IconLeaf,      delay: 1.0 },
]

const EASE = [0.22, 1, 0.36, 1]

/* ─── Pod overlay — text positioned over background leaf shapes ── */

const PodOverlay = ({ label, desc, to, pos, Icon, delay, solutions, onNav, onSolutions }) => {
    const handle = (e) => {
        e.preventDefault()
        if (solutions) onSolutions()
        else onNav(to)
    }
    return (
        <motion.div
            className={`bp-pod bp-pod--${pos}`}
            initial={{ opacity: 0, scale: 0.82, y: pos.startsWith('b') ? 24 : -18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay }}
        >
            <Link to={solutions ? '#' : to} className="bp-pod__link" onClick={handle}>
                <span className="bp-pod__icon"><Icon /></span>
                <span className="bp-pod__label">{label}</span>
                <span className="bp-pod__accent" aria-hidden="true" />
                <span className="bp-pod__desc">{desc}</span>
            </Link>
        </motion.div>
    )
}

/* ─── Hero section ────────────────────────────────────────── */

const HeroSection = () => {
    const ref = useRef(null)
    const reduced = useReducedMotion()
    const nav = useNavigate()
    const [solOpen, setSolOpen] = useState(false)

    const onMove = useCallback(e => {
        if (!ref.current || reduced) return
        const x = (e.clientX / window.innerWidth  - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2
        ref.current.style.setProperty('--mx', x.toFixed(3))
        ref.current.style.setProperty('--my', y.toFixed(3))
    }, [reduced])

    return (
        <>
        <section className="hero-bloom" id="home" ref={ref} onMouseMove={onMove}>

            {/* background — clean artwork asset + atmospheric layers */}
            <div className="bp-bg">
                <div className="bp-bg__photo" />
                <div className="bp-bg__sun" />
                <div className="bp-bg__warm" />
                <div className="bp-bg__vig" />
                <div className="bp-bg__grain" />
            </div>

            {/* header: logo + tagline */}
            <motion.header
                className="bp-head"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            >
                <Link to="/" className="bp-head__brand" aria-label="Element Farm Solutions — Home">
                    <img src="/EFS_Sideways.png" alt="Element Farm Solutions" className="bp-head__logo" />
                </Link>
                <div className="bp-head__tag">
                    <em>Restoring land. Growing futures.</em>
                    <span className="bp-head__underline" aria-hidden="true" />
                </div>
            </motion.header>

            {/* pod text overlays (desktop) */}
            <div className="bp-pods" role="navigation" aria-label="Site sections">
                {ZONES.map(z => (
                    <PodOverlay key={z.id} {...z}
                        onNav={to => nav(to)}
                        onSolutions={() => setSolOpen(true)} />
                ))}
            </div>

            {/* bottom hint */}
            <motion.div
                className="bp-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.4 }}
            >
                <svg width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden="true">
                    <path d="M3 2L12 11 21 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Click a section to explore</span>
            </motion.div>

            {/* mobile layout */}
            <div className="bp-mob">
                <motion.div
                    className="bp-mob__head"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <img src="/EFS_Sideways.png" alt="Element Farm Solutions" className="bp-mob__logo" />
                    <em className="bp-mob__tag">Restoring land. Growing futures.</em>
                </motion.div>

                <motion.div
                    className="bp-mob__bird"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
                >
                    <img src="/herobird.png" alt="" />
                </motion.div>

                <nav className="bp-mob__nav" aria-label="Quick navigation">
                    {ZONES.map((z, i) => {
                        const ZI = z.Icon
                        const handle = (e) => {
                            if (z.solutions) { e.preventDefault(); setSolOpen(true) }
                        }
                        return (
                            <motion.div
                                key={z.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.45 + i * 0.07 }}
                            >
                                <Link to={z.solutions ? '#' : z.to} className="bp-mob__card" onClick={handle}>
                                    <span className="bp-mob__icon"><ZI /></span>
                                    <span className="bp-mob__cardbody">
                                        <span className="bp-mob__label">{z.label}</span>
                                        <span className="bp-mob__desc">{z.desc}</span>
                                    </span>
                                    <span className="bp-mob__arrow" aria-hidden="true">&#8594;</span>
                                </Link>
                            </motion.div>
                        )
                    })}
                </nav>
            </div>

        </section>

        <SolutionsModal isOpen={solOpen} onClose={() => setSolOpen(false)} />
        </>
    )
}

export default HeroSection

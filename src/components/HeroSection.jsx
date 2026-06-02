import React, { useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import SolutionsModal from './SolutionsModal'
import './HeroSection.css'

/* ─── Pod icons — fine-stroke, sized 20×20 ───────────────── */

const IconBook = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M8 7h6" /><path d="M8 11h4" />
    </svg>
)
const IconChat = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v12H7l-3 3z" />
    </svg>
)
const IconUsers = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)
const IconLeaf = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s2 4.9 2 9.5a7 7 0 0 1-7 7h-1z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12 13" />
    </svg>
)
const IconSprout = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M12 20V8" />
        <path d="M12 8c0-3-3-5-5-5 0 3 2 5 5 5z" />
        <path d="M12 8c0-3 3-5 5-5 0 3-2 5-5 5z" />
    </svg>
)

/* ─── Tiny flying-bird mark (top-left corner) ─────────────── */

const FlyingBird = () => (
    <svg viewBox="0 0 60 36" width="100%" height="100%" aria-hidden="true">
        <path d="M2 22 C 10 8, 22 8, 30 18 C 38 8, 50 8, 58 22"
              fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

/* ─── Nav zone data — five organic pods around the bloom ── */

const ZONES = [
    { id: 'education', label: 'Education',    desc: 'Knowledge & training for regenerative agriculture.', to: '/education',          pos: 'tl', Icon: IconBook,   delay: 0.85 },
    { id: 'contact',   label: 'Contact Us',   desc: "Let's start a conversation. We'd love to hear from you.", to: '/contact/agri-farms', pos: 'tr', Icon: IconChat,   delay: 0.95 },
    { id: 'about',     label: 'About Us',     desc: 'Who we are, our mission and our passion for healthy land.', to: '/about',              pos: 'bl', Icon: IconUsers,  delay: 1.05 },
    { id: 'solutions', label: 'Our Solutions',desc: 'Integrated, practical solutions tailored to your land.', to: '#',                   pos: 'bc', Icon: IconSprout, delay: 1.15, solutions: true },
    { id: 'cropfit',   label: 'CropFit',      desc: 'Matching the right crops & practices to your soil and climate.', to: '/cropfit',            pos: 'br', Icon: IconLeaf,   delay: 1.25 },
]

const EASE = [0.22, 1, 0.36, 1]

/* ─── Pod (organic leaf-shaped nav card) ─────────────────── */

const Pod = ({ id, label, desc, to, pos, Icon, delay, solutions, onNav, onSolutions }) => {
    const handle = (e) => {
        e.preventDefault()
        if (solutions) onSolutions()
        else onNav(to)
    }
    return (
        <motion.div
            className={`bp-pod bp-pod--${pos}`}
            initial={{ opacity: 0, scale: 0.7, y: pos.startsWith('t') ? -20 : 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay }}
        >
            <Link to={solutions ? '#' : to} className="bp-pod__card" onClick={handle}>
                <span className="bp-pod__icon"><Icon /></span>
                <span className="bp-pod__label">{label}</span>
                <span className="bp-pod__desc">{desc}</span>
            </Link>
        </motion.div>
    )
}

/* ─── Hero ─────────────────────────────────────────────────── */

const HeroSection = () => {
    const ref = useRef(null)
    const reduced = useReducedMotion()
    const nav = useNavigate()
    const [solOpen, setSolOpen] = useState(false)

    /* subtle mouse parallax via CSS vars */
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

            {/* SVG defs — turbulent wind filter for leaves + gold underline */}
            <svg className="bp-defs" aria-hidden="true" focusable="false">
                <defs>
                    <filter id="leafWind" x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.013 0.022" numOctaves="2" seed="3" result="noise">
                            <animate attributeName="baseFrequency"
                                     dur="14s"
                                     values="0.013 0.022; 0.018 0.028; 0.013 0.022"
                                     repeatCount="indefinite" />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G">
                            <animate attributeName="scale"
                                     dur="7s"
                                     values="4; 9; 4"
                                     repeatCount="indefinite" />
                        </feDisplacementMap>
                    </filter>
                </defs>
            </svg>

            {/* ── background ── */}
            <div className="bp-bg">
                <div className="bp-bg__photo" />
                <div className="bp-bg__sun" />
                <div className="bp-bg__warm" />
                <div className="bp-bg__vig" />
                <div className="bp-bg__grain" />
            </div>

            {/* ── top header ── */}
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

            {/* ── flying bird mark (top-left flourish) ── */}
            <motion.div
                className="bp-fly"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 0.85, x: 0 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
            >
                <FlyingBird />
            </motion.div>

            {/* ── central bird of paradise (the swaying centerpiece) ── */}
            <motion.div
                className="bp-bird"
                initial={{ opacity: 0, scale: 0.55, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
            >
                <div className="bp-bird__halo" aria-hidden="true" />
                <img src="/herobird.png" alt="" className="bp-bird__img" />
            </motion.div>

            {/* ── pods (desktop) ── */}
            <div className="bp-pods" role="navigation" aria-label="Site sections">
                {ZONES.map(z => (
                    <Pod key={z.id} {...z}
                         onNav={(to) => nav(to)}
                         onSolutions={() => setSolOpen(true)} />
                ))}
            </div>

            {/* ── footer hint ── */}
            <motion.div
                className="bp-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.6 }}
            >
                <span>Click a section to explore</span>
                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
                    <path d="M2 2 L11 11 L20 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35"/>
                    <path d="M2 6 L11 13 L20 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
                </svg>
            </motion.div>

            {/* ── mobile layout (stack) ── */}
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

import React, { useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import SolutionsModal from './SolutionsModal'
import './HeroSection.css'

/* ─── SVG icons (Lucide-inspired, 24 × 24) ────────────────── */

const IconBook = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M8 7h6" /><path d="M8 11h4" />
    </svg>
)

const IconChat = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
)

const IconUsers = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)

const IconLeaf = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s2 4.9 2 9.5a7 7 0 0 1-7 7h-1z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12 13" />
    </svg>
)

/* ─── Navigation zone data ─────────────────────────────────── */

const ZONES = [
    { id: 'education', label: 'Education',  hint: 'Articles & insights',  to: '/education',          pos: 'tl', Icon: IconBook,  delay: 0.35 },
    { id: 'contact',   label: 'Contact Us', hint: 'Start a conversation', to: '/contact/agri-farms', pos: 'tr', Icon: IconChat,  delay: 0.45 },
    { id: 'about',     label: 'About Us',   hint: 'Our story & mission',  to: '/about',              pos: 'bl', Icon: IconUsers, delay: 0.40 },
    { id: 'cropfit',   label: 'CropFit',    hint: 'Plan your season',     to: '/cropfit',            pos: 'br', Icon: IconLeaf,  delay: 0.50, dot: true },
]

const EASE = [0.22, 1, 0.36, 1]

/* ─── Zone card ────────────────────────────────────────────── */

const ZoneCard = ({ id, label, hint, to, pos, Icon, dot, delay, onNav, hovered, setHovered }) => (
    <motion.div
        className={`fz fz--${pos}`}
        initial={{ opacity: 0, scale: 0.82, x: pos.endsWith('l') ? -24 : 24, y: pos.startsWith('t') ? -24 : 24 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
    >
        <Link to={to} className="fz__card" onClick={e => { e.preventDefault(); onNav(to, pos) }}>
            <div className="fz__icon"><Icon /></div>
            <div className="fz__body">
                <span className="fz__label">{label}{dot && <span className="fz__dot" />}</span>
                <span className="fz__hint">{hint}</span>
            </div>
            <span className="fz__arrow" aria-hidden="true">&#8594;</span>
        </Link>
    </motion.div>
)

/* ─── Hero section ─────────────────────────────────────────── */

const HeroSection = () => {
    const ref = useRef(null)
    const reduced = useReducedMotion()
    const nav = useNavigate()
    const [solOpen, setSolOpen] = useState(false)
    const [hovered, setHovered] = useState(null)
    const [zoom, setZoom]       = useState(null)

    /* mouse parallax via CSS custom props — zero re-renders */
    const onMove = useCallback(e => {
        if (!ref.current || reduced) return
        const x = (e.clientX / window.innerWidth  - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2
        ref.current.style.setProperty('--mx', x.toFixed(3))
        ref.current.style.setProperty('--my', y.toFixed(3))
    }, [reduced])

    /* cinematic zoom-to-navigate */
    const onNav = useCallback((to, pos) => {
        if (reduced) { nav(to); return }
        setZoom(pos)
        setTimeout(() => nav(to), 850)
    }, [nav, reduced])

    const cls = `farm-hero${zoom ? ` farm-hero--zooming farm-hero--zoom-${zoom}` : ''}`

    return (
        <>
        <section className={cls} id="home" ref={ref} onMouseMove={onMove}>

            {/* ── background layers ── */}
            <div className="fh-bg">
                <div className="fh-bg__photo" />
                <div className="fh-bg__warm" />
                <div className="fh-bg__vig" />
                {/* pathway glow overlays — lit on card hover */}
                <div className={`fh-bg__glow fh-bg__glow--tl${hovered === 'education' ? ' lit' : ''}`} />
                <div className={`fh-bg__glow fh-bg__glow--tr${hovered === 'contact'   ? ' lit' : ''}`} />
                <div className={`fh-bg__glow fh-bg__glow--bl${hovered === 'about'     ? ' lit' : ''}`} />
                <div className={`fh-bg__glow fh-bg__glow--br${hovered === 'cropfit'   ? ' lit' : ''}`} />
            </div>

            {/* zoom white-out curtain */}
            <div className="fh-whiteout" />

            {/* ── central hub ── */}
            <motion.div
                className="fh-hub"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.12 }}
            >
                <button type="button" className="fh-hub__btn" onClick={() => setSolOpen(true)} aria-label="Explore our solutions">
                    <img
                        src="/Element Farm Solutions_Final_Logo_Side_PNG.png"
                        alt=""
                        className="fh-hub__logo"
                    />
                    <span className="fh-hub__title">Element</span>
                    <span className="fh-hub__sub">Farm Solutions</span>
                    <span className="fh-hub__cta">Our Solutions <span aria-hidden="true">&#8594;</span></span>
                </button>
            </motion.div>

            {/* ── zone cards (desktop) ── */}
            {ZONES.map(z => (
                <ZoneCard key={z.id} {...z} onNav={onNav} hovered={hovered} setHovered={setHovered} />
            ))}

            {/* ── bottom tagline ── */}
            <motion.p
                className="fh-tag"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.85 }}
            >
                <span>Regenerative Agriculture</span>
                <span className="fh-tag__sep" />
                <span>KZN &middot; Free State &middot; Gauteng</span>
            </motion.p>

            {/* ── mobile layout ── */}
            <motion.div
                className="fh-mob"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
            >
                <div className="fh-mob__hub">
                    <img
                        src="/Element Farm Solutions_Final_Logo_Side_PNG.png"
                        alt="Element Farm Solutions"
                        className="fh-mob__logo"
                    />
                    <button type="button" className="fh-mob__sol" onClick={() => setSolOpen(true)}>
                        Our Solutions <span aria-hidden="true">&#8594;</span>
                    </button>
                </div>

                <nav className="fh-mob__nav" aria-label="Quick navigation">
                    {ZONES.map(z => {
                        const ZI = z.Icon
                        return (
                            <Link key={z.id} to={z.to} className="fh-mob__card">
                                <div className="fh-mob__icon"><ZI /></div>
                                <div className="fh-mob__body">
                                    <span className="fh-mob__label">{z.label}{z.dot && <span className="fz__dot" />}</span>
                                    <span className="fh-mob__hint">{z.hint}</span>
                                </div>
                                <span className="fh-mob__arrow" aria-hidden="true">&#8594;</span>
                            </Link>
                        )
                    })}
                </nav>

                <p className="fh-mob__tag">Regenerative Agriculture &middot; KZN &middot; Free State &middot; Gauteng</p>
            </motion.div>

        </section>

        <SolutionsModal isOpen={solOpen} onClose={() => setSolOpen(false)} />
        </>
    )
}

export default HeroSection

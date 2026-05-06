import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const solutionGroups = [
    {
        label: 'Agriculture',
        tone: 'moss',
        items: [
            { to: '/solutions/land-rejuvenation', title: 'Land Rejuvenation', hint: 'Soil restoration & organic matter' },
            { to: '/solutions/anti-flooding',    title: 'Anti-Flooding',     hint: 'Water retention & drainage' },
            { to: '/solutions/uv-protection',    title: 'Sun & Pest Shield', hint: 'UV protection for orchards' },
        ],
    },
    {
        label: 'Livestock',
        tone: 'ochre',
        items: [
            { to: '/solutions/poultry', title: 'Poultry Solutions', hint: 'Mineral bedding treatment' },
        ],
    },
]

const contactItems = [
    { to: '/contact/agri-farms',    title: 'Commercial Agriculture Farms', hint: 'Land, UV, flooding & soil' },
    { to: '/contact/dairy-horses',  title: 'Dairy and Horses',             hint: 'Pasture, manure & water' },
    { to: '/contact/poultry',       title: 'Poultry Farms',                hint: 'Biogas, broiler & litter' },
]

/* Character-level hover link — two stacked copies sliding in/out */
const HoverLink = ({ children, ...props }) => (
    <span className="hover-link" {...props}>
        <span className="hover-link__inner">
            <span className="hover-link__copy hover-link__copy--a">{children}</span>
            <span className="hover-link__copy hover-link__copy--b" aria-hidden="true">{children}</span>
        </span>
    </span>
)

const Header = () => {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(null) // 'solutions' | 'contact' | null
    const headerRef = useRef(null)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        setMenuOpen(null)
    }, [location.pathname])

    useEffect(() => {
        if (!menuOpen) return
        const onDocClick = (e) => {
            if (headerRef.current && !headerRef.current.contains(e.target)) setMenuOpen(null)
        }
        const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(null) }
        document.addEventListener('mousedown', onDocClick)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('mousedown', onDocClick)
            document.removeEventListener('keydown', onKey)
        }
    }, [menuOpen])

    const toggle = (id) => setMenuOpen(prev => prev === id ? null : id)

    return (
        <header
            ref={headerRef}
            className={`ef-header ${scrolled ? 'ef-header--scrolled' : ''} ${menuOpen ? 'ef-header--menu-open' : ''}`}
        >
            <motion.div
                className="ef-header__bar"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <Link to="/" className="ef-header__brand" aria-label="Element Farm Solutions — Home">
                    <img
                        src="/Element Farm Solutions_Final_Logo_Side_PNG.png"
                        alt="Element Farm Solutions"
                        className="ef-header__logo"
                    />
                </Link>

                <nav className="ef-header__nav" aria-label="Primary">
                    <button
                        type="button"
                        className={`ef-header__nav-item ${menuOpen === 'solutions' ? 'is-open' : ''}`}
                        onClick={() => toggle('solutions')}
                        aria-expanded={menuOpen === 'solutions'}
                    >
                        <HoverLink>Solutions</HoverLink>
                        <span className={`ef-header__caret ${menuOpen === 'solutions' ? 'is-flipped' : ''}`} aria-hidden="true">↓</span>
                    </button>

                    <Link to="/education" className="ef-header__nav-item">
                        <HoverLink>Education</HoverLink>
                    </Link>

                    <Link to="/cropfit" className="ef-header__nav-item ef-header__nav-item--feature">
                        <HoverLink>CropFit</HoverLink>
                        <span className="ef-header__dot" aria-hidden="true" />
                    </Link>

                    <button
                        type="button"
                        className={`ef-header__nav-item ${menuOpen === 'contact' ? 'is-open' : ''}`}
                        onClick={() => toggle('contact')}
                        aria-expanded={menuOpen === 'contact'}
                    >
                        <HoverLink>Contact</HoverLink>
                        <span className={`ef-header__caret ${menuOpen === 'contact' ? 'is-flipped' : ''}`} aria-hidden="true">↓</span>
                    </button>
                </nav>
            </motion.div>

            {/* Mega-menus */}
            <AnimatePresence>
                {menuOpen === 'solutions' && (
                    <motion.div
                        key="mega-solutions"
                        className="ef-mega"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="ef-mega__inner">
                            <div className="ef-mega__aside">
                                <span className="ef-mega__kicker">— Our Solutions</span>
                                <p className="ef-mega__quote">
                                    Regenerative systems,<br/>
                                    <em>tailored to your land.</em>
                                </p>
                            </div>
                            <div className="ef-mega__groups">
                                {solutionGroups.map((group) => (
                                    <div key={group.label} className="ef-mega__group">
                                        <span className={`ef-mega__group-label ef-mega__group-label--${group.tone}`}>{group.label}</span>
                                        <ul className="ef-mega__list">
                                            {group.items.map((item, i) => (
                                                <li key={item.to} className="ef-mega__item">
                                                    {item.disabled ? (
                                                        <span className="ef-mega__link ef-mega__link--disabled" aria-disabled="true">
                                                            <span className="ef-mega__link-num">0{i + 1}</span>
                                                            <span className="ef-mega__link-body">
                                                                <span className="ef-mega__link-title">
                                                                    {item.title}
                                                                    <span className="ef-mega__link-soon">Coming soon</span>
                                                                </span>
                                                                <span className="ef-mega__link-hint">{item.hint}</span>
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <Link to={item.to} className="ef-mega__link">
                                                            <span className="ef-mega__link-num">0{i + 1}</span>
                                                            <span className="ef-mega__link-body">
                                                                <span className="ef-mega__link-title">{item.title}</span>
                                                                <span className="ef-mega__link-hint">{item.hint}</span>
                                                            </span>
                                                            <span className="ef-mega__link-arrow" aria-hidden="true">→</span>
                                                        </Link>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {menuOpen === 'contact' && (
                    <motion.div
                        key="mega-contact"
                        className="ef-mega ef-mega--dark"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="ef-mega__inner">
                            <div className="ef-mega__aside">
                                <span className="ef-mega__kicker ef-mega__kicker--paper">— Start a conversation</span>
                                <p className="ef-mega__quote ef-mega__quote--paper">
                                    Every field is different.<br/>
                                    <em>Tell us about yours.</em>
                                </p>
                                <div className="ef-mega__meta">
                                    <span>kamil@elementfarmsolutions.co.za</span>
                                    <span>+27 61 388 9339</span>
                                </div>
                            </div>
                            <div className="ef-mega__groups ef-mega__groups--single">
                                <ul className="ef-mega__list">
                                    {contactItems.map((item, i) => (
                                        <li key={item.to} className="ef-mega__item">
                                            <Link to={item.to} className="ef-mega__link ef-mega__link--paper">
                                                <span className="ef-mega__link-num">0{i + 1}</span>
                                                <span className="ef-mega__link-body">
                                                    <span className="ef-mega__link-title">{item.title}</span>
                                                    <span className="ef-mega__link-hint">{item.hint}</span>
                                                </span>
                                                <span className="ef-mega__link-arrow" aria-hidden="true">→</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header

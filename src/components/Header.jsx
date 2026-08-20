import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const contactItems = [
    { to: '/contact/agri-farms',    title: 'Agriculture',       hint: 'Land, UV, flooding & soil' },
    { to: '/contact/dairy-horses',  title: 'Dairy and Stables', hint: 'Pasture, manure & water' },
    { to: '/contact/poultry',       title: 'Poultry Farms',     hint: 'Biogas, broiler & litter' },
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
    const [hidden, setHidden] = useState(false)
    const [menuOpen, setMenuOpen] = useState(null) // 'contact' | null
    const [mobileOpen, setMobileOpen] = useState(false)
    const headerRef = useRef(null)
    const lastY = useRef(0)
    const location = useLocation()

    /* Shrink past the fold; hide on scroll down, reveal on scroll up */
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            setScrolled(y > 40)

            const delta = y - lastY.current
            if (y < 140) setHidden(false)
            else if (delta > 6) setHidden(true)
            else if (delta < -6) setHidden(false)
            lastY.current = y
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    /* A link may request the contact mega-menu on arrival via <Link state={{ openMenu }}> */
    useEffect(() => {
        setMenuOpen(location.state?.openMenu ?? null)
        setMobileOpen(false)
        setHidden(false)
        lastY.current = window.scrollY
    }, [location.pathname, location.state])

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

    /* Never slide away while a menu is open */
    const isHidden = hidden && !menuOpen && !mobileOpen

    return (
        <header
            ref={headerRef}
            className={`ef-header ${scrolled ? 'ef-header--scrolled' : ''} ${menuOpen ? 'ef-header--menu-open' : ''} ${isHidden ? 'ef-header--hidden' : ''}`}
        >
            <motion.div
                className="ef-header__bar"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <Link to="/" className="ef-header__brand" aria-label="Element Farm Solutions — Home">
                    <img
                        src="/EFS_Sideways_Trim.png"
                        alt="Element Farm Solutions"
                        className="ef-header__logo ef-header__logo--full"
                    />
                    <img
                        src="/EFS_Icon.png"
                        alt="Element Farm Solutions"
                        className="ef-header__logo ef-header__logo--icon"
                    />
                </Link>

                <nav className="ef-header__nav" aria-label="Primary">
                    <Link to="/solutions" className="ef-header__nav-item">
                        <HoverLink>Solutions</HoverLink>
                    </Link>

                    <Link to="/education" className="ef-header__nav-item">
                        <HoverLink>Education</HoverLink>
                    </Link>

                    <Link to="/contact" className="ef-header__nav-item">
                        <HoverLink>Contact</HoverLink>
                    </Link>
                </nav>

                <button
                    type="button"
                    className={`ef-header__burger ${mobileOpen ? 'is-open' : ''}`}
                    onClick={() => setMobileOpen(prev => !prev)}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                >
                    <span /><span /><span />
                </button>
            </motion.div>

            {/* Mega-menus */}
            <AnimatePresence>
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
                                    {contactItems.map((item) => (
                                        <li key={item.to} className="ef-mega__item">
                                            <Link to={item.to} className="ef-mega__link ef-mega__link--paper">
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

                {mobileOpen && (
                    <motion.div
                        key="mob-menu"
                        className="ef-mob"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Link to="/solutions" className="ef-mob__row">Solutions</Link>

                        <Link to="/education" className="ef-mob__row">Education</Link>

                        <Link to="/contact" className="ef-mob__row">Contact</Link>

                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header

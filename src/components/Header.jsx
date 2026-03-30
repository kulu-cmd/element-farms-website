import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const [scrolled, setScrolled] = useState(false)
    const [solutionsOpen, setSolutionsOpen] = useState(false)
    const [contactOpen, setContactOpen] = useState(false)
    const triggerRef = useRef(null)
    const contactTriggerRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (!solutionsOpen && !contactOpen) return

        const onDocMouseDown = (e) => {
            if (triggerRef.current && triggerRef.current.contains(e.target)) return
            if (contactTriggerRef.current && contactTriggerRef.current.contains(e.target)) return
            setSolutionsOpen(false)
            setContactOpen(false)
        }

        document.addEventListener('mousedown', onDocMouseDown)
        return () => document.removeEventListener('mousedown', onDocMouseDown)
    }, [solutionsOpen, contactOpen])

    const handleSolutionsClick = () => {
        setSolutionsOpen(prev => !prev)
        setContactOpen(false)
    }

    const handleContactClick = () => {
        setContactOpen(prev => !prev)
        setSolutionsOpen(false)
    }

    return (
        <motion.header
            className={`header ${scrolled ? 'header--scrolled' : ''}`}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="header__inner">
            {/* Logo */}
            <motion.div
                className="header__logo-link"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <Link to="/" className="header__logo">
                    <img
                        src="/Element Farm Solutions_Final_Logo_Side_PNG.png"
                        alt="Element Farm Solutions"
                    />
                </Link>
            </motion.div>

            {/* Navigation */}
            <nav className="header__nav">
                <div className="header__nav-pill">
                    <motion.div
                        ref={triggerRef}
                        className={`header__nav-dropdown-wrapper${solutionsOpen ? ' header__nav-dropdown-wrapper--open' : ''}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.28 }}
                        onClick={handleSolutionsClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                handleSolutionsClick()
                            }
                        }}
                    >
                        <span className="header__nav-link header__nav-link--dropdown">
                            Solutions <span className="header__dropdown-icon">▾</span>
                        </span>

                        {solutionsOpen && (
                            <div className="header__dropdown-menu header__dropdown-menu--wide header__dropdown-menu--visible">

                                {/* Agriculture */}
                                <div className="header__dropdown-section">
                                    <span className="header__dropdown-section-label header__dropdown-section-label--green">
                                        Agriculture
                                    </span>
                                    <Link to="/solutions/land-rejuvenation" className="header__dropdown-item header__dropdown-item--rich" onClick={() => setSolutionsOpen(false)}>
                                        <span className="header__dropdown-item-icon">🌱</span>
                                        <span className="header__dropdown-item-body">
                                            <strong>Land Rejuvenation</strong>
                                            <span>Soil restoration &amp; organic matter</span>
                                        </span>
                                    </Link>
                                    <Link to="/solutions/anti-flooding" className="header__dropdown-item header__dropdown-item--rich" onClick={() => setSolutionsOpen(false)}>
                                        <span className="header__dropdown-item-icon">💧</span>
                                        <span className="header__dropdown-item-body">
                                            <strong>Anti-Flooding Systems</strong>
                                            <span>Water retention &amp; drainage</span>
                                        </span>
                                    </Link>
                                    <Link to="/solutions/uv-protection" className="header__dropdown-item header__dropdown-item--rich" onClick={() => setSolutionsOpen(false)}>
                                        <span className="header__dropdown-item-icon">☀️</span>
                                        <span className="header__dropdown-item-body">
                                            <strong>Sun &amp; Pest Protection</strong>
                                            <span>UV shielding for crops &amp; orchards</span>
                                        </span>
                                    </Link>
                                </div>

                                <div className="header__dropdown-divider" />

                                {/* Renewable Energy */}
                                <div className="header__dropdown-section">
                                    <span className="header__dropdown-section-label header__dropdown-section-label--orange">
                                        Renewable Energy
                                    </span>
                                    <Link to="/solutions/waste-management" className="header__dropdown-item header__dropdown-item--rich" onClick={() => setSolutionsOpen(false)}>
                                        <span className="header__dropdown-item-icon">⚡</span>
                                        <span className="header__dropdown-item-body">
                                            <strong>Waste Management</strong>
                                            <span>Biogas &amp; organic fertiliser</span>
                                        </span>
                                    </Link>
                                </div>

                                <div className="header__dropdown-divider" />

                                {/* Broiler Farms */}
                                <div className="header__dropdown-section">
                                    <span className="header__dropdown-section-label header__dropdown-section-label--charcoal">
                                        Broiler Farms
                                    </span>
                                    <Link to="/solutions/poultry" className="header__dropdown-item header__dropdown-item--rich" onClick={() => setSolutionsOpen(false)}>
                                        <span className="header__dropdown-item-icon">🐔</span>
                                        <span className="header__dropdown-item-body">
                                            <strong>Poultry Solutions</strong>
                                            <span>Ammonia control &amp; litter management</span>
                                        </span>
                                    </Link>
                                </div>

                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        ref={contactTriggerRef}
                        className={`header__nav-dropdown-wrapper${contactOpen ? ' header__nav-dropdown-wrapper--open' : ''}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.36 }}
                        onClick={handleContactClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                handleContactClick()
                            }
                        }}
                    >
                        <span className="header__nav-link header__nav-link--dropdown">
                            Contact Us <span className="header__dropdown-icon">▾</span>
                        </span>

                        {contactOpen && (
                            <div className="header__dropdown-menu header__dropdown-menu--orange header__dropdown-menu--visible">
                                <Link
                                    to="/contact/poultry-dairy"
                                    className="header__dropdown-item header__dropdown-item--orange"
                                    onClick={() => setContactOpen(false)}
                                >
                                    <span className="header__dropdown-item-icon">🐔</span>
                                    <span className="header__dropdown-item-body">
                                        <strong>Poultry &amp; Dairies</strong>
                                        <span>Biogas, broiler &amp; waste solutions</span>
                                    </span>
                                </Link>
                                <Link
                                    to="/contact/agri-farms"
                                    className="header__dropdown-item header__dropdown-item--orange"
                                    onClick={() => setContactOpen(false)}
                                >
                                    <span className="header__dropdown-item-icon">🌾</span>
                                    <span className="header__dropdown-item-body">
                                        <strong>Agri Farms</strong>
                                        <span>Land, UV, flooding &amp; soil solutions</span>
                                    </span>
                                </Link>
                                <Link
                                    to="/contact/organic"
                                    className="header__dropdown-item header__dropdown-item--orange"
                                    onClick={() => setContactOpen(false)}
                                >
                                    <span className="header__dropdown-item-icon">🌿</span>
                                    <span className="header__dropdown-item-body">
                                        <strong>Grow Organically</strong>
                                        <span>Natural pest control &amp; fertiliser</span>
                                    </span>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </nav>
            </div>
        </motion.header>
    )
}

export default Header

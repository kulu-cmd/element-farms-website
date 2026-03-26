import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const [scrolled, setScrolled] = useState(false)
    const [solutionsOpen, setSolutionsOpen] = useState(false)
    const solutionsPinnedRef = useRef(false)
    const triggerRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (!solutionsOpen) return

        const onDocMouseDown = (e) => {
            if (!triggerRef.current) return
            if (triggerRef.current.contains(e.target)) return
            setSolutionsOpen(false)
            solutionsPinnedRef.current = false
        }

        document.addEventListener('mousedown', onDocMouseDown)
        return () => document.removeEventListener('mousedown', onDocMouseDown)
    }, [solutionsOpen])

    const handleMouseEnter = () => {
        solutionsPinnedRef.current = false
        setSolutionsOpen(true)
    }

    const handleSolutionsClick = () => {
        if (!solutionsOpen) {
            solutionsPinnedRef.current = true
            setSolutionsOpen(true)
            return
        }
        solutionsPinnedRef.current = false
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
                    <motion.a
                        href="#about-us"
                        className="header__nav-link"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        About Us
                    </motion.a>

                    <motion.div
                        ref={triggerRef}
                        className={`header__nav-dropdown-wrapper${solutionsOpen ? ' header__nav-dropdown-wrapper--open' : ''}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.28 }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={() => {
                            if (solutionsPinnedRef.current) return
                            setSolutionsOpen(false)
                        }}
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
                            <div
                                className="header__dropdown-menu header__dropdown-menu--visible"
                            >
                                <Link
                                    to="/solutions/land-rejuvenation"
                                    className="header__dropdown-item"
                                    onClick={() => {
                                        setSolutionsOpen(false)
                                        solutionsPinnedRef.current = false
                                    }}
                                >
                                    Land Rejuvenation
                                </Link>
                                <Link
                                    to="/solutions/uv-protection"
                                    className="header__dropdown-item"
                                    onClick={() => {
                                        setSolutionsOpen(false)
                                        solutionsPinnedRef.current = false
                                    }}
                                >
                                    UV Protection
                                </Link>
                                <Link
                                    to="/solutions/anti-flooding"
                                    className="header__dropdown-item"
                                    onClick={() => {
                                        setSolutionsOpen(false)
                                        solutionsPinnedRef.current = false
                                    }}
                                >
                                    Anti-Flooding
                                </Link>
                                <Link
                                    to="/solutions/waste-management"
                                    className="header__dropdown-item"
                                    onClick={() => {
                                        setSolutionsOpen(false)
                                        solutionsPinnedRef.current = false
                                    }}
                                >
                                    Waste Management
                                </Link>
                            </div>
                        )}
                    </motion.div>

                    <motion.a
                        href="#contact-us"
                        className="header__nav-link"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.36 }}
                    >
                        Contact Us
                    </motion.a>
                </div>
            </nav>
            </div>
        </motion.header>
    )
}

export default Header

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const [scrolled, setScrolled] = useState(false)
    const [solutionsOpen, setSolutionsOpen] = useState(false)
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })
    const triggerRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleMouseEnter = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            setDropdownPos({
                top: rect.bottom + 8,
                left: rect.left + rect.width / 2,
            })
        }
        setSolutionsOpen(true)
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
                        onMouseLeave={() => setSolutionsOpen(false)}
                    >
                        <span className="header__nav-link header__nav-link--dropdown">
                            Solutions <span className="header__dropdown-icon">▾</span>
                        </span>

                        {solutionsOpen && (
                            <div
                                className="header__dropdown-menu header__dropdown-menu--visible"
                                style={{ top: dropdownPos.top, left: dropdownPos.left }}
                            >
                                <Link to="/solutions/land-rejuvenation" className="header__dropdown-item" onClick={() => setSolutionsOpen(false)}>
                                    Land Rejuvenation
                                </Link>
                                <Link to="/solutions/uv-protection" className="header__dropdown-item" onClick={() => setSolutionsOpen(false)}>
                                    Pest & Sunburn
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

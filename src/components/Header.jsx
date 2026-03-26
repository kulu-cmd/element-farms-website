import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Header.css'

const Header = () => {
    const [scrolled, setScrolled] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const solutions = [
        'Land Rejuvination',
        'Anti-Flooding Systems',
        'Nursery Support',
        'Pest & Sunburn',
        'Poultry',
        'Dairy & Cattle'
    ]

    return (
        <motion.header
            className={`header ${scrolled ? 'header--scrolled' : ''}`}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {/* Logo */}
            <motion.div
                className="header__logo-link"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <a href="/" className="header__logo">
                    <img
                        src="/Element Farm Solutions_Final_Logo_Side_PNG.png"
                        alt="Element Farm Solutions"
                    />
                </a>
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
                        className="header__dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.28 }}
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <button className="header__nav-link">
                            Solutions
                            <span className={`header__dropdown-arrow ${dropdownOpen ? 'header__dropdown-arrow--open' : ''}`}>
                                ▼
                            </span>
                        </button>

                        {dropdownOpen && (
                            <div className="header__dropdown-menu">
                                {solutions.map((solution, idx) => (
                                    <a
                                        key={idx}
                                        href={`#${solution.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                                        className="header__dropdown-item"
                                    >
                                        {solution}
                                    </a>
                                ))}
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
        </motion.header>
    )
}

export default Header

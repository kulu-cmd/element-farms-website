import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Header.css'

const Header = () => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const navLinks = ['About Us', 'Solutions', 'Contact Us']

    return (
        <motion.header
            className={`header ${scrolled ? 'header--scrolled' : ''}`}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {/* Logo */}
            <motion.div
                className="header__logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <img
                    src="/Element Farm Solutions_Final_Logo_Side_PNG.png"
                    alt="Element Farm Solutions"
                />
            </motion.div>

            {/* Navigation */}
            <nav className="header__nav">
                <div className="header__nav-pill">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link}
                            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                            className="header__nav-link"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                        >
                            {link}
                        </motion.a>
                    ))}
                </div>
            </nav>
        </motion.header>
    )
}

export default Header

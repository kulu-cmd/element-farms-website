import React from 'react'
import { Link } from 'react-router-dom'
import svgMarkup from '../assets/LandingPageFULL.svg?raw'
import './HeroSection.css'

/*
 * Element Farm Solutions — landing hero.
 * The full designed artwork (LandingPageFULL.svg) is inlined so it stays
 * crisp and so the 4 nav buttons can recolour on hover. The svg is a
 * 1920x1080 (16:9) canvas; the stage keeps that ratio, so the four
 * clickable hotspots below are positioned in % of the same box and stay
 * aligned at every size.
 *
 * Hover: each hotspot recolours its button circle to #c9d07d via the
 * `:has()` rules in HeroSection.css — no JS needed.
 */

// Positioned in % to match each blob's extent (svg is 1920x1080).
const HOTSPOTS = [
    { id: 'about',     to: '/about',     label: 'About us',      style: { left: '14.4%', top: '18.5%', width: '16.2%', height: '15.2%' } },
    { id: 'contact',   to: '/contact',   label: 'Contact us',    style: { left: '66.9%', top: '28.3%', width: '17.5%', height: '15.2%' } },
    { id: 'solutions', to: '/solutions', label: 'Our solutions', style: { left: '12.2%', top: '55.1%', width: '14.4%', height: '18.5%' } },
    { id: 'education',  to: '/education', label: 'Education',     style: { left: '65.4%', top: '61.1%', width: '16.3%', height: '15.2%' } },
]

const HeroSection = () => (
    <section className="lp" aria-label="Element Farm Solutions">
        <div className="lp__stage">
            {/* Inlined designed artwork (background, logo, flower, labels, banner) */}
            <div
                className="lp__art"
                role="img"
                aria-label="Element Farm Solutions — a regenerative farm landscape with a Bird of Paradise flower"
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />

            {/* Clickable, keyboard-navigable hotspots over the 4 nav buttons */}
            <nav className="lp__nav" aria-label="Primary">
                {HOTSPOTS.map((h) => (
                    <Link
                        key={h.id}
                        to={h.to}
                        className={`lp__hot lp__hot--${h.id}`}
                        style={h.style}
                        aria-label={h.label}
                    >
                        <span className="lp__sr">{h.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    </section>
)

export default HeroSection

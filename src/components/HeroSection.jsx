import React, { useRef } from 'react'
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
 * Hover: the hotspots overlay the svg, so `:hover` can't reach the svg
 * subtree. Entering/focusing a hotspot toggles `is-active` on its matching
 * `#efs-btn-<id>` button inside the artwork; HeroSection.css grows it and
 * turns it brand-green (#c9d07d). The green foliage blobs zoom on hover via
 * pure CSS (`.lp-blob`) since they sit outside the hotspot boxes.
 */

// Positioned in % to match each blob's extent (svg is 1920x1080).
const HOTSPOTS = [
    { id: 'about',     to: '/about',     label: 'About us',      style: { left: '14.4%', top: '18.5%', width: '16.2%', height: '15.2%' } },
    { id: 'contact',   to: '/contact',   label: 'Contact us',    style: { left: '66.9%', top: '28.3%', width: '17.5%', height: '15.2%' } },
    // Lands on About us with the Solutions mega-menu already open.
    { id: 'solutions', to: '/about', label: 'Our solutions', state: { openMenu: 'solutions' }, style: { left: '12.2%', top: '55.1%', width: '14.4%', height: '18.5%' } },
    { id: 'education',  to: '/education', label: 'Education',     style: { left: '65.4%', top: '61.1%', width: '16.3%', height: '15.2%' } },
]

const HeroSection = () => {
    const artRef = useRef(null)

    // Pop the matching section's word + arrow while its hotspot is hovered or
    // keyboard-focused (the hotspots overlay the svg, so :hover can't reach it).
    const setActive = (id, on) => {
        const art = artRef.current
        if (!art) return
        art.querySelector(`#efs-btn-${id}`)?.classList.toggle('is-active', on)
        art.querySelector(`#efs-txt-${id}`)?.classList.toggle('is-active', on)
    }

    return (
        <section className="lp" aria-label="Element Farm Solutions">
            <div className="lp__stage">
                {/* Inlined designed artwork (background, logo, flower, labels, banner) */}
                <div
                    ref={artRef}
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
                            state={h.state}
                            className={`lp__hot lp__hot--${h.id}`}
                            style={h.style}
                            aria-label={h.label}
                            onMouseEnter={() => setActive(h.id, true)}
                            onMouseLeave={() => setActive(h.id, false)}
                            onFocus={() => setActive(h.id, true)}
                            onBlur={() => setActive(h.id, false)}
                        >
                            <span className="lp__sr">{h.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </section>
    )
}

export default HeroSection

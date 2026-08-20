import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import svgMarkup from '../assets/LandingPageFULL.svg?raw'
import './HeroSection.css'

/*
 * Element Farm Solutions — landing hero.
 *
 * Two artworks, one per orientation:
 *
 *   Desktop (>768px)  LandingPageFULL.svg — 1920x1080, inlined at build time.
 *   Mobile  (<=768px) MobileLandingPage.svg — 402x874 portrait artboard,
 *                     fetched from /public on demand.
 *
 * The desktop artwork is irreducibly landscape (its four nav blobs span 12%–85%
 * of the width), so no portrait crop of it can hold all four. The mobile file is
 * a genuine portrait recomposition, which is why it gets its own code path
 * rather than a media query over the same markup. It is fetched rather than
 * inlined because it is 1.3MB raw (410KB gzipped) — inlining would push it into
 * the JS bundle and make every desktop visitor download it too.
 *
 * Both artworks carry invisible hotspots over their four nav buttons. Desktop
 * positions them in % of a fixed 16:9 stage; mobile positions them in artboard
 * pixels and maps them through the same cover transform the SVG uses, so they
 * track the artwork exactly at any phone aspect ratio.
 */

const MOBILE_QUERY = '(max-width: 768px)'

// Desktop: % of the 1920x1080 stage.
const HOTSPOTS = [
    { id: 'about',     to: '/about',     label: 'About us',      style: { left: '14.4%', top: '18.5%', width: '16.2%', height: '15.2%' } },
    { id: 'contact',   to: '/contact',   label: 'Contact us',    style: { left: '66.9%', top: '28.3%', width: '17.5%', height: '15.2%' } },
    { id: 'solutions', to: '/solutions', label: 'Our solutions', style: { left: '12.2%', top: '55.1%', width: '14.4%', height: '18.5%' } },
    { id: 'education', to: '/education', label: 'Education',     style: { left: '65.4%', top: '61.1%', width: '16.3%', height: '15.2%' } },
]

// Mobile: px within the 402x874 artboard. All are >=100x62, comfortably past
// the 44x44 minimum touch target once mapped to the screen.
const MOBILE_VB = { w: 402, h: 874 }
const MOBILE_HOTSPOTS = [
    { id: 'about',     to: '/about',     label: 'About us',      x: 80,  y: 335, w: 105, h: 62 },
    { id: 'contact',   to: '/contact',   label: 'Contact us',    x: 233, y: 318, w: 112, h: 62 },
    { id: 'education', to: '/education', label: 'Education',     x: 156, y: 465, w: 112, h: 66 },
    { id: 'solutions', to: '/solutions', label: 'Our solutions', x: 83,  y: 545, w: 100, h: 85 },
]

/* The Bird of Paradise fan — the only two fills it uses in the mobile export. */
const PETAL_FILLS = ['fill:rgb(238,130,20)', 'fill:rgb(61,82,176)']

/* Where the flower's stems converge, in viewBox coordinates. */
const PETAL_PIVOT = { x: 200, y: 306 }

/*
 * The mobile artwork is a flat Affinity export: ~814 sibling groups with baked
 * matrix transforms and no ids or classes, so there is nothing to animate by
 * name. Find the flower's petals by fill and position, then wrap each in a
 * clean <g> — inserted exactly where the petal sat, so z-order is untouched,
 * and carrying no transform of its own, so the petal keeps its matrix.
 *
 * Each wrapper gets `transform-box: fill-box` plus an explicit transform-origin
 * measured from its own bounding box. That is the only formulation that pins
 * the pivot reliably here: the artwork sits inside ancestors scaled by 0.2587
 * and translated by matrix(1,0,0,1,-3963,1), and under `transform-box: view-box`
 * the origin resolves against the element's local space rather than the viewBox.
 * That first sent the petals swinging ~48 units vertically for a 0.7deg step,
 * and then — once the pivot was carried by wrapper translates — left the Y axis
 * pivoting about the raw local coordinate. fill-box sidesteps both: the
 * reference box is the element's own geometry, which getBBox() reports in the
 * same space, so the two cannot disagree.
 */
const tagPetals = (svg) => {
    const clip = svg.querySelector('g[clip-path]')
    const ctm = svg.getScreenCTM()
    const toLocal = clip?.getCTM()?.inverse()
    if (!clip || !ctm || !toLocal) return 0

    const inv = ctm.inverse()
    const toVB = (x, y) => {
        const p = svg.createSVGPoint()
        p.x = x; p.y = y
        return p.matrixTransform(inv)
    }

    const petals = []
    for (const kid of Array.from(clip.children)) {
        const path = kid.querySelector('path')
        const style = path?.getAttribute('style') || ''
        if (!PETAL_FILLS.some((f) => style.includes(f))) continue

        const r = kid.getBoundingClientRect()
        if (!r.width) continue
        const a = toVB(r.x, r.y)
        const b = toVB(r.right, r.bottom)
        const box = { x: a.x, y: a.y, w: b.x - a.x, h: b.y - a.y }

        // The fan occupies the upper middle of the artboard. This rejects the
        // small blue bird-of-paradise tucked in the top-left corner (y < 100),
        // the logo mark above it, and stray petal-coloured detail elsewhere.
        if (box.x < 60 || box.y < 100 || box.y > 320) continue
        if (box.w < 15 || box.h < 40) continue

        petals.push({ kid, cx: box.x + box.w / 2 })
    }
    if (!petals.length) return 0

    // The pivot in the petals' own coordinate space.
    const pv = svg.createSVGPoint()
    pv.x = PETAL_PIVOT.x; pv.y = PETAL_PIVOT.y
    const pivot = pv.matrixTransform(toLocal)

    // Left-to-right, so amplitude can grow outward along each side of the fan.
    petals.sort((p, q) => p.cx - q.cx)
    petals.forEach(({ kid }, i) => {
        const spin = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        spin.setAttribute('class', `lp-mpetal lp-mpetal--${i + 1}`)
        kid.parentNode.insertBefore(spin, kid)
        spin.appendChild(kid)

        // Offset of the shared pivot from this petal's own bounding box.
        const bb = spin.getBBox()
        spin.style.transformOrigin = `${pivot.x - bb.x}px ${pivot.y - bb.y}px`
    })
    return petals.length
}

const Hotspot = ({ hot, style, onActive }) => (
    <Link
        to={hot.to}
        className={`lp__hot lp__hot--${hot.id}`}
        style={style}
        aria-label={hot.label}
        onMouseEnter={onActive ? () => onActive(hot.id, true) : undefined}
        onMouseLeave={onActive ? () => onActive(hot.id, false) : undefined}
        onFocus={onActive ? () => onActive(hot.id, true) : undefined}
        onBlur={onActive ? () => onActive(hot.id, false) : undefined}
    >
        <span className="lp__sr">{hot.label}</span>
    </Link>
)

const DesktopHero = () => {
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
        <div className="lp__stage">
            <div
                ref={artRef}
                className="lp__art"
                role="img"
                aria-label="Element Farm Solutions — a regenerative farm landscape with a Bird of Paradise flower"
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />
            <nav className="lp__nav" aria-label="Primary">
                {HOTSPOTS.map((h) => (
                    <Hotspot key={h.id} hot={h} style={h.style} onActive={setActive} />
                ))}
            </nav>
        </div>
    )
}

const MobileHero = () => {
    const stageRef = useRef(null)
    const artRef = useRef(null)
    const navRef = useRef(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        let cancelled = false
        fetch('/MobileLandingPage.svg')
            .then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.status))))
            .then((text) => {
                if (cancelled || !artRef.current) return
                artRef.current.innerHTML = text
                const svg = artRef.current.querySelector('svg')
                if (svg) {
                    // Show the whole artboard — the tagline lives at its very
                    // bottom and a cover-crop cut it off on shorter viewports.
                    // The stage carries the artwork's exact aspect ratio, so
                    // this fills the width edge to edge with no letterboxing.
                    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
                    svg.removeAttribute('width')
                    svg.removeAttribute('height')
                    tagPetals(svg)
                }
                setReady(true)
            })
            .catch(() => setReady(true))
        return () => { cancelled = true }
    }, [])

    /* Map the hotspot layer onto the artwork. The stage has the artboard's
       exact ratio, so this resolves to scale(W/402) with no offset. */
    useEffect(() => {
        const stage = stageRef.current
        if (!stage) return
        const apply = () => {
            const nav = navRef.current
            if (!nav) return
            const W = stage.clientWidth
            const H = stage.clientHeight
            const s = Math.max(W / MOBILE_VB.w, H / MOBILE_VB.h)
            const ox = (W - MOBILE_VB.w * s) / 2
            const oy = (H - MOBILE_VB.h * s) / 2
            nav.style.transform = `translate(${ox}px, ${oy}px) scale(${s})`
        }
        apply()
        const ro = new ResizeObserver(apply)
        ro.observe(stage)
        return () => ro.disconnect()
    }, [ready])

    return (
        <div className="lp__stage lp__stage--mobile" ref={stageRef}>
            <div
                ref={artRef}
                className={`lp__art lp__art--mobile ${ready ? 'is-ready' : ''}`}
                role="img"
                aria-label="Element Farm Solutions — a regenerative farm landscape with a Bird of Paradise flower"
            />
            <nav
                className="lp__nav lp__nav--mobile"
                ref={navRef}
                aria-label="Primary"
                style={{ width: MOBILE_VB.w, height: MOBILE_VB.h }}
            >
                {MOBILE_HOTSPOTS.map((h) => (
                    <Hotspot
                        key={h.id}
                        hot={h}
                        style={{ left: h.x, top: h.y, width: h.w, height: h.h }}
                    />
                ))}
            </nav>
        </div>
    )
}

const HeroSection = () => {
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
    )

    useEffect(() => {
        const mq = window.matchMedia(MOBILE_QUERY)
        const onChange = (e) => setIsMobile(e.matches)
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [])

    return (
        <section className={`lp ${isMobile ? 'lp--mobile' : ''}`} aria-label="Element Farm Solutions">
            {isMobile ? <MobileHero /> : <DesktopHero />}
        </section>
    )
}

export default HeroSection

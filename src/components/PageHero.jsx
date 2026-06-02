import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import './PageHero.css'

/**
 * PageHero — editorial dark photo hero, ochre italic accent, parallax.
 *
 * Props:
 *   title:    string. Use double-underscores around the italic accent word, e.g.
 *             "Regenerating __soil__"  →  "Regenerating <em>soil</em>"
 *   subtitle: string
 *   image:    background image url (defaults to /orange-orchard.jpg)
 *   tone:     'moss' (default) | 'clay' | 'ink'  — overlay tint preset
 */

const HeadlineWord = ({ children, delay, italic, prefersReduced }) => (
    <span className="page-hero__mask">
        <motion.span
            className={`page-hero__word ${italic ? 'page-hero__word--italic' : ''}`}
            initial={prefersReduced ? false : { y: '110%', rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </motion.span>
    </span>
)

const renderTitle = (title, prefersReduced) => {
    // Split on __italic__ markers, keeping the markers' content.
    const segments = title.split(/(__[^_]+__)/g).filter(Boolean)
    let delay = 0.32
    return segments.map((seg, i) => {
        const isItalic = seg.startsWith('__') && seg.endsWith('__')
        const text = isItalic ? seg.slice(2, -2) : seg
        // Split each non-italic chunk on whitespace; italics stay whole for visual weight
        if (isItalic) {
            const node = (
                <HeadlineWord key={i} delay={delay} italic prefersReduced={prefersReduced}>
                    {text}
                </HeadlineWord>
            )
            delay += 0.14
            return node
        }
        // Plain text — split into words, each animated
        return text.split(/(\s+)/).map((chunk, j) => {
            if (/^\s+$/.test(chunk)) return chunk
            const node = (
                <HeadlineWord key={`${i}-${j}`} delay={delay} prefersReduced={prefersReduced}>
                    {chunk}
                </HeadlineWord>
            )
            delay += 0.13
            return node
        })
    })
}

const PageHero = ({
    title,
    subtitle,
    image = '/orange-orchard.jpg',
    tone = 'moss',
}) => {
    const heroRef = useRef(null)
    const prefersReduced = useReducedMotion()

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })

    const bgY     = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
    const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

    return (
        <section className={`page-hero page-hero--${tone}`} ref={heroRef}>
            <motion.div
                className="page-hero__bg"
                style={prefersReduced ? undefined : { y: bgY, scale: bgScale }}
            >
                <div
                    className="page-hero__bg-image"
                    style={{ backgroundImage: `url(${image})` }}
                />
                <div className="page-hero__bg-tint" />
                <div className="page-hero__bg-glow" />
                <div className="page-hero__bg-vignette" />
                <div className="page-hero__bg-grain" aria-hidden="true" />
            </motion.div>

            <motion.div
                className="page-hero__grid"
                style={prefersReduced ? undefined : { y: textY }}
            >
                <h1 className="page-hero__headline">
                    {renderTitle(title, prefersReduced)}
                </h1>

                {subtitle && (
                    <motion.p
                        className="page-hero__subtitle"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {subtitle}
                    </motion.p>
                )}

            </motion.div>
        </section>
    )
}

export default PageHero

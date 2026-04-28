import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionLabel from './ui/SectionLabel'
import './SoilTypesSection.css'

const soils = [
    {
        num: '01', tone: '#b5451b',
        image: '/soils/soil-01.png',
        name: 'Deep Red Apedal',
        region: 'KZN Midlands · Highveld slopes',
        note: 'Deep, well-drained red soils — some of the most productive ground in South Africa.',
        potential: 'High arable',
    },
    {
        num: '02', tone: '#c49a3c',
        image: '/soils/soil-02%20Background%20Removed.png',
        name: 'Deep Yellow & Brown',
        region: 'KZN Cane Belt',
        note: 'Yellow-brown sands and loams — easy to till, quick to leach.',
        potential: 'Good arable',
    },
    {
        num: '03', tone: '#3d2b1f',
        image: '/soils/soil-03%20Background%20Removed.png',
        name: 'Humic & Melanic',
        region: 'Drakensberg foothills',
        note: 'Dark, clay-rich, naturally fertile — prime crop and pasture ground.',
        potential: 'Very high',
    },
    {
        num: '04', tone: '#8c7355',
        image: '/soils/soil-04%20Background%20Removed.png',
        name: 'Duplex (Textural)',
        region: 'Widespread KZN',
        note: 'Sandy topsoil over dense clay — waterlogging and compaction risks.',
        potential: 'Moderate',
    },
    {
        num: '05', tone: '#7a7a7a',
        image: '/soils/soil-5%20Background%20Removed.png',
        name: 'Shallow & Rocky',
        region: 'Drakensberg escarpment',
        note: 'Thin over bedrock — suited to grazing and light forestry.',
        potential: 'Low arable',
    },
    {
        num: '06', tone: '#c8a96e',
        image: '/soils/soil-06%20Background%20Removed.png',
        name: 'Coastal & Dune Sands',
        region: 'Durban → Richards Bay',
        note: 'Leached acidic sands — responsive only to intensive management.',
        potential: 'Low natural',
    },
    {
        num: '07', tone: '#3a7d5e',
        image: '/soils/soil-07%20Background%20Removed.png',
        name: 'Hydromorphic',
        region: 'Valley bottoms · wetlands',
        note: 'Waterlogged profiles — ecologically critical, rarely cropped.',
        potential: 'Grazing only',
    },
    {
        num: '08', tone: '#8fa870',
        image: '/soils/soil-08%20Background%20Removed.png',
        name: 'Calcareous & Lime-rich',
        region: 'Northern KZN · Zululand',
        note: 'Soils with free lime or calcrete — highly variable farming potential.',
        potential: 'Variable',
    },
]

const SoilTypesSection = () => {
    const scrollerRef = useRef(null)
    const [progress, setProgress] = useState(0)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)

    useEffect(() => {
        const el = scrollerRef.current
        if (!el) return

        const onScroll = () => {
            const max = el.scrollWidth - el.clientWidth
            const p = max > 0 ? el.scrollLeft / max : 0
            setProgress(p)
            setAtStart(el.scrollLeft < 4)
            setAtEnd(el.scrollLeft >= max - 4)
        }

        onScroll()
        el.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            el.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [])

    const nudge = (dir) => {
        const el = scrollerRef.current
        if (!el) return
        const delta = el.clientWidth * 0.75 * dir
        el.scrollBy({ left: delta, behavior: 'smooth' })
    }

    return (
        <section className="soil-x" id="soils">
            <div className="soil-x__inner">
                <header className="soil-x__header">
                    <SectionLabel number="04" label="Soil Profiles" />
                    <motion.h2
                        className="soil-x__heading"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Eight soils,<br/>
                        <em>one province.</em>
                    </motion.h2>
                    <motion.p
                        className="soil-x__deck"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        KwaZulu-Natal alone holds eight distinct soil types — each with its own chemistry,
                        drainage, and history. Knowing yours is where restoration begins.
                    </motion.p>
                </header>

                <div className="soil-x__controls">
                    <div className="soil-x__progress" aria-hidden="true">
                        <span className="soil-x__progress-fill" style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }} />
                    </div>
                    <div className="soil-x__nav">
                        <button
                            type="button"
                            className="soil-x__nav-btn"
                            onClick={() => nudge(-1)}
                            disabled={atStart}
                            aria-label="Scroll left"
                        >←</button>
                        <button
                            type="button"
                            className="soil-x__nav-btn"
                            onClick={() => nudge(1)}
                            disabled={atEnd}
                            aria-label="Scroll right"
                        >→</button>
                    </div>
                </div>
            </div>

            <div className="soil-x__scroller" ref={scrollerRef}>
                <div className="soil-x__track">
                    {soils.map((soil, i) => (
                        <motion.article
                            key={soil.num}
                            className="soil-x__card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="soil-x__card-tile" style={{ '--soil-tone': soil.tone }}>
                                <span className="soil-x__card-num">{soil.num}</span>
                                <div
                                    className="soil-x__card-image"
                                    style={{ backgroundImage: `url(${soil.image})` }}
                                />
                                <span className="soil-x__card-potential">{soil.potential}</span>
                            </div>
                            <div className="soil-x__card-body">
                                <span className="soil-x__card-region">{soil.region}</span>
                                <h3 className="soil-x__card-name">{soil.name}</h3>
                                <p className="soil-x__card-note">{soil.note}</p>
                            </div>
                        </motion.article>
                    ))}

                    <aside className="soil-x__end">
                        <span className="soil-x__end-kicker">— End of index</span>
                        <p className="soil-x__end-copy">
                            Know your soil. <em>Then restore it.</em>
                        </p>
                        <Link to="/solutions/land-rejuvenation" className="soil-x__end-link">
                            <span>Explore Land Rejuvenation</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                    </aside>
                </div>
            </div>
        </section>
    )
}

export default SoilTypesSection

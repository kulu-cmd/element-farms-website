import React, { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import SectionLabel from './ui/SectionLabel'
import './ProblemSection.css'

const stats = [
    {
        value: 70,
        display: '70',
        suffix: '%',
        unit: 'of farmland',
        label: 'in South Africa shows signs of degradation — biology stripped, minerals locked, margins eroding.',
        source: 'DFFE, 2022',
    },
    {
        value: 58,
        display: '58',
        suffix: '%',
        unit: 'of farmed soil',
        label: 'contains less than 0.5% organic matter — far below the threshold for productive biological activity.',
        source: 'ARC, 2021',
    },
    {
        value: 12.6,
        display: '12.6',
        suffix: 't',
        unit: 'per ha / year',
        label: 'of fertile topsoil is lost to erosion — five times the world average of 2.4 t/ha.',
        source: 'Le Roux, 2014 · Wuepper et al., 2020',
    },
    {
        value: 46,
        display: '46',
        suffix: '%',
        unit: 'of soil carbon',
        label: 'has been lost from agricultural soils in southern Africa due to continuous conventional cultivation.',
        source: 'Swanepoel et al., 2018',
    },
]

/* ---- count-up component ---- */
const CountUp = ({ to, duration = 1.6, decimals = 0, delay = 0, isInView }) => {
    const mv = useMotionValue(0)
    const rounded = useTransform(mv, (v) => v.toFixed(decimals))
    const ref = useRef(null)

    React.useEffect(() => {
        if (!isInView) return
        const controls = animate(mv, to, {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
        })
        const unsub = rounded.on('change', (latest) => {
            if (ref.current) ref.current.textContent = latest
        })
        return () => {
            controls.stop()
            unsub()
        }
    }, [isInView, to, duration, delay, mv, rounded])

    return <span ref={ref}>0{decimals > 0 ? '.0' : ''}</span>
}

const ProblemSection = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    return (
        <section className="problem-x" id="problem" ref={sectionRef}>
            <div className="problem-x__inner">
                <div className="problem-x__header">
                    <SectionLabel label="The Problem" />
                    <motion.h2
                        className="problem-x__statement"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Modern farming has <em>mined</em> the soil.
                    </motion.h2>
                </div>

                <ol className="problem-x__index">
                    {stats.map((stat, i) => {
                        const decimals = String(stat.display).includes('.') ? 1 : 0
                        return (
                            <motion.li
                                key={stat.display}
                                className="problem-x__row"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="problem-x__row-n">0{i + 1}</span>

                                <div className="problem-x__row-figures">
                                    <span className="problem-x__row-value">
                                        <CountUp
                                            to={stat.value}
                                            decimals={decimals}
                                            delay={0.3 + i * 0.1}
                                            isInView={isInView}
                                        />
                                        <span className="problem-x__row-suffix">{stat.suffix}</span>
                                    </span>
                                    <span className="problem-x__row-unit">{stat.unit}</span>
                                </div>

                                <div className="problem-x__row-text">
                                    <p className="problem-x__row-label">{stat.label}</p>
                                    <span className="problem-x__row-source">— {stat.source}</span>
                                </div>
                            </motion.li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}

export default ProblemSection

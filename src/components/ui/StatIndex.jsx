import React, { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import './StatIndex.css'

/*
 * StatIndex — the single editorial treatment for numbers on this site.
 *
 * One row per statistic: index numeral, the figure with its unit rule, then
 * the sentence and its source. Every stat block on the site renders through
 * this so the type size, structure and rhythm never drift between pages.
 *
 * stats: [{ value, display?, prefix?, suffix?, unit, label, source }]
 */

const EASE = [0.22, 1, 0.36, 1]

const CountUp = ({ to, duration = 1.8, decimals = 0, delay = 0 }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })
    const mv = useMotionValue(0)
    const rounded = useTransform(mv, (v) => v.toFixed(decimals))

    React.useEffect(() => {
        if (!isInView) return
        const controls = animate(mv, to, { duration, delay, ease: EASE })
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

const StatIndex = ({ stats, className = '', tone = 'paper' }) => (
    <ol className={`stat-index stat-index--${tone} ${className}`.trim()}>
        {stats.map((stat, i) => {
            const display = stat.display ?? String(stat.value)
            const decimals =
                stat.decimals ?? (display.includes('.') ? display.split('.')[1].length : 0)
            const animated = typeof stat.value === 'number'

            return (
                <motion.li
                    key={`${display}-${i}`}
                    className="stat-index__row"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.75, delay: i * 0.1, ease: EASE }}
                >
                    <span className="stat-index__n">0{i + 1}</span>

                    <div className="stat-index__figures">
                        <span className="stat-index__value">
                            {stat.prefix && (
                                <span className="stat-index__prefix">{stat.prefix}</span>
                            )}
                            {animated ? (
                                <CountUp to={stat.value} decimals={decimals} delay={0.15} />
                            ) : (
                                <span>{display}</span>
                            )}
                            {stat.suffix && (
                                <span className="stat-index__suffix">{stat.suffix}</span>
                            )}
                        </span>
                        {stat.unit && <span className="stat-index__unit">{stat.unit}</span>}
                    </div>

                    <div className="stat-index__text">
                        <p className="stat-index__label">{stat.label}</p>
                        {stat.source && (
                            <span className="stat-index__source">&mdash; {stat.source}</span>
                        )}
                    </div>
                </motion.li>
            )
        })}
    </ol>
)

export default StatIndex

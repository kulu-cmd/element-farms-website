import { useEffect, useRef, useState } from 'react'

export default function useCountUp(target, { duration = 1600, start = 0, decimals = 0 } = {}) {
    const [value, setValue] = useState(start)
    const ref = useRef(null)
    const triggered = useRef(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !triggered.current) {
                    triggered.current = true
                    const startTs = performance.now()
                    const tick = (now) => {
                        const elapsed = now - startTs
                        const t = Math.min(1, elapsed / duration)
                        const eased = 1 - Math.pow(1 - t, 3)
                        const v = start + (target - start) * eased
                        setValue(decimals > 0 ? Number(v.toFixed(decimals)) : Math.round(v))
                        if (t < 1) requestAnimationFrame(tick)
                    }
                    requestAnimationFrame(tick)
                }
            })
        }, { threshold: 0.4 })
        observer.observe(el)
        return () => observer.disconnect()
    }, [target, duration, start, decimals])

    return [ref, value]
}

import React from 'react'
import { CircleDots } from './BrandMotifs'
import './SectionEyebrow.css'

const SectionEyebrow = ({
    label,
    tone = 'clay',
    size = 26,
    className = '',
}) => (
    <div className={`se se--${tone} ${className}`}>
        <CircleDots
            size={size}
            strokeWidth={9}
            ringColor={tone === 'light' ? 'rgba(241,237,228,0.6)' : 'var(--moss)'}
            dotColor={tone === 'light' ? 'rgba(241,237,228,0.9)' : 'var(--clay)'}
        />
        <span className="se__label">{label}</span>
    </div>
)

export default SectionEyebrow

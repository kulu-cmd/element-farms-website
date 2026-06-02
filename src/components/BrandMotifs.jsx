import React from 'react'

/**
 * BrandMotifs — decorative SVG marks taken from the Element Farm Solutions
 * logo so we can echo brand shapes throughout the site.
 *
 * Both components accept `size`, `className`, and any other svg props
 * (e.g. style for opacity or rotation overrides).
 */

/* The 4-dot circle — green ring with four orange dots at NSEW. */
export const CircleDots = ({
    size = 48,
    ringColor = 'var(--moss)',
    dotColor = 'var(--clay)',
    strokeWidth = 6,
    className = '',
    ...rest
}) => (
    <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`brand-motif brand-motif--circle ${className}`}
        aria-hidden="true"
        focusable="false"
        {...rest}
    >
        <circle cx="50" cy="50" r="34" fill="none" stroke={ringColor} strokeWidth={strokeWidth} />
        <circle cx="50" cy="16" r="7" fill={dotColor} />
        <circle cx="84" cy="50" r="7" fill={dotColor} />
        <circle cx="50" cy="84" r="7" fill={dotColor} />
        <circle cx="16" cy="50" r="7" fill={dotColor} />
    </svg>
)

/* The argyle diamond — overlapping diamonds with crossed lines, drawn in
   a soft tan that reads as a watermark over light backgrounds. */
export const ArgyleDiamond = ({
    size = 56,
    color = 'rgba(193, 158, 100, 0.55)',
    strokeWidth = 3,
    className = '',
    ...rest
}) => (
    <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`brand-motif brand-motif--diamond ${className}`}
        aria-hidden="true"
        focusable="false"
        {...rest}
    >
        <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="miter">
            {/* Outer diamond */}
            <path d="M50 6 L94 50 L50 94 L6 50 Z" />
            {/* Inner diamond — slightly inset to create the argyle plaid feel */}
            <path d="M50 18 L82 50 L50 82 L18 50 Z" />
            {/* Crossed lines through the centre */}
            <path d="M14 50 L86 50" />
            <path d="M50 14 L50 86" />
        </g>
    </svg>
)

export default { CircleDots, ArgyleDiamond }

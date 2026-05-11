import React from 'react'
import EnquiryButton from './ui/EnquiryButton'
import './MTerraBoostSection.css'

const APPLICATIONS = [
    {
        n: '01',
        title: 'Around the root zone',
        body: 'Sprinkle a handful of granules at the drip line of each tree, vine, or row crop. Work lightly into the topsoil and water in.',
    },
    {
        n: '02',
        title: 'Broadcast & incorporate',
        body: 'Pre-plant, spread evenly over the bed at 200–400 kg/ha and till into the top 15 cm so minerals sit where roots forage.',
    },
    {
        n: '03',
        title: 'Banded under rows',
        body: 'Apply in a narrow band beneath orchard rows or vine lines, then cover with 5 cm of soil before planting or replanting.',
    },
]

const BENEFITS = [
    {
        symbol: 'Si',
        title: 'Strengthens cell walls',
        body: 'Silica drives drought and disease resistance, lifts water-use efficiency.',
    },
    {
        symbol: 'Ca',
        title: 'Builds root architecture',
        body: 'Calcium reduces soil acidity and unlocks micronutrient uptake.',
    },
    {
        symbol: 'Mg',
        title: 'Powers photosynthesis',
        body: 'Magnesium and sulphur drive chlorophyll production and nitrogen efficiency.',
    },
    {
        symbol: 'NPK',
        title: 'Lowers fertiliser load',
        body: 'The minerals do the work NPK was masking — fewer inputs, stronger response.',
    },
]

const MTerraBoostSection = () => {
    return (
        <section className="mtb" id="mterra-detail">
            <div className="mtb__inner">

                <div className="mtb__product">

                    <div className="mtb__media">
                        <figure className="mtb__photo">
                            <img
                                src="/land_rejuv/M-Terraboost.png"
                                alt="M-TerraBoost — slow-release mineral blend"
                                loading="lazy"
                            />
                        </figure>

                        <svg className="mtb__seal" viewBox="0 0 160 160" aria-hidden="true">
                            <defs>
                                <path
                                    id="mtb-seal-path"
                                    d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                                />
                                <filter id="mtb-seal-grunge" x="-10%" y="-10%" width="120%" height="120%">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
                                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" />
                                    <feComposite in2="noise" operator="in" />
                                </filter>
                                <filter id="mtb-seal-bleed" x="-5%" y="-5%" width="110%" height="110%">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.35" />
                                </filter>
                            </defs>

                            {/* Outer scalloped ring — gives the stamp its postmark feel */}
                            <g filter="url(#mtb-seal-grunge)">
                                <circle cx="80" cy="80" r="74" className="mtb__seal-ring mtb__seal-ring--outer" />
                                <circle cx="80" cy="80" r="68" className="mtb__seal-ring mtb__seal-ring--mid" />
                                <circle cx="80" cy="80" r="54" className="mtb__seal-ring mtb__seal-ring--inner" />

                                <text className="mtb__seal-text" filter="url(#mtb-seal-bleed)">
                                    <textPath href="#mtb-seal-path" startOffset="0">
                                        100% NATURAL · MINERAL BLEND · NO SYNTHETICS ·
                                    </textPath>
                                </text>

                                <g className="mtb__seal-mark">
                                    <path d="M80 56 L92 80 L80 104 L68 80 Z" />
                                    <circle cx="80" cy="80" r="5" />
                                </g>
                            </g>
                        </svg>
                    </div>

                    <div className="mtb__product-copy">
                        <div className="mtb__tags">
                            <span className="mtb__product-tag">Mineral Blend</span>
                            <span className="mtb__product-tag">Highly Suitable for South African Soils</span>
                        </div>

                        <h3 className="mtb__product-name">M-TerraBoost</h3>

                        <p className="mtb__lede">
                            A granular mineral blend formulated for the leached, acidic,
                            mineral-poor soils that dominate South African farmland.
                            Slow-release silica, calcium, magnesium and sulphur, in forms
                            roots can actually absorb <em>to put back what decades of NPK
                            has stripped out.</em>
                        </p>

                        <div className="mtb__deficiency">
                            <span className="mtb__deficiency-eyebrow">Targets South Africa's most common deficiencies</span>
                            <p className="mtb__deficiency-body">
                                Calcium, magnesium and sulphur are three of the most widely
                                depleted minerals across South Africa's acidic, leached
                                soils. M-TerraBoost replaces all three and adds plant-available
                                silica for crop resilience.
                            </p>
                            <ul className="mtb__minerals" aria-label="Minerals included">
                                <li><span>Ca</span>Calcium</li>
                                <li><span>Mg</span>Magnesium</li>
                                <li><span>S</span>Sulphur</li>
                                <li><span>Si</span>Silica</li>
                            </ul>
                        </div>

                        <div className="mtb__how">
                            <span className="mtb__section-eyebrow">How to apply</span>
                            <ol className="mtb__steps">
                                {APPLICATIONS.map((a) => (
                                    <li key={a.n} className="mtb__step">
                                        <span className="mtb__step-num">{a.n}</span>
                                        <div className="mtb__step-body">
                                            <h4 className="mtb__step-title">{a.title}</h4>
                                            <p>{a.body}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="mtb__benefits">
                            <span className="mtb__section-eyebrow">What it does in the soil</span>
                            <ul className="mtb__benefits-grid">
                                {BENEFITS.map((b, i) => (
                                    <li key={b.title} className="mtb__benefit">
                                        <span className="mtb__benefit-num">{String(i + 1).padStart(2, '0')}</span>
                                        <span className="mtb__benefit-symbol" aria-hidden="true">{b.symbol}</span>
                                        <h4 className="mtb__benefit-title">{b.title}</h4>
                                        <p className="mtb__benefit-body">{b.body}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <EnquiryButton product="M-TerraBoost" tone="moss" />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default MTerraBoostSection

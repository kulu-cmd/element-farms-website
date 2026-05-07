import React from 'react'
import './MTerraBoostSection.css'

const MTerraBoostSection = () => {
    return (
        <section className="mtb" id="mterra-detail">
            <div className="mtb__inner">

                <div className="mtb__product">
                    <figure className="mtb__photo">
                        <img
                            src="/land_rejuv/M-Terraboost.png"
                            alt="M-TerraBoost — slow-release mineral blend"
                            loading="lazy"
                        />
                    </figure>
                    <div className="mtb__product-copy">
                        <span className="mtb__product-tag">Mineral Blend · Pre-plant &amp; Banded</span>
                        <h3 className="mtb__product-name">M-TerraBoost</h3>
                        <p>
                            Apply pre-plant, band under orchards, or mix into nursery media — the
                            application meets the operation. Slow-release granules release silica,
                            calcium, magnesium and sulphur at the rate roots can absorb them, so
                            none is leached and none is wasted.
                        </p>
                        <ul className="mtb__list">
                            <li>
                                <strong>Strengthens cell walls.</strong> Silica drives drought and
                                disease resistance, lifts water-use efficiency.
                            </li>
                            <li>
                                <strong>Builds root architecture.</strong> Calcium reduces soil
                                acidity and unlocks micronutrient uptake.
                            </li>
                            <li>
                                <strong>Powers photosynthesis.</strong> Magnesium and sulphur drive
                                chlorophyll production and nitrogen efficiency.
                            </li>
                            <li>
                                <strong>Lowers fertiliser load.</strong> The minerals do the work
                                NPK was masking — fewer inputs, stronger response.
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default MTerraBoostSection

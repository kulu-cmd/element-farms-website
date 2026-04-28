import React from 'react'
import ProblemSection from './ProblemSection'
import KZNMapSection from './KZNMapSection'
import TailoredSolutionSection from './TailoredSolutionSection'
import VideoSection from './VideoSection'
import WhatToExpectSection from './WhatToExpectSection'
import Footer from './Footer'
import Header from './Header'
import PageHero from './PageHero'
import './LandRejuvenationPage.css'

const LandRejuvenationPage = () => {
    return (
        <div className="land-regen">
            <Header />

            <PageHero
                eyebrow="Solutions / Land"
                title="Land __Rejuvenation__"
                subtitle="We teach and implement highly effective regenerative farming systems to small and medium-sized farms. Our goal is to empower farmers and not rely on large corporation supply chains of expensive chemical fertiliser."
                note="Field data, KZN. 2023 — 2026."
                tone="moss"
            />

            {/* Problem (trimmed copy) */}
            <ProblemSection />

            {/* KZN map below problem */}
            <KZNMapSection />

            {/* Tailored Solution: 2 features + nursery reveal */}
            <TailoredSolutionSection />

            {/* Video */}
            <VideoSection />

            {/* What to Expect */}
            <WhatToExpectSection />

            <Footer />
        </div>
    )
}

export default LandRejuvenationPage

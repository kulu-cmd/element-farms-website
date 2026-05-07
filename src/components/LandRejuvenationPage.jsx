import React from 'react'
import ProblemSection from './ProblemSection'
import KZNMapSection from './KZNMapSection'
import TailoredSolutionSection from './TailoredSolutionSection'
import VideoSection from './VideoSection'
import WhatToExpectSection from './WhatToExpectSection'
import FAQSection from './FAQSection'
import CTABand from './CTABand'
import Footer from './Footer'
import Header from './Header'
import PageHero from './PageHero'
import './LandRejuvenationPage.css'

const LandRejuvenationPage = () => {
    return (
        <div className="land-regen">
            <Header />

            <PageHero
                title="Land __Rejuvenation__"
                subtitle="Regenerative farming systems for small and medium-sized farms — empowering growers to step off the expensive chemical fertiliser supply chain."
                tone="moss"
            />

            {/* Problem (trimmed copy) */}
            <ProblemSection />

            {/* KZN map below problem */}
            <KZNMapSection />

            {/* Soil doesn't recover overnight — timeline */}
            <WhatToExpectSection />

            {/* Tailored Solution: 2 features + nursery reveal */}
            <TailoredSolutionSection />

            {/* Video */}
            <VideoSection />

            {/* FAQs */}
            <FAQSection />

            {/* CTA before footer */}
            <CTABand
                heading="Book a farm assessment."
                subtext="We walk your fields, read your soil tests, and design a regenerative system built around your specific land — no generic prescriptions."
                primaryLabel="Book an assessment"
                primaryTo="/contact/agri-farms"
                secondaryLabel="Learn about our process"
                secondaryTo="/#about-us"
                tone="moss"
            />

            <Footer />
        </div>
    )
}

export default LandRejuvenationPage

import React from 'react'
import Header from './Header'
import MissionSection from './MissionSection'
import CTABand from './CTABand'
import Footer from './Footer'

const AboutUsPage = () => {
  return (
    <div className="app about-us-page compact-header">
      <Header />
      <main>
        <MissionSection />
        <CTABand
          heading={<>Ready to <em>regenerate</em><br />your land?</>}
          subtext="Start with a no-obligation farm assessment."
          primaryLabel="Start a farm trial"
          primaryTo="https://docs.google.com/forms/d/18f14G-hCciPDNnAgy9ITvT8iedrzmZ5K3zb37G_ca5Q/edit"
          secondaryLabel="Talk to us first"
          secondaryTo="/contact/agri-farms"
          tone="moss"
        />
      </main>
      <Footer />
    </div>
  )
}

export default AboutUsPage

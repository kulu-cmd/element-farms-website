import React from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import ErosionRiskSection from './components/ErosionRiskSection'
import OurApproachSection from './components/OurApproachSection'
import ResultsSection from './components/ResultsSection'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import './App.css'

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <HeroSection />
                <StatsSection />
                <ErosionRiskSection />
                <OurApproachSection />
                <ResultsSection />
                <CallToAction />
            </main>
            <Footer />
        </div>
    )
}

export default App

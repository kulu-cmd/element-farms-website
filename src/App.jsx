import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import OurApproachSection from './components/OurApproachSection'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import LandRejuvenationPage from './components/LandRejuvenationPage'
import UVProtectionPage from './components/UVProtectionPage'
import './App.css'

function HomePage() {
    return (
        <div className="app">
            <Header />
            <main>
                <HeroSection />
                <OurApproachSection />
                <CallToAction />
            </main>
            <Footer />
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/solutions/land-rejuvenation" element={<LandRejuvenationPage />} />
                <Route path="/solutions/uv-protection" element={<UVProtectionPage />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

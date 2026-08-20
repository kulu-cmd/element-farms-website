import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import MissionSection from './components/MissionSection'
import SoilTypesSection from './components/SoilTypesSection'
import OurApproachSection from './components/OurApproachSection'
import CTABand from './components/CTABand'
import Footer from './components/Footer'
import LandRejuvenationPage from './components/LandRejuvenationPage'
import UVProtectionPage from './components/UVProtectionPage'
import AntiFloodingPage from './components/AntiFloodingPage'
import PoultryPage from './components/PoultryPage'
import ContactPage from './components/ContactPage'
import OrganicFarmingPage from './components/OrganicFarmingPage'
import EducationPage from './components/EducationPage'
import ArticlePage from './components/ArticlePage'
import CropFitApp from './cropfit/CropFitApp'
import CropFitPlanView from './cropfit/CropFitPlanView'
import AboutUsPage from './components/AboutUsPage'
import OurSolutionsPage from './components/OurSolutionsPage'
import './App.css'

function HomePage() {
    return (
        <div className="app">
            <main>
                <HeroSection />
            </main>
        </div>
    )
}

function ScrollToTop() {
    const { pathname, hash } = useLocation()
    useEffect(() => {
        if (hash) return
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, [pathname, hash])
    return null
}

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/solutions" element={<OurSolutionsPage />} />
                <Route path="/solutions/land-rejuvenation" element={<LandRejuvenationPage />} />
                <Route path="/solutions/uv-protection" element={<UVProtectionPage />} />
                <Route path="/solutions/anti-flooding" element={<AntiFloodingPage />} />
                <Route path="/solutions/poultry" element={<PoultryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/contact/:type" element={<ContactPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/education/:slug" element={<ArticlePage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/cropfit" element={<CropFitApp />} />
                <Route path="/cropfit/plan/:id" element={<CropFitPlanView />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

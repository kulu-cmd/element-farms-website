import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import './App.css'

function HomePage() {
    return (
        <div className="app">
            <Header />
            <main>
                <HeroSection />
                <MissionSection />
                <OurApproachSection />
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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/solutions/land-rejuvenation" element={<LandRejuvenationPage />} />
                <Route path="/solutions/uv-protection" element={<UVProtectionPage />} />
                <Route path="/solutions/anti-flooding" element={<AntiFloodingPage />} />
                <Route path="/solutions/poultry" element={<PoultryPage />} />
                <Route path="/contact/agri-farms" element={<ContactPage type="agri-farms" />} />
                <Route path="/contact/dairy-horses" element={<ContactPage type="dairy-horses" />} />
                <Route path="/contact/poultry" element={<ContactPage type="poultry" />} />
                <Route path="/contact/poultry-dairy" element={<ContactPage type="dairy-horses" />} />
                <Route path="/contact/organic" element={<OrganicFarmingPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/education/:slug" element={<ArticlePage />} />
                <Route path="/cropfit" element={<CropFitApp />} />
                <Route path="/cropfit/plan/:id" element={<CropFitPlanView />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

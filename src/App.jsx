import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import MissionSection from './components/MissionSection'
import SoilTypesSection from './components/SoilTypesSection'
import OurApproachSection from './components/OurApproachSection'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import LandRejuvenationPage from './components/LandRejuvenationPage'
import UVProtectionPage from './components/UVProtectionPage'
import AntiFloodingPage from './components/AntiFloodingPage'
import WasteManagementPage from './components/WasteManagementPage'
import PoultryPage from './components/PoultryPage'
import ContactPage from './components/ContactPage'
import OrganicFarmingPage from './components/OrganicFarmingPage'
import './App.css'

function HomePage() {
    return (
        <div className="app">
            <Header />
            <main>
                <HeroSection />
                <MissionSection />
                <SoilTypesSection />
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
                <Route path="/solutions/anti-flooding" element={<AntiFloodingPage />} />
                <Route path="/solutions/waste-management" element={<WasteManagementPage />} />
                <Route path="/solutions/poultry" element={<PoultryPage />} />
                <Route path="/contact/poultry-dairy" element={<ContactPage type="poultry-dairy" />} />
                <Route path="/contact/agri-farms" element={<ContactPage type="agri-farms" />} />
                <Route path="/contact/organic" element={<OrganicFarmingPage />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

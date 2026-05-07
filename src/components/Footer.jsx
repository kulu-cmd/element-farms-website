import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const year = new Date().getFullYear()

const Footer = () => {
    return (
        <footer className="footer-x">
            <div className="footer-x__inner">
                <div className="footer-x__brand">
                    <img
                        className="footer-x__logo"
                        src="/Element Farm Solutions_Final_Logo_Side_PNG.png"
                        alt="Element Farm Solutions"
                    />
                    <span className="footer-x__tagline">
                        Regenerating soil.<br/>Restoring profitability.
                    </span>
                </div>

                <nav className="footer-x__cols" aria-label="Footer">
                    <div className="footer-x__col">
                        <h4 className="footer-x__heading">— Solutions</h4>
                        <ul className="footer-x__list">
                            <li><Link to="/solutions/land-rejuvenation">Land Rejuvenation</Link></li>
                            <li><Link to="/solutions/anti-flooding">Anti-Flooding</Link></li>
                            <li><Link to="/solutions/uv-protection">UV & Pest Shield</Link></li>
                            <li><Link to="/solutions/poultry">Poultry Solutions</Link></li>
                        </ul>
                    </div>

                    <div className="footer-x__col">
                        <h4 className="footer-x__heading">— Resources</h4>
                        <ul className="footer-x__list">
                            <li><Link to="/education">Education</Link></li>
                            <li><Link to="/cropfit">CropFit</Link></li>
                            <li><Link to="/contact/agri-farms">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-x__col">
                        <h4 className="footer-x__heading">— Get in Touch</h4>
                        <ul className="footer-x__list footer-x__list--contact">
                            <li>
                                <span className="footer-x__label">Write</span>
                                <a href="mailto:kamil@elementfarmsolutions.co.za">kamil@elementfarmsolutions.co.za</a>
                            </li>
                            <li>
                                <span className="footer-x__label">Call</span>
                                <a href="tel:+27613889339">+27 61 388 9339</a>
                            </li>
                            <li>
                                <span className="footer-x__label">Located</span>
                                <span>KwaZulu-Natal, South Africa</span>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className="footer-x__colophon">
                <span>© {year} Element Farm Solutions</span>
                <span className="footer-x__colophon-rule" />
                <span>Regenerative Agriculture · South Africa</span>
                <span className="footer-x__colophon-rule" />
                <span><em>Soil is a long-term asset.</em></span>
            </div>
        </footer>
    )
}

export default Footer

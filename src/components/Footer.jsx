import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__col footer__col--brand">
                    <img
                        src="/Element Farm Solutions_Final_Logo_Side_PNG.png"
                        alt="Element Farm Solutions Logo"
                        className="footer__logo"
                    />
                </div>
                
                <div className="footer__col">
                    <h4 className="footer__heading">Solutions</h4>
                    <ul className="footer__links">
                        <li><Link to="/solutions/land-rejuvenation">Land Rejuvenation</Link></li>
                        <li><Link to="/solutions/land-rejuvenation">Anti-Flooding Systems</Link></li>
                        <li><a href="#contact-us">Nursery Support</a></li>
                        <li><Link to="/solutions/uv-protection">Pest &amp; Sunburn</Link></li>
                        <li><a href="#contact-us">Poultry</a></li>
                        <li><a href="#contact-us">Dairy &amp; Cattle</a></li>
                    </ul>
                </div>

                <div className="footer__col">
                    <h4 className="footer__heading">Resources</h4>
                    <ul className="footer__links">
                        <li><a href="#contact-us">Farmer Education</a></li>
                        <li><a href="#contact-us">Contact for Trials</a></li>
                    </ul>
                </div>

                <div className="footer__col">
                    <h4 className="footer__heading">Get In Touch</h4>
                    <ul className="footer__contact">
                        <li className="footer__contact-item">
                            <span className="footer__icon">📍</span> South Africa
                        </li>
                        <li className="footer__contact-item">
                            <span className="footer__icon">✉️</span> <a href="mailto:kamil@elementfarmsolutions.co.za">kamil@elementfarmsolutions.co.za</a>
                        </li>
                        <li className="footer__contact-item">
                            <span className="footer__icon">📞</span> <a href="tel:+27613889339">061 388 9339</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer

import React from 'react'
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
                    <p className="footer__description">
                        Empowering South African Farmers with regenerative solutions for healthier soil, sustainable livestock management and responsible waste recycling.
                    </p>
                </div>
                
                <div className="footer__col">
                    <h4 className="footer__heading">Solutions</h4>
                    <ul className="footer__links">
                        <li><a href="#">Land Rejuvination</a></li>
                        <li><a href="#">Anti-Flooding Systems</a></li>
                        <li><a href="#">Nursery Support</a></li>
                        <li><a href="#">Pest & Sunburn</a></li>
                        <li><a href="#">Poultry</a></li>
                        <li><a href="#">Dairy & Cattle</a></li>
                    </ul>
                </div>

                <div className="footer__col">
                    <h4 className="footer__heading">Resources</h4>
                    <ul className="footer__links">
                        <li><a href="#">Farmer Education</a></li>
                        <li><a href="#">Contact for Trials</a></li>
                    </ul>
                </div>

                <div className="footer__col">
                    <h4 className="footer__heading">Get In Touch</h4>
                    <ul className="footer__contact">
                        <li className="footer__contact-item">
                            <span className="footer__icon">📍</span> South Africa
                        </li>
                        <li className="footer__contact-item">
                            <span className="footer__icon">✉️</span> info@elementfarm.co.za
                        </li>
                        <li className="footer__contact-item">
                            <span className="footer__icon">📞</span> +27 (0) 12 345 6789
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer

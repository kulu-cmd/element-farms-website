import React from 'react'
import { Link } from 'react-router-dom'
import './CallToAction.css'

const CallToAction = () => {
    return (
        <section className="cta" id="contact-us">
            <div className="cta__container">
                <h2 className="cta__heading">
                    Every challenge is unique.<br />
                    Let's talk about yours.
                </h2>
                
                <div className="cta__buttons-wrapper">
                    <a 
                        href="https://docs.google.com/forms/d/18f14G-hCciPDNnAgy9ITvT8iedrzmZ5K3zb37G_ca5Q/edit" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cta__button"
                        style={{ display: 'inline-block', textDecoration: 'none' }}
                    >
                        CONTACT US FOR TRIALS
                    </a>
                    <Link
                        to="/solutions/land-rejuvenation"
                        className="cta__button"
                        style={{ display: 'inline-block', textDecoration: 'none' }}
                    >
                        BROWSE SOLUTIONS
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CallToAction

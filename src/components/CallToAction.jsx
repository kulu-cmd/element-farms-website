import React from 'react'
import { motion } from 'framer-motion'
import './CallToAction.css'

const CallToAction = () => {
    return (
        <section className="cta">
            <div className="cta__container">
                <p className="cta__pre-heading">Element Farm Solutions</p>
                
                <h2 className="cta__heading">
                    Every challenge is unique.<br />
                    Let's talk about yours.
                </h2>
                
                <p className="cta__description">
                    If you are interested in managing your waste or trailing our products for your<br />
                    soil, we'd love to hear from you. Our team of specialists will work with you to<br />
                    design a customised solution for your farm.
                </p>

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
                    <button className="cta__button">BROWSE SOLUTIONS</button>
                </div>
            </div>
        </section>
    )
}

export default CallToAction

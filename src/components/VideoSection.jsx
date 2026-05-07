import React from 'react'
import { motion } from 'framer-motion'
import './VideoSection.css'

const VideoSection = () => {
    return (
        <motion.section
            className="video-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="video-section__inner">
                <h2 className="video-section__heading">Why Land Rejuvenation Matters</h2>
                <p className="video-section__subtitle">
                    Hear directly from our team about the importance of regenerative farming and what
                    decades of chemical dependence have done to our soil.
                </p>

                <div className="video-section__placeholder">
                    <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="28" cy="28" r="26" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
                        <polygon points="22,18 42,28 22,38" fill="rgba(255,255,255,0.6)"/>
                    </svg>
<span className="video-section__subtext">
                        A short talk on the importance of land rejuvenation and what chemicals have done
                        to our soil.
                    </span>
                </div>
            </div>
        </motion.section>
    )
}

export default VideoSection

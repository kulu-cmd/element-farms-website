import React from 'react'
import { motion } from 'framer-motion'
import './VideoSection.css'

const VideoSection = () => {
  return (
    <section className="vid-x">
      <div className="vid-x__inner">

        {/* LEFT — editorial copy */}
        <motion.div
          className="vid-x__copy"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="vid-x__eyebrow">— Why It Matters</span>

          <h2 className="vid-x__heading">
            The case for <em>soil&#8209;first</em><br /> farming.
          </h2>

          <p className="vid-x__body">
            Hear directly from our team about the true cost of chemical
            dependence — and what a regenerative transition looks like on
            a working South African farm.
          </p>

          <div className="vid-x__rule" aria-hidden="true" />
        </motion.div>

        {/* RIGHT — video frame */}
        <motion.div
          className="vid-x__frame-wrap"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <figure className="vid-x__frame">
            {/* Bracket corners */}
            <span className="vid-x__corner vid-x__corner--tl" aria-hidden="true" />
            <span className="vid-x__corner vid-x__corner--tr" aria-hidden="true" />
            <span className="vid-x__corner vid-x__corner--bl" aria-hidden="true" />
            <span className="vid-x__corner vid-x__corner--br" aria-hidden="true" />

            {/* Background texture */}
            <div className="vid-x__frame-bg" aria-hidden="true" />

            {/* Play button */}
            <button className="vid-x__play" type="button" aria-label="Play video — regenerative farming talk">
              <span className="vid-x__play-ring" aria-hidden="true" />
              <svg className="vid-x__play-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <polygon points="18,13 38,24 18,35" fill="currentColor" />
              </svg>
            </button>

            <figcaption className="vid-x__frame-caption">
              <span>Watch the talk</span>
              <span className="vid-x__frame-arrow" aria-hidden="true">→</span>
            </figcaption>
          </figure>
        </motion.div>

      </div>
    </section>
  )
}

export default VideoSection

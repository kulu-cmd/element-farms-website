import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './WhatsAppWidget.css'

const WA_NUMBER = '27613889339'
const WA_DEFAULT_MSG = "Hi Kamil, I'd like to find out more about Element Farm Solutions."

const WhatsAppWidget = () => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState(WA_DEFAULT_MSG)

    const handleOpen = () => {
        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className="wa-widget">
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="wa-widget__card"
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Card header */}
                        <div className="wa-widget__header">
                            <div className="wa-widget__avatar" aria-hidden="true">
                                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="20" fill="#0e5a36"/>
                                    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fill="#f7f5f0" fontFamily="Montserrat, sans-serif" fontWeight="600">K</text>
                                </svg>
                                <span className="wa-widget__online-dot" aria-label="Online" />
                            </div>
                            <div className="wa-widget__header-text">
                                <span className="wa-widget__name">Kamil</span>
                                <span className="wa-widget__status">Element Farm Solutions · Online</span>
                            </div>
                            <button
                                className="wa-widget__close"
                                onClick={() => setOpen(false)}
                                aria-label="Close WhatsApp chat"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Greeting bubble */}
                        <div className="wa-widget__body">
                            <div className="wa-widget__bubble wa-widget__bubble--in">
                                <p>Hi there 👋</p>
                                <p>How can we help? Send us a message and we'll get back to you as soon as possible.</p>
                                <span className="wa-widget__time">Element Farm Solutions</span>
                            </div>
                        </div>

                        {/* Message input */}
                        <div className="wa-widget__compose">
                            <textarea
                                className="wa-widget__input"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                rows={2}
                                aria-label="Your WhatsApp message"
                            />
                            <button
                                className="wa-widget__send"
                                onClick={handleOpen}
                                aria-label="Open in WhatsApp"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.526 5.849L.057 23.07a.75.75 0 0 0 .921.921l5.221-1.47A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.954 9.954 0 0 1-5.09-1.394l-.364-.217-3.773 1.062 1.062-3.773-.217-.364A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                                </svg>
                                <span>Open in WhatsApp</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB trigger */}
            <motion.button
                className={`wa-widget__fab ${open ? 'wa-widget__fab--open' : ''}`}
                onClick={() => setOpen(prev => !prev)}
                aria-label={open ? 'Close WhatsApp chat' : 'Chat on WhatsApp'}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.span
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="wa-widget__fab-icon"
                        >
                            ✕
                        </motion.span>
                    ) : (
                        <motion.span
                            key="wa"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                            className="wa-widget__fab-icon"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.526 5.849L.057 23.07a.75.75 0 0 0 .921.921l5.221-1.47A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.954 9.954 0 0 1-5.09-1.394l-.364-.217-3.773 1.062 1.062-3.773-.217-.364A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                            </svg>
                        </motion.span>
                    )}
                </AnimatePresence>
                {!open && <span className="wa-widget__pulse" aria-hidden="true" />}
            </motion.button>
        </div>
    )
}

export default WhatsAppWidget

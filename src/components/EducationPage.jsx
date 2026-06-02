import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import PageHero from './PageHero'
import SoilTypesSection from './SoilTypesSection'
import { articles } from '../data/articlesData'
import './EducationPage.css'

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const EducationPage = () => {
  return (
    <div className="education">
      <Header />

      <PageHero
        title="Education & __Resources__"
        subtitle="Science-grounded articles on soil health, root biology, and regenerative farming — written for farmers who want to make better decisions about their land."
        tone="ink"
      />

      {/* Article Grid */}
      <section className="education__grid-section">
        <div className="education__grid">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants}
            >
              <Link
                to={`/education/${article.slug}`}
                className="education__card"
                aria-label={`Read article: ${article.title}`}
              >
                {/* Thumbnail */}
                <div
                  className="education__card-thumb"
                  style={{
                    background: `linear-gradient(135deg, ${article.thumbnail.gradient[0]}, ${article.thumbnail.gradient[1]})`,
                  }}
                >
                  <span className="education__card-category">{article.category}</span>
                  <span className="education__card-thumb-icon" role="img" aria-label={article.category}>
                    {article.thumbnail.icon}
                  </span>
                </div>

                {/* Body */}
                <div className="education__card-body">
                  <div className="education__card-title">{article.title}</div>
                  <p className="education__card-excerpt">{article.excerpt}</p>
                  <div className="education__card-meta">
                    <span>{article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                  <span className="education__card-cta">
                    Read Article <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Soil Profiles — moved from home page */}
      <SoilTypesSection />

      <Footer />
    </div>
  )
}

export default EducationPage

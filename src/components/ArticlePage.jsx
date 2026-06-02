import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { articles } from '../data/articlesData'
import { articleContents } from '../data/articleContents'
import Header from './Header'
import Footer from './Footer'
import './ArticlePage.css'

/* ─── Block renderer ─── */
const renderBlock = (block, i) => {
  switch (block.type) {
    case 'h2':
      return <h2 key={i}>{block.text}</h2>

    case 'h3':
      return <h3 key={i}>{block.text}</h3>

    case 'p':
      return <p key={i}>{block.text}</p>

    case 'bold-p':
      return (
        <p key={i}>
          <strong>{block.text}</strong>
        </p>
      )

    case 'ul':
      return (
        <ul key={i}>
          {(block.items || []).map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      )

    case 'ol':
      return (
        <ol key={i}>
          {(block.items || []).map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ol>
      )

    case 'callout':
      return (
        <div key={i} className="article-page__callout">
          {block.text}
        </div>
      )

    case 'image':
      return (
        <figure key={i} className="article-page__figure">
          <img
            src={block.src}
            alt={block.alt || ''}
            className="article-page__img"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="article-page__caption">{block.caption}</figcaption>
          )}
        </figure>
      )

    case 'references':
      return (
        <div key={i} className="article-page__references">
          <h2>References</h2>
          <ol>
            {(block.items || []).map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ol>
        </div>
      )

    default:
      return null
  }
}

/* ─── Component ─── */
const ArticlePage = () => {
  const { slug } = useParams()
  const meta = articles.find((a) => a.slug === slug)
  const content = articleContents?.[slug] || []

  /* Article not found */
  if (!meta) {
    return (
      <div className="article-page">
        <Header />
        <div className="article-page__not-found">
          <h1>Article not found</h1>
          <p>We couldn't find the article you were looking for.</p>
          <Link to="/education" className="article-page__back-link">
            ← Back to Education &amp; Resources
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const heroGradient = `linear-gradient(135deg, ${meta.thumbnail.gradient[0]} 0%, ${meta.thumbnail.gradient[1]} 100%)`

  /* Related articles — up to 3, excluding current */
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3)

  return (
    <div className="article-page">
      <Header />

      {/* Hero */}
      <div className="article-page__hero" style={{ background: heroGradient }}>
        <motion.div
          className="article-page__hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="article-page__category">{meta.category}</span>
          <h1 className="article-page__title">{meta.title}</h1>
          <div className="article-page__meta">
            {meta.readTime} &middot; {meta.date}
          </div>
        </motion.div>
      </div>

      {/* Body + Sidebar */}
      <div className="article-page__layout">
        <motion.article
          className="article-page__body"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          {content.map((block, i) => renderBlock(block, i))}
        </motion.article>

        <aside className="article-page__sidebar">
          <h3>More Articles</h3>
          {related.map((rel) => (
            <Link
              key={rel.id}
              to={`/education/${rel.slug}`}
              className="article-page__sidebar-card"
            >
              <span className="article-page__sidebar-card-cat">{rel.category}</span>
              <span className="article-page__sidebar-card-title">{rel.title}</span>
            </Link>
          ))}
        </aside>
      </div>

      {/* CTA Strip */}
      <div className="article-page__cta-strip">
        <h2>Want to improve your soil's biology?</h2>
        <p>
          We work with farms across South Africa to assess soil health and build a practical
          vermicompost and biological fertility plan.
        </p>
        <Link to="/contact/agri-farms" className="article-page__cta-btn">
          Book a Soil Consultation
        </Link>
      </div>

      <Footer />
    </div>
  )
}

export default ArticlePage

import React, { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SOLUTION_TABS } from '../data/solutionsData'
import './SolutionsTabs.css'

/*
 * Persistent navigation for the Solutions section.
 *
 * Rendered on /solutions and on all four solution pages, directly beneath the
 * page hero. Each tab routes to a real page — nothing is swapped inline — so
 * every solution keeps its own shareable URL. The bar pins below the fixed
 * header on scroll, and the active tab is scrolled into view on mount so the
 * current solution is always visible on narrow screens.
 */
const SolutionsTabs = () => {
    const listRef = useRef(null)
    const { pathname } = useLocation()

    useEffect(() => {
        const active = listRef.current?.querySelector('.sol-tabs__tab.is-active')
        // inline: 'nearest' keeps the page from scrolling vertically to reach it
        active?.scrollIntoView({ block: 'nearest', inline: 'center' })
    }, [pathname])

    return (
        <nav className="sol-tabs" aria-label="Solutions">
            <div className="sol-tabs__inner">
                <ul className="sol-tabs__list" ref={listRef}>
                    {SOLUTION_TABS.map((tab) => (
                        <li key={tab.id}>
                            <NavLink
                                to={tab.to}
                                end
                                className={({ isActive }) =>
                                    `sol-tabs__tab ${isActive ? 'is-active' : ''}`
                                }
                            >
                                {tab.tabLabel}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default SolutionsTabs

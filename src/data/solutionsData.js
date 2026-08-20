/*
 * Single source of truth for the Solutions section.
 *
 * Previously this list lived in three places (Header.jsx's mega-menu,
 * SolutionsModal.jsx, and implicitly in App.jsx's routes), which meant a new
 * solution had to be added by hand in each. Everything that renders a list of
 * solutions — the /solutions overview, the section tab bar, and the header's
 * mobile menu — now reads from here.
 */

export const SOLUTIONS = [
    {
        id: 'land-rejuvenation',
        to: '/solutions/land-rejuvenation',
        num: '01',
        category: 'agriculture',
        title: 'Land Rejuvenation',
        tabLabel: 'Land Rejuvenation',
        hint: 'Soil restoration & organic matter',
        blurb: 'Rebuild organic matter and revive degraded soil, so your land holds nutrients instead of leaking them.',
        image: '/field-crops.jpg',
    },
    {
        id: 'anti-flooding',
        to: '/solutions/anti-flooding',
        num: '02',
        category: 'agriculture',
        title: 'Anti-Flooding',
        tabLabel: 'Anti-Flooding',
        hint: 'Water retention & drainage',
        blurb: 'Hold water where the roots need it and move it where they do not, turning runoff into reserve.',
        image: '/flood.jpg',
    },
    {
        id: 'uv-protection',
        to: '/solutions/uv-protection',
        num: '03',
        category: 'agriculture',
        title: 'Sun & Pest Shield',
        tabLabel: 'Sun & Pest Shield',
        hint: 'UV protection for orchards',
        blurb: 'Shield fruit from sunburn and pests without reaching for the spray programme.',
        image: '/orange-orchard.jpg',
    },
    {
        id: 'poultry',
        to: '/solutions/poultry',
        num: '01',
        category: 'livestock',
        title: 'Poultry Solutions',
        tabLabel: 'Poultry',
        hint: 'Mineral bedding treatment',
        blurb: 'Mineral bedding treatment that dries litter, cuts ammonia, and keeps broiler and layer houses healthy.',
        image: '/poultry/poultry.jpg',
        // Portrait photo — pull the crop up so the chick sits centre-frame.
        imagePosition: 'center 25%',
    },
]

/* Grouped for the two-column overview + the header menu. */
export const SOLUTION_CATEGORIES = [
    {
        id: 'agriculture',
        label: 'Agriculture',
        tone: 'moss',
        desc: 'Soil, water & crop protection systems',
    },
    {
        id: 'livestock',
        label: 'Livestock',
        tone: 'ochre',
        desc: 'Mineral treatment for poultry & stables',
    },
]

export const solutionsByCategory = (categoryId) =>
    SOLUTIONS.filter((s) => s.category === categoryId)

/* Tab bar: the overview sits first, then every solution in order. */
export const SOLUTION_TABS = [
    { id: 'overview', to: '/solutions', tabLabel: 'Overview' },
    ...SOLUTIONS.map(({ id, to, tabLabel }) => ({ id, to, tabLabel })),
]

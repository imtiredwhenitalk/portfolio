/** Project case studies — add a new object to list another shipped project */
export const projects = [
  {
    id: 'calculator',
    title: 'Scientific Calculator',
    subtitle: 'Math & physics lab in the browser',
    role: 'Solo developer',
    tone: 'calc',
    href: 'https://imtiredwhenitalk.github.io/calculator/',
    hrefLabel: 'Live demo',
    highlight: '1.4k+ lines of interactive tooling with graphs, matrices, and i18n.',
    blocks: [
      {
        title: 'Shipped',
        bullets: [
          'Scientific mode: trig, logs, powers, constants (π, e).',
          'Chart.js graphs — 2000 points, discontinuity handling for tan/cot.',
          'Matrix UI (2×2–5×5), derivatives, integrals, 40+ physics formulas.',
          '4 themes, UA/EN, localStorage — deployed on GitHub Pages.',
        ],
      },
      {
        title: 'Hard parts',
        bullets: [
          'Forced x=0 sampling so trig curves hit the origin correctly.',
          'Custom Chart.js plugin for crisp axis lines and grid alignment.',
          'Math.js pipeline for matrix ops with live CSS grid input.',
        ],
      },
    ],
    stack: ['JavaScript', 'Math.js', 'Chart.js', 'Tailwind', 'GitHub Pages'],
  },
  {
    id: 'zelena-gryadka',
    title: 'Zelena Gryadka',
    subtitle: 'E-commerce with full DevOps on a VPS',
    role: 'Junior full-stack + DevOps',
    tone: 'green',
    href: 'https://zelena-gryadka.com.ua/',
    hrefLabel: 'Production site',
    highlight: 'Owned catalog, auth, cart, media, HTTPS, and persistent Postgres on Ubuntu.',
    blocks: [
      {
        title: 'Shipped',
        bullets: [
          'Next.js storefront with API integration and production SSR fixes.',
          'FastAPI REST, JWT roles, cart, image upload — PostgreSQL backend.',
          'Docker Compose, Nginx reverse proxy, Certbot TLS, volume-backed DB.',
        ],
      },
      {
        title: 'Solved in prod',
        bullets: [
          'Shared Docker volume for /media so uploads survive redeploys.',
          'Split Nginx blocks for /api vs static; config validated from logs.',
          'CORS + token handling so browser auth matched curl behavior.',
        ],
      },
    ],
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Docker', 'Nginx', 'Certbot'],
  },
  {
    id: 'vetementes',
    title: 'VETEMENTES',
    subtitle: 'Luxury streetwear storefront',
    role: 'Solo full-stack',
    tone: 'lux',
    href: 'https://github.com/imtiredwhenitalk/vetementes-website',
    hrefLabel: 'Repository',
    highlight: 'Premium UI, checkout flow, Express API, and a Docker dev stack.',
    blocks: [
      {
        title: 'Shipped',
        bullets: [
          'Catalog, product modal (sizes/colors/qty), cart sidebar, checkout.',
          'Framer Motion transitions; Express + TS API with JWT and validation.',
          'docker-compose: Postgres + API + Vite frontend behind nginx.',
        ],
      },
      {
        title: 'Solved in prod',
        bullets: [
          'Unified layout wrappers so 1920×1080 content sits visually centered.',
          'Sticky order summary on desktop; mock DB fallback when Postgres is down.',
          'Rate limit, Helmet, CORS, and request validation on API routes.',
        ],
      },
    ],
    stack: ['React 19', 'TypeScript', 'Express', 'PostgreSQL', 'Docker', 'Framer Motion'],
  },
];

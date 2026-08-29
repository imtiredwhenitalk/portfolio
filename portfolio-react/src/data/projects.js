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
  {
    id: 'solar-system',
    title: 'Animated Solar System',
    subtitle: 'Immersive space landing experience with orbital motion',
    role: 'Solo frontend developer',
    tone: 'space',
    href: 'https://animated-web-v1.vercel.app/',
    hrefLabel: 'Live demo',
    highlight: 'A space-themed landing page built to explore motion, depth, and interactive astronomy visuals with a strong visual identity.',
    blocks: [
      {
        title: 'Shipped',
        bullets: [
          'Responsive landing page with a cinematic hero, starfield atmosphere, and space UI styling.',
          'Modular React + TypeScript architecture with a clean component structure.',
          'Modern front-end stack using Vite, Tailwind, and motion-driven layout patterns.',
        ],
      },
      {
        title: 'Hard parts',
        bullets: [
          'The biggest challenge was the Three.js solar-system logic: planets had to rotate, orbit, and feel natural without looking jittery.',
          'I had to tune transforms, animation timing, and object scaling so the orbits felt smooth and readable on the page.',
          'The visual work was not only “pretty” — it required balancing performance, responsiveness, and a clean UX experience.',
        ],
      },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Three.js', 'Node.js'],
  },
  {
    id: 'python-crm',
    title: 'Python CRM System',
    subtitle: 'Client management dashboard for sales workflow',
    role: 'Solo developer',
    tone: 'crm',
    href: 'https://github.com/imtiredwhenitalk',
    hrefLabel: 'GitHub profile',
    highlight: 'A practical CRM for managing clients, sales stages, follow-ups, and tasks without overengineering the flow.',
    blocks: [
      {
        title: 'Shipped',
        bullets: [
          'Customer and contact management with personal data, status, and follow-up tracking.',
          'Deal pipeline logic for active, won, and pending work with simple business rules.',
          'Python-driven workflow with storage and structured UI for easier day-to-day usage.',
        ],
      },
      {
        title: 'Hard parts',
        bullets: [
          'The main issue was making the system practical, not just “technically working”. I focused on workflow clarity and data consistency.',
          'I had to design status transitions, task handling, and client records so data stayed predictable as the project grew.',
          'The project taught me how real business logic often matters more than flashy interface features.',
        ],
      },
    ],
    stack: ['Python', 'SQLite', 'CRM logic', 'Business workflow', 'UI design'],
  },
  {
    id: 'education-open-source',
    title: 'Education Project',
    subtitle: 'Open-source study project built for learning and sharing',
    role: 'Collaborative developer',
    tone: 'edu',
    href: 'https://github.com/imtiredwhenitalk/education',
    hrefLabel: 'Repository',
    highlight: 'A study-focused web project aimed at educational content, clean presentation, and simple open-source collaboration.',
    blocks: [
      {
        title: 'Shipped',
        bullets: [
          'Landing and content sections designed around a learning-first experience.',
          'Reusable frontend structure so content and components remain easy to extend.',
          'Open-source vibe: simple, readable, and suitable for educational collaboration and iteration.',
        ],
      },
      {
        title: 'Hard parts',
        bullets: [
          'The challenge was making it useful and polished without creating unnecessary complexity for a learning project.',
          'I focused on structure, flow, and readability so the app stays clear for students and contributors.',
          'It was a good exercise in building something that scales conceptually without becoming bloated.',
        ],
      },
    ],
    stack: ['JavaScript', 'React', 'Open source', 'Frontend', 'Education'],
  },
];

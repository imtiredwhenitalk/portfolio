# Portfolio (React)

Production-ready personal portfolio. Content lives in data files — no HTML strings in components.

## Quick start

```bash
npm install
npm run dev
```

## Update content

| File | What to edit |
|------|----------------|
| `src/data/site.js` | Name, links, bio, skills, nav |
| `src/data/projects.js` | Case studies (add objects to the array) |

## Deploy

```bash
npm run build
```

Output: `dist/` — host on GitHub Pages, Cloudflare Pages, or any static host.

For GitHub Pages with a project subpath, set `base` in `vite.config.js`.

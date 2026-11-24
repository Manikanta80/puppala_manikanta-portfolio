# Puppala Manikanta — Portfolio

React + TypeScript + Vite portfolio with glass UI, responsive layouts, animated sections and project artwork.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Vite outputs the deployable site to `dist/`. The React entry point is `src/main.tsx`, referenced from `index.html`; keep the `src/` folder at the repository root. All runtime images, resume and icons are in `public/` and use public-root paths. No environment variables are required for the current portfolio; the contact section links directly to email.

## Deploy on Vercel

Import this GitHub repository into Vercel. Set **Root Directory** to the repository root (`./`), framework to **Vite**, build command to `npm run build`, and output directory to `dist`. Leave environment variables empty, then deploy. Vercel will provide a public `*.vercel.app` link. Do not upload only the files inside `src/`; upload the complete repository tree so `index.html` and `src/main.tsx` remain at their expected paths.

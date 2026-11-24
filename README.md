# Puppala Manikanta — Portfolio

React + TypeScript + Vite portfolio. The existing visual design, animations, effects, responsive layouts, images, and behavior are preserved.

## Required files

The React entry file is `src/main.tsx`. `index.html` loads it through the relative Vite entry `./src/main.tsx`. Keep `index.html` and the complete `src/` directory together at the repository root.

All files under `public/` are included: portfolio images, project art, monkey illustration, resume PDF, favicon, and SEO assets. Icons and motion libraries are declared in `package.json`. No local Windows paths or credentials are required to build the portfolio.

## Build

Requires Node.js 20+ and npm.

```powershell
npm ci
npm run build
```

Vite writes production files to `dist/`. No environment variables are needed for the existing portfolio. The contact section uses email links; the optional legacy `api/contact.ts` handler is not connected.

## GitHub upload

1. Extract this ZIP.
2. Create an empty GitHub repository (do not initialize it with a README or other files).
3. Open PowerShell in the extracted folder and run these commands, replacing the URL with your repository URL:

```powershell
git init
git add .
git commit -m "Prepare portfolio for deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

After pushing, verify GitHub shows both `index.html` and `src/main.tsx` at the repository root / `src` path.

## Vercel deployment

1. Sign in to Vercel with GitHub and choose **Add New → Project**.
2. Import the repository.
3. Set **Root Directory** to `./` (repository root), **Framework Preset** to Vite, **Build Command** to `npm run build`, and **Output Directory** to `dist`.
4. Leave environment variables empty and deploy.
5. Copy the resulting public `*.vercel.app` link to share.

Do not set the Vercel root to `src` or upload only `index.html`. The `vercel.json` file contains the Vite output settings and response security headers. After deploy, update the existing SEO canonical domain in `public/robots.txt`, `public/sitemap.xml`, and `src/data/siteConfig.ts` if your assigned Vercel URL differs from `puppala-manikanta.vercel.app`.

Never commit real API keys or `.env` files. If you later connect the optional contact API, add its `RESEND_API_KEY` in Vercel's environment settings.

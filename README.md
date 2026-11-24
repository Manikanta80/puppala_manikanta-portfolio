# Puppala Manikanta — Portfolio

React + TypeScript + Vite portfolio. The existing layout, visual styling, responsive rules, animations, hover effects, and interactions are preserved.

## Included assets

All files from `public/` are included, including the hero portraits, project artwork, monkey illustration, favicon, resume PDF, and SEO files. Icons are provided by `lucide-react`; motion uses `framer-motion`; water and 3D effects are implemented in the source. No locally referenced Windows paths or extra local font/video/model files are required by the current app.

## Requirements

- Node.js 20 or newer
- npm

## Build locally

```powershell
npm ci
npm run build
```

The Vite production output is written to `dist/`. The build does not require environment variables. The portfolio contact section uses `mailto:` and does not call the optional legacy API handler.

## Deploy through GitHub and Vercel

### 1. Push this folder to GitHub

1. Extract `Manikanta-Portfolio-Deployment.zip` into a folder.
2. On GitHub, create a new empty repository (do not add a README, `.gitignore`, or license there).
3. Open PowerShell in the extracted portfolio folder and run the following, replacing the URL with your repository URL:

```powershell
git init
git add .
git commit -m "Prepare portfolio for deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

### 2. Publish with Vercel

1. Sign in to Vercel with your GitHub account.
2. Choose **Add New → Project**, then **Import** the repository you just pushed.
3. Keep the detected framework as **Vite**. Use the repository root, build command `npm run build`, and output directory `dist`.
4. Leave environment variables empty for the current portfolio, then click **Deploy**.
5. When it finishes, copy the public `*.vercel.app` URL and share it. Future pushes to the connected branch trigger a new deployment.

The existing `vercel.json` already supplies the Vite output and response security headers. After Vercel assigns the final project URL, update the old canonical domain in `public/robots.txt`, `public/sitemap.xml`, and `src/data/siteConfig.ts` if the assigned URL differs from `puppala-manikanta.vercel.app`.

## Optional contact API

`api/contact.ts` is included as existing source but is not used by the current contact section. If you later connect it to a form, add `RESEND_API_KEY` under the Vercel project's **Settings → Environment Variables**. Never commit a real key or `.env` file.

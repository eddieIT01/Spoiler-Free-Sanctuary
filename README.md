# Spoiler-Free Sanctuary

University project: a small React + Tailwind frontend that helps players track game progress and receive spoiler-free tips.

**Live demo:** https://spoiler-free-sanctuary.netlify.app  
Replace the URL above with your Netlify site URL (found in your Netlify dashboard) so reviewers can open the live site directly.

## Project Overview

- Purpose: Provide a UI to track chapters/sections of narrative-driven games and only reveal tips for unlocked chapters.
- Tech: React, react-router-dom, Tailwind CSS

## Getting Started (Local)

1. Ensure Node.js (16+) and npm are installed.

If you're unsure which Node version you have, run:

```powershell
node -v
npm -v
```

2. In the project root run these PowerShell commands to install and start the dev server (Vite):

```powershell
npm install
npm run dev
```

If you used Create React App instead, use `npm start`. This repository is scaffolded for Vite.

3. Tailwind CSS: This project uses Tailwind classes. If you scaffolded with CRA or Vite, follow Tailwind docs to initialize `tailwind.config.js` and include the `@tailwind` directives in your CSS.

## Key Features

- Progress-based unlocking: mark chapters as completed to unlock the next section.
- Spoiler-safe UI: locked sections are blurred/hidden until unlocked.
- Responsive dark theme: mobile menu and footer included.

## UI Screenshots

- [Placeholder] Add screenshots in `/docs/screenshots` or replace these with images.

## Files of Interest

- `src/App.jsx` — App entry and router wrapper
- `src/router.jsx` — Route definitions
- `src/components/Layout.jsx` — Navigation and footer layout
- `src/components/GuideSection.jsx` — Displays section tips or locked state
- `src/data/tloU_guide.js` — Mock data for The Last of Us
- `src/pages/GameProgressView.jsx` — Main interactive page

## Notes

- This is a front-end prototype for a university assignment. Integrate a backend or persistent storage for saving user progress across sessions.
 
## Run notes

- First time only: run `npm install` to install dependencies.
- Start dev server: `npm run dev` and open the address Vite prints (usually http://localhost:5173).
- To build a production bundle: `npm run build` and then `npm run preview` to preview the built site.

## Short checklist for your professor (recommended)

- Open the Live demo URL in a modern browser (Chrome, Edge, Firefox). If the site looks broken, try a hard refresh (Windows: Ctrl+Shift+R).
- If the page still fails, try an Incognito/Private window or another browser to rule out cache or extension problems.
- If you'd like to run locally, follow the steps under "Getting Started (Local)" — the exact commands for Windows PowerShell are above.

If you want me to add the Netlify URL into the repository `About` section on GitHub, I can provide the exact text to paste there (this must be done manually in the GitHub UI by whoever owns the repo).

## What I fixed (recent)

- Fixed production build loading problem by correcting `index.html` so Vite can generate hashed asset paths for production builds.
- Fixed a runtime initialization bug in `src/pages/GameProgressView.jsx` where initial progress referenced a variable before it was defined (caused a ReferenceError in the production bundle).

Both fixes are committed to `main` and pushed — Netlify should redeploy automatically after the latest push. If Netlify hasn't deployed, trigger a manual redeploy from the Netlify site dashboard.

## Troubleshooting (quick)

- Netlify not showing latest changes: go to your site on Netlify -> Deploys -> click the latest deploy to view logs. If there was an issue, trigger "Retry deploy" or click "Trigger deploy".
- Professor sees blank/JS error: ask them to open browser DevTools (F12) -> Console, copy any errors and share them with you. Common fixes: cache, extension conflicts, or old deployment artifacts.
- Local build errors: Run `npm ci` (clean install) then `npm run build`. If Node version is below 16, update Node.

## Contact / Feedback

If your professor needs a quick guided test, you can ask them to:

1. Open the Live demo link (replace with actual Netlify URL).
2. Hard refresh (Ctrl+Shift+R) if they see an old version.
3. If they still see issues, have them open DevTools → Console and paste any error messages here or open an issue on the repo so I can triage them directly.

## New features added

- Animations: subtle entrance and pop animations added to layout and guide cards.
- Persistence: chapter completion state is saved to `localStorage` so progress persists across reloads.

Multi-game support

- The app now supports multiple games. Add or edit guides in `src/data/guides.js`.
- Progress is saved per game in `localStorage` under the key `sfs_progress_v1`.

If you prefer not to use localStorage, open `src/pages/GameProgressView.jsx` and remove the storage calls.

## UI and Visuals

- The static pages (`Home`, `About`, `Features`, `Contact`) include enhanced visuals, gradients, and subtle animations to provide a polished gaming-oriented look.
- Animations are implemented via Tailwind keyframes in `tailwind.config.cjs`. If you need reduced-motion support, it's easy to add `@media (prefers-reduced-motion: reduce)` fallbacks.

## Runtime editing

- An in-browser editor is available at `/admin` to add or edit guides. Changes are saved to `localStorage` under the key `sfs_guides_v1` and the app will pick them up automatically.
- Guide progress is still stored per-game in `localStorage` under the key `sfs_progress_v1`.

## Deploying to GitHub Pages (automated)

This repository includes a GitHub Actions workflow that builds the app and deploys it to GitHub Pages whenever you push to the `main` (or `master`) branch.

Steps to deploy:

1. Create a GitHub repository (on github.com) for this project.

2. On your machine (project root `c:\Users\DELL\frontend`), run these commands in PowerShell to initialize a repo (if you haven't already), commit, and push:

```powershell
git init
git add .
git commit -m "Initial commit: Spoiler-Free Sanctuary"
# add remote (replace <your-remote-url> with the one GitHub provides)
git remote add origin <your-remote-url>
# push to main (create branch if needed)
git branch -M main
git push -u origin main
```

3. After you push, GitHub Actions will run the `deploy.yml` workflow and publish the site to GitHub Pages. You can check the Actions tab on GitHub for build logs.

Notes:
- We use `HashRouter` so client-side routing works on GitHub Pages without special server configuration.
- The workflow uses the official `actions/upload-pages-artifact` and `actions/deploy-pages` steps — no additional secrets are required.




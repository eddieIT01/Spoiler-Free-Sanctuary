# Spoiler-Free Sanctuary

University project: a small React + Tailwind frontend that helps players track game progress and receive spoiler-free tips.

## Project Overview

- Purpose: Provide a UI to track chapters/sections of narrative-driven games and only reveal tips for unlocked chapters.
- Tech: React, react-router-dom, Tailwind CSS

## Getting Started (Local)

1. Ensure Node.js (16+) and npm are installed.

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




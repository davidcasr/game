# 👾 Portfolio in 2D Game Version

After seeing the creative 2D portfolio project, I couldn't resist making my own version of a portfolio. Find below the information from the original project.

This repository holds **both the source code and the automatic publication** of the game. Every push to `main` is built and deployed to GitHub Pages by a workflow — there is no separate "production" repository anymore.

- 🌐 Live: https://davidcasr.com/game

# 👨🏼‍💻 Inspired by

- Live demo: https://jslegenddev.github.io/portfolio/
- Source code: https://github.com/JSLegendDev/2d-portfolio-kaboom?tab=readme-ov-file#developer-portfolio-thats-a-2d-game

# 🕹️ Usage

## Running the Application
Note: You need Node.js and npm installed on your machine.

`npm install` then `npm run dev`

## Building the Application
`npm run build` and a `dist` folder will be created.

## Previewing the Build
`npm run preview`

# 🚀 Deployment

Deployment is automatic. The workflow at `.github/workflows/deploy.yml` runs
`npm run build` on every push to `main` and publishes the `dist` folder to
GitHub Pages.

One-time setup (in **Settings → Pages**): set **Source** to **GitHub Actions**.

# 🧰 Tools

- Fonts: https://datagoblin.itch.io/monogram
- Tiled software: https://mapeditor.org
- Modern Interiors: https://limezu.itch.io/moderninteriors

Made with ❤️ by @davidcasr

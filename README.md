# SpendWise-Lab

![Project banner](https://img.shields.io/badge/SpendWise--Lab-Expense%20Tracker-blue)

[![Build Status](https://img.shields.io/github/actions/workflow/status/your-username/SpendWise-Lab/ci.yml?branch=main\&label=build\&logo=github)](https://github.com/your-username/SpendWise-Lab/actions)
[![Release](https://img.shields.io/github/v/release/your-username/SpendWise-Lab)](https://github.com/your-username/SpendWise-Lab/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Contributors](https://img.shields.io/github/contributors/your-username/SpendWise-Lab)](https://github.com/your-username/SpendWise-Lab/graphs/contributors)

---

<p align="center">
  <img src="https://media.giphy.com/media/3o7aCTfyhYawdOXcFW/giphy.gif" alt="animated demo" width="720"/>
</p>

> **SpendWise-Lab** — a polished web application prototype for expense tracking and budget analysis. Built as a laboratory/workshop project to explore data visualization, behavioral budgeting, and UX animation for learning and experimentation.

---

## Table of Contents

* [About](#about)
* [Why SpendWise-Lab?](#why-spendwise-lab)
* [Features](#features)
* [Demo & Screenshots](#demo--screenshots)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Install](#install)
  * [Run Locally](#run-locally)
* [Usage](#usage)
* [Configuration](#configuration)
* [Project Structure](#project-structure)
* [Testing](#testing)
* [Continuous Integration](#continuous-integration)
* [Design & Animations](#design--animations)
* [Contributing](#contributing)
* [License](#license)
* [Acknowledgements](#acknowledgements)

---

## About

SpendWise-Lab is a focused, research-style web app that helps learners and developers experiment with personal finance UX patterns, automated categorization, and lightweight budget forecasting. It's intended for classroom lab work, hackathons, and portfolio demonstrations — not for production financial use without further hardening and security review.

**Goals:**

* Demonstrate modern frontend animations for better user engagement.
* Provide strong visual budget analysis (charts, heatmaps, trendlines).
* Offer a compact backend for experimenting with categorization algorithms and small datasets.

---

## Why SpendWise-Lab?

* **Educational** — ideal for exercises in data visualization and UX-driven product thinking.
* **Modular** — swap charting libraries, persistors, or classification models quickly.
* **Engaging** — animations and micro-interactions make learning about budgets feel approachable.

---

## Features

* Add, edit, and remove expenses and income entries.
* Automatic category suggestions using simple heuristics (lab exercise to replace with ML).
* Interactive charts: time series, category breakdown (donut), spending heatmap, rolling average.
* Budget goals with alerts and progress bars.
* Import/export CSV for dataset experiments.
* Theming system (light / dark) and accessible color choices.
* Lightweight REST API for lab integration.

---

## Demo & Screenshots

> Animated demo above — replace the GIF with a short screen capture of your app for best results.

**Screenshots**

* `screenshots/` contains PNGs used in this README. Prefer 16:9 and crop to important UI areas.

---

## Tech Stack

* Frontend: React (Vite), TypeScript, Tailwind CSS, Framer Motion for animations, Recharts or Chart.js for charts.
* Backend (lab): Node.js + Express (or FastAPI for Python labs), SQLite for local experiments.
* Tests: Vitest / Jest, Playwright for e2e.
* CI: GitHub Actions for linting, tests, and preview deployments.

---

## Getting Started

## Quick Setup for JavaScript Version

If you want to run the pure JavaScript/Node.js version:

```bash
# Initialize the project
npm init -y

# Install dependencies
npm install uuid fs-extra chalk

# Create the project structure
mkdir -p data

# Create the JavaScript files (copy the code above)

# Run the application
npm start

### Prerequisites

* Node.js v18+ and npm/yarn
* (Optional) Docker to run DB and app in containers

### Install

```bash
# clone
git clone https://github.com/your-username/SpendWise-Lab.git
cd SpendWise-Lab

# frontend
cd frontend
npm install

# backend
cd ../backend
npm install
```

### Run Locally (dev)

From the repository root (uses concurrently in scripts):

```bash
# start frontend + backend in development
npm run dev
```

Or run each service separately:

```bash
# frontend only
cd frontend
npm run dev

# backend only
cd backend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port printed by the dev server).

---

## Usage

* Create an account (local DB only for lab) or use the demo account `demo@spendwise.test` / `password`.
* Add a few transactions or import sample CSVs from `data/samples/`.
* Explore the **Insights** page: adjust the date range, group by category, and experiment with smoothing windows.
* Tweak animations in `frontend/src/components/animations` as an exercise — try changing easing, duration, or stagger values.

---

## Configuration

Environment example (frontend `.env` and backend `.env`):

```env
# backend/.env
DATABASE_URL=sqlite:./data/db.sqlite
PORT=4000
JWT_SECRET=lab-secret

# frontend/.env
VITE_API_URL=http://localhost:4000/api
```

---



## Testing

Run unit tests and linters locally:

```bash
# from project root
npm run test
npm run lint
```

For e2e tests (Playwright):

```bash
npm run test:e2e
```

---

## Continuous Integration

This repo includes sample GitHub Actions workflows to run tests, linting, and build previews. See `.github/workflows/` for details. Add a `deploy` workflow to publish to GitHub Pages or Vercel.

---

## Design & Animations

SpendWise-Lab is intentionally animation-forward to make the product feel lively during lab demos. Suggested animations:

* **Micro-interactions**: button ripple, input focus floats, success toasts sliding from top.
* **Onboarding flow**: step transitions using Framer Motion `AnimatePresence` with spring easing.
* **Charts**: animate data points on mount with staggered opacity and translateY.
* **Progress bars**: animate width with aria-live updates for accessibility.

Tips to keep animations accessible:

1. Respect OS-level `prefers-reduced-motion` and provide reduced animation versions.
2. Keep durations short (150–450ms) for micro-interactions and 600–900ms for page transitions.
3. Avoid motion that causes jank or layout shifts.

---

## Contributing

Thanks for your interest! This project is set up as a teaching laboratory. Contributions should include a clear experimental purpose.

1. Fork the repo and create a feature branch: `git checkout -b feat/<your-experiment>`
2. Add tests and update `docs/` with experimental notes.
3. Open a pull request describing the motivation and expected learning outcomes.

See `CONTRIBUTING.md` for more.

---

## License

This repository is licensed under the **MIT License** — see `LICENSE` for details.

---

## Acknowledgements

Built as part of learning labs — thanks to the open-source community and the many libraries used.

---


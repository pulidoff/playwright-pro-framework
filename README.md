# playwright-pro-framework

[![CI](https://github.com/pulidoff/playwright-pro-framework/actions/workflows/ci.yml/badge.svg)](https://github.com/pulidoff/playwright-pro-framework/actions/workflows/ci.yml)

A professional test automation framework built with **Playwright**, covering E2E, API, visual regression, and accessibility testing for [automationexercise.com](https://www.automationexercise.com) and [reqres.in](https://reqres.in).

---

## Stack

| Layer | Tool |
|---|---|
| Test runner | Playwright Test |
| E2E (UI) | Playwright + Page Object Model |
| API | Playwright `request` + Service Object Model |
| Visual regression | Playwright `toHaveScreenshot` |
| Accessibility | axe-core via `axe-playwright` (WCAG 2.1 AA) |
| CI | GitHub Actions |

---

## Project Structure

```
playwright-pro-framework/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions pipeline
├── fixtures/
│   └── apiFixtures.js           # Custom fixture injecting SOManager
├── pageobjects/
│   ├── HomePage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── POManager.js             # POM factory
├── serviceobjects/
│   └── SOManager.js             # API service object for reqres.in
├── tests/
│   ├── a11y/
│   │   └── homepage.a11y.spec.js
│   ├── api/
│   │   ├── auth.spec.js
│   │   └── users.spec.js
│   ├── e2e/
│   │   ├── homepage.spec.js
│   │   └── products.spec.js
│   └── visual/
│       └── homepage.visual.spec.js
├── utils/
│   └── a11yHelper.js            # axe-core audit helpers
├── .env                         # Local env vars (gitignored)
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

---

## Setup

```bash
npm install
npx playwright install chromium --with-deps
```

Copy `.env` and set your API key (already provided):

```bash
REQRES_API_KEY=free_user_3EXUPWob6vghR3S3Vy9qn8pPqmw
```

---

## Commands

| Command | Description |
|---|---|
| `npm test` | Run all tests |
| `npm run test:e2e` | E2E UI tests only |
| `npm run test:api` | API tests only |
| `npm run test:visual` | Visual regression tests only |
| `npm run test:a11y` | Accessibility audits only |
| `npm run report` | Open the HTML report |

---

## CI

The pipeline runs on every push and pull request to `main`. It installs Chromium, runs the full suite, and uploads the Playwright HTML report as an artifact on failure.

> **Note:** Add `REQRES_API_KEY` as a repository secret in GitHub Actions settings.

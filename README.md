# ShopSafe Frontend

React frontend for ShopSafe — a mechanic trust platform that helps everyday people find honest auto repair shops using AI.

## Features

- **Location search** — find shops near any city or zip code
- **AI trust scores** — every shop gets a ShopSafe Score (0–100) based on review analysis
- **Trust verdicts** — Highly Trusted, Trusted, Proceed with Caution, or Avoid
- **AI analysis cards** — green flags, red flags, price fairness, and plain-English summaries
- **Instant results** — cached searches return in under a second

## Tech Stack

- **React** — frontend framework
- **Cloudflare Workers** — backend API (shopsafe-worker)
- **Supabase** — shop profile caching
- **Claude API** — AI review analysis

## Getting Started

```bash
npm install
npm start
```

App runs at `http://localhost:3000`.

## How It Works

```
User searches location
  → GET /search?location=Miami, FL
  → Worker checks Supabase cache (7 day TTL)
  → If miss: scrapes Google Maps via Apify + scores with Claude
  → Returns ranked shop list with trust scores
  → Frontend renders cards grouped by trust level
```

## Design

- Dark theme: #0a0a0c background
- Gold primary: #c9a227
- Fonts: Bebas Neue (headings), DM Sans (body), Outfit (UI)
- Built for non-car-people — plain English, no jargon

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

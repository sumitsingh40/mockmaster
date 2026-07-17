# Mock Master

Mock Master is a React + TypeScript web app for mock interviews, practice feedback, and interview prep workflows.

## Features

- Mock interview flow with question, response, and review steps
- Firebase-backed services and authentication handlers
- Reusable UI components built with Radix, Tailwind, and Lucide
- Face and speech-related integrations for interview practice scenarios

## Tech Stack

- React 19
- Vite 7
- TypeScript
- Tailwind CSS
- Firebase
- Clerk
- Framer Motion

## Getting Started

```bash
pnpm install
pnpm run dev
```

## Available Scripts

- `pnpm run dev` starts the local Vite dev server
- `pnpm run build` creates a production build
- `pnpm run lint` runs ESLint
- `pnpm run preview` previews the production build locally
- `pnpm run deploy` builds the app and publishes `dist` to GitHub Pages

## GitHub Pages

This project is configured for GitHub Pages under the repository path `/mockmaster/`.

To deploy:

```bash
pnpm run deploy
```

For automatic publishing from GitHub, enable Pages in the repository settings and set the source to GitHub Actions.

The live site will be available at:

https://sumitsingh40.github.io/mockmaster/

## Environment

Keep local secrets in `.env.local`. The file is ignored by Git and should not be committed.

## License

MIT

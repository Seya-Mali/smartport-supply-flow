# SmartPort Supply Flow

SmartPort Supply Flow is a React + TypeScript dashboard for monitoring shipment routes, vessel movement, port conditions, congestion, and operational alerts.

## Getting started

Prerequisites:

- Node.js 18+
- npm

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

The local dev server runs at the address printed in your terminal (typically http://localhost:8080).

## Available scripts

- `npm run dev`: Start the development server.
- `npm run build`: Create a production build.
- `npm run build:dev`: Build using development mode.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint.

## Tech stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- Recharts

## Project structure

- `src/pages`: Route-level pages
- `src/components`: Shared and feature-specific components
- `src/components/dashboard`: Dashboard widgets
- `src/components/ui`: Reusable UI primitives
- `src/hooks`: Shared React hooks
- `src/lib`: Utility functions

## Deployment

Build the project with:

```sh
npm run build
```

Then deploy the generated `dist` folder to your preferred static hosting provider.

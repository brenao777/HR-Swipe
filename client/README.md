# HR-Swipe — client

React 18 + TypeScript + Vite frontend for HR-Swipe, organised with
[Feature-Sliced Design](https://feature-sliced.design/).

See the [root README](../README.md) for the full picture and one-command startup.

## Scripts

```bash
npm run dev       # dev server (http://localhost:5173, proxies /api and /uploads → :3000)
npm run build     # type-check + production build → dist/
npm run preview   # preview the production build
npm run lint      # ESLint
```

## Layout

```
src/
├── app/        store, routing, providers
├── pages/      route-level screens (Applicant / HR / Login / Register / Layout)
├── widgets/    Navbar, Chat, resume lists
├── features/   swipe carousel
├── entities/   user, Vacancy, Resume, Company, Chat, vacancyStatus
└── shared/     axios instance, hooks, imageUrl helper
```

The dev server expects the API on `http://localhost:3000` (configurable via the
Vite proxy in `vite.config.ts`). Websocket URL can be overridden with `VITE_SOCKET_URL`.

# Costra Frontend

A mobile-web cost of living tracker built for Sri Lankan households. This is the **frontend implementation** — a React + TypeScript + Tailwind CSS application rendering polished, production-quality screens faithful to the Costra design system and hi-fi designs.

## Tech Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite** — dev server & build
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **React Router v6** — client-side routing with layout routes
- Mobile-first (iPhone 16 Pro / 393px target)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |

## Project Structure

```
src/
  flows/
    splash/screens/       # Splash screen with brand animation
    onboarding/screens/   # 4-slide onboarding carousel
    login/screens/        # OTP sign-in screen
    register/screens/     # 4-step registration flow
    welcome/screens/      # Welcome screen
    home/screens/         # Dashboard (placeholder)
    track/screens/        # Expense tracking (placeholder)
    wallet/screens/       # Wallet management (placeholder)
    insights/screens/     # Spending analytics (placeholder)
    profile/screens/      # User profile (placeholder)
  layouts/
    AuthLayout.tsx        # Auth flow wrapper (393px max-width)
    AppLayout.tsx         # App flow wrapper with bottom nav
  tokens/
    index.css             # Design tokens (Phase 2)
```

## Screens Implemented

- **Splash** — Animated brand reveal, auto-navigates to onboarding
- **Onboarding** — 4-slide carousel with hero images, skip/continue flow
- **Login** — OTP sign-in with +94 country code, phone input, Send OTP
- **Register** — 4-step flow: name + phone, OTP verification, economic profile, account ready

## Design System

- **Design System:** [Costra Storybook](https://costra-design-system.vercel.app/)
- **Colors:** Dark theme (#050505 bg, #C8FF00 lime accent, #FAFAFA text)
- **Fonts:** Outfit (sans), JetBrains Mono (mono)
- **Target:** Mobile-web, iPhone 16 Pro (393px)

## Architecture Decisions

- Route-level code splitting with `React.lazy` + `Suspense`
- `min-h-[100dvh]` (not `100vh`) for iOS Safari address bar fix
- Safe-area insets via `env(safe-area-inset-*)` for notched devices
- `viewport-fit=cover` in HTML meta tag
- Inline styles matching hi-fi designs (design tokens extraction in Phase 2)

## License

Private — not for distribution.

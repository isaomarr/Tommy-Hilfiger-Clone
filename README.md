# Tommy Hilfiger Clone

An educational, front-end-only clone of [usa.tommy.com](https://usa.tommy.com), built to
practice matching a real e-commerce site's UI and interaction patterns pixel-for-pixel with
React. **Not affiliated with Tommy Hilfiger.**

## Tech stack

- **React 19** + **Vite** — app shell and dev server
- **React Router 7** — routing
- **Tailwind CSS 4** — styling
- **React Icons** — icon set
- **Context API** — auth, cart, and wishlist state (no external state library)
- **localStorage** — the only "backend": accounts, sessions, cart, orders, and wishlist all
  persist there. There is no real server, database, or payment processor.

## Getting started

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

## Demo account

Sign in (or register) with:

- **Email:** `admin`
- **Password:** `admin`

Any other email/password you register through the Sign Up drawer also works and persists
across sessions (in that browser's localStorage).

## Features

- **Browse & filter** — category pages, New/Sale, size/color/price filters, sort, search
- **Product detail** — color/size selection, image gallery, "Style With" carousel, reviews
- **Cart** — right-side drawer, quantity controls, persists across reloads
- **Checkout** — shipping → payment → confirmation, orders saved to localStorage
- **Auth** — right-side Sign In / Sign Up drawer, "Remember me", password reset
- **Account dashboard** (`/account`) — Overview, Orders, Personal Information, Addresses,
  Payment, Saved Items — each backed by real local data, with honest empty states where the
  app has no real backend for something (e.g. no payment methods are ever stored)
- **Wishlist** — heart icon on any product card, saved to `/account/saved-items`
- **Order tracking** (`/track-order`) — look up a placed order by order number + email + zip

## Project structure

```
src/
  components/
    context/       AuthContext, CartContext, WishlistContext
    data/           th-clone-data.json + shopData.js helpers
    layout/         header, footer, cart, checkout, product UI
    pages/          route-level pages (account, cart, checkout, product, etc.)
    routes/         AppRoutes, ProtectedRoute
    utils/          small shared helpers (orders, member ID, formatting)
```

## Notes

This is a learning project: it deliberately avoids faking things it can't really do (payment
processing, emailed password resets, a physical store network, etc.) in favor of honest empty
states or a working local-only equivalent.

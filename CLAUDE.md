---
description:
alwaysApply: true
---

---

description:
alwaysApply: true

---

# WRAPA Frontend — AI Assistant Context

## Project Overview

WRAPA is a multi-portal insurance platform built for the Pan African market.
It supports Traditional Insurers, HMOs, Brokers, Corporate clients, Regulators and WRAPA Admin.
This is a pnpm monorepo using Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

---

## Monorepo Structure

```
wrapa-frontend/
├── apps/
│   └── web/                  # Next.js 16 App Router (main web platform)
│       └── src/
│           ├── app/          # All portal route groups live here
│           ├── components/   # App-specific components (not shared)
│           ├── hooks/        # App-level custom hooks
│           ├── lib/          # App-level utilities
│           ├── providers/    # Context providers (org, permissions, theme)
│           └── proxy.ts      # Route guard (Next.js 16 uses proxy not middleware)
├── packages/
│   ├── ui/           # @wrapa/ui — Shared design system components
│   ├── forms/        # @wrapa/forms — Form renderer, Zod schemas, validation
│   ├── api-client/   # @wrapa/api-client — Axios API clients, typed from OpenAPI
│   ├── auth/         # @wrapa/auth — PASETO session helpers, route guards
│   └── config/       # @wrapa/config — Feature flags, countries, portal config
```

---

## Portal Route Groups (App Router)

Each portal is a route group in `apps/web/src/app/`. Route groups use parentheses and do NOT add to the URL.

```
app/
├── (auth)/           # Shared auth: login, register, reset
├── (customer)/       # Customer Portal
├── (insurer)/        # Insurer Portal
├── (hmo)/            # HMO Portal (separate from insurer — different workflows)
├── (admin)/          # WRAPA Admin Portal
├── (broker)/         # Broker/Agent Portal
├── (corporate)/      # Corporate Portal
└── (regulator)/      # Regulator Portal (later phase)
```

### Important: All route folders are prefixed with their portal name to avoid App Router path conflicts.

Examples:

- `(admin)/admin-claims/` not `(admin)/claims/`
- `(customer)/customer-policies/` not `(customer)/policies/`
- `(insurer)/insurer-dashboard/` not `(insurer)/dashboard/`

---

## Installed Packages — Use These, Do Not Install Others Without Asking

### `@wrapa/ui` (packages/ui)

- `@radix-ui/react-*` — All Radix UI primitives (accordion, dialog, select, tabs, toast, etc.)
- `react-icons` — Icon library
- `class-variance-authority` (cva) — Component variants
- `clsx` — Conditional classnames
- `tailwind-merge` — Merge Tailwind classes without conflicts
- `cn()` utility exported from `@wrapa/ui/src/cn.ts`
- `formatMoney(amount, currency)` exported from `@wrapa/ui/src/money.ts`

### `@wrapa/forms` (packages/forms)

- `zod` — Schema validation for all forms and API payloads
- `react-hook-form` — Form state management
- `input-otp` — OTP input component

### `@wrapa/api-client` (packages/api-client)

- `axios` — HTTP client
- `zod` — API payload validation

### `@wrapa/config` (packages/config)

- `formatMoney(amount, currency)` — Always requires explicit currency, never assumes default

### `apps/web` (apps/web)

- `zustand` — Global UI state management
- `sonner` — Toast notifications (Toaster already added to root layout)
- `use-debounce` — Debounce hook for search inputs
- `use-file-picker` — File picker hook
- `tailwindcss-animate` — Animation plugin (registered in globals.css via @plugin)

---

## Core Standards — NEVER Violate These

### TypeScript

- Strict mode is ON — `"strict": true` in tsconfig
- NEVER use `any` for domain models
- All props, API responses, and form values must be typed

### Forms & Validation

- ALL forms must use `react-hook-form` + `zod` schema from `@wrapa/forms`
- NEVER build uncontrolled forms or forms without Zod validation

### Money & Currency

- ALWAYS use `formatMoney(amount, currency)` from `@wrapa/ui`
- NEVER hardcode a currency or assume KES as default
- NEVER display a financial amount without an explicit currency code

### Components

- ALWAYS import Radix UI primitives from `@wrapa/ui`
- ALWAYS use `cn()` from `@wrapa/ui` for combining Tailwind classes
- NEVER use inline styles
- NEVER create a new component that duplicates an existing `@wrapa/ui` component

### State Management

- Use `zustand` for global UI state (active portal, sidebar open, notifications)
- Use `react-hook-form` for form state
- Use React `useState` for local component state only

### API Calls

- ALL API calls must go through `@wrapa/api-client`
- NEVER use `fetch` directly in components
- NEVER hardcode API URLs — use environment variables from `@wrapa/config`

### Routing & Auth

- Route guards live in `proxy.ts` and per-portal `layout.tsx` files
- NEVER do permission checks inside page components
- Auth logic lives in `@wrapa/auth` — NEVER duplicate it

### Status & States

- NEVER create frontend-only fake states
- All status badges must reflect actual backend states

---

## AI-Assisted Development Rules

### CRITICAL — File Change Rules

- NEVER do a full file rewrite
- ALWAYS show only the specific changes needed as copy-paste snippets
- ALWAYS specify the exact file path and line/section to change
- If adding a new import, show ONLY the import line to add
- If adding a new function, show ONLY that function
- If modifying a component, show ONLY the changed JSX section

### Format for changes:

```
FILE: apps/web/src/app/(customer)/customer-marketplace/page.tsx
ACTION: Add this import at the top
---
import { formatMoney } from '@wrapa/ui'
```

### What AI can generate freely:

- UI components using existing `@wrapa/ui` primitives
- Zod schemas in `@wrapa/forms`
- Table layouts and dashboard cards
- API client wiring in `@wrapa/api-client`
- Zustand store slices

### What ALWAYS needs human review before applying:

- Anything in `@wrapa/auth`
- Payment and checkout flows
- Permission and route guard logic
- Any `formatMoney` or financial calculation logic
- `proxy.ts` changes

---

## HMO vs Insurer — Key Difference

HMOs and traditional insurers have SEPARATE portal experiences:

- Insurer Portal: products → policies → claims → settlements
- HMO Portal: hospital network → plans → member enrolment → pre-authorization → provider payments
- HMO onboarding includes a CSV upload of hospital network (validated against KMHFL codes)
- Customer HMO flow is enrolment-based, NOT the same as insurance policy checkout

---

## Kenya-Specific Context

- Primary market is Kenya for now but will expand to Pan African Platform
- Currency: KES (Kenya Shilling) — but always pass explicitly, never assume
- M-Pesa Paybill/Till is a required payment channel
- Regulatory body: IRA (Insurance Regulatory Authority of Kenya)
- HMO accreditation: SHA (Social Health Authority — replaced NHIF in 2024)
- Hospital validation: KMHFL code (Kenya Master Health Facility List)
- 47 counties — county-level filtering needed for hospital finder

---

### Figma Assets — SVG Export Rule

- NEVER reference images/icons via Figma MCP asset proxy URLs
  (e.g. https://www.figma.com/api/mcp/asset/...) in any final component code
- These URLs are temporary/session-based and will break once the MCP connection
  or asset cache expires
- ALWAYS export the actual SVG/image from the Figma MCP connection and save it
  as a permanent local file in apps/web/public/assets/icons/ (for icons/SVGs)
  or apps/web/public/assets/images/ (for photos/raster images)
- Use clear, descriptive lowercase-with-hyphens filenames matching what the
  asset represents (e.g. checkmark.svg, shield-icon.svg) — never generic names
  like icon-1.svg or asset-export.svg
- Reference local files using next/image with a src path like
  "/assets/icons/[filename].svg", matching the existing pattern already used
  elsewhere in the codebase (e.g. ClientIcon/InsuranceIcon in PortalCard)
- Before finishing any task that pulls visual assets from Figma, verify the
  final code contains ZERO references to figma.com/api/mcp/asset/

## Running the Project

```bash
# Run dev server (always from root, not from apps/web)
pnpm --filter web dev

# Install a package to a specific workspace
pnpm add <package> --filter @wrapa/ui        # for shared UI
pnpm add <package> --filter @wrapa/forms     # for forms
pnpm add <package> --filter @wrapa/api-client # for API
pnpm add <package> --filter web              # for web app only

# Run from root always — never cd into apps/web to run pnpm commands
```

## Component Architecture — Where to Put Every Component

### The 3-Question Decision Rule

Every time you build a component, ask these in order:

**Question 1:** Will more than one portal use this with no changes?
→ Yes → `packages/ui/src/primitives/` or `packages/ui/src/modules/`

**Question 2:** Will more than one portal use it but with portal-specific data or logic?
→ Yes → `apps/web/src/components/shared/`

**Question 3:** Is it only for one specific portal?
→ Yes → `apps/web/src/app/(portalname)/components/`

---

### `packages/ui/src/` — Shared across ALL portals

### NEVER Do This

- NEVER build a component inside a portal folder if two or more portals need it
- NEVER duplicate a component — if it exists in `@wrapa/ui`, import it, do not recreate it
- NEVER put business logic (API calls, permissions, portal state) inside `packages/ui` components
- NEVER use CSS modules — use Tailwind + `cn()` from `@wrapa/ui` only

---

### Tailwind v4 Scanning — CRITICAL

Tailwind v4 only generates CSS for files listed in @source in globals.css.
Current sources scanned:

- packages/ui/src/\*_/_.{ts,tsx}
- apps/web/src/components/\*_/_.{ts,tsx}
- apps/web/src/hooks/\*_/_.{ts,tsx}
- apps/web/src/providers/\*_/_.{ts,tsx}

If adding Tailwind classes to a new folder outside these paths,
add a new @source line to apps/web/src/app/globals.css first.
NEVER use inline styles as a workaround — fix the @source instead.

### Responsiveness — MANDATORY

Every UI component and page generated must be fully responsive across all three breakpoints:

- Mobile: default (no prefix) — 0px and up
- Tablet: sm: prefix — 640px and up
- Desktop: lg: prefix — 1024px and up

Rules:

- NEVER build a component for desktop only
- ALWAYS use Tailwind responsive prefixes (sm:, md:, lg:, xl:)
- Mobile first — default classes are mobile, then override for larger screens
- Text sizes must scale: smaller on mobile, larger on desktop
- Padding and spacing must scale: tighter on mobile, more generous on desktop
- Multi-column layouts must stack on mobile (flex-col) and go side by side on desktop (sm:flex-row or lg:grid-cols-2)
- Images must have responsive sizing, never fixed px width only
- Never use fixed pixel widths for full-width containers — use w-full with max-w-\* instead
- Modals and drawers must be full screen on mobile, centered floating on desktop
- Navigation must collapse to a bottom bar or hamburger on mobile

## Version Roadmap (Current: V1.0 — Week 1)

- **V1.0** Design system, auth screens, portal shells, marketplace skeleton, dashboard cards
- **V1.1** Purchase flow, dynamic forms, payment, wallet, claims intake, notifications
- **V1.2** Broker dashboard, corporate onboarding, support UI, settlement dashboards
- **V1.3** Multi-country UX, admin config, feature toggles, mobile app foundation

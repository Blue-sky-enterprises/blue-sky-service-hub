
## Project Overview

This is a **Next.js (App Router) frontend application** using:

* TypeScript
* Tailwind CSS (v4)
* shadcn/ui
* Feature-based architecture
* OpenAPI-generated API client
* Custom **Bluesky Design System**

The architecture is adapted specifically for **Next.js App Router (no src folder)**.

---

## Tech Stack

* Next.js 16+
* React 19+
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Query
* Axios
* next-themes
* OpenAPI (`openapi-typescript`)

---

## Project Structure (Next.js App Router)

```bash
app/
├── (routes)/
├── api-client/
│   └── types.ts
│
├── providers.tsx
├── layout.tsx
├── page.tsx
│
├── core/
│   ├── api/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   └── types/
│
├── features/
│   ├── attendance/
│   ├── clients/
│   ├── employees/
│   ├── auth/
│
├── shared/
│   ├── ui/          # shadcn components
│   ├── layout/
│   └── components/
│
├── styles/
└── assets/
```

---

# ROUTING RULE (STRICT)

## ALL ROUTES MUST FOLLOW THIS STRUCTURE
app/(routes)/(feat)/<feature>/<sub-routes>

---

## RULES

- All routes MUST be inside (routes) group
- Feature-based routes MUST be inside (feat)
- Sub-routes must belong to their feature domain
- No routes allowed outside (routes)

---

## EXAMPLE ROUTES

### AUTH
app/(routes)/(auth)/login/page.tsx → /login  
app/(routes)/(auth)/signup/page.tsx → /signup  

---

### DASHBOARD
app/(routes)/(dashboard)/home/page.tsx → /home  

---

### FEATURES
app/(routes)/(feat)/employees/page.tsx → /employees  
app/(routes)/(feat)/clients/page.tsx → /clients  
app/(routes)/(feat)/attendance/page.tsx → /attendance  

## Feature Structure

```bash
features/<feature>/
├── api/
├── components/
├── hooks/
├── pages/
├── store/
└── types/
```

---

# Architecture Rules (STRICT)

## Feature-Based Design

* All business logic MUST be inside `features/<feature>`
* Features must be isolated
* Avoid cross-feature imports

---

## Layer Responsibilities

| Layer    | Responsibility             |
| -------- | -------------------------- |
| app      | routing, layout, providers |
| core     | global logic               |
| features | business/domain logic      |
| shared   | reusable UI                |

---

# API Layer (IMPORTANT)

## api-client

```bash
app/api-client/
```

* OpenAPI-generated
* MUST NOT be modified

---

## API Rules

* API calls must live in:

  ```
  features/<feature>/api/
  ```
* Use axios from `core/api`
* Use types from `api-client`

---

## Example

```ts
import { api } from "@/app/core/api"
import { paths } from "@/app/api-client/types"

export const getEmployees = async () => {
  return api.get<
    paths["/employees"]["get"]["responses"]["200"]["content"]["application/json"]
  >("/employees")
}
```

---

# React Query Rules (STRICT)

## Setup

* Defined in:

  ```
  app/providers.tsx
  ```

---

## Rules

* MUST use React Query for all server state
* NEVER call API inside components
* ALWAYS use hooks

---

## Hook Rules

* One hook per file (MANDATORY)
* Naming:

  ```
  use<Feature><Action>
  ```

### Example

```ts
export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  })
}
```

---

# Authentication

## Location

```
features/auth/
```

---

## Rules

* Use axios interceptors
* Handle 401 globally
* Prefer secure cookies

---

## Interceptor Example

```ts
api.interceptors.response.use(
  res => res,
  async (error) => {
    if (error.response?.status === 401) {
      // logout / refresh
    }
    return Promise.reject(error)
  }
)
```

---

# UI & DESIGN SYSTEM (CRITICAL)

## Bluesky Design System

All UI must follow the **Bluesky Design System** defined in:

```
app/globals.css
```

---

## Design Tokens

Use CSS variables (NO hardcoding).

### ✅ Correct

```tsx
<div className="bg-bs-card text-bs-primary border-bs shadow-bs" />
```

### ❌ Incorrect

```tsx
<div className="bg-white text-black" />
```

---

## Utility Classes

Use predefined utilities:

* `bg-bs-*`
* `text-bs-*`
* `border-bs-*`
* `shadow-bs-*`
* `rounded-bs-*`

---

## Component Classes

Reusable patterns:

* `bs-card`
* `bs-input`
* `bs-btn-primary`
* `bs-btn-ghost`
* `bs-label`
* `bs-divider`

---

## shadcn Rules

Location:

```
app/shared/ui/
```

Rules:

* DO NOT modify base components heavily
* Extend via `className` + `cn()`
* Always apply Bluesky tokens

---

## Example

```tsx
import { Button } from "@/app/shared/ui/button"

<Button className="bg-bs-accent text-bs-on-accent shadow-bs-glow">
  Submit
</Button>
```

---

## UI Priority

1. shadcn components
2. shared/components
3. feature components

---

## Dark Mode

* Controlled via `next-themes`
* Uses `.dark` class
* DO NOT manually override styles

---

## Typography

* Headings → Syne
* Body → DM Sans

---

## Animations

Use predefined:

* `animate-fade-up`
* `animate-pulse-glow`

---

## UI Restrictions (STRICT)

### MUST

* Use Bluesky tokens
* Use shadcn components
* Use `cn()`

### MUST NOT

* Hardcode colors
* Use random Tailwind values
* Inline styles
* Duplicate UI patterns

---

# State Management

## Feature State

```
features/<feature>/store/
```

## Global State

```
app/store.ts (only if necessary)
```

---

# Server vs Client Components

## Default

* Server Components

## Use `"use client"` ONLY when:

* using hooks
* handling events
* local state

---

# Performance Rules

* Prefer server components
* Lazy load heavy UI
* Avoid unnecessary re-renders

---

# Naming Conventions

| Type       | Convention   |
| ---------- | ------------ |
| Components | PascalCase   |
| Hooks      | useSomething |
| Files      | kebab-case   |
| Types      | PascalCase   |

---

# Imports

## Allowed

* same feature ✅
* core ✅
* shared ✅

## Avoid

* cross-feature ❌

---

# Commands

```bash
npm run start:dev
npm run build
npm run start
npm run lint
npm run gen:api
```

---

# Agent Responsibilities

Agents MAY:

* Create features
* Add API integrations
* Build reusable components
* Improve performance

---

# Agent Restrictions

Agents MUST NOT:

* Break feature boundaries
* Call APIs in components
* Modify api-client
* Add unnecessary deps
* Mix business logic into UI

---

# Best Practices

* Keep features isolated
* Use typed APIs
* Extract logic into hooks
* Follow design system strictly
* Prefer clarity over shortcuts

---

# Final Notes

* This is a **scalable architecture**
* Designed for long-term maintainability
* Enforces strict separation of concerns
* UI must follow the design system consistently

---

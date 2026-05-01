# agents.md

## Project Overview

This is a **Next.js (App Router) frontend application** using:

* TypeScript
* Tailwind CSS
* shadcn/ui
* Feature-based architecture
* OpenAPI-generated API client

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

```id="h3k9ls"
app/
├── (routes)/                # route groups (optional)
│
├── api-client/              # generated OpenAPI types & client
│   └── types.ts
│
├── providers.tsx            # global providers (React Query, Theme, etc.)
├── layout.tsx               # root layout
├── page.tsx                 # root page
│
├── core/                    # global logic
│   ├── api/                 # axios instance, base config
│   ├── hooks/               # reusable hooks
│   ├── utils/
│   ├── constants/
│   └── types/
│
├── features/                # domain-based modules
│   ├── attendance/
│   ├── clients/
│   ├── employees/
│   ├── auth/
│
├── shared/                  # reusable UI
│   ├── ui/                  # shadcn components
│   ├── layout/              # navbar, sidebar, etc.
│   └── components/
│
├── styles/
└── assets/
```

---

## Feature Structure

```id="u9a2xm"
features/<feature>/
├── api/           # API calls (uses api-client + axios)
├── components/    # feature UI
├── hooks/         # React Query hooks
├── pages/         # route-level components
├── store/         # zustand/redux state
└── types/
```

---

# Architecture Rules (STRICT)

## 1. Feature-Based Design

* All business logic MUST be inside `features/<feature>`
* Features must be isolated
* Avoid cross-feature imports

---

## 2. Layer Responsibilities

| Layer    | Responsibility             |
| -------- | -------------------------- |
| app      | routing, layout, providers |
| core     | global logic               |
| features | business/domain logic      |
| shared   | reusable UI                |

---

# API Layer (IMPORTANT)

## api-client (Generated)

```id="d2m8qp"
app/api-client/
```

* Contains OpenAPI-generated types
* MUST NOT be modified manually

---

## API Usage Pattern

* API calls must live in:

  ```
  features/<feature>/api/
  ```

* Use:

  * axios instance from `core/api`
  * types from `api-client`

---

## Example

```ts id="m1z9xp"
import { api } from "@/app/core/api"
import { paths } from "@/app/api-client/types"

export const getEmployees = async () => {
  return api.get<paths["/employees"]["get"]["responses"]["200"]["content"]["application/json"]>("/employees")
}
```

---

# React Query Rules

## Setup

* Must be configured in:

  ```
  app/providers.tsx
  ```

---

## Usage

* Hooks must be inside:

  ```
  features/<feature>/hooks/
  ```

---

## Example

```ts id="x7r4cd"
export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  })
}
```

---

## Rules

* NEVER call API directly in components
* ALWAYS use hooks
* USE consistent query keys

---

# Authentication

## Location

* `features/auth/`

---

## Rules

* Store tokens securely (cookies preferred)
* Use axios interceptors for auth handling
* Handle 401 globally

---

## Interceptors

```ts id="n3p8qs"
api.interceptors.response.use(
  res => res,
  async (error) => {
    if (error.response?.status === 401) {
      // logout or refresh
    }
    return Promise.reject(error)
  }
)
```

---

## Route Protection

* Use:

  * layout guards
  * middleware (if needed)

---

# UI Rules (STRICT)

## Priority

1. `shared/ui` (shadcn)
2. `shared/components`
3. feature components

---

## Rules

* Do NOT modify base shadcn components heavily
* Extend via wrappers
* Maintain design consistency
* Support dark mode

---

# Styling

* Tailwind CSS only
* No inline styles
* Follow spacing system

---

# State Management

## Feature State

```id="j4k2bn"
features/<feature>/store/
```

## Global State

```id="p9d1fk"
app/store.ts (only if necessary)
```

---

# Server vs Client Components

## Default

* Use Server Components

## Use "use client" ONLY when:

* using hooks
* handling events
* managing state

---

# Performance Rules

* Prefer server components
* Lazy load heavy components
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

* cross-feature imports ❌

---

# Commands

```id="q8w2zx"
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
* Refactor for performance

---

# Agent Restrictions

Agents MUST NOT:

* Break feature boundaries
* Call APIs inside components
* Modify generated api-client
* Add unnecessary dependencies
* Mix business logic into UI

---

# Best Practices

* Keep features independent
* Use typed APIs
* Extract logic into hooks
* Maintain consistent structure
* Prefer readability over shortcuts

---

# Final Notes

* This is a **scalable frontend architecture**
* Designed to align with backend modular structure
* Maintain strict separation of concerns
* Follow patterns consistently

---

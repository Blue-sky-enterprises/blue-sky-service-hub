## Project Overview

This is a **NestJS backend** built using **Hexagonal Architecture (Ports & Adapters)**.

The system is designed for:

* High scalability
* Strong separation of concerns
* Strict architectural boundaries
* Maintainability at scale

---

## Tech Stack

* NestJS 11+
* TypeScript (strict)
* Prisma ORM
* Fastify / Express (adapter)
* OpenAPI (Swagger + Scalar)
* ESLint (with boundaries enforcement)
* Pino (logging)

---

## Architecture Overview

```id="p7f2az"
src/
├── core/          # Framework-specific cross-cutting concerns
├── common/        # Pure shared logic (framework-agnostic)
├── modules/       # Feature-based hexagons
├── shared/        # Shared infrastructure (Prisma)
├── config/        # Environment & app configuration
```

---

# Core Architectural Principles (STRICT)

## 1. Hexagonal Architecture (MANDATORY)

Each feature follows:

```id="c2l9ds"
modules/<feature>/
├── domain/           # Business logic (pure)
├── application/      # Use cases
├── infrastructure/   # External adapters
├── presentation/     # Controllers (entry points)
```

---

## 2. Dependency Rule (CRITICAL)

Dependencies must flow **inward only**:

```id="g3m8rk"
presentation → application → domain
infrastructure → application → domain
```

### Forbidden:

* domain importing anything ❌
* application importing infrastructure ❌
* presentation accessing domain directly ❌

---

## 3. Layer Responsibilities

### Domain (CORE BUSINESS)

* Entities
* Value Objects
* Domain Exceptions
* Ports (interfaces)

Rules:

* No NestJS
* No DB logic
* No external dependencies

---

### Application (USE CASES)

* Orchestrates business logic
* Uses domain models
* Calls ports

Rules:

* No framework-specific code
* No direct DB access

---

### Infrastructure (ADAPTERS)

* Prisma repositories
* External APIs
* Mappers

Rules:

* Implements domain ports
* Handles persistence and integrations

---

### Presentation (ENTRY POINTS)

* Controllers
* HTTP request/response handling

Rules:

* Call application layer ONLY
* No business logic

---

# Core & Common Rules

## core/

* Framework-specific logic ONLY
* Guards, interceptors, filters, decorators

## common/

* Pure reusable logic
* No framework dependencies

---

# Database & Prisma

## Location

```id="v5j1kl"
src/database/prisma/
```

## Rules

* Prisma must only be used inside:

  ```
  infrastructure/persistence/
  ```
* Never access Prisma directly in:

  * controllers ❌
  * application ❌
  * domain ❌

---

# API & OpenAPI

* Swagger must be kept updated
* API contracts must match frontend OpenAPI usage
* Avoid breaking changes

---

# Validation

* Use `class-validator`
* Validate all incoming DTOs
* Never trust client input

---

# Error Handling

* Use centralized exception filters
* Use domain-specific exceptions in domain layer
* Maintain consistent error structure

---

# Logging

* Use Pino logger
* No raw console logs (ESLint enforced)

---

# Security

* Use guards for authentication/authorization
* Role-based access must be implemented via core/guards
* Never expose sensitive data

---

# ESLint Architecture Enforcement

The project uses:

* `eslint-plugin-boundaries`

### Enforced Rules:

```id="z9w3pq"
domain → cannot import anything
application → can import domain
infrastructure → can import domain + application
presentation → can import application only
```

Agents MUST follow these rules strictly.

---

# Coding Standards

* TypeScript strict mode
* No `any` (unless explicitly allowed)
* Explicit return types (preferred)
* Small, focused functions
* Clean, readable code

---

# Naming Conventions

| Type      | Convention |
| --------- | ---------- |
| Classes   | PascalCase |
| Functions | camelCase  |
| Files     | kebab-case |
| Constants | UPPER_CASE |

---

# Module Structure Rules

Each module MUST include:

```id="r8h2tx"
domain/
application/
infrastructure/
presentation/
<feature>.module.ts
```

---

# Agent Responsibilities

Agents MAY:

* Create new modules following hexagonal structure
* Add use-cases
* Implement repositories (Prisma)
* Create controllers
* Improve performance and structure

---

# Agent Restrictions (STRICT)

Agents MUST NOT:

* Break layer boundaries
* Add business logic in controllers
* Use Prisma outside infrastructure
* Introduce tight coupling between modules
* Bypass domain layer

---

# Best Practices

* Keep domain pure
* Use ports for abstraction
* Map DB models to domain models
* Keep controllers thin
* Maintain strict separation

---

# Commands

```id="m2x7vd"
npm run start:dev   # start dev server
npm run build       # build project
npm run lint        # lint code
npm run lint:fix    # fix lint issues
```

---

# Environment & Config

* Use `@nestjs/config`
* Validate environment variables
* Do not hardcode values

---

# Docker

* Use provided Dockerfiles
* Maintain environment parity (dev/prod)

---

# Final Notes

* This is a **strict architecture project**
* Scalability and maintainability are top priorities
* Always follow boundaries over shortcuts
* ESLint rules reflect architectural constraints

---

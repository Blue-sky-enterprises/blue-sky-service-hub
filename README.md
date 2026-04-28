# 🌤️ Blue Sky Service Hub

A scalable full-stack platform for **service management** and **workforce hiring**, built using **Next.js (Frontend)**, **NestJS (Backend)**, and **SQL (Prisma ORM)**.

Designed for **Blue Sky Enterprises (Kerala)** to manage services like housekeeping, security, home nursing, and hiring operations efficiently.

---

## 🚀 Features

### 🏢 Services

* House Keeping
* Home Nursing
* Security
* Vehicle Parking
* Clock Room
* Real Estate

---

### 👷 Hiring

* Cleaning Staff
* Security Staff
* Room Boy
* Application & onboarding system

---

### 📋 Admin Operations

* Service request management
* Staff allocation
* Job tracking
* Inquiry management

---

### 🎁 Benefits

* Bonus handling
* ESI support

---

## 🛠️ Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS / ShadCN UI

### Backend

* NestJS (Modular + Hexagonal Architecture)
* TypeScript

### Database

* SQL (PostgreSQL / MySQL)
* Prisma ORM

---

# 🧠 Architecture Overview

This project follows **Hexagonal Architecture (Ports & Adapters)**:

* **Domain Layer** → Core business logic
* **Application Layer** → Use cases (orchestration)
* **Infrastructure Layer** → DB, APIs, external services
* **Presentation Layer** → Controllers (entry points)

---

# 📁 Backend Structure (NestJS)

```
src/
├── main.ts                   # App bootstrap
├── app.module.ts             # Root module
│
├── core/                     # Framework concerns
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   ├── decorators/
│   ├── constants/
│   └── middleware/
│
├── common/                   # Pure reusable logic
│   ├── domain/
│   ├── dto/
│   └── utils/
│
├── modules/                  # Feature modules
│   └── [feature-name]/
│       ├── domain/           # Business logic
│       │   ├── entities/
│       │   ├── ports/
│       │   └── exceptions/
│       │
│       ├── application/      # Use cases
│       │   ├── use-cases/
│       │   └── dto/
│       │
│       ├── infrastructure/   # External adapters
│       │   ├── persistence/
│       │   ├── external-api/
│       │   └── mappers/
│       │
│       ├── presentation/     # Controllers
│       │   └── controllers/
│       │
│       └── [feature].module.ts
│
├── shared/                   # Shared infra
│   └── prisma/
│
├── config/                   # Config & env validation
├── database/                 # Prisma schema & migrations
│   └── prisma/
│
├── docker/                   # Docker configs
│   ├── dev.Dockerfile
│   └── prod.Dockerfile
│
├── docker-compose.yml
└── .env
```

---

# 🎨 Frontend Structure (Next.js)

```
src/
│
├── app/                     # App setup
│   ├── router.tsx
│   ├── store.ts
│   └── providers.tsx
│
├── core/                    # Global logic
│   ├── api/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   └── types/
│
├── features/                # Feature-based modules
│   ├── attendance/
│   ├── clients/
│   ├── employees/
│   ├── auth/
│
├── shared/                  # Reusable UI
│   ├── ui/
│   ├── layout/
│   └── components/
│
├── assets/
├── styles/
└── main.tsx
```

---

## 📦 Feature Module Structure (Frontend)

```
features/
└── [feature-name]/
    ├── api/            # API calls
    ├── components/     # UI components
    ├── hooks/          # Business logic hooks
    ├── pages/          # Screens
    ├── store/          # State management
    └── types/          # Type definitions
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/blue-sky-service-hub.git
cd blue-sky-service-hub
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

### 3️⃣ Environment Variables

Create `.env` in `/server`:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/bluesky"
JWT_SECRET=your_secret
```

---

### 4️⃣ Database Setup (Prisma)

```bash
npx prisma migrate dev
npx prisma generate
```

---

### 5️⃣ Run Application

#### Backend

```bash
npm run start:dev
```

#### Frontend

```bash
npm run dev
```

---

## 🔐 Security

* JWT Authentication
* Role-based access control (RBAC)
* DTO validation (class-validator)
* Global exception filters

---

## 🌿 Git Workflow

* `main` → Production
* `develop` → Development

Feature example:

```bash
git checkout develop
git checkout -b feature/service-module
```

---

## 🧾 Commit Convention

* `feat:` New feature
* `fix:` Bug fix
* `refactor:` Code improvement
* `docs:` Documentation

---

## 📌 Future Enhancements

* 📱 Mobile App
* 📍 Real-time tracking
* 💳 Payment integration
* 🤖 Smart staff allocation
* 📊 Analytics dashboard

---

## 📞 Contact

**Blue Sky Enterprises**
📧 [bluesky.enterprisestsr@gmail.com](mailto:bluesky.enterprisestsr@gmail.com)
📱 9497760030 | 8606650780 | 6282004572

---

## 🏷️ License

MIT License (or Proprietary if private)

---

## ⭐ Support

If you find this project useful, give it a ⭐ on GitHub.

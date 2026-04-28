# Fixora

Fixora is a full-stack local services marketplace where customers can discover providers, create bookings, and leave reviews, while providers manage services and booking lifecycle states.

This repository contains:
- `frontend/`: React + Vite + TypeScript client UI
- `backend/`: Node.js + Express + TypeScript REST API
- `architecture/`: ER, UML, and sequence diagrams

## Architecture Diagrams

- ER Diagram: `architecture/fixora_er_diagram.jpg`
- UML Class Diagram: `architecture/fixora_uml_class_diagram.jpg`
- Booking Sequence Diagram: `architecture/fixora_booking_sequence.jpg`

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite 8
- Tailwind CSS 3
- React Router
- Axios
- Framer Motion + Lucide Icons

### Backend
- Node.js + Express 5
- TypeScript
- MongoDB + Mongoose
- JWT authentication (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- CORS + dotenv

## Core Domain Model

- **Users**: `customer`, `provider`, `admin` (Mongoose discriminator-based)
- **Service**: Provider offerings with category, base price, and location
- **Booking**: Customer-provider booking lifecycle (`pending`, `accepted`, `rejected`, `in_progress`, `completed`, `cancelled`)
- **Review**: One review per booking, updates provider average rating
- **Payment**: Strategy-based processing model (`card`, `upi`, `cash`, `wallet`)

## Design Patterns Used (Backend)

- **Repository Pattern**: shared generic base repository + domain repositories
- **Service Layer Pattern**: business logic in services, thin controllers
- **Factory Pattern**: role-aware user creation (`Customer`, `Provider`, `Admin`)
- **Strategy Pattern**: pluggable payment method processing
- **Observer Pattern**: booking lifecycle event emitter + listeners

## Repository Structure

```text
Fixora/
├── architecture/
│   ├── fixora_booking_sequence.jpg
│   ├── fixora_er_diagram.jpg
│   └── fixora_uml_class_diagram.jpg
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── common/database/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── patterns/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   └── types/
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.ts
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection string (MongoDB Atlas or local MongoDB)

## Environment Variables

Create `backend/.env`:

```env
PORT=5005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
```

Important:
- Keep secrets out of source control.
- Rotate any previously exposed credentials before production use.

## Local Development

Run frontend and backend in separate terminals.

### 1. Backend

```bash
cd backend
npm install
npm run build
npm run dev
```

Backend API runs at `http://localhost:5005` (default from `.env`).

For active TypeScript development (auto-rebuild on source changes), run this in a second backend terminal:

```bash
cd backend
npx tsc --watch
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at Vite default URL (usually `http://localhost:5173`).

The frontend API client is configured to call:
- `http://localhost:5005/api`

## Build for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## API Overview

Base URL: `/api`

### Health
- `GET /health`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/profile` (Bearer token)

### Services
- `GET /services` (public search via `?q=`)
- `GET /services/mine` (provider)
- `POST /services` (provider)
- `PUT /services/:id` (provider)
- `DELETE /services/:id` (provider)

### Bookings
- `POST /bookings` (customer)
- `GET /bookings/my` (authenticated user)
- `PATCH /bookings/:id/cancel` (customer)
- `PATCH /bookings/:id/accept` (provider)
- `PATCH /bookings/:id/reject` (provider)
- `PATCH /bookings/:id/status` (provider/admin)

### Reviews
- `GET /reviews/provider/:providerId` (public)
- `POST /reviews` (customer)
- `PATCH /reviews/:id` (customer)
- `DELETE /reviews/:id` (customer)

### Admin
- `GET /admin/users` (admin)
- `GET /admin/providers/pending` (admin)
- `PATCH /admin/providers/:id/approve` (admin)
- `PATCH /admin/disputes/:bookingId/resolve` (admin)
- `DELETE /admin/users/:id` (admin)

## Example Requests

### Register

```bash
curl -X POST http://localhost:5005/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "StrongPassword123",
    "role": "customer"
  }'
```

### Login

```bash
curl -X POST http://localhost:5005/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "StrongPassword123"
  }'
```

### Authenticated Profile

```bash
curl http://localhost:5005/api/auth/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Frontend Routes

- `/` Home
- `/services` Services listing
- `/service/:id` Service detail
- `/booking/flow/:id` Booking wizard (protected)
- `/dashboard` Dashboard (protected)
- `/login`
- `/register`

## Current Implementation Status

- Backend API and domain architecture are implemented with typed DTOs and role-based middleware.
- Frontend has polished UI flows and authentication integration (`login`, `register`, `profile`).
- Several UI pages currently use mock data for catalog/dashboard presentation and can be progressively wired to live endpoints.

## Scripts

### Backend (`backend/package.json`)

- `npm run build` - Compile TypeScript to `dist/`
- `npm run dev` - Run compiled server with nodemon (`dist/` watcher)
- `npm start` - Start server from `dist/server.js`

### Frontend (`frontend/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Type-check and create production bundle
- `npm run preview` - Preview production bundle
- `npm run lint` - Lint source

## Suggested Next Steps

- Add backend test suite (unit + integration)
- Replace remaining frontend mock data with API-backed data fetching
- Add refresh-token/session invalidation strategy
- Add API rate limiting, input validation, and centralized request validation layer
- Add Docker setup and CI pipeline for consistent deployments

## Report
link - https://docs.google.com/document/d/1gYIOTdsuSGpbJsAf5az-bfGX_20RrBJm8Hu2dYHmnfs/edit?tab=t.0

# Technical Documentation

## Batch Operations UI

**Prepared by:** Bharath Kumar Chaduvula
**Version:** 1.0
**Date:** 2026-11-05
**Document Status:** Final

---

## 1. Overview

This document is a technical reference for developers working on or maintaining the **Batch Operations UI** system. It covers environment setup, architecture decisions, coding patterns, build processes, and development workflows.

---

## 2. Technology Stack — Detailed

### 2.1 Frontend

| Technology | Version | Purpose | Why Chosen |
|---|---|---|---|
| React | 19 | UI component framework | Industry standard, declarative, component-based |
| JSX | — | Component syntax | Readable HTML-in-JS syntax for React |
| Vite | Latest | Build tool and dev server | Extremely fast HMR, modern ESM support |
| Tailwind CSS | 4 | Utility-first styling | Rapid styling without custom CSS files |
| Lucide React | Latest | Icon library | Lightweight, tree-shakeable SVG icons |
| Axios | Latest | HTTP client | Promise-based, clean API, interceptor support |

### 2.2 Backend

| Technology | Version | Purpose | Why Chosen |
|---|---|---|---|
| Node.js | LTS | JavaScript runtime | Same language as frontend; non-blocking I/O |
| Express | 5 | Web framework | Minimal, flexible, widely used |
| CORS | Latest | Cross-origin middleware | Required for browser → API communication |
| express.json() | Built-in | Body parser | Required for future POST/PUT endpoints |

### 2.3 Tooling

| Tool | Purpose |
|---|---|
| npm | Package management |
| Git | Version control |
| Vercel CLI | Frontend deployment |

---

## 3. Development Environment Setup

### 3.1 Prerequisites

| Requirement | Minimum Version |
|---|---|
| Node.js | v18 LTS or higher |
| npm | v9 or higher |
| Git | Any recent version |
| Browser | Chrome / Firefox / Edge (modern) |

### 3.2 Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd "Batch Operations UI/project"

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3.3 Run in Development Mode

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Server starts at http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Dev server starts at http://localhost:5173
```

> [!NOTE]
> Both servers must be running simultaneously for the application to function. The frontend auto-detects development mode and uses `http://localhost:5000` as the API base URL.

### 3.4 Environment Variables

**Frontend (`.env.local` or Vercel settings):**
```env
VITE_API_BASE_URL=https://your-backend-url.example.com
```

- In development: automatically uses `http://localhost:5000` (no `.env` file needed).
- In production: set `VITE_API_BASE_URL` to the deployed backend URL.

**Backend:**
```env
PORT=5000
```

- Defaults to `5000` if not set.

---

## 4. Architecture Decisions

### 4.1 Separation of Frontend and Backend

The project intentionally keeps the frontend and backend as two independent applications in separate directories with their own `package.json`. This allows them to be:
- Deployed to different hosting platforms (Vercel for frontend, Node.js host for backend).
- Developed and updated independently.

### 4.2 Server-Side Filtering and Pagination

Filtering and pagination are performed on the backend, not the frontend. This is architecturally correct because:
- In a future database-backed version, filtering will happen in SQL queries.
- It keeps the frontend stateless relative to the full dataset.
- It prevents sending the entire dataset over the network.

### 4.3 In-Memory Data Layer

For v1.0 (assignment scope), data is stored in a JavaScript array (`batches.js`). This was chosen for simplicity. The controller is fully decoupled from the data source, so replacing the array with database calls requires only changes to `batchController.js`.

### 4.4 Race Condition Prevention in useEffect

```js
useEffect(() => {
  let active = true
  fetchBatches(...)
    .then((result) => {
      if (!active) return   // ← Prevents stale update
      setBatches(result.data)
    })
  return () => { active = false }   // ← Cleanup on unmount or re-run
}, [page, search, status, centre, retryKey])
```

This pattern prevents a slower previous request from overwriting the results of a newer request.

### 4.5 Retry Mechanism via `retryKey`

Rather than duplicating fetch logic, `retryKey` is a numeric counter that is included in the `useEffect` dependency array. Incrementing it (`setRetryKey(k => k + 1)`) forces the effect to re-run, retrying the same request with current filter parameters.

### 4.6 `updateFilter` Higher-Order Function

```js
const updateFilter = (setter) => (value) => {
  setter(value)
  setPage(1)
}
```

Whenever the user changes a filter, the page must reset to 1. Rather than duplicating `setPage(1)` in every handler, `updateFilter` wraps any state setter and adds the page reset.

---

## 5. Coding Standards and Conventions

### 5.1 File Naming

| Type | Convention | Example |
|---|---|---|
| React components | PascalCase `.jsx` | `BatchTable.jsx` |
| Services | camelCase `.js` | `batchService.js` |
| Backend modules | camelCase `.js` | `batchController.js` |
| Config files | kebab-case or conventional | `vite.config.js` |

### 5.2 Component Structure

Each React component file follows this order:
1. Imports
2. Helper functions / constants
3. Default exported component function
4. Props documented inline or in this doc

### 5.3 Styling

All styling uses **Tailwind CSS utility classes** applied directly in JSX. No separate `.css` files for components. `index.css` only contains the Tailwind import directive.

Custom colours used throughout:

| Token | Hex | Usage |
|---|---|---|
| Brand Orange | `#f36d3d` / `#ee7543` | Primary actions, active states |
| Background | `#faf8f5` | App background |
| Card White | `#ffffff` | Card backgrounds |
| Border | `#eee5dc` | Card and table borders |
| Text Primary | `#3c3029` | Headings |
| Text Muted | `#9b8c82` | Subtext, pagination |
| Running Green | `#3f9560` | Running status |
| Upcoming Amber | `#bd8429` | Upcoming status |
| Completed Grey | `#7b8085` | Completed status |

### 5.4 Backend Conventions

- Use `Number.parseInt(value, 10)` with explicit radix (not `parseInt`).
- Use `Number.isInteger()` for validation (not truthy checks).
- Return early on validation failure with `return res.status(400).json(...)`.
- Use `const` for all variables that are not reassigned.
- Destructure `req.query` at the top of the controller function.

---

## 6. Build Process

### 6.1 Frontend Build

```bash
cd frontend
npm run build
```

- Vite bundles the React app into `frontend/dist/`.
- Output: `dist/index.html`, `dist/assets/index-*.js`, `dist/assets/index-*.css`.
- The build optimises and tree-shakes all imports.

### 6.2 Frontend Preview (Test Production Build Locally)

```bash
cd frontend
npm run preview
# Serves dist/ at http://localhost:4173
```

### 6.3 Backend (No Build Step)

Node.js runs the source files directly. No compilation or bundling required.

---

## 7. npm Scripts Reference

### Backend (`backend/package.json`)

| Script | Command | Description |
|---|---|---|
| `start` | `node server.js` | Production start |
| `dev` | `nodemon server.js` | Development with auto-restart |

### Frontend (`frontend/package.json`)

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start development server |
| `build` | `vite build` | Build production bundle |
| `preview` | `vite preview` | Serve production build locally |

---

## 8. Data Flow Technical Detail

### 8.1 Frontend Request Lifecycle

```
useEffect runs (on mount or dependency change)
  → setLoading(true), setError('')
  → fetchBatches({ page, limit, search, status, centre })
    → axios.get('/api/batches', { params })
      → HTTP GET https://api-host/api/batches?page=1&search=...
  → .then(): setBatches(data), setPagination(pagination)
  → .catch(): setError('Unable to load batches...')
  → .finally(): setLoading(false)
```

### 8.2 Backend Filter Logic (Pseudo-code)

```
function getBatches(req, res):
  parse: search, status, centre, page, limit from query
  validate: page ≥ 1, 1 ≤ limit ≤ 100, status in allowed set
  
  normalise:
    normalizedSearch = search.trim().toLowerCase()
    normalizedCentre = centre.trim().toLowerCase()
  
  filter:
    for each batch in batches[]:
      matchesSearch = normalizedSearch is empty
                      OR batch.batchCode contains normalizedSearch
                      OR batch.course contains normalizedSearch
      matchesStatus = status is empty OR batch.status equals status
      matchesCentre = normalizedCentre is empty
                      OR batch.centre.toLowerCase equals normalizedCentre
      include if all three match
  
  paginate:
    totalRecords = filtered.length
    start = (page - 1) * limit
    items = filtered[start ... start + limit]
    totalPages = ceil(totalRecords / limit)
  
  respond: { success: true, data: items, pagination: {...} }
```

---

## 9. Known Technical Debt

| Item | Description | Planned Resolution |
|---|---|---|
| In-memory data | Server restart loses data | Replace with database (Phase 2) |
| Open CORS | All origins allowed | Restrict to known origins in production |
| No authentication | Anyone can call the API | Add JWT or session auth (Phase 2) |
| No tests | No unit or integration tests | Add Vitest (frontend) + Supertest (backend) |
| Hardcoded centre list | Frontend `FilterBar` has static array | Fetch from `/api/centres` endpoint |
| No request logging | No access or error logging on backend | Add Morgan or Winston |

---

## 10. Extending the System

### Adding a New Batch Field

1. Add the field to each object in `backend/data/batches.js`.
2. No change needed in `batchController.js` (returns all fields).
3. Add a new `<td>` column in `frontend/src/components/BatchTable.jsx`.
4. Add the column heading to the `thead` headers array.

### Adding a New Filter

1. Add a query parameter to `batchController.js` filter logic.
2. Add a new `<select>` or `<input>` to `FilterBar.jsx`.
3. Add the corresponding state variable to `BatchOperationsPage.jsx`.
4. Pass the new filter to `fetchBatches()` in `batchService.js`.

### Replacing In-Memory Data with a Database

1. Install a database driver (e.g., `pg` for PostgreSQL, `mongoose` for MongoDB).
2. Replace the import of `batches.js` in `batchController.js` with a database query.
3. Convert `getBatches` to an `async` function with `await db.query(...)`.
4. Update `app.js` to establish the database connection on startup.

---

*This document is prepared for educational and assignment purposes.*


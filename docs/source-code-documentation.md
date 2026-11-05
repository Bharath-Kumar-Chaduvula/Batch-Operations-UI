# Source Code Documentation

## Batch Operations UI

**Prepared by:** Bharath Kumar Chaduvula
**Version:** 1.0
**Date:** 2026-11-05
**Document Status:** Final

---

## 1. Overview

This document describes every source file in the **Batch Operations UI** project — its location, purpose, exports, props, state, functions, and how it relates to other modules.

---

## 2. Project Source Tree

```
project/
├── backend/
│   ├── controllers/
│   │   └── batchController.js      ← Business logic: filter, paginate, respond
│   ├── data/
│   │   └── batches.js              ← In-memory batch data array
│   ├── routes/
│   │   └── batchRoutes.js          ← Express router: GET /api/batches
│   ├── app.js                      ← Express app: middleware + route mounting
│   ├── package.json                ← Backend dependencies and scripts
│   └── server.js                   ← HTTP listener entry point
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   │   └── hero.png            ← Hero image asset
    │   ├── components/
    │   │   ├── BatchTable.jsx      ← Data table component
    │   │   ├── FilterBar.jsx       ← Search + filter controls
    │   │   ├── PaginationFooter.jsx← Pagination navigation
    │   │   └── Sidebar.jsx         ← Left navigation sidebar
    │   ├── pages/
    │   │   └── BatchOperationsPage.jsx ← Page-level state manager
    │   ├── services/
    │   │   └── batchService.js     ← Axios API client
    │   ├── App.jsx                 ← Root layout component
    │   ├── index.css               ← Global CSS (Tailwind directives)
    │   └── main.jsx                ← React DOM entry point
    ├── index.html                  ← HTML shell
    ├── package.json                ← Frontend dependencies and scripts
    └── vite.config.js              ← Vite build configuration
```

---

## 3. Backend Source Files

---

### `backend/server.js`

**Type:** Entry point
**Lines:** 7

**Purpose:** Reads the `PORT` environment variable, starts the HTTP server, and logs the listening URL.

**Dependencies:** `./app`

**Key Logic:**
```js
const port = Number.parseInt(process.env.PORT || '5000', 10)
app.listen(port, () => { ... })
```

**Environment Variables:**

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | TCP port for the HTTP server |

---

### `backend/app.js`

**Type:** Express application configuration
**Lines:** 15

**Purpose:** Creates the Express application instance, registers middleware, defines the health endpoint, and mounts batch routes.

**Dependencies:** `express`, `cors`, `./routes/batchRoutes`

**Middleware Stack (in order):**
1. `cors()` — allows cross-origin requests from any origin.
2. `express.json()` — parses JSON request bodies.

**Routes:**
| Method | Path | Handler |
|---|---|---|
| `GET` | `/` | Inline: returns `{ message: "Batch Operations API is running" }` |
| `GET` | `/api/batches` | `batchRoutes` router |

**Exports:** `app` (Express instance)

---

### `backend/routes/batchRoutes.js`

**Type:** Express Router
**Lines:** 8

**Purpose:** Defines the route mapping for the batch resource.

**Dependencies:** `express`, `../controllers/batchController`

**Routes Defined:**
| Method | Path | Controller Function |
|---|---|---|
| `GET` | `/` (mounted at `/api/batches`) | `getBatches` |

**Exports:** `router`

---

### `backend/controllers/batchController.js`

**Type:** Controller module
**Lines:** 38

**Purpose:** Handles the `GET /api/batches` request. Validates parameters, filters the batch array, paginates results, and returns a JSON response.

**Dependencies:** `../data/batches`

**Constants:**
```js
const allowedStatuses = new Set(['Running', 'Upcoming', 'Completed'])
```

**Function: `getBatches(req, res)`**

| Step | Description |
|---|---|
| 1. Parse | Extract `search`, `status`, `centre`, `page`, `limit` from `req.query` |
| 2. Validate | Check `page ≥ 1`, `1 ≤ limit ≤ 100`, `status` in allowedStatuses |
| 3. Filter | Apply search, status, and centre filters to the batches array |
| 4. Paginate | Slice filtered array by `start = (page-1)*limit` |
| 5. Respond | Return `{ success, data, pagination }` JSON |

**Error Responses:**
| Condition | Status | Body |
|---|---|---|
| Invalid page or limit | `400` | `{ error: "page must be at least 1 and limit must be between 1 and 100" }` |
| Invalid status value | `400` | `{ error: "status must be one of: Running, Upcoming, Completed" }` |

**Exports:** `{ getBatches }`

---

### `backend/data/batches.js`

**Type:** Data module
**Lines:** 16

**Purpose:** Provides the in-memory array of 12 training batch records.

**Type Definition:**
```ts
type Batch = {
  batchCode:   string   // Unique identifier
  course:      string   // Course name
  centre:      string   // Training centre city
  startDate:   string   // ISO date (YYYY-MM-DD)
  enrolled:    number   // Current student count
  maxCapacity: number   // Max student count
  status:      'Running' | 'Upcoming' | 'Completed'
}
```

**Exports:** `batches` (Array of 12 Batch objects)

---

## 4. Frontend Source Files

---

### `frontend/src/main.jsx`

**Type:** React entry point
**Lines:** 8

**Purpose:** Mounts the React application tree into the `#root` DOM element.

**Dependencies:** `react`, `react-dom/client`, `./App`, `./index.css`

**Renders:** `<StrictMode><App /></StrictMode>`

---

### `frontend/src/App.jsx`

**Type:** React component (Root layout)
**Lines:** 8

**Purpose:** Defines the top-level page layout as a flex row containing the sidebar and the main page.

**Dependencies:** `./components/Sidebar`, `./pages/BatchOperationsPage`

**Props:** None
**State:** None

**JSX Structure:**
```
<div> (flex row, full screen height, off-white background)
  ├── <Sidebar />
  └── <BatchOperationsPage />
```

**Exports:** `App` (default)

---

### `frontend/src/components/Sidebar.jsx`

**Type:** React component
**Lines:** 41

**Purpose:** Renders the fixed left navigation sidebar with branding, navigation links, and a logout button.

**Dependencies:** `lucide-react` (icons)

**Props:** None
**State:** None

**Navigation Data:**
```js
const primaryItems = [
  ['Franchise Management', Building2, true],  // active = true
  ['Student Management', GraduationCap],
  ['LMS', LayoutDashboard],
  ['Finance', CircleDollarSign],
  ['HRMS', Users],
  ['Centers', BarChart3],
]
```

**Icon Imports:** `BarChart3`, `Building2`, `CircleDollarSign`, `GraduationCap`, `Headphones`, `LayoutDashboard`, `LogOut`, `Package`, `Users`

**Exports:** `Sidebar` (default)

---

### `frontend/src/pages/BatchOperationsPage.jsx`

**Type:** React page component
**Lines:** 53

**Purpose:** Owns all page-level state, fetches batch data from the API, and coordinates FilterBar, BatchTable, and PaginationFooter.

**Dependencies:** `react`, `lucide-react`, `../services/batchService`, child components

**State:**

| Variable | Type | Purpose |
|---|---|---|
| `batches` | `Batch[]` | Current page records |
| `pagination` | `Object` | `{ page, limit, totalRecords, totalPages }` |
| `search` | `string` | Search input value |
| `status` | `string` | Status dropdown value |
| `centre` | `string` | Centre dropdown value |
| `page` | `number` | Current page number |
| `loading` | `boolean` | Request in-flight flag |
| `error` | `string` | Error message |
| `retryKey` | `number` | Retry trigger counter |

**Functions:**

| Function | Signature | Description |
|---|---|---|
| `updateFilter` | `(setter) => (value) => void` | HOF: updates a filter and resets page to 1 |

**Exports:** `BatchOperationsPage` (default)

---

### `frontend/src/components/FilterBar.jsx`

**Type:** React component
**Lines:** 21

**Purpose:** Renders the search input and status/centre filter dropdowns.

**Dependencies:** `lucide-react` (`Filter`, `Search`)

**Props:**

| Prop | Type | Description |
|---|---|---|
| `search` | `string` | Controlled search value |
| `status` | `string` | Controlled status value |
| `centre` | `string` | Controlled centre value |
| `onSearch` | `(value: string) => void` | Search change callback |
| `onStatus` | `(value: string) => void` | Status change callback |
| `onCentre` | `(value: string) => void` | Centre change callback |

**Static Data:**
```js
const centres = ['Bengaluru', 'Chennai', 'Delhi', 'Hyderabad', 'Kochi', 'Mumbai', 'Pune']
```

**Exports:** `FilterBar` (default)

---

### `frontend/src/components/BatchTable.jsx`

**Type:** React component
**Lines:** 37

**Purpose:** Renders the batch data table with loading, error, empty, and populated states.

**Dependencies:** `lucide-react` (`LoaderCircle`, `MoreVertical`)

**Props:**

| Prop | Type | Description |
|---|---|---|
| `batches` | `Batch[]` | Records to render |
| `loading` | `boolean` | Whether to show spinner |
| `error` | `string` | Error message (empty = no error) |
| `onRetry` | `() => void` | Retry callback |

**Helper Functions:**

| Function | Signature | Description |
|---|---|---|
| `formatDate` | `(value: string) => string` | Formats ISO date to `Mon DD, YYYY` |
| `statusStyle` | `(status: string) => string` | Returns Tailwind class string for status badge |

**Render States (priority):**
1. `loading` → Spinner row
2. `error` → Error message + Retry button
3. `batches.length === 0` → Empty state message
4. Default → Table rows

**Exports:** `BatchTable` (default)

---

### `frontend/src/components/PaginationFooter.jsx`

**Type:** React component
**Lines:** 18

**Purpose:** Displays the record range summary and page navigation buttons.

**Dependencies:** `lucide-react` (`ChevronLeft`, `ChevronRight`)

**Props:**

| Prop | Type | Description |
|---|---|---|
| `page` | `number` | Active page |
| `limit` | `number` | Records per page |
| `totalRecords` | `number` | Total matching records |
| `totalPages` | `number` | Total pages |
| `onPageChange` | `(page: number) => void` | Page change callback |

**Computed Values:**
- `first = totalRecords === 0 ? 0 : (page - 1) * limit + 1`
- `last = Math.min(page * limit, totalRecords)`

**Exports:** `PaginationFooter` (default)

---

### `frontend/src/services/batchService.js`

**Type:** Service module
**Lines:** 18

**Purpose:** Encapsulates the Axios HTTP client for the batch API.

**Dependencies:** `axios`

**Configuration:**
```js
const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000' : '')

const api = axios.create({ baseURL: apiBaseUrl })
```

**Function: `fetchBatches(options?)`**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | `number` | `1` | Page number |
| `limit` | `number` | `5` | Records per page |
| `search` | `string` | `''` | Search term |
| `status` | `string` | `''` | Status filter |
| `centre` | `string` | `''` | Centre filter |

**Returns:** `Promise<{ success: boolean, data: Batch[], pagination: object }>`

**Throws:** Axios error on HTTP failure or network error

**Exports:** `{ fetchBatches }`

---

### `frontend/src/index.css`

**Type:** Global stylesheet
**Lines:** ~10

**Purpose:** Imports Tailwind CSS directives. All component-level styles are written as Tailwind utility classes in JSX.

```css
@import "tailwindcss";
```

---

### `frontend/index.html`

**Type:** HTML shell
**Purpose:** The root HTML document loaded by the browser. Contains the `<div id="root">` mount point and a `<script>` tag pointing to `main.jsx`.

---

### `frontend/vite.config.js`

**Type:** Vite configuration
**Purpose:** Configures the Vite build tool for the React project.

```js
export default defineConfig({
  plugins: [react()],
})
```

---

## 5. Configuration Files

| File | Purpose |
|---|---|
| `frontend/package.json` | Frontend dependencies (react, axios, lucide-react, tailwindcss, vite) and scripts |
| `backend/package.json` | Backend dependencies (express, cors) and scripts |
| `frontend/.env.example` | Template for `VITE_API_BASE_URL` environment variable |
| `project/.gitignore` | Excludes `node_modules/`, `dist/`, `.env` from version control |

---

*This document is prepared for educational and assignment purposes.*


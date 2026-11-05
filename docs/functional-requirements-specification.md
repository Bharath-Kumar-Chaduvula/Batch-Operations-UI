# Functional Requirements Specification (FRS)

## Batch Operations UI

**Prepared by:** Bharath Kumar Chaduvula
**Version:** 1.0
**Date:** 2026-11-05
**Document Status:** Final

---

## 1. Introduction

### 1.1 Purpose

This Functional Requirements Specification (FRS) defines the detailed, testable functional requirements for the **Batch Operations UI** system. It bridges the high-level business requirements (BRD) and the technical design documents (HLD/LLD), describing **what** the system does from a functional perspective.

### 1.2 Scope

This document covers all implemented functional behaviour in version 1.0, including the batch listing page, search, filter, pagination, and error handling.

### 1.3 References

- Business Requirements Document (BRD)
- Software Requirements Specification (SRS)
- API Documentation

---

## 2. User Roles

| Role | Description |
|---|---|
| Operations Staff | The only user role in v1.0. Views, searches, and filters batch data. |

---

## 3. Functional Requirements

### 3.1 Page Load and Initial Display

**FR-001 — Initial Batch Load**
- When the user opens the Batch Operations page, the system shall automatically fetch the first page of batch records from the backend API.
- The default page size is 5 records per page.
- The table shall display fetched records without requiring any user interaction.

**FR-002 — Loading State**
- While a batch request is in progress, the system shall display a loading spinner with the text "Loading batches..." inside the table area.
- No data rows shall be rendered during the loading state.

**FR-003 — Page Header**
- The page shall display a "Workspace" label above the "Batch Operations" heading.
- A "Create Batch" button shall be visible in the header (visual placeholder; not functional in v1.0).

---

### 3.2 Batch Table Display

**FR-004 — Table Columns**
The batch table shall display the following columns in order:

| # | Column | Source Field |
|---|---|---|
| 1 | Batch Code | `batchCode` |
| 2 | Course | `course` |
| 3 | Center | `centre` |
| 4 | Start Date | `startDate` |
| 5 | Capacity | `enrolled` / `maxCapacity` |
| 6 | Status | `status` |
| 7 | Actions | — (icon placeholder) |

**FR-005 — Batch Code Style**
- The Batch Code column shall be displayed in the brand orange colour (`#df6738`) and bold weight to visually distinguish it.

**FR-006 — Start Date Formatting**
- Start dates from the API (ISO format `YYYY-MM-DD`) shall be displayed in the format `Mon DD, YYYY` (e.g., `Jan 12, 2026`).

**FR-007 — Capacity Display**
- Capacity shall be shown as `enrolled/maxCapacity` (e.g., `28/30`).

**FR-008 — Status Badge**
- Each batch row shall display a coloured pill badge for the status.
- Badge styles:

| Status | Background | Text Colour | Dot Colour |
|---|---|---|---|
| Running | Light green (`#eaf7ed`) | Green (`#3f9560`) | `#42a967` |
| Upcoming | Light yellow (`#fff5dd`) | Amber (`#bd8429`) | `#e3a72d` |
| Completed | Light grey (`#f0f1f2`) | Grey (`#7b8085`) | `#92979c` |

**FR-009 — Actions Column**
- Each row shall display a vertical ellipsis icon (`MoreVertical`) in the Actions column.
- Clicking the icon shall not perform any action in v1.0 (visual placeholder).

---

### 3.3 Search Functionality

**FR-010 — Search Input**
- A search input field shall be present in the filter bar with placeholder text: `Search Batch Code or Course...`.
- The field shall have a search icon on its left.

**FR-011 — Search Behaviour**
- The search shall match against both `batchCode` and `course` fields.
- Matching shall be case-insensitive and partial (substring match).
- Example: searching `"full"` shall return all batches whose `batchCode` or `course` contains "full".

**FR-012 — Search Triggers Filter Reset**
- When the user changes the search input value, the page number shall reset to 1 before the new request is made.

**FR-013 — Search Sent to Backend**
- The search term shall be sent as the `search` query parameter in the API request.
- Empty string means no search filter is applied.

---

### 3.4 Status Filter

**FR-014 — Status Dropdown**
- A dropdown shall be present with the options: `All Status`, `Running`, `Upcoming`, `Completed`.
- Default selection is `All Status` (empty value, no filter applied).

**FR-015 — Status Filter Behaviour**
- Selecting a status shall filter the results to show only batches with that exact status.
- Changing the status selection shall reset the page number to 1.
- The selected status shall be sent as the `status` query parameter.

---

### 3.5 Centre Filter

**FR-016 — Centre Dropdown**
- A dropdown shall be present listing all available training centres plus an `All Centres` option.
- Available centres: Bengaluru, Chennai, Delhi, Hyderabad, Kochi, Mumbai, Pune.

**FR-017 — Centre Filter Behaviour**
- Selecting a centre shall filter results to show only batches at that centre (case-insensitive exact match on the backend).
- Changing the centre shall reset the page number to 1.
- The selected centre shall be sent as the `centre` query parameter.

**FR-018 — Filter Options Button**
- A filter icon button shall be present next to the dropdowns (visual placeholder with accessible `aria-label="Filter options"`).

---

### 3.6 Combined Filtering

**FR-019 — Combined Filters**
- Search, status, and centre filters are applied simultaneously (AND logic).
- A batch must match all active filters to appear in the results.
- Example: `search="python"` AND `status="Running"` AND `centre="Pune"` returns only batches matching all three.

---

### 3.7 Pagination

**FR-020 — Pagination Footer**
- A pagination footer shall be displayed below the table.
- It shall show: `Showing X–Y of Z Batches` where X is the first record index, Y is the last, and Z is the total matching records.

**FR-021 — Page Buttons**
- Individual page number buttons shall be rendered based on `totalPages` from the API.
- The active page button shall be highlighted in the brand orange colour.

**FR-022 — Previous / Next Buttons**
- Left chevron (Previous) and right chevron (Next) buttons shall be displayed.
- The Previous button shall be disabled on page 1.
- The Next button shall be disabled on the last page or when there are no results.

**FR-023 — Page Change**
- Clicking any page number, Previous, or Next shall trigger a new API request with the updated `page` parameter.
- Pagination shall not reset when the user changes pages (only when filters change).

---

### 3.8 Error Handling

**FR-024 — API Error State**
- If the API request fails (network error, server down, etc.), the system shall display an error message inside the table area: `"Unable to load batches. Please check that the backend is running."`
- A red-tinted text colour (`#b14f3a`) shall be used for the error message.

**FR-025 — Retry Button**
- An orange "Retry" button shall appear below the error message.
- Clicking Retry shall re-trigger the last failed API request with all current filter and page parameters.

**FR-026 — Empty State**
- If the API returns successfully but with zero records (no matches), the system shall display: `"No batches match your search or filters"`.
- No error state or retry button is shown for an empty result.

---

### 3.9 Sidebar Navigation

**FR-027 — Sidebar Content**
- A fixed left sidebar shall display:
  - "Batchly" brand logo and name.
  - "Operations" sub-label.
  - Navigation items: Franchise Management, Student Management, LMS, Finance, HRMS, Centers, Assets, Support.
  - A "Log Out" button at the bottom.

**FR-028 — Active Navigation Item**
- "Franchise Management" shall appear highlighted with orange text and a light orange background (`#fff0e8`).
- All other items shall appear in muted grey.

---

### 3.10 Backend API Functional Behaviour

**FR-029 — List Batches Endpoint**
- `GET /api/batches` shall accept query parameters: `page`, `limit`, `search`, `status`, `centre`.
- It shall return a JSON response with `success`, `data` (array of batches), and `pagination` object.

**FR-030 — Input Validation**
- `page` must be an integer ≥ 1; otherwise return HTTP 400.
- `limit` must be an integer between 1 and 100; otherwise return HTTP 400.
- `status` must be one of `Running`, `Upcoming`, `Completed` (or empty); otherwise return HTTP 400.

**FR-031 — Health Endpoint**
- `GET /` shall return `{ "message": "Batch Operations API is running" }` with HTTP 200.

---

## 4. Use Cases

### UC-01: Monitor All Batches

| Field | Detail |
|---|---|
| **Actor** | Operations Staff |
| **Precondition** | Backend is running; user opens the page. |
| **Main Flow** | 1. Page loads. 2. System fetches page 1 of all batches. 3. Table displays 5 records. 4. Pagination shows total count. |
| **Alternate Flow** | API fails → error message and Retry button displayed. |
| **Postcondition** | User sees batch data or an actionable error. |

### UC-02: Search for a Batch

| Field | Detail |
|---|---|
| **Actor** | Operations Staff |
| **Precondition** | Batch data is loaded. |
| **Main Flow** | 1. User types in the search box. 2. Page resets to 1. 3. API called with search param. 4. Matching batches displayed. |
| **Alternate Flow** | No matches → empty state message shown. |
| **Postcondition** | Table shows only matching records. |

### UC-03: Filter by Status and Centre

| Field | Detail |
|---|---|
| **Actor** | Operations Staff |
| **Precondition** | Batch data is loaded. |
| **Main Flow** | 1. User selects status and/or centre. 2. Page resets to 1. 3. API called with filter params. 4. Filtered batches displayed. |
| **Postcondition** | Table shows only records matching all active filters. |

### UC-04: Navigate Pages

| Field | Detail |
|---|---|
| **Actor** | Operations Staff |
| **Precondition** | Multiple pages of results exist. |
| **Main Flow** | 1. User clicks page number or Next. 2. API called with new `page` param. 3. Table updates with new page of records. |
| **Postcondition** | Correct page of records is displayed. |

### UC-05: Retry After Error

| Field | Detail |
|---|---|
| **Actor** | Operations Staff |
| **Precondition** | API request has failed; error state is shown. |
| **Main Flow** | 1. User clicks "Retry". 2. System retries the same request. 3. If successful, table updates. If still failing, error remains. |
| **Postcondition** | Data is loaded or error persists for another retry. |

---

## 5. Non-Functional Constraints Affecting Functionality

- All filter changes must result in a network request within the React `useEffect` lifecycle.
- Stale requests (from previous filter states) must not update the UI after a newer request completes.
- The pagination range display must accurately reflect the current page, limit, and total records even when results are zero.

---

*This document is prepared for educational and assignment purposes.*


# Project Plan

## Batch Operations UI

**Prepared by:** Bharath Kumar Chaduvula
**Version:** 1.0
**Date:** 2026-11-05
**Document Status:** Final (As-Built)

---

## 1. Introduction

This Project Plan documents the planning, execution, and delivery approach for the **Batch Operations UI** assignment project. It covers objectives, task breakdown, timeline, roles, deliverables, and risk management.

---

## 2. Project Objectives

1. Build a full-stack web application for managing training batch operations.
2. Demonstrate competency in React, Node.js, REST APIs, and modern web tooling.
3. Deliver well-structured, documented, and deployable source code.
4. Produce a complete documentation suite (Proposal, BRD, SRS, FRS, HLD, LLD, API Docs, Deployment Doc).

---

## 3. Project Scope

### In Scope
- React frontend with filtering, searching, and pagination.
- Node.js/Express REST API backend.
- In-memory data layer (12 sample batches).
- Complete documentation suite.
- Production build ready for Vercel deployment.

### Out of Scope
- Database integration.
- User authentication.
- Batch CRUD operations (Create/Edit/Delete).
- Mobile-specific UI.
- Automated tests.

---

## 4. Work Breakdown Structure (WBS)

```
Batch Operations UI
│
├── 1.0 Project Setup
│   ├── 1.1 Initialise frontend (Vite + React)
│   ├── 1.2 Initialise backend (Node.js + Express)
│   └── 1.3 Set up .gitignore and project structure
│
├── 2.0 Backend Development
│   ├── 2.1 Define batch data model (batches.js)
│   ├── 2.2 Implement Express app and middleware (app.js)
│   ├── 2.3 Implement batch controller (filtering, pagination, validation)
│   ├── 2.4 Define API routes (batchRoutes.js)
│   └── 2.5 Set up server entry point (server.js)
│
├── 3.0 Frontend Development
│   ├── 3.1 Design and implement Sidebar layout
│   ├── 3.2 Implement FilterBar (search + dropdowns)
│   ├── 3.3 Implement BatchTable (data, loading, error, empty states)
│   ├── 3.4 Implement PaginationFooter
│   ├── 3.5 Implement batchService (Axios client)
│   ├── 3.6 Implement BatchOperationsPage (state management)
│   └── 3.7 Apply Tailwind CSS styling
│
├── 4.0 Integration and Testing
│   ├── 4.1 Connect frontend to backend API
│   ├── 4.2 Test search, filter, and pagination flows
│   ├── 4.3 Test error and retry states
│   └── 4.4 Build production frontend (npm run build)
│
├── 5.0 Documentation
│   ├── 5.1 Write README.md
│   ├── 5.2 Write Software Requirements Specification (SRS)
│   ├── 5.3 Write Project Proposal
│   ├── 5.4 Write Business Requirements Document (BRD)
│   ├── 5.5 Write Functional Requirements Specification (FRS)
│   ├── 5.6 Write High-Level Design (HLD)
│   ├── 5.7 Write Low-Level Design (LLD)
│   ├── 5.8 Write Source Code Documentation
│   ├── 5.9 Write Technical Documentation
│   ├── 5.10 Write API Documentation
│   ├── 5.11 Write Deployment Document
│   └── 5.12 Write System Documentation
│
└── 6.0 Deployment
    ├── 6.1 Deploy frontend to Vercel
    └── 6.2 Deploy backend to Node.js host
```

---

## 5. Project Schedule

| Phase | Task | Duration | Status |
|---|---|---|---|
| Phase 1 — Setup | Project initialisation, folder structure | Day 1 | ✅ Done |
| Phase 2 — Backend | Data model, controller, routes, server | Day 1–2 | ✅ Done |
| Phase 3 — Frontend | All components, service, page, styling | Day 2–3 | ✅ Done |
| Phase 4 — Integration | API connection, flow testing, build | Day 3–4 | ✅ Done |
| Phase 5 — Docs | README, SRS, all documentation files | Day 4–5 | ✅ Done |
| Phase 6 — Deploy | Vercel + backend hosting | Day 5 | 🔄 Ready |

**Total Project Duration:** ~5 days

---

## 6. Milestones

| Milestone | Description | Target Date | Status |
|---|---|---|---|
| M1 | Backend API running and responding | Day 2 | ✅ Achieved |
| M2 | Frontend renders batch data from API | Day 3 | ✅ Achieved |
| M3 | All filters and pagination working end-to-end | Day 4 | ✅ Achieved |
| M4 | Production build generated (`dist/`) | Day 4 | ✅ Achieved |
| M5 | Full documentation suite complete | Day 5 | ✅ Achieved |
| M6 | Application deployed to public URL | Day 5 | 🔄 Pending |

---

## 7. Resources

| Resource | Role | Responsibility |
|---|---|---|
| Bharath Kumar Chaduvula | Developer / Author | Full-stack development and documentation |
| Vite + React | Tool | Frontend scaffolding |
| Node.js + Express | Tool | Backend API |
| Vercel | Platform | Frontend deployment |
| GitHub | Platform | Version control |

---

## 8. Deliverables Checklist

### Code Deliverables
- [x] `backend/server.js` — HTTP server
- [x] `backend/app.js` — Express app
- [x] `backend/routes/batchRoutes.js` — Route definition
- [x] `backend/controllers/batchController.js` — Business logic
- [x] `backend/data/batches.js` — Sample data
- [x] `frontend/src/App.jsx` — Root layout
- [x] `frontend/src/pages/BatchOperationsPage.jsx` — Page component
- [x] `frontend/src/components/Sidebar.jsx`
- [x] `frontend/src/components/FilterBar.jsx`
- [x] `frontend/src/components/BatchTable.jsx`
- [x] `frontend/src/components/PaginationFooter.jsx`
- [x] `frontend/src/services/batchService.js`
- [x] `frontend/dist/` — Production build

### Documentation Deliverables
- [x] `README.md`
- [x] `docs/project-proposal.md`
- [x] `docs/business-requirements-document.md`
- [x] `docs/software-requirements-specification.md`
- [x] `docs/functional-requirements-specification.md`
- [x] `docs/high-level-design.md`
- [x] `docs/low-level-design.md`
- [x] `docs/project-plan.md`
- [x] `docs/source-code-documentation.md`
- [x] `docs/technical-documentation.md`
- [x] `docs/api-documentation.md`
- [x] `docs/deployment-document.md`
- [x] `docs/system-documentation.md`

---

## 9. Risk Register

| ID | Risk | Probability | Impact | Mitigation |
|---|---|---|---|---|
| R-01 | Backend not running when frontend accessed | Medium | High | Error state with retry button implemented |
| R-02 | CORS errors blocking API calls | Low | High | CORS middleware configured |
| R-03 | Data loss on server restart | High | Low | Acceptable for v1.0 (in-memory); noted in docs |
| R-04 | Vercel environment variable misconfigured | Medium | Medium | `.env.example` provided; documented in deployment guide |
| R-05 | Stale API responses updating state | Low | Medium | `active` cleanup flag in `useEffect` |
| R-06 | Build failure before submission | Low | High | `dist/` folder committed as backup |

---

## 10. Quality Checklist

- [x] All implemented functional requirements verified manually.
- [x] Loading state shown correctly.
- [x] Error + Retry flow tested.
- [x] Empty state shown when no results match.
- [x] Pagination resets on filter change.
- [x] API validates invalid parameters with 400 responses.
- [x] Frontend production build generated successfully.
- [x] All documentation files created and consistent.

---

*This document is prepared for educational and assignment purposes.*


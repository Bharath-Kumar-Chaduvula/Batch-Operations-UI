# Project Proposal

## Batch Operations UI

**Prepared by:** Bharath Kumar Chaduvula
**Version:** 1.0
**Date:** 2026-11-05
**Status:** Approved

---

## 1. Executive Summary

This proposal outlines the development of a **Batch Operations UI** — a web-based management system for monitoring and managing training batches across multiple training centres. The application provides operations staff with a centralised, intuitive interface to search, filter, and monitor training batch records in real time.

The system is built as a full-stack web application using React on the frontend and Node.js/Express on the backend, following a clean separation of concerns and modern software engineering practices.

---

## 2. Problem Statement

Training operations teams currently lack a unified digital interface to:

- Track batches running across multiple geographical centres.
- Filter and search batches by status, course, or centre.
- Monitor enrolment capacity in real time.
- Navigate large datasets efficiently with pagination.

Without a dedicated tool, operations staff must rely on spreadsheets or disconnected records, which are error-prone, difficult to share, and slow to update.

---

## 3. Proposed Solution

Develop a **Batch Operations Management Web Application** with:

- A responsive, desktop-first dashboard interface.
- A backend REST API serving paginated, filtered batch data.
- Real-time search and filter controls (by batch code, course, status, and centre).
- Enrolment capacity monitoring per batch.
- Loading, error, and empty-state feedback for a reliable user experience.

---

## 4. Objectives

| # | Objective |
|---|---|
| O-01 | Provide a central view of all training batches across centres. |
| O-02 | Enable search by batch code and course name. |
| O-03 | Allow filtering by batch status (Running, Upcoming, Completed). |
| O-04 | Allow filtering by training centre location. |
| O-05 | Display enrolment and capacity data per batch. |
| O-06 | Support server-side pagination for scalable data browsing. |
| O-07 | Handle API errors gracefully with retry capability. |
| O-08 | Provide a deployable full-stack web application. |

---

## 5. Scope

### In Scope

- Batch listing page with search, filter, and pagination.
- Backend REST API with filtering, validation, and pagination.
- In-memory data layer with 12 sample batch records.
- Responsive UI with status badges and capacity display.
- Loading, error, empty-state, and retry UX.
- SRS, API, and deployment documentation.

### Out of Scope (Phase 1)

- User authentication and role-based access control.
- Database persistence (database integration planned for Phase 2).
- Batch creation, editing, or deletion.
- Export to CSV/Excel.
- Mobile-specific navigation.
- Email notifications or alerts.

---

## 6. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, JSX, Tailwind CSS 4, Lucide React, Axios |
| Build Tool | Vite |
| Backend | Node.js, Express 5 |
| Middleware | CORS, express.json |
| Data Layer | In-memory JavaScript array |
| Deployment | Vercel (frontend), Node.js host (backend) |

---

## 7. Project Timeline (Estimated)

| Phase | Activity | Duration |
|---|---|---|
| Phase 1 | Requirements gathering and SRS | 1 day |
| Phase 2 | UI design and component scaffolding | 1 day |
| Phase 3 | Backend API development | 1 day |
| Phase 4 | Frontend integration and testing | 1 day |
| Phase 5 | Documentation and deployment | 1 day |

**Total Estimated Duration:** 5 days

---

## 8. Deliverables

- [ ] Fully functional Batch Operations UI (React frontend)
- [ ] REST API backend (Node.js/Express)
- [ ] Project documentation suite (Proposal, BRD, SRS, FRS, HLD, LLD, API Docs, Deployment Doc)
- [ ] Source code with `.gitignore` and `README.md`
- [ ] Deployment-ready production build (`frontend/dist`)

---

## 9. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Backend not running during frontend use | Medium | High | Display user-friendly error with retry button |
| Data loss on server restart | High | Medium | Noted as known limitation; database planned for Phase 2 |
| Cross-origin request failures | Low | High | CORS middleware configured on the backend |
| Stale API responses updating UI | Low | Medium | `active` flag cleanup in `useEffect` |

---

## 10. Conclusion

The Batch Operations UI addresses a clear operational need for training management teams. It is a well-scoped, achievable project that demonstrates full-stack development competency, clean architecture, and professional documentation standards. The proposal is submitted for review and approval to proceed with development.

---

*This document is prepared for educational and assignment purposes.*


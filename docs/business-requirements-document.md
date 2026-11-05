# Business Requirements Document (BRD)

## Batch Operations UI

**Prepared by:** Bharath Kumar Chaduvula
**Version:** 1.0
**Date:** 2026-11-05
**Document Status:** Approved
**Review Cycle:** Per major release

---

## 1. Introduction

### 1.1 Purpose

This Business Requirements Document (BRD) defines the business needs, goals, and high-level requirements for the **Batch Operations UI** system. It serves as the foundational agreement between stakeholders and the development team, ensuring that the delivered system aligns with business objectives.

### 1.2 Background

Training centres manage multiple course batches simultaneously across different cities. Each batch has a defined status (Running, Upcoming, or Completed), a fixed student capacity, and an enrolment count. Operations staff need a reliable, centralised platform to monitor all active and upcoming batches without relying on manually maintained spreadsheets.

### 1.3 Scope

This BRD covers the initial version (v1.0) of the Batch Operations UI, which includes batch listing, search, filtering, and pagination. It does not cover batch creation, editing, deletion, or authentication — these are deferred to future phases.

### 1.4 Definitions

| Term | Definition |
|---|---|
| Batch | A scheduled training session for a specific course at a specific centre. |
| Batch Code | A unique alphanumeric identifier for each batch (e.g., BAT-2026-001). |
| Centre | A physical training location (e.g., Bengaluru, Hyderabad). |
| Status | The current lifecycle state of a batch: Running, Upcoming, or Completed. |
| Enrolment | The number of students currently registered in a batch. |
| Capacity | The maximum number of students allowed in a batch. |
| Operations Staff | The end user who uses the system to monitor batch data. |

---

## 2. Business Objectives

| ID | Business Objective |
|---|---|
| BO-01 | Centralise batch data to eliminate dependency on spreadsheets. |
| BO-02 | Enable operations staff to locate any batch within seconds. |
| BO-03 | Provide real-time visibility into enrolment capacity. |
| BO-04 | Support multi-centre operations from a single interface. |
| BO-05 | Reduce manual reporting effort and human errors. |
| BO-06 | Establish a scalable foundation for future batch management features. |

---

## 3. Business Requirements

### 3.1 Core Business Requirements

| ID | Business Requirement | Priority |
|---|---|---|
| BR-01 | The system must display all training batches in a structured table view. | Must Have |
| BR-02 | Operations staff must be able to find a batch by code or course name without scrolling through all records. | Must Have |
| BR-03 | The system must support filtering batches by their current status. | Must Have |
| BR-04 | The system must support filtering batches by training centre. | Must Have |
| BR-05 | The system must show how many students are enrolled vs. the maximum capacity. | Must Have |
| BR-06 | The system must handle large numbers of batch records without degrading user experience (via pagination). | Must Have |
| BR-07 | The system must clearly communicate when data cannot be loaded and allow the user to retry. | Must Have |
| BR-08 | The system must display the batch start date for scheduling awareness. | Must Have |
| BR-09 | The user interface must be intuitive enough for non-technical operations staff. | Should Have |
| BR-10 | The system should be accessible from a web browser without installing any software. | Must Have |

### 3.2 Navigation and Branding Requirements

| ID | Business Requirement | Priority |
|---|---|---|
| BR-11 | The application must display the "Batchly" brand identity in the sidebar. | Should Have |
| BR-12 | The sidebar must include navigation placeholders for future modules (Student Management, Finance, HRMS, etc.). | Should Have |
| BR-13 | The active module (Franchise Management / Batch Operations) must be visually highlighted. | Should Have |

### 3.3 Future Business Requirements (Out of Scope for v1.0)

| ID | Future Requirement |
|---|---|
| BR-F01 | Operations staff must be able to create new batch records. |
| BR-F02 | Batch records must persist beyond server restarts (database integration). |
| BR-F03 | Only authenticated and authorised users may access or modify batch data. |
| BR-F04 | Batch data must be exportable to CSV or Excel. |
| BR-F05 | Managers must be able to view batch analytics and reports. |

---

## 4. Stakeholders

| Stakeholder | Role | Interest |
|---|---|---|
| Operations Staff | Primary End User | Needs a fast, reliable way to monitor batches. |
| Training Centre Managers | Secondary User | Reviews batch capacity and scheduling. |
| IT / Development Team | Builder | Designs, develops, and maintains the system. |
| Academic Evaluator | Reviewer (Assignment) | Assesses code quality, architecture, and documentation. |

---

## 5. Business Process Overview

### Current Process (As-Is)

```
Operations staff → Open spreadsheet → Manually search/scroll → Update manually → Share via email
```

**Problems:** Time-consuming, error-prone, no real-time visibility, difficult to share.

### Proposed Process (To-Be)

```
Operations staff → Open Batch Operations UI → Search/Filter instantly → View live data → Act on information
```

**Benefits:** Fast lookup, real-time data, single source of truth, scalable.

---

## 6. Assumptions

- Operations staff will access the system via a modern desktop web browser.
- The backend service is running and reachable by the frontend.
- The 12 sample batch records are sufficient for demonstrating system functionality.
- No real user authentication is required for the initial version.
- All centres and statuses are fixed/known at development time.

---

## 7. Constraints

| Constraint | Description |
|---|---|
| Technology | Frontend must use React; backend must use Node.js and Express. |
| Timeline | Must be delivered within the academic assignment deadline. |
| Budget | No external paid services; free/open-source tools only. |
| Data | In-memory data only for v1.0; no live database. |
| Deployment | Frontend deployed to Vercel; backend to any Node.js-compatible host. |

---

## 8. Success Criteria

The project is considered successful when:

- All batch records are visible in a paginated table.
- Search by batch code or course name returns correct results.
- Status and centre filters correctly narrow down results.
- API errors display a user-friendly message with a working retry button.
- The system is deployable and accessible via a public URL.
- All documentation (BRD, SRS, FRS, HLD, LLD, API Docs, Deployment Doc) is complete.

---

## 9. Approval

| Role | Name | Date |
|---|---|---|
| Project Owner | Bharath Kumar Chaduvula | 2026-11-05 |
| Evaluator / Reviewer | — | — |

---

*This document is prepared for educational and assignment purposes.*


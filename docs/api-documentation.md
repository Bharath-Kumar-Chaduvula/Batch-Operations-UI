# API Documentation

## Batch Operations UI — REST API

**Prepared by:** Bharath Kumar Chaduvula
**Version:** 1.0
**Date:** 2026-11-05
**Base URL (Development):** `http://localhost:5000`
**Base URL (Production):** Configured via `VITE_API_BASE_URL`

---

## 1. Introduction

The Batch Operations API is a RESTful HTTP API built with **Node.js** and **Express 5**. It serves training batch data with support for text search, status/centre filtering, and server-side pagination.

All responses are in `application/json` format.

---

## 2. Authentication

**Current version:** No authentication required.

> [!WARNING]
> Authentication and authorisation are not implemented in v1.0. This API is intended for internal/assignment use only. Do not expose it publicly with real data until authentication is added.

---

## 3. Base URLs

| Environment | Base URL |
|---|---|
| Development | `http://localhost:5000` |
| Production | Set via `VITE_API_BASE_URL` environment variable |

---

## 4. Common Response Format

### Success Response

```json
{
  "success": true,
  "data": [ ...records ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "totalRecords": 12,
    "totalPages": 3
  }
}
```

### Error Response

```json
{
  "error": "Human-readable error description"
}
```

---

## 5. HTTP Status Codes

| Code | Meaning | When Used |
|---|---|---|
| `200 OK` | Request succeeded | Successful GET request |
| `400 Bad Request` | Invalid query parameters | Invalid page, limit, or status value |
| `404 Not Found` | Route not found | Unknown path (Express default) |
| `500 Internal Server Error` | Server-side crash | Unhandled exceptions |

---

## 6. Endpoints

---

### 6.1 Health Check

**Check if the API server is running.**

```
GET /
```

#### Request

No parameters, headers, or body required.

#### Response — 200 OK

```json
{
  "message": "Batch Operations API is running"
}
```

#### Example

```bash
curl http://localhost:5000/
```

```json
{
  "message": "Batch Operations API is running"
}
```

---

### 6.2 List Batches

**Retrieve a paginated, filtered list of training batches.**

```
GET /api/batches
```

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `page` | integer | No | `1` | Page number. Must be ≥ 1. |
| `limit` | integer | No | `5` | Records per page. Must be between 1 and 100. |
| `search` | string | No | `""` | Case-insensitive substring match against `batchCode` or `course`. |
| `status` | string | No | `""` | Filter by status. Allowed: `Running`, `Upcoming`, `Completed`. Empty returns all. |
| `centre` | string | No | `""` | Filter by centre. Case-insensitive exact match. Empty returns all. |

#### Response — 200 OK

```json
{
  "success": true,
  "data": [
    {
      "batchCode": "BAT-2026-001",
      "course": "Full Stack Web Development",
      "centre": "Bengaluru",
      "startDate": "2026-01-12",
      "enrolled": 28,
      "maxCapacity": 30,
      "status": "Completed"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "totalRecords": 12,
    "totalPages": 3
  }
}
```

#### Response — 400 Bad Request (invalid pagination)

```json
{
  "error": "page must be at least 1 and limit must be between 1 and 100"
}
```

#### Response — 400 Bad Request (invalid status)

```json
{
  "error": "status must be one of: Running, Upcoming, Completed"
}
```

---

## 7. Data Model

### Batch Object

| Field | Type | Description | Example |
|---|---|---|---|
| `batchCode` | `string` | Unique batch identifier | `"BAT-2026-001"` |
| `course` | `string` | Course / programme name | `"Full Stack Web Development"` |
| `centre` | `string` | Training centre city | `"Bengaluru"` |
| `startDate` | `string` | Batch start date (ISO 8601) | `"2026-01-12"` |
| `enrolled` | `integer` | Current student enrolment count | `28` |
| `maxCapacity` | `integer` | Maximum allowed enrolment | `30` |
| `status` | `string` | Lifecycle status | `"Running"` \| `"Upcoming"` \| `"Completed"` |

### Pagination Object

| Field | Type | Description |
|---|---|---|
| `page` | `integer` | Current page number |
| `limit` | `integer` | Records per page |
| `totalRecords` | `integer` | Total records matching filters |
| `totalPages` | `integer` | Total pages (`ceil(totalRecords / limit)`) |

---

## 8. Example Requests

### 8.1 Get All Batches (First Page)

```bash
curl "http://localhost:5000/api/batches"
```

```json
{
  "success": true,
  "data": [
    { "batchCode": "BAT-2026-001", "course": "Full Stack Web Development", "centre": "Bengaluru", "startDate": "2026-01-12", "enrolled": 28, "maxCapacity": 30, "status": "Completed" },
    { "batchCode": "BAT-2026-002", "course": "Data Analytics", "centre": "Hyderabad", "startDate": "2026-02-02", "enrolled": 24, "maxCapacity": 30, "status": "Completed" },
    { "batchCode": "BAT-2026-003", "course": "Cloud Engineering", "centre": "Chennai", "startDate": "2026-03-16", "enrolled": 26, "maxCapacity": 30, "status": "Running" },
    { "batchCode": "BAT-2026-004", "course": "Python Development", "centre": "Pune", "startDate": "2026-04-06", "enrolled": 22, "maxCapacity": 25, "status": "Running" },
    { "batchCode": "BAT-2026-005", "course": "UI/UX Design", "centre": "Mumbai", "startDate": "2026-05-04", "enrolled": 18, "maxCapacity": 25, "status": "Running" }
  ],
  "pagination": { "page": 1, "limit": 5, "totalRecords": 12, "totalPages": 3 }
}
```

---

### 8.2 Search by Course Name

```bash
curl "http://localhost:5000/api/batches?search=python"
```

```json
{
  "success": true,
  "data": [
    { "batchCode": "BAT-2026-004", "course": "Python Development", "centre": "Pune", "startDate": "2026-04-06", "enrolled": 22, "maxCapacity": 25, "status": "Running" },
    { "batchCode": "BAT-2026-011", "course": "Python Development", "centre": "Pune", "startDate": "2026-10-05", "enrolled": 19, "maxCapacity": 25, "status": "Upcoming" }
  ],
  "pagination": { "page": 1, "limit": 5, "totalRecords": 2, "totalPages": 1 }
}
```

---

### 8.3 Filter by Status

```bash
curl "http://localhost:5000/api/batches?status=Running"
```

```json
{
  "success": true,
  "data": [
    { "batchCode": "BAT-2026-003", "course": "Cloud Engineering", "centre": "Chennai", "startDate": "2026-03-16", "enrolled": 26, "maxCapacity": 30, "status": "Running" },
    { "batchCode": "BAT-2026-004", "course": "Python Development", "centre": "Pune", "startDate": "2026-04-06", "enrolled": 22, "maxCapacity": 25, "status": "Running" },
    { "batchCode": "BAT-2026-005", "course": "UI/UX Design", "centre": "Mumbai", "startDate": "2026-05-04", "enrolled": 18, "maxCapacity": 25, "status": "Running" }
  ],
  "pagination": { "page": 1, "limit": 5, "totalRecords": 3, "totalPages": 1 }
}
```

---

### 8.4 Filter by Centre

```bash
curl "http://localhost:5000/api/batches?centre=Bengaluru"
```

```json
{
  "success": true,
  "data": [
    { "batchCode": "BAT-2026-001", "course": "Full Stack Web Development", "centre": "Bengaluru", "startDate": "2026-01-12", "enrolled": 28, "maxCapacity": 30, "status": "Completed" },
    { "batchCode": "BAT-2026-007", "course": "Full Stack Web Development", "centre": "Bengaluru", "startDate": "2026-07-06", "enrolled": 30, "maxCapacity": 30, "status": "Upcoming" }
  ],
  "pagination": { "page": 1, "limit": 5, "totalRecords": 2, "totalPages": 1 }
}
```

---

### 8.5 Combined Filters with Pagination

```bash
curl "http://localhost:5000/api/batches?status=Upcoming&page=2&limit=3"
```

```json
{
  "success": true,
  "data": [
    { "batchCode": "BAT-2026-009", "course": "Cloud Engineering", "centre": "Hyderabad", "startDate": "2026-08-17", "enrolled": 21, "maxCapacity": 30, "status": "Upcoming" },
    { "batchCode": "BAT-2026-010", "course": "Java Development", "centre": "Chennai", "startDate": "2026-09-07", "enrolled": 27, "maxCapacity": 30, "status": "Upcoming" },
    { "batchCode": "BAT-2026-011", "course": "Python Development", "centre": "Pune", "startDate": "2026-10-05", "enrolled": 19, "maxCapacity": 25, "status": "Upcoming" }
  ],
  "pagination": { "page": 2, "limit": 3, "totalRecords": 7, "totalPages": 3 }
}
```

---

### 8.6 Invalid Parameter — 400 Error

```bash
curl "http://localhost:5000/api/batches?page=0"
```

```json
{
  "error": "page must be at least 1 and limit must be between 1 and 100"
}
```

```bash
curl "http://localhost:5000/api/batches?status=Active"
```

```json
{
  "error": "status must be one of: Running, Upcoming, Completed"
}
```

---

## 9. Sample Batch Data Reference

All 12 currently available batch records:

| Batch Code | Course | Centre | Start Date | Enrolled | Capacity | Status |
|---|---|---|---|---|---|---|
| BAT-2026-001 | Full Stack Web Development | Bengaluru | 2026-01-12 | 28 | 30 | Completed |
| BAT-2026-002 | Data Analytics | Hyderabad | 2026-02-02 | 24 | 30 | Completed |
| BAT-2026-003 | Cloud Engineering | Chennai | 2026-03-16 | 26 | 30 | Running |
| BAT-2026-004 | Python Development | Pune | 2026-04-06 | 22 | 25 | Running |
| BAT-2026-005 | UI/UX Design | Mumbai | 2026-05-04 | 18 | 25 | Running |
| BAT-2026-006 | Cybersecurity Fundamentals | Delhi | 2026-06-08 | 20 | 25 | Upcoming |
| BAT-2026-007 | Full Stack Web Development | Bengaluru | 2026-07-06 | 30 | 30 | Upcoming |
| BAT-2026-008 | Data Analytics | Kochi | 2026-08-03 | 16 | 25 | Upcoming |
| BAT-2026-009 | Cloud Engineering | Hyderabad | 2026-08-17 | 21 | 30 | Upcoming |
| BAT-2026-010 | Java Development | Chennai | 2026-09-07 | 27 | 30 | Upcoming |
| BAT-2026-011 | Python Development | Pune | 2026-10-05 | 19 | 25 | Upcoming |
| BAT-2026-012 | DevOps Engineering | Mumbai | 2026-11-02 | 23 | 25 | Upcoming |

---

## 10. CORS Configuration

The API currently allows cross-origin requests from **all origins** using the `cors()` middleware with default settings.

```
Access-Control-Allow-Origin: *
```

> [!WARNING]
> Restrict CORS origins before exposing this API publicly with production data.

---

## 11. Rate Limiting

No rate limiting is implemented in v1.0. All requests are accepted without throttling.

---

## 12. Versioning

The API does not currently implement versioning. If breaking changes are introduced in the future, versioning should be added via URL prefix (e.g., `/api/v2/batches`) or HTTP headers.

---

*This document is prepared for educational and assignment purposes.*


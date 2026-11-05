# Deployment Document

## Batch Operations UI

**Prepared by:** Bharath Kumar Chaduvula
**Version:** 1.0
**Date:** 2026-11-05
**Document Status:** Final

---

## 1. Introduction

This document provides step-by-step instructions for deploying the **Batch Operations UI** application. The system has two independent deployable units:

1. **Frontend** — A React SPA built with Vite, deployed to **Vercel**.
2. **Backend** — A Node.js Express API, deployed to any **Node.js-compatible host**.

---

## 2. System Requirements

### 2.1 Frontend (Build Machine)

| Requirement | Minimum |
|---|---|
| Node.js | v18 LTS |
| npm | v9 |
| Disk space | ~200 MB (including node_modules) |

### 2.2 Backend (Server)

| Requirement | Minimum |
|---|---|
| Node.js | v18 LTS |
| npm | v9 |
| RAM | 128 MB |
| Disk space | ~50 MB (including node_modules) |

---

## 3. Environment Variables

### 3.1 Frontend

| Variable | Required | Description | Example |
|---|---|---|---|
| `VITE_API_BASE_URL` | In production | Full URL of the deployed backend API | `https://batch-api.example.com` |

> [!NOTE]
> In development mode (`npm run dev`), `VITE_API_BASE_URL` defaults to `http://localhost:5000` automatically. You do not need a `.env` file locally.

### 3.2 Backend

| Variable | Required | Description | Default |
|---|---|---|---|
| `PORT` | No | TCP port for the HTTP server | `5000` |

---

## 4. Local Development Deployment

### Step 1 — Install Dependencies

```bash
# Backend
cd project/backend
npm install

# Frontend
cd project/frontend
npm install
```

### Step 2 — Start the Backend

```bash
cd project/backend
npm run dev
```

Expected output:
```
Batch Operations API listening on http://localhost:5000
```

### Step 3 — Start the Frontend

```bash
cd project/frontend
npm run dev
```

Expected output:
```
  VITE vX.X.X  ready in Xms
  ➜  Local:   http://localhost:5173/
```

### Step 4 — Open in Browser

Navigate to `http://localhost:5173` in your browser.

---

## 5. Production Build

### 5.1 Build the Frontend

```bash
cd project/frontend
npm run build
```

Output files are written to `frontend/dist/`:

```
frontend/dist/
├── index.html
└── assets/
    ├── index-XXXXXXXX.js   (bundled JS)
    └── index-XXXXXXXX.css  (bundled CSS)
```

### 5.2 Preview the Production Build Locally

```bash
cd project/frontend
npm run preview
# Serves at http://localhost:4173
```

---

## 6. Frontend Deployment — Vercel

### Option A: Vercel Dashboard (Recommended)

1. Push your repository to **GitHub** (or GitLab / Bitbucket).
2. Go to [https://vercel.com](https://vercel.com) and sign in.
3. Click **"Add New Project"** → Import your repository.
4. Configure the project:

   | Setting | Value |
   |---|---|
   | **Framework Preset** | Vite |
   | **Root Directory** | `project/frontend` |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |

5. Add the environment variable:

   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://your-deployed-backend-url.com` |

6. Click **Deploy**.

### Option B: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend
cd project/frontend

# Deploy
vercel --prod
```

Follow the prompts. When asked for the build command, use `npm run build`, and for the output directory use `dist`.

> [!IMPORTANT]
> After setting or changing `VITE_API_BASE_URL` in Vercel, you must **redeploy** the frontend for the new value to take effect. Environment variables are baked into the build.

---

## 7. Backend Deployment — Node.js Host

The backend can be deployed to any platform that runs Node.js processes.

### Option A: Render (Free Tier Available)

1. Go to [https://render.com](https://render.com) and sign in.
2. Click **New → Web Service**.
3. Connect your GitHub repository.
4. Configure:

   | Setting | Value |
   |---|---|
   | **Root Directory** | `project/backend` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Environment** | `Node` |

5. Add environment variable (optional):

   | Key | Value |
   |---|---|
   | `PORT` | (Leave empty; Render sets this automatically) |

6. Click **Create Web Service**.

### Option B: Railway

1. Go to [https://railway.app](https://railway.app) and sign in.
2. Create a new project → Deploy from GitHub repo.
3. Set the **Root Directory** to `project/backend`.
4. Railway auto-detects Node.js and runs `npm start`.

### Option C: Manual VPS / Server

```bash
# On the server
git clone <repo-url>
cd "Batch Operations UI/project/backend"
npm install
npm start

# Or with PM2 for process management
npm install -g pm2
pm2 start server.js --name batch-operations-api
pm2 save
pm2 startup
```

---

## 8. Post-Deployment Checklist

### Backend
- [ ] `GET https://your-backend-url/` returns `{ "message": "Batch Operations API is running" }`
- [ ] `GET https://your-backend-url/api/batches` returns batch data
- [ ] Server is reachable from the public internet

### Frontend
- [ ] `VITE_API_BASE_URL` is set to the correct backend URL in Vercel settings
- [ ] Frontend is redeployed after setting the env variable
- [ ] The deployed frontend loads batches from the backend correctly
- [ ] Search, filter, and pagination all work in the production environment
- [ ] Error state appears correctly if the backend is stopped

---

## 9. Connecting Frontend to Backend

After deploying both:

1. Copy your backend's public URL (e.g., `https://batch-api.onrender.com`).
2. In your Vercel project settings → **Environment Variables**:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://batch-api.onrender.com`
3. Trigger a **Redeploy** in Vercel.

The frontend will now make all API calls to your deployed backend.

---

## 10. Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| Blank page on Vercel | Wrong output directory | Set output directory to `dist` in Vercel settings |
| "Unable to load batches" error | Backend URL wrong or backend not running | Check `VITE_API_BASE_URL`; verify backend is live |
| CORS error in browser console | Frontend origin not allowed | Backend CORS is open by default; ensure `cors()` middleware is active |
| `PORT` conflict locally | Port 5000 already in use | Set `PORT=5001` in a `.env` file in `backend/` |
| `npm run build` fails | Missing dependencies | Run `npm install` in `frontend/` again |
| Data disappears on backend restart | In-memory data | Expected in v1.0; database planned for Phase 2 |

---

## 11. Rollback Procedure

### Frontend (Vercel)

1. Go to Vercel Dashboard → Project → **Deployments**.
2. Find the last working deployment.
3. Click the **three-dot menu** → **Promote to Production**.

### Backend (Render)

1. Go to Render Dashboard → Service → **Events**.
2. Find a working deploy.
3. Click **Rollback** (if available), or redeploy an older Git commit.

---

*This document is prepared for educational and assignment purposes.*


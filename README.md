# ApkaJob

Built this while learning React and modern frontend stuff.

Didn’t want another todo app, so tried building something that feels a bit real —
auth, roles, backend, UI, bugs… all of it.

This is a **learning project**, not a startup.

---

## What is this?

A small hiring-style app with two roles:

**Recruiter**

- post jobs
- open / close hiring
- see applications
- update application status

**Candidate**

- browse jobs
- search and filter
- apply with resume
- track application status
- save jobs

Simple idea, but enough to run into real problems.

---

## Why I built it

Tutorials are nice, but they don’t show:

- auth edge cases
- permission issues
- broken APIs
- weird bugs at 2 AM

So I built this to:

- break things
- fix them
- understand why they broke

Learned way more this way.

---

## Stuff I practiced

- React component structure
- role-based UI (same app, different views)
- drawers, tables, responsive layouts
- form handling
- real API calls
- Supabase RLS (painful but useful)
- passing the right data types 

---

## Tech used

Frontend:

- React
- Vite
- React Router
- Tailwind
- Shadcn UI

Backend & auth:

- Supabase (Postgres, RLS, storage)
- Clerk (authentication)

---

### 1. Create a .env file in the root directory and add the following:

VITE_CLERK_PUBLISHABLE_KEY=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/WorkFlo.git
cd ApkaJob
npm install
npm run dev
```

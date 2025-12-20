# ApkaJob – Modern Recruitment Platform

**ApkaJob** is a professional-grade recruitment platform designed to simplify and structure the hiring process. It connects candidates and recruiters through a clean, interactive, and efficient interface, managing the complete job lifecycle from posting to application tracking.

---

## Table of Contents
- [Application Overview](#application-overview)
- [User Roles](#user-roles)
- [Major Sections](#major-sections)
- [Technology Stack & Services](#technology-stack--services)
- [Design System (Shadcn UI)](#design-system-shadcn-ui)
- [Database Schema](#database-schema)
- [Installation & Setup](#installation--setup)

---

## Application Overview

ApkaJob is a **dual-role platform** built for both **Recruiters** and **Candidates**.

Users authenticate on entry and complete an onboarding flow where they select their role. This role is persisted and determines the UI, permissions, and available features throughout the application.

---

## User Roles

### Recruiters
ApkaJob acts as a lightweight **Applicant Tracking System (ATS)** for recruiters.

Recruiters can:
- Create and publish job postings with rich-text descriptions
- View and manage all posted jobs from a dedicated dashboard
- Open or close job listings
- Review incoming applications
- Update candidate statuses (Applied, Interviewing, Selected, Rejected)

---

### Candidates
For candidates, ApkaJob works as a **job discovery and application platform**.

Candidates can:
- Browse all available job listings
- Filter jobs by location, company, and remote availability
- Search by job title
- Apply directly with resume uploads
- Track application status in real time
- Save jobs for later reference

---

## Major Sections

### 1. Landing & Authentication
- High-performance landing page
- Authentication powered by **Clerk**
- Supports passwordless and social logins
- Role selection via onboarding flow

---

### 2. Job Feed & Discovery
- Real-time filtering by location, company, and job attributes
- Instant search for job titles
- Job cards with key information at a glance

---

### 3. Job Details & Application
- Markdown-rendered job descriptions and requirements
- Hiring company information
- Application drawer for seamless job applications

---

### 4. Recruiter Dashboard (My Jobs)
- View all posted jobs
- Monitor applicant counts
- Toggle job status (Open / Closed)
- Delete outdated listings

---

### 5. Candidate Dashboard (My Applications / Saved Jobs)
- Track application status
- Manage saved jobs

---

## Technology Stack & Services

### Core Services
- **Clerk**  
  Authentication, session management, and role-based access control

- **Supabase**
  - PostgreSQL database for jobs, companies, and applications
  - Storage buckets for resumes and company logos

---

### Frontend
- **React 19**
- **Vite**
- **React Router v7**

---

## Design System (Shadcn UI)

The UI is built using **Shadcn UI**, powered by **Radix UI** and **Tailwind CSS**.

Key advantages:
- Full component customization
- Zero runtime overhead
- Built-in accessibility support

### Components Used
- Drawers and dialogs
- Cards
- Accordions
- Form elements with **Zod** validation

---

## Database Schema

The database consists of four main entities:

- **Jobs**  
  Job details, location, and open/closed status

- **Companies**  
  Company information and branding assets

- **Applications**  
  Candidate-to-job mapping, application status, resume reference

- **Saved Jobs**  
  Bookmarking functionality for candidates

---

## Installation & Setup

### 1. Create a .env file in the root directory and add the following:
VITE_CLERK_PUBLISHABLE_KEY=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/ApkaJob.git
cd ApkaJob
npm install
npm run dev

# ApkaJob - Modern Recruitment Platform

**ApkaJob** is a professional-grade recruitment platform engineered to streamline the hiring process. It connects candidates with recruiters through a seamless, interactive, and aesthetically refined interface. The application handles the entire lifecycle of a job, from initial posting to candidate application and status tracking.

---

## Table of Contents
- [Application Overview & Operation](#application-overview--operation)
- [Major Sections](#major-sections)
- [Technology Stack & Services](#technology-stack--services)
- [Design System (Shadcn UI)](#design-system-shadcn-ui)
- [Database Schema](#database-schema)
- [Installation & Setup](#installation--setup)

---

## Application Overview & Operation

ApkaJob operates as a dual-facing platform serving two distinct user roles: **Recruiters** and **Candidates**.

Upon accessing the platform, users are authenticated and guided through an onboarding process to establish their role. This role persists and dictates the interface and permissions available to them.

<b>For Recruiters:</b>
The platform serves as an Applicant Tracking System (ATS). Recruiters can draft and publish job openings with rich text descriptions. They have access to a dashboard where they can manage their listings (opening/closing positions) and review incoming applications. The system allows them to update the status of each applicant (e.g., from 'Applied' to 'Interviewing'), providing a structured workflow for hiring.

<b>For Candidates:</b>
ApkaJob functions as a job discovery and application engine. Candidates can browse a global list of opportunities, filter by meaningful criteria (location, remote work, company), and apply instantly. The application process supports resume uploads and tracks the status of every application submitted, giving candidates real-time visibility into their hiring progress.

---

## Major Sections

### 1. Landing & Authentication
The entry point of the application features a high-performance landing page. Authentication is handled via **Clerk**, providing secure, passwordless, and social login options. New users are routed to a dedicated **Onboarding** flow to select their role.

### 2. Job Feed & Discovery
The core browsing experience. This section features:
- **Dynamic Filtering**: Real-time filtering by location, company, and job attributes.
- **Search**: Instant text search for job titles.
- **Job Cards**: Detailed preview cards that provide key insights at a glance.

### 3. Job Details & Application
A dedicated page for each job posting. It displays:
- **Rich Information**: Full markdown-rendered job descriptions and requirements.
- **Company Context**: Information about the hiring company.
- **Application Drawer**: A seamless slide-out interface for candidates to submit their specific details and resume without leaving the context of the job description.

### 4. Recruiter Dashboard ("My Jobs")
A specialized view for recruiters to:
- See all jobs they have posted.
- Monitor applicant counts.
- Toggle hiring status (Open/Closed).
- Delete obsolete listings.

### 5. Candidate Dashboard ("My Applications" / "Saved Jobs")
A personal space for candidates to:
- Track the status of jobs they have applied to.
- Access a list of bookmarked jobs for future consideration.

---

## Technology Stack & Services

The application relies on a modern, serverless stack designed for reliability and scale.

### Core Services
- **Clerk**: Handles all Identity and Access Management (IAM). Manages user sessions, profile data, and secure role-based access control.
- **Supabase**: acts as the backend-as-a-service (BaaS).
    - **PostgreSQL Database**: Stores all relational data (jobs, applications, companies).
    - **Buckets/Storage**: Secure object storage for storing user-uploaded resumes and company, logos.

### Frontend Framework
- **React 19**: The view layer, leveraging the latest features for concurrent rendering.
- **Vite**: The build tool and development server, ensuring instant HMR and optimized production builds.
- **React Router v7**: Manages client-side routing and protected route logic.

---

## Design System (Shadcn UI)

The user interface is built using **Shadcn UI**, a collection of re-usable components built using Radix UI and Tailwind CSS.

Unlike traditional component libraries, Shadcn UI provides raw, accessible code that is integrated directly into the project. This allows for:
- **Complete Customization**: Every aspect of the component (buttons, dialogs, inputs) is accessible and modifiable in the codebase.
- **Zero Runtime Overhead**: Components are compiled as part of the app, not loaded as heavy external packages.
- **Accessibility (a11y)**: Built on **Radix UI** primitives, ensuring full keyboard navigation, screen reader support, and focus management out of the box.

Key Shadcn components used include:
- **Drawers & Dialogs**: For smooth, overlay-based interactions (e.g., applying to a job).
- **Accordions**: For organizing dense information.
- **Cards**: For consistent data display.
- **Form Elements**: Selects, Inputs, and TextAreas enhanced with **Zod** validation.

---

## Database Schema

The functional data model is hosted on Supabase and consists of four primary entities:

- **Jobs**: The central entity containing all posting details (title, description, location) and status flags (open/closed).
- **Companies**: Stores organizational data and branding assets (logos), linked to jobs.
- **Applications**: Connects a Candidate to a Job. This table tracks the application status and stores the reference to the candidate's Resume file.
- **Saved Jobs**: A relational join table enabling the "Bookmark" feature for candidates.

---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ApkaJob.git
   cd ApkaJob
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your credentials for Clerk and Supabase:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=...
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

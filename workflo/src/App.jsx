import React, { Children } from "react";
import supabase from "./utils/supabase";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyJobs from "./pages/my-jobs";
import SavedJobs from "./pages/saved-job";
import AppLayout from "./layouts/app-layout";
import Landing from "./pages/landing";
import Onboarding from "./pages/onboarding";
import JobListing from "./pages/jobListing";
import PostJob from "./pages/post-job";
import JobPage from "./pages/job";
import { ThemeProvider } from "./components/ui/theme-provider";
import { ClerkProvider } from "@clerk/clerk-react";
import ProtectedRoutes from "./components/protected-routes";
import { BarLoader } from "react-spinners";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk publishable key");
  }
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoutes>
              <Landing />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/onboarding",
          element: (
            <ProtectedRoutes>
              <Onboarding />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/jobs",
          element: (
            <ProtectedRoutes>
              <JobListing />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/job/:id",
          element: (
            <ProtectedRoutes>
              <JobPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/saved-jobs",
          element: (
            <ProtectedRoutes>
              <SavedJobs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/my-jobs",
          element: (
            <ProtectedRoutes>
              <MyJobs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/post-job",
          element: (
            <ProtectedRoutes>
              <PostJob />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);
}
return (
  <>
    <ClerkProvider
      appearance={{ theme: "simple" }}
      publishableKey={PUBLISHABLE_KEY}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </ClerkProvider>

    <Analytics />
  </>
);

export default App;

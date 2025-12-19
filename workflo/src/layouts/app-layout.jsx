import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function AppLayout() {
  return (
    <div className="min-h-screen max-w-5xl mx-auto relative">
      <div className="grid-background"></div>
      <main className="relative z-10 min-h-screen px-4 py-2">
        <Header />
        <Outlet />
      </main>
      <footer className="relative z-10 p-2 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} WorkFlo. All rights reserved.
      </footer>
    </div>
  );
}

export default AppLayout;

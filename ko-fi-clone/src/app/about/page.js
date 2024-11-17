// src/app/about/page.js
"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";

export default function About() {
  return (
    <ProtectedRoute>
      <Header />
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Page</h1>
          <p className="text-gray-600">
            This is a protected page that only authenticated users can access.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}

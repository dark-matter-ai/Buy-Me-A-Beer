// src/app/layout.js
"use client";

import "./styles/globals.css";
import { AuthContextProvider } from "./context/AuthContext";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <main>{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  );
}

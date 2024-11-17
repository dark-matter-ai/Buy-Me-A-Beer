// src/app/components/ProtectedRoute.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import EmailVerificationNotice from "./EmailVerificationNotice";

export default function ProtectedRoute({
  children,
  requireVerification = true,
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <>
      {children}
      {requireVerification && <EmailVerificationNotice user={user} />}
    </>
  );
}

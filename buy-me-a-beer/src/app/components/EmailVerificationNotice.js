// src/app/components/EmailVerificationNotice.js
"use client";

import { useState, useEffect } from "react";
import { resendVerificationEmail } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import { getUserDataByEmail } from "../firebase/store";

export default function EmailVerificationNotice({ currentProfileUserid }) {
  const [resendLoading, setResendLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      // Don't show if no user is logged in
      if (!user) {
        setShowNotice(false);
        return;
      }

      // Get the logged-in user's profile data
      const { userData } = await getUserDataByEmail(user.email);

      // Only show notification if:
      // 1. User is not verified
      // 2. User is viewing their own profile
      // 3. We have their userData
      if (!user.emailVerified && userData?.userid === currentProfileUserid) {
        setShowNotice(true);
      } else {
        setShowNotice(false);
      }
    };

    checkVerificationStatus();
  }, [user, currentProfileUserid]);

  const handleResendEmail = async () => {
    if (!user) return;

    setResendLoading(true);
    setResendStatus("");

    const { error } = await resendVerificationEmail(user);

    if (error) {
      setResendStatus("error");
    } else {
      setResendStatus("success");
    }

    setResendLoading(false);
  };

  if (!showNotice) return null;

  return (
    <div className="fixed bottom-10 left-4 max-w-sm bg-yellow-50 p-4 rounded-lg shadow-lg border border-yellow-200 z-50">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Email Verification Required
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Please verify your email address. Check your inbox for a
              verification link.
            </p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleResendEmail}
              disabled={resendLoading}
              className="text-sm font-medium text-yellow-800 hover:text-yellow-900 focus:outline-none"
            >
              {resendLoading ? "Sending..." : "Resend verification email"}
            </button>
          </div>
          {resendStatus === "success" && (
            <p className="mt-2 text-sm text-green-600">
              Verification email sent successfully!
            </p>
          )}
          {resendStatus === "error" && (
            <p className="mt-2 text-sm text-red-600">
              Failed to send verification email. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

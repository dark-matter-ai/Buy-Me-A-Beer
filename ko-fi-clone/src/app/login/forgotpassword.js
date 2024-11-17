// src/app/login/forgotpassword.js
"use client";

import { useState } from "react";
import { resetPassword } from "../firebase/auth";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const { error: resetError } = await resetPassword(email);

    if (resetError) {
      setError(resetError);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    // Close modal after 3 seconds on success
    setTimeout(() => {
      onClose();
      setEmail("");
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Forgot Password
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success ? (
          <div className="mb-4 p-2 bg-green-100 text-green-600 rounded-lg text-sm">
            Password reset link has been sent to your email address. Please
            check your inbox.
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-6">
              Enter your email address, and we'll send you a link to reset your
              password.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold transition duration-300 hover:bg-blue-600 disabled:bg-blue-300"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

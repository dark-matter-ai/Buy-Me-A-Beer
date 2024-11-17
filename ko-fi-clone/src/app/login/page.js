// src/app/login/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import ForgotPasswordModal from "./forgotpassword";
import Header from "../components/Header";
import { logIn } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/about");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    const { user, error: loginError } = await logIn(
      formData.email,
      formData.password
    );

    if (loginError) {
      setError(loginError);
      setLoading(false);
      return;
    }

    if (user) {
      router.push("/about");
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-white pt-20">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4 sm:mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-lg text-sm">
              {"Invalid credentials. Please verify and try again"}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white text-lg font-semibold py-3 rounded-lg transition duration-300 hover:bg-gray-800 disabled:bg-gray-400"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
          <div className="text-center mt-6">
            <button
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-gray-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="text-center mt-6 text-sm">
            New to Ko-Fi?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </div>
        </div>
        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
        />
      </div>
    </>
  );
}

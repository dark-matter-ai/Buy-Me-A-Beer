// src/app/login/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import ForgotPasswordModal from "./forgotpassword";
import Header from "../components/Header";
import { logIn, signInWithGoogle } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import { getUserDataByEmail } from "../firebase/store";

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
      // Get user data and redirect to their profile page
      const { userData } = await getUserDataByEmail(user.email);
      if (userData?.userid) {
        router.push(`/profile/${userData.userid}`);
      }
    }
    setLoading(false);
  };

  // Also update the Google Sign In handler in the same file
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    const { user, userid, error: googleError } = await signInWithGoogle();

    if (googleError) {
      setError(googleError);
      setLoading(false);
      return;
    }

    if (user && userid) {
      router.push(`/profile/${userid}`);
    }
    setLoading(false);
  };

  // Update useEffect
  useEffect(() => {
    const checkUserAndRedirect = async () => {
      if (user) {
        const { userData } = await getUserDataByEmail(user.email);
        if (userData?.userid) {
          router.push(`/profile/${userData.userid}`);
        }
      }
    };

    checkUserAndRedirect();
  }, [user, router]);

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
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-4 w-full flex justify-center items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>
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

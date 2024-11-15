"use client";

import { useState } from "react";
import ForgotPasswordModal from "./forgotpassword";

export default function Login() {
  // State to manage modal visibility
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  // Function to open the modal
  const openForgotPasswordModal = () => {
    setIsForgotPasswordOpen(true);
  };

  // Function to close the modal
  const closeForgotPasswordModal = () => {
    setIsForgotPasswordOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white pt-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4 sm:mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-black text-white text-lg font-semibold py-3 rounded-lg transition duration-300 hover:bg-gray-800"
          >
            Log in
          </button>
        </form>
        <div className="text-center mt-6">
          <button
            onClick={openForgotPasswordModal}
            className="text-gray-500 hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="flex items-center justify-center mt-6">
          <span className="text-gray-500 text-sm">or log in with</span>
        </div>
        <div className="flex flex-col space-y-3 mt-4">
          <button className="w-full bg-gray-100 text-black font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-gray-200">
            Twitter
          </button>
          <button className="w-full bg-gray-100 text-black font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-gray-200">
            Google
          </button>
          <button className="w-full bg-gray-100 text-black font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-gray-200">
            Facebook
          </button>
          <button className="w-full bg-gray-100 text-black font-semibold py-2 rounded-lg flex items-center justify-center hover:bg-gray-200">
            Twitch
          </button>
        </div>
        <div className="text-center mt-6 text-sm">
          New to Ko-Fi?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </div>
      </div>
      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={closeForgotPasswordModal}
      />
    </div>
  );
}

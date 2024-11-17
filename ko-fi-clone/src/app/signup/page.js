"use client";
import { useState } from "react";

export default function Signup() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleTermsChange = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white pt-20">
      {" "}
      {/* Added pt-20 */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4 sm:mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign up. It's free!
        </h2>

        {/* Signup form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Display Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Choose a Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-start space-x-2 mt-4">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={handleTermsChange}
              className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="text-gray-500 text-sm">
              I accept the{" "}
              <a href="#" className="text-blue-500 hover:underline">
                terms & privacy policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full ${
              acceptedTerms ? "bg-black" : "bg-gray-300 cursor-not-allowed"
            } text-white text-lg font-semibold py-3 rounded-lg transition duration-300`}
            disabled={!acceptedTerms}
          >
            Create account
          </button>
        </form>

        <div className="flex items-center justify-center mt-6">
          <span className="text-gray-500 text-sm">or sign up with</span>
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
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in here
          </a>
        </div>
      </div>
    </div>
  );
}

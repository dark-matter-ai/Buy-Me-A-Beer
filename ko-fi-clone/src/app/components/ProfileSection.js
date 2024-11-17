"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function ProfileSection() {
  const { user } = useAuth();
  const redLink = !user ? "/login" : "/profile";
  return (
    <>
      <section className="bg-beige mt-20 py-12 px-6 min-h-[70vh] flex items-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Buy me a Beer
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Join 1M+ creators getting donations, memberships, and sales from
              fans!
            </p>
            <Link
              href={redLink}
              className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-gray-800 hover:scale-95 active:scale-90 transition duration-300"
            >
              Get Started
            </Link>
            <p className="text-lg text-gray-600 mt-6">
              $11M earned last month - It's free
            </p>
          </div>

          {/* GIF Section */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src="https://th.bing.com/th/id/OIP.4mmvYFdDmGSp9cXFO_FyGAHaEo?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Beer Overflowing"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>
    </>
  );
}

"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { getUserDataByEmail } from "../firebase/store";
import { useState, useEffect } from "react";

export default function ProfileSection() {
  const { user } = useAuth();
  const [profileLink, setProfileLink] = useState("/login");

  useEffect(() => {
    const getProfileLink = async () => {
      if (user) {
        const { userData } = await getUserDataByEmail(user.email);
        if (userData?.userid) {
          setProfileLink(`/profile/${userData.userid}`);
        }
      }
    };

    getProfileLink();
  }, [user]);

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
              href={profileLink}
              className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-gray-800 hover:scale-95 active:scale-90 transition duration-300"
            >
              Get Started
            </Link>
            <p className="text-lg text-gray-600 mt-6">
              $11M earned last month - It's free
            </p>
          </div>

          {/* GIF Section */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center hover:scale-95 active:scale-90 transition duration-300">
            <img
              src="https://i.pinimg.com/736x/79/6b/38/796b3813554942e9b87ed586fb822c76.jpg"
              alt="Beer Overflowing"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>
    </>
  );
}

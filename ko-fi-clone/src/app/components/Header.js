// src/app/components/Header.js
"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { logOut } from "../firebase/auth";
import { getUserDataByEmail } from "../firebase/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { userData } = await getUserDataByEmail(user.email);
        if (userData?.userid) {
          setUserProfile(userData);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSignOut = async () => {
    const { error } = await logOut();
    if (!error) {
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-20 backdrop-blur-md py-4 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <div className="flex items-center">
          <Link href="/" className="hover:text-gray-600">
            <img
              src="https://cdn-icons-png.flaticon.com/128/931/931949.png"
              alt="Your Logo"
              className="h-8"
            />
          </Link>
        </div>

        <nav className="flex items-center space-x-6">
          {/* <Link
            href="/explore"
            className="text-black font-bold hover:text-gray-900"
          >
            Explore
          </Link> */}

          <Link
            href="/#how-it-works"
            className="text-black font-bold hover:text-gray-900"
          >
            How it Works
          </Link>

          {!user ? (
            <>
              <Link
                href="/login"
                className="text-black font-bold hover:text-gray-900"
              >
                Login
              </Link>
              <Link href="/signup">
                <button className="inline-block bg-black text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-gray-800 transition duration-300 ml-6">
                  Sign up free
                </button>
              </Link>
            </>
          ) : (
            <>
              {userProfile && (
                <Link
                  href={`/profile/${userProfile.userid}`}
                  className="text-black font-bold hover:text-gray-900"
                >
                  My Profile
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="inline-block bg-black text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-gray-800 transition duration-300"
              >
                Sign out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Share2 } from "lucide-react";
import ShareModal from "../components/ShareModal";
import Header from "../components/Header";

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        {/* Banner */}
        <div className="h-80 bg-gray-300 relative">
          <img
            src="https://images.unsplash.com/photo-1668613966303-1a993a22e93f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner"
            className="w-full h-full object-cover absolute top-0 left-0"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70" />

          {/* Centered Name */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-5xl font-serif tracking-wider">
              CHARLES LAURENT NOBLE
            </h1>
          </div>
        </div>

        {/* Content Container with Relative Positioning */}
        <div className="relative">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-8 z-20">
            <img
              className="w-32 h-32 rounded-full bg-blue-400 flex items-center justify-center text-white border-4 border-white shadow-lg"
              src="https://media.licdn.com/dms/image/v2/D5635AQGFVKpwgSsL3A/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1728403147030?e=1732456800&v=beta&t=U-IU2dNcTC9cr3J577Q2RiEAXGzdGhGjChGf2b500rI"
              alt="profile"
            />
          </div>

          {/* Content Grid */}
          <div className="max-w-6xl mx-auto pt-8 pb-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* About Section */}
            <div className="bg-black text-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">About Charles Noble</h3>
              <p>
                I am Charles. I love Japan and anime woman. I talk Japanese, and
                I am from Bangalore.
              </p>
              <div className="flex items-center justify-between mt-4">
                <a
                  href="https://ryuzen6.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  ryuzen6.github.io
                </a>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:opacity-90"
                >
                  <Share2 size={16} />
                  <span>Share Profile</span>
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-black text-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
              <div className="flex items-center mb-4">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5635AQGFVKpwgSsL3A/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1728403147030?e=1732456800&v=beta&t=U-IU2dNcTC9cr3J577Q2RiEAXGzdGhGjChGf2b500rI"
                  alt="profile pic"
                  className="w-10 h-10 rounded-full bg-gray-600 mr-3"
                />
                <div>
                  <p className="font-semibold">Charles Noble</p>
                  <p className="text-gray-400 text-sm">1 hour ago</p>
                </div>
              </div>
              <p className="bg-gray-700 p-4 rounded-md">
                I won the laurels award!
              </p>
            </div>

            {/* Recent Donations */}
            <div className="bg-black text-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Recent Supporters</h3>
              <p className="mb-2">
                Aarone donated{" "}
                <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                  3 beers
                </span>{" "}
                <span className="text-gray-400">• 3 days ago</span>
              </p>
              <p>
                Suraj donated{" "}
                <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                  1 beer
                </span>{" "}
                <span className="text-gray-400">• 1 month ago</span>
              </p>
            </div>

            {/* Support Button */}
            <div className="flex justify-center items-center">
              <Link
                href="https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Faction&cluster=devnet"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold py-4 px-10 rounded-lg shadow-md flex items-center hover:scale-95 transition duration-300 hover:text-white"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/931/931949.png"
                  alt="Beer Icon"
                  className="w-8 h-8 mr-3"
                />
                Support Charles
              </Link>
            </div>
          </div>
        </div>

        {/* Share Modal */}
        <ShareModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}

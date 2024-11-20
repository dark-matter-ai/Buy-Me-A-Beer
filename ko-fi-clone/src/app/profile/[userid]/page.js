"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Share2,
  LinkIcon,
  Instagram,
  Twitter,
  Youtube,
  Twitch,
  Music2,
  MoreHorizontal,
} from "lucide-react";
import ShareModal from "../../components/ShareModal";
import Header from "../../components/Header";
import { getUserData } from "../../firebase/store";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();
  const params = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      if (params.userid) {
        const { userData: fetchedData, error } = await getUserData(
          params.userid
        );
        if (!error && fetchedData) {
          setUserData(fetchedData);
        }
      }
    };

    fetchUserData();
  }, [params.userid]);

  return (
    <div className="min-h-screen bg-white">
      <Header className="fixed top-0 left-0 right-0 z-50" />
      <div className="pt-16">
        {" "}
        {/* Add padding-top to account for fixed header */}
        <div className="max-w-6xl mx-auto">
          {/* Banner Section */}
          <div className="relative">
            <div className="h-64 rounded-b-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1668613966303-1a993a22e93f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50 overflow-hidden rounded-b-3xl"></div>
            </div>

            {/* Profile Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
              <div className="flex items-end gap-6">
                <img
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                  src="https://ryuzen6.github.io/assets/img/profile-img.jpg"
                  alt="profile"
                />
                <div className="mb-2 text-white">
                  <h1 className="text-2xl font-bold">
                    {userData?.name || "Ko-fi"}
                  </h1>
                  <p className="text-sm opacity-90">2.8M Supporters</p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <button className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/931/931949.png"
                    alt="Beer"
                    width={20}
                    height={20}
                    className="filter brightness-0 invert"
                  />
                  <span>Support</span>
                </button>
                <button className="p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white/70 transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-800" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mt-8 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* About Section */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-white">
                <h3 className="text-2xl font-bold mb-4">About</h3>
                <p className="text-gray-600 mb-6">
                  {userData?.name} was created for creators, by creators. Our
                  mission is to help creators earn a living from their passions!
                </p>

                <a
                  href="https://ryuzen6.github.io/"
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
                >
                  <LinkIcon className="w-4 h-4" />
                  ryuzen6.github.io
                </a>

                <div className="flex gap-4 mb-6">
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <Youtube className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <Twitch className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <Music2 className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>

                <div className="flex gap-2">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                    Fundraising
                  </span>
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                    Social
                  </span>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-white">
                <h3 className="text-2xl font-bold mb-6">Recent Posts</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://ryuzen6.github.io/assets/img/profile-img.jpg"
                      alt="profile pic"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{userData?.name}</p>
                      <p className="text-gray-500 text-sm">1 hour ago</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white shadow-sm">
                    I won the laurels award!
                  </div>
                </div>
              </div>

              {/* Recent Donations */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-white">
                <h3 className="text-2xl font-bold mb-6">Recent Supporters</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Aarone donated{" "}
                    <span className="font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
                      3 beers
                    </span>{" "}
                    <span className="text-gray-400">• 3 days ago</span>
                  </p>
                  <p className="text-gray-600">
                    Suraj donated{" "}
                    <span className="font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
                      1 beers
                    </span>{" "}
                    <span className="text-gray-400">• 1 month ago</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Share Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 rounded-full shadow-lg bg-white hover:bg-gray-100 border border-gray-300 text-gray-900 font-medium px-4 py-2 flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share Profile
        </button>
        {/* Share Modal */}
        <ShareModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

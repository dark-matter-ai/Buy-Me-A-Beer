// src/app/profile/[userid]/page.js
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
import { Menu } from "@headlessui/react";
import ShareModal from "../../components/ShareModal";
import EditProfileModal from "../../components/EditProfileModal";
import CreatePostModal from "../../components/CreatePostModal";
import Header from "../../components/Header";
import { getUserData } from "../../firebase/store";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import EmailVerificationNotice from "../../components/EmailVerificationNotice";

export default function ProfilePage() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
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
          // Check if current authenticated user is viewing their own profile
          if (user && user.email === fetchedData.email) {
            setIsCurrentUser(true);
          }
        }
      }
    };

    fetchUserData();
  }, [params.userid, user]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header className="fixed top-0 left-0 right-0 z-50" />
      <EmailVerificationNotice />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto">
          {/* Banner Section */}
          <div className="relative">
            <div className="h-64 rounded-b-3xl overflow-hidden">
              <img
                src={
                  userData.bannerImage ||
                  "https://images.unsplash.com/photo-1668613966303-1a993a22e93f"
                }
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
                  src={
                    userData.profileImage ||
                    "https://ryuzen6.github.io/assets/img/profile-img.jpg"
                  }
                  alt="profile"
                />
                <div className="mb-2 text-white">
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-sm opacity-90">
                    {userData.superPower || "New Creator"}
                  </p>
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
                {isCurrentUser && (
                  <Menu as="div" className="relative">
                    <Menu.Button className="p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white/70 transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-gray-800" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setIsEditModalOpen(true)}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                          >
                            Edit Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setIsCreatePostModalOpen(true)}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                          >
                            Create New Post
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mt-8 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* About Section */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-white">
                <h3 className="text-2xl font-bold mb-4">About</h3>
                <p className="text-gray-600 mb-6">{userData.about}</p>

                {userData.portfolioUrl && (
                  <a
                    href={userData.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
                  >
                    <LinkIcon className="w-4 h-4" />
                    {new URL(userData.portfolioUrl).hostname}
                  </a>
                )}

                {/* Social Media Icons */}
                {Object.values(userData.socialMedia || {}).some(
                  (url) => url
                ) && (
                  <div className="flex gap-4 mb-6">
                    {userData.socialMedia?.instagram && (
                      <a
                        href={userData.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      </a>
                    )}
                    {userData.socialMedia?.twitter && (
                      <a
                        href={userData.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      </a>
                    )}
                    {userData.socialMedia?.youtube && (
                      <a
                        href={userData.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Youtube className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      </a>
                    )}
                    {userData.socialMedia?.twitch && (
                      <a
                        href={userData.socialMedia.twitch}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitch className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      </a>
                    )}
                    {userData.socialMedia?.music && (
                      <a
                        href={userData.socialMedia.music}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Music2 className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      </a>
                    )}
                  </div>
                )}

                {/* Categories */}
                {userData.categories && userData.categories.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {userData.categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Posts */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-white">
                <h3 className="text-2xl font-bold mb-6">Recent Posts</h3>
                {userData.posts && userData.posts.length > 0 ? (
                  <div className="space-y-6">
                    {userData.posts.map((post, index) => (
                      <div key={index} className="space-y-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={userData.profileImage}
                            alt="profile pic"
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{userData.name}</p>
                            <p className="text-gray-500 text-sm">
                              {new Date(post.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white shadow-sm">
                          {post.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No posts yet</p>
                )}
              </div>

              {/* Recent Supporters */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-white">
                <h3 className="text-2xl font-bold mb-6">Recent Supporters</h3>
                {userData.supporters && userData.supporters.length > 0 ? (
                  <div className="space-y-4">
                    {userData.supporters.map((supporter, index) => (
                      <p key={index} className="text-gray-600">
                        {supporter.name} donated{" "}
                        <span className="font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
                          {supporter.amount} beers
                        </span>{" "}
                        <span className="text-gray-400">
                          • {supporter.timeAgo}
                        </span>
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No supporters yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="fixed bottom-6 right-6 rounded-full shadow-lg bg-white hover:bg-gray-100 border border-gray-300 text-gray-900 font-medium px-4 py-2 flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share Profile
        </button>

        {/* Modals */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
        {isCurrentUser && (
          <>
            <EditProfileModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              userData={userData}
              userid={params.userid}
            />
            <CreatePostModal
              isOpen={isCreatePostModalOpen}
              onClose={() => setIsCreatePostModalOpen(false)}
              userData={userData}
              userid={params.userid}
            />
          </>
        )}
      </div>
    </div>
  );
}

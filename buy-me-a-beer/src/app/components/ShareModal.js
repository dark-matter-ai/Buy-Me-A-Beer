// components/ShareModal.js
import React, { useState } from "react";
import { Copy, Twitter, Facebook, Linkedin, Instagram, X } from "lucide-react";

export default function ShareModal({ isOpen, onClose }) {
  const [showNotification, setShowNotification] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setShowNotification(true);
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-white max-w-md w-full p-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>

          {/* Modal content */}
          <h2 className="text-xl font-semibold mb-4">Share Profile</h2>

          {/* Social media icons */}
          <div className="flex justify-center space-x-4 py-4">
            <a
              href="https://twitter.com/share"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <Twitter className="h-8 w-8 text-blue-400 hover:text-blue-600" />
            </a>
            <a
              href="https://facebook.com/sharer"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <Facebook className="h-8 w-8 text-blue-600 hover:text-blue-800" />
            </a>
            <a
              href="https://www.linkedin.com/sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <Linkedin className="h-8 w-8 text-blue-700 hover:text-blue-900" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <Instagram className="h-8 w-8 text-pink-600 hover:text-pink-800" />
            </a>
          </div>

          {/* URL input and copy button */}
          <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Simple notification toast */}
      {showNotification && (
        <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in-up">
          Profile URL copied
        </div>
      )}

      {/* Add styles for animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

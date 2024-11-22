"use client";

import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";

export default function HowItWorksSection() {
  const [isOpen, setIsOpen] = useState(false);
  const videoId = "cjXjHxIsH3g";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <section id="how-it-works" className="bg-beige py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="separator"></div>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">How It Works</h1>
        <p className="text-xl text-gray-600 mb-12">
          Our platform makes it simple to support creators, share content, and
          get rewards. Here's how it works:
        </p>

        {/* Steps */}
        <div className="flex flex-col sm:flex-row mb-12">
          {[
            {
              title: "Discover Creators",
              description:
                "Browse a wide range of creators in different niches, from art to tech, and everything in between. Find your favorites!",
            },
            {
              title: "Support Creators",
              description:
                "Support your favorite creators by becoming a patron or donating money directly. Choose from multiple ways to show your support!",
            },
            {
              title: "Enjoy Rewards",
              description:
                "Get exclusive content, shoutouts, and more as a thank you for your support. Creators will reward you with awesome perks!",
            },
          ].map((step, index) => (
            <div key={index} className="sm:w-1/3 mb-8 sm:mb-0">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-95 active:scale-90 transition duration-300 text-white rounded-full flex items-center justify-center">
                <span className="text-2xl text-black font-bold">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mt-4">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            See It In Action
          </h2>
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg">
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-full h-auto"
            />
            <button
              onClick={() => setIsOpen(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors duration-300 rounded-2xl"
              aria-label="Play video"
            >
              <Play className="w-16 h-16 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="How It Works Video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

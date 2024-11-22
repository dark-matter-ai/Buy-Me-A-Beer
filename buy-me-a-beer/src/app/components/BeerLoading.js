import React from "react";

const BeerLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-64 h-80">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 256 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mug body */}
          <path
            d="M40 40 H180 Q200 40 200 60 V260 Q200 280 180 280 H40 Q20 280 20 260 V60 Q20 40 40 40 Z"
            fill="#fcf5e5"
            stroke="#d4af37"
            strokeWidth="4"
          />
          {/* Handle */}
          <path
            d="M200 80 Q240 80 240 120 V200 Q240 240 200 240"
            fill="none"
            stroke="#d4af37"
            strokeWidth="8"
          />
          {/* Beer liquid */}
          <path
            className="beer-fill"
            d="M30 250 H190 V250 Q190 270 170 270 H50 Q30 270 30 250 V250 Z"
            fill="url(#beerGradient)"
          />
          {/* Foam */}
          <path
            className="foam"
            d="M30 70 H190"
            fill="none"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Bubbles */}
          <circle
            className="bubble bubble-1"
            cx="60"
            cy="200"
            r="4"
            fill="white"
            opacity="0.8"
          />
          <circle
            className="bubble bubble-2"
            cx="100"
            cy="220"
            r="3"
            fill="white"
            opacity="0.8"
          />
          <circle
            className="bubble bubble-3"
            cx="140"
            cy="180"
            r="5"
            fill="white"
            opacity="0.8"
          />
          {/* Definitions for gradients */}
          <defs>
            <linearGradient id="beerGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbb117" />
              <stop offset="100%" stopColor="#f0c420" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <style jsx>{`
        .beer-fill {
          animation: fill-up 2s ease-out forwards;
        }
        .foam {
          animation: foam-up 2s ease-out forwards;
        }
        .bubble {
          opacity: 0;
          animation: bubble-rise 2s ease-out forwards;
        }
        .bubble-1 {
          animation-delay: 0.2s;
        }
        .bubble-2 {
          animation-delay: 0.5s;
        }
        .bubble-3 {
          animation-delay: 0.8s;
        }

        @keyframes fill-up {
          0% {
            d: path(
              "M30 250 H190 V250 Q190 270 170 270 H50 Q30 270 30 250 V250 Z"
            );
          }
          100% {
            d: path(
              "M30 70 H190 V250 Q190 270 170 270 H50 Q30 270 30 250 V70 Z"
            );
          }
        }
        @keyframes foam-up {
          0% {
            d: path("M30 70 H190");
          }
          50%,
          100% {
            d: path("M30 70 Q60 40 100 70 Q140 40 180 70 H190");
          }
        }
        @keyframes bubble-rise {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateY(-100px);
          }
        }
      `}</style>
    </div>
  );
};

export default BeerLoading;

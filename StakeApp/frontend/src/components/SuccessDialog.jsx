import React from "react";

const SuccessDialog = ({ isOpen, onClose, message, color }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 bg-gradient-radial from-transparent via-black/50 to-black flex items-center justify-center z-50">
      <div className="glass-card rounded-xl p-6 shadow-2xl relative overflow-hidden group w-full max-w-md animate-scale-in transform translate-y-[-10%]">
        {/* Pulsing gradient border effect */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[color]/40 via-[color]/60 to-[color]/40 animate-pulse rounded-xl -z-10"
          style={{ "--color": color }}
        ></div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: color,
                width: `${0.5 + Math.random() * 1.5}rem`,
                height: `${0.5 + Math.random() * 1.5}rem`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float-${i} ${2 + i * 0.5}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <div className="text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div
              className="w-16 h-16 bg-[color]/30 rounded-full flex items-center justify-center animate-pulse-slow"
              style={{ "--color": color }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-8 h-8 text-[color] animate-pulse"
                style={{ "--color": color }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2
            className="text-3xl font-bold tracking-tight mb-6 text-glow"
            style={{ color, "--glow-color": color }}
          >
            Success
          </h2>
          <p className="text-gray-200 mb-6 text-base leading-relaxed break-words">
            {message}
          </p>

          <button
            onClick={onClose}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-[color] to-[color]/70 hover:from-[color]/70 hover:to-[color] hover:scale-105 shadow-lg hover:shadow-2xl hover:cursor-pointer`}
            style={{ "--color": color }}
          >
            <span className="absolute top-0 left-0 w-full h-full bg-white/30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessDialog;

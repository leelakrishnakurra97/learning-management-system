import React from "react";

export const PlanetLogo: React.FC<{ className?: string; hideLetter?: boolean }> = ({
  className = "w-8 h-8",
  hideLetter = false,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Planet sphere gradient */}
        <linearGradient id="planetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" /> {/* brand-violet */}
          <stop offset="50%" stopColor="#3B82F6" /> {/* brand-royal */}
          <stop offset="100%" stopColor="#06B6D4" /> {/* teal */}
        </linearGradient>

        {/* Orbital ring gradient */}
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#06B6D4" stopOpacity="1" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.3" />
        </linearGradient>
      </defs>



      {/* Back orbital ring (behind the planet) */}
      <path
        d="M12 58 C15 46, 85 38, 88 50"
        stroke="url(#ringGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Planet Sphere Core */}
      <circle
        cx="50"
        cy="50"
        r="26"
        fill="url(#planetGrad)"
        className="drop-shadow-lg"
      />

      {/* Elegant white 'N' inside the planet core */}
      {!hideLetter && (
        <path
          d="M 38 36 L 38 64 L 43 64 L 43 44 L 57 64 L 62 64 L 62 36 L 57 36 L 57 56 L 43 36 Z"
          fill="white"
        />
      )}

      {/* Front orbital ring (in front of the planet to complete 3D overlap) */}
      <path
        d="M88 50 C85 62, 15 70, 12 58"
        stroke="url(#ringGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

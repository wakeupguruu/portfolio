import React from "react";

export function PixelArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Pixelated Arrow Shaft */}
      <rect x="2" y="11" width="12" height="2" fill="currentColor" />
      
      {/* Arrow Head (Pixel steps) */}
      <rect x="14" y="11" width="2" height="2" fill="currentColor" />
      <rect x="16" y="10" width="2" height="4" fill="currentColor" />
      <rect x="18" y="9" width="2" height="6" fill="currentColor" />
      <rect x="20" y="8" width="2" height="8" fill="currentColor" />
    </svg>
  );
}

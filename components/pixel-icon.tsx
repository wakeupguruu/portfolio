export function PixelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Hat / Top */}
      <path
        d="M9 2h6v2H9V2zM7 4h10v2H7V4z"
        className="fill-orange-400"
      />
      {/* Face */}
      <path
        d="M7 6h10v4H7V6zM13 8h2v2h-2V8z"
        className="fill-[#e0ac69]"
      />
      {/* Eyes */}
      <path d="M9 8h2v2H9V8z" className="fill-black/80" />
      {/* Shirt/Body */}
      <path
        d="M5 10h14v10H5V10z"
        className="fill-green-700" 
      />
      {/* Arms? */}
      <path d="M3 12h2v4H3v-4zM19 12h2v4h-2v-4z" className="fill-green-800" />
      {/* Legs */}
      <path d="M7 20h4v4H7v-4zM13 20h4v4h-4v-4z" className="fill-[#e0ac69]" />
    </svg>
  );
}

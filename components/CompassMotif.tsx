export function CompassMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="1" opacity="0.1" />

      {/* Cardinal tick marks */}
      <line x1="60" y1="8" x2="60" y2="16" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <line x1="60" y1="104" x2="60" y2="112" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <line x1="8" y1="60" x2="16" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <line x1="104" y1="60" x2="112" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.3" />

      {/* Compass needle - north (coral) */}
      <polygon points="60,18 54,58 66,58" fill="#F97316" opacity="0.8" />
      {/* Compass needle - south (violet) */}
      <polygon points="60,102 54,62 66,62" fill="#7C3AED" opacity="0.6" />

      {/* Center dot */}
      <circle cx="60" cy="60" r="4" fill="#7C3AED" opacity="0.8" />
      <circle cx="60" cy="60" r="2" fill="#FFFBF5" />
    </svg>
  );
}

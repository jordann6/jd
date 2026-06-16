// Monochrome "jd" cloud mark. Inherits color via currentColor so it sits
// cleanly on the light editorial theme (near-black) and can recolor anywhere.
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 48"
      role="img"
      aria-label="jd"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 41 C 13 41, 7 34, 9.5 27 C 4.5 22, 9 13, 16.5 14.5 C 18.5 6.5, 29 4.5, 34 11 C 38.5 5.5, 49 8, 49 17 C 56.5 17, 60 26.5, 53 32 C 55.5 38.5, 48.5 43, 42 41 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* tech accent: two pixels echoing the original mark */}
      <rect x="30" y="12" width="3" height="3" fill="currentColor" />
      <rect x="35" y="15" width="2.2" height="2.2" fill="currentColor" opacity="0.5" />
      <text
        x="33"
        y="35"
        fontFamily="Barlow Condensed, sans-serif"
        fontWeight={800}
        fontSize="21"
        letterSpacing="-0.02em"
        fill="currentColor"
        textAnchor="middle"
      >
        jd
      </text>
    </svg>
  );
}

import { cn } from "@/lib/utils";

export function ArabBankLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current", className)}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))" }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--accent))" }} />
        </linearGradient>
      </defs>
      <g transform="scale(0.5) translate(140, -15)">
        <circle cx="50" cy="50" r="20" fill="url(#logo-gradient)" />
        <circle
          cx="80"
          cy="50"
          r="20"
          fill="transparent"
          stroke="url(#logo-gradient)"
          strokeWidth="5"
        />
        <circle
          cx="110"
          cy="50"
          r="20"
          fill="transparent"
          stroke="url(#logo-gradient)"
          strokeWidth="5"
        />
      </g>
      <text x="0" y="25" fontFamily="Cairo, sans-serif" fontSize="20" fontWeight="bold">
        Arab Bank
      </text>
    </svg>
  );
}

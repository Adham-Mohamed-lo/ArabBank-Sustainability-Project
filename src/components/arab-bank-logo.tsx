import { cn } from "@/lib/utils";

export function ArabBankLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current", className)}
      height="40"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))" }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--accent))" }} />
        </linearGradient>
      </defs>
      <text x="0" y="28" fontFamily="Cairo, sans-serif" fontSize="24" fontWeight="bold">
        Arab Bank
      </text>
      <g transform="translate(125, 0)">
        <circle cx="20" cy="20" r="18" fill="url(#logo-gradient)" />
        <circle cx="40" cy="20" r="18" fill="transparent" stroke="url(#logo-gradient)" strokeWidth="4" />
        <circle cx="60" cy="20" r="18" fill="transparent" stroke="url(#logo-gradient)" strokeWidth="4" />
      </g>
    </svg>
  );
}
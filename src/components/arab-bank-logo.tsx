import Image from 'next/image';
import { cn } from "@/lib/utils";

export function ArabBankLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <span className="text-xl font-bold text-primary-foreground">Arab Bank</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 40"
          className="h-10 w-auto"
          width="100"
          height="40"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'hsl(220, 100%, 50%)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(200, 100%, 50%)', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'hsl(240, 100%, 45%)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(220, 100%, 50%)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M 20 20 a 15 15 0 1 0 0.1 0 Z"
            fill="url(#grad2)"
            stroke="none"
          />
          <path
            d="M 50 20 a 15 15 0 1 0 0.1 0 Z"
            fill="url(#grad1)"
            stroke="none"
            transform="translate(-1, 0)"
          />
           <path
            d="M 80 20 a 15 15 0 1 0 0.1 0 Z"
            fill="url(#grad1)"
            stroke="none"
            transform="translate(-2, 0)"
          />
           <path
            d="M 35 20 a 14 14 0 1 1 -0.1 0 Z"
            fill="url(#grad2)"
            stroke="none"
             transform="translate(1, 0)"
          />
           <path
            d="M 65 20 a 14 14 0 1 1 -0.1 0 Z"
            fill="url(#grad1)"
            stroke="none"
          />
        </svg>
    </div>
  );
}

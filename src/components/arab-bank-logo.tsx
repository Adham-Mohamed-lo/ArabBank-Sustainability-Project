import { cn } from "@/lib/utils";
import Image from "next/image";

export function ArabBankLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <span className="font-bold text-lg">Arab Bank</span>
        <Image 
            src="/arab-bank-logo.png"
            alt="Arab Bank Logo"
            width={80}
            height={80}
            className="object-contain"
        />
    </div>
  );
}

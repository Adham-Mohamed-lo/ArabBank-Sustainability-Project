import Image from 'next/image';
import { cn } from "@/lib/utils";

export function ArabBankLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Arab_Bank.svg/768px-Arab_Bank.svg.png"
            alt="Arab Bank Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
        />
        <span className="text-xl font-bold text-primary-foreground">Arab Bank</span>
    </div>
  );
}

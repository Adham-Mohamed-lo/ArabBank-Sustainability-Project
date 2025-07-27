import { cn } from "@/lib/utils";
import Image from "next/image";

export function ArabBankLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <span className="font-bold text-lg">Arab Bank</span>
        <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Arab_Bank.svg/768px-Arab_Bank.svg.png" 
            alt="Arab Bank Logo"
            width={30}
            height={30}
            className="object-contain"
        />
    </div>
  );
}

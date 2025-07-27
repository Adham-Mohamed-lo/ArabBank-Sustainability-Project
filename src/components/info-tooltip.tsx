"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface InfoTooltipProps {
  info: {
    en: string;
    ar: string;
  };
}

export function InfoTooltip({ info }: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="font-semibold text-right" dir="rtl">{info.ar}</p>
          <p className="mt-1">{info.en}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

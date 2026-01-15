"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button, cn } from "@warp/react";

import { CodeBlock } from "@/components/code-block";

interface CodeToggleProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeToggle({
  code,
  language = "tsx",
  className,
}: CodeToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className={cn(
          "bg-white/5 dark:bg-white/5",
          "border border-white/10 dark:border-white/10",
          "px-6 py-3 rounded-[10px]",
          "text-secondary text-[0.9rem]",
          "font-mono inline-flex items-center gap-2",
          "hover:bg-white/8 dark:hover:bg-white/8",
          "hover:border-cyan-400 hover:text-primary"
        )}
      >
        <span>{`{ }`}</span>
        <span>{isOpen ? "Hide Code" : "View Code"}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </Button>
      {isOpen && (
        <div className="mt-4 animate-[slideDown_0.3s_ease-out]">
          <CodeBlock code={code} language={language} />
        </div>
      )}
    </div>
  );
}

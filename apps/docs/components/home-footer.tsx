"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@warp/react";

export function HomeFooter() {
  return (
    <footer className="relative z-10 py-20 px-4 md:px-16 border-t border-black/8 dark:border-white/8 text-center">
      <p className="text-muted-foreground text-base">
        Built with{" "}
        <Heart className="inline w-4 h-4 fill-current text-red-500" /> for
        developers •{" "}
        <Link
          href="/components"
          className={cn(
            "text-purple-500 no-underline transition-colors duration-300 relative",
            "hover:text-cyan-400",
            "after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px",
            "after:bg-cyan-400 after:transition-all after:duration-300",
            "hover:after:w-full"
          )}
        >
          Documentation
        </Link>{" "}
        •{" "}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-purple-500 no-underline transition-colors duration-300 relative",
            "hover:text-cyan-400",
            "after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px",
            "after:bg-cyan-400 after:transition-all after:duration-300",
            "hover:after:w-full"
          )}
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Warp UI
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

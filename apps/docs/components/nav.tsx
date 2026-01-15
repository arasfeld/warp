"use client";

import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[20px] bg-white/80 dark:bg-[#0a0a0f]/70 border-b border-black/8 dark:border-white/5">
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent font-mono relative animate-[logo-glow_3s_ease-in-out_infinite]"
          >
            WARP_UI
          </Link>
          <div className="flex items-center gap-6">
            <ul className="flex gap-10 list-none m-0 p-0 ml-8">
              <li>
                <Link
                  href="/"
                  className="text-[0.95rem] font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative py-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-purple-500 before:to-cyan-400 before:transition-all before:duration-300 hover:before:w-full hover:-translate-y-0.5"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/components"
                  className="text-[0.95rem] font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative py-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-purple-500 before:to-cyan-400 before:transition-all before:duration-300 hover:before:w-full hover:-translate-y-0.5"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  href="/components/button"
                  className="text-[0.95rem] font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative py-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-purple-500 before:to-cyan-400 before:transition-all before:duration-300 hover:before:w-full hover:-translate-y-0.5"
                >
                  Docs
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/arasfeld/warp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.95rem] font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative py-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-purple-500 before:to-cyan-400 before:transition-all before:duration-300 hover:before:w-full hover:-translate-y-0.5"
                >
                  GitHub
                </a>
              </li>
            </ul>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

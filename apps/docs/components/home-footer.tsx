"use client";

import Link from "next/link";
import { Text } from "@warp/react";

export function HomeFooter() {
  return (
    <footer className="relative z-10 py-16 px-4 md:px-16 border-t border-border/50 text-center">
      <Text color="muted" size="sm">
        Built with ❤️ for developers •{' '}
        <Link href="/components" className="text-purple-500 hover:text-cyan-500 transition-colors">
          Documentation
        </Link>
        {' • '}
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-purple-500 hover:text-cyan-500 transition-colors"
        >
          GitHub
        </a>
      </Text>
    </footer>
  );
}

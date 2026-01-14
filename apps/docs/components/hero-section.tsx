"use client";

import Link from "next/link";
import { Button, Heading, Text } from "@warp/react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function HeroSection({
  title = "Build Stellar Interfaces",
  subtitle = "Cross-platform UI components for React and React Native with shared theming. Beautiful, accessible, and customizable.",
  primaryAction = { label: "Get Started", href: "/components/button" },
  secondaryAction = { label: "View Components", href: "/components" },
}: HeroSectionProps) {
  return (
    <section className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center text-center px-8 py-16">
      <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <Heading 
          level={1} 
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-br from-foreground via-purple-500 to-cyan-500 bg-clip-text text-transparent leading-tight tracking-tight"
        >
          {title}
        </Heading>
        <Text 
          size="lg" 
          color="muted" 
          className="mb-12 max-w-2xl mx-auto animate-fade-in-up" 
          style={{ animationDelay: '0.4s' }}
        >
          {subtitle}
        </Text>
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link href={primaryAction.href}>
            <Button 
              size="lg" 
              className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all btn-shimmer"
            >
              {primaryAction.label}
            </Button>
          </Link>
          <Link href={secondaryAction.href}>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-background/5 backdrop-blur-sm border-border/50 hover:bg-background/10 hover:border-cyan-500 hover:-translate-y-0.5 transition-all"
            >
              {secondaryAction.label}
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-arrow">
        <div className="w-[30px] h-[30px] border-l-2 border-b-2 border-purple-500 rotate-[-45deg]" />
      </div>
    </section>
  );
}

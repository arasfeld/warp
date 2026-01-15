"use client";

import Link from "next/link";
import { Button, cn } from "@warp/react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function HeroSection({
  title = "Build Stellar Interfaces",
  subtitle = "Cross-platform UI components for React and React Native with shared theming. Beautiful, accessible, and infinitely customizable.",
  primaryAction = { label: "Get Started", href: "/components/button" },
  secondaryAction = { label: "View Components", href: "/components" },
}: HeroSectionProps) {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-8 py-16">
      <div className="max-w-4xl mx-auto animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_0.3s_both] relative z-10">
        <h1
          className={cn(
            "text-[clamp(3rem,10vw,7rem)] font-extrabold mb-6 leading-tight tracking-[-0.03em]",
            "relative z-10 block",
            "bg-gradient-to-r from-white via-purple-500 to-cyan-400 bg-clip-text text-transparent",
            "bg-[length:200%_200%]",
            "animate-[titleShimmer_8s_ease-in-out_infinite]"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-[clamp(1.1rem,2.5vw,1.5rem)] mb-12 leading-relaxed",
            "text-muted-foreground dark:text-[#8888aa]",
            "animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_0.5s_both]",
            "relative z-10 block"
          )}
          suppressHydrationWarning
        >
          {subtitle}
        </p>
        <div className="flex gap-6 justify-center flex-wrap animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_0.7s_both]">
          <Button
            component={Link}
            {...({ href: primaryAction.href } as Record<string, unknown>)}
            size="xl"
            className={cn(
              "!px-11 !py-5 !h-auto rounded-xl font-semibold !text-lg",
              "bg-gradient-to-r from-purple-500 to-blue-500 text-white",
              "shadow-[0_15px_40px_rgba(168,85,247,0.4)]",
              "transition-all duration-300 relative overflow-hidden",
              "hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(168,85,247,0.6)]",
              "active:-translate-y-0.5 active:scale-[0.98]",
              "before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full",
              "before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
              "before:transition-all before:duration-500 hover:before:left-full"
            )}
          >
            {primaryAction.label}
          </Button>
          <Button
            component={Link}
            {...({ href: secondaryAction.href } as Record<string, unknown>)}
            variant="outline"
            size="xl"
            className={cn(
              "!px-11 !py-5 !h-auto rounded-xl font-semibold !text-lg",
              "bg-black/5 dark:bg-white/5 text-foreground",
              "border border-black/10 dark:border-white/10",
              "backdrop-blur-[10px]",
              "transition-all duration-300 relative overflow-hidden",
              "hover:bg-black/8 dark:hover:bg-white/8",
              "hover:border-cyan-400 hover:-translate-y-1 hover:scale-[1.02]",
              "hover:shadow-[0_10px_30px_rgba(34,211,238,0.3)]",
              "before:content-[''] before:absolute before:inset-0",
              "before:bg-gradient-to-br before:from-purple-500 before:to-cyan-400",
              "before:opacity-0 before:transition-opacity before:duration-300",
              "hover:before:opacity-10"
            )}
          >
            {secondaryAction.label}
          </Button>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-[bounce-scroll_2s_infinite,fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_1s_both]">
        <div className="w-9 h-9 border-l-[3px] border-b-[3px] border-purple-500 rotate-[-45deg] drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
      </div>
    </section>
  );
}

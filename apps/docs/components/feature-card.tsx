"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Button, Card, cn } from "@warp/react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  animationDelay?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  animationDelay = "0s",
}: FeatureCardProps) {
  return (
    <Card
      padding="xl"
      className={cn(
        "group/feature bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 rounded-3xl",
        "transition-all duration-500 backdrop-blur-[10px] relative overflow-hidden",
        "animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_both]",
        "hover:bg-white/90 dark:hover:bg-white/5",
        "hover:border-purple-500 hover:-translate-y-2.5 hover:scale-[1.02]",
        "hover:shadow-[0_30px_80px_rgba(168,85,247,0.2)]",
        "before:content-[''] before:absolute before:inset-0",
        "before:bg-gradient-to-br before:from-purple-500 before:to-cyan-400",
        "before:opacity-0 before:transition-opacity before:duration-500",
        "hover:before:opacity-5"
      )}
      style={{ animationDelay }}
    >
      <div
        className={cn(
          "w-[70px] h-[70px] rounded-[18px] flex items-center justify-center text-3xl mb-8",
          "bg-gradient-to-br from-purple-500 to-cyan-400",
          "transition-all duration-300 relative z-10",
          "group-hover/feature:scale-110 group-hover/feature:rotate-[5deg]",
          "group-hover/feature:shadow-[0_10px_30px_rgba(168,85,247,0.5)]"
        )}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl mb-4 text-foreground relative z-10 font-bold">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-8 relative z-10">
        {description}
      </p>
      <Button
        component={Link}
        {...({ href: actionHref } as Record<string, unknown>)}
        variant="outline"
        size="sm"
        className={cn(
          "px-7 py-3.5 text-[0.95rem] rounded-xl font-semibold",
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
          "hover:before:opacity-10",
          "relative z-10"
        )}
      >
        {actionLabel}
      </Button>
    </Card>
  );
}

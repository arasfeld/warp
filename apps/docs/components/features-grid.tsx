"use client";

import { Palette, Rocket, Settings, Zap } from "lucide-react";
import { cn } from "@warp/react";

import { FeatureCard } from "./feature-card";

interface Feature {
  icon: typeof Rocket;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

const features: Feature[] = [
  {
    icon: Rocket,
    title: "Cross-Platform",
    description:
      "Write once, run everywhere. Use the same components across React web and React Native mobile apps with zero configuration.",
    actionLabel: "Learn More",
    actionHref: "/components",
  },
  {
    icon: Palette,
    title: "Shared Theming",
    description:
      "Consistent design system across all platforms. Define your theme once and watch it work everywhere seamlessly.",
    actionLabel: "View Themes",
    actionHref: "/components",
  },
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Optimized for speed and efficiency. Lightning-fast rendering with minimal bundle size for maximum performance.",
    actionLabel: "Benchmarks",
    actionHref: "/components",
  },
  {
    icon: Settings,
    title: "Fully Customizable",
    description:
      "Every component is built to be customized. Override styles, behaviors, and functionality with ease using our powerful API.",
    actionLabel: "Customize",
    actionHref: "/components",
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative z-10 py-32 px-4 md:px-16 max-w-7xl mx-auto">
      <div className="text-center mb-20 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
        <h2
          className={cn(
            "text-[clamp(2.5rem,6vw,4rem)] mb-4 font-extrabold",
            "bg-gradient-to-r from-text-primary to-purple-500 bg-clip-text text-transparent"
          )}
        >
          Powerful Features
        </h2>
        <p className="text-muted-foreground text-xl">
          Everything you need to build amazing interfaces
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            {...feature}
            animationDelay={`${(index + 1) * 0.1}s`}
          />
        ))}
      </div>
    </section>
  );
}

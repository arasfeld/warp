"use client";

import { FeatureCard } from "./feature-card";

interface Feature {
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

const features: Feature[] = [
  {
    icon: "🚀",
    title: "Cross-Platform",
    description: "Write once, run everywhere. Use the same components across React web and React Native mobile apps.",
    actionLabel: "Learn More",
    actionHref: "/components",
  },
  {
    icon: "🎨",
    title: "Shared Theming",
    description: "Consistent design system across platforms. Define your theme once and it works everywhere.",
    actionLabel: "View Themes",
    actionHref: "/components",
  },
  {
    icon: "⚡",
    title: "Performance First",
    description: "Optimized for speed and efficiency. Minimal bundle size, maximum performance.",
    actionLabel: "Benchmarks",
    actionHref: "/components",
  },
  {
    icon: "🔧",
    title: "Fully Customizable",
    description: "Every component is fully customizable. Override styles, behaviors, and functionality easily.",
    actionLabel: "Customize",
    actionHref: "/components",
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative z-10 py-24 px-4 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

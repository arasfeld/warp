"use client";

import Link from "next/link";
import { Button, Card, cn } from "@warp/react";

interface Component {
  name: string;
  description: string;
  href: string;
}

const components: Component[] = [
  {
    name: "Button",
    description:
      "Interactive button with multiple variants, sizes, and loading states for every use case.",
    href: "/components/button",
  },
  {
    name: "Card",
    description:
      "Flexible container component with header, content, footer, and customizable layouts.",
    href: "/components/card",
  },
  {
    name: "Text",
    description:
      "Typography system with size, weight, and color variants for perfect text hierarchy.",
    href: "/components/text",
  },
  {
    name: "Input",
    description:
      "Feature-rich text input with validation, helper text, icons, and accessibility built-in.",
    href: "/components/input",
  },
];

export function ComponentsShowcase() {
  return (
    <section
      id="components"
      className={cn(
        "relative z-10 py-32 px-4 md:px-16",
        "bg-black/5 dark:bg-white/5",
        "border-t border-black/8 dark:border-white/8",
        "border-b border-black/8 dark:border-white/8"
      )}
    >
      <div className="text-center mb-16 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
        <h2
          className={cn(
            "text-[clamp(2.5rem,6vw,4rem)] mb-4 font-extrabold",
            "bg-gradient-to-r from-text-primary to-purple-500 bg-clip-text text-transparent"
          )}
        >
          Components
        </h2>
        <p className="text-muted-foreground text-xl">
          Browse all available components and their APIs
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mt-16">
        {components.map((component, index) => (
          <Card
            key={component.name}
            padding="lg"
            className={cn(
              "bg-background-paper dark:bg-[#16161f] border border-divider dark:border-white/[0.08] rounded-[20px]",
              "transition-all duration-300",
              "animate-[fadeInUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both]",
              "hover:border-purple-500 hover:shadow-[0_20px_60px_rgba(168,85,247,0.15)]"
            )}
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          >
            <h3 className="text-2xl mb-4 font-bold text-foreground">
              {component.name}
            </h3>
            <p className="text-muted-foreground text-base mb-8 leading-relaxed">
              {component.description}
            </p>
            <Button
              component={Link}
              {...({ href: component.href } as Record<string, unknown>)}
              variant="outline"
              size="sm"
              className={cn(
                "px-6 py-3 text-[0.9rem] rounded-[10px] font-medium",
                "bg-white/5 dark:bg-white/5 text-muted-foreground",
                "border border-white/10 dark:border-white/10",
                "font-mono transition-all duration-300",
                "hover:bg-white/8 dark:hover:bg-white/8",
                "hover:border-cyan-400 hover:text-foreground"
              )}
            >
              View
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

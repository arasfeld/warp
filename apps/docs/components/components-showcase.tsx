"use client";

import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Heading, Text } from "@warp/react";

interface Component {
  name: string;
  description: string;
  href: string;
}

const components: Component[] = [
  {
    name: "Button",
    description: "Interactive button with multiple variants and sizes",
    href: "/components/button",
  },
  {
    name: "Card",
    description: "Container component with header, content, and footer",
    href: "/components/card",
  },
  {
    name: "Text",
    description: "Typography components with size, weight, and color variants",
    href: "/components/text",
  },
  {
    name: "Input",
    description: "Text input with variants, validation, and helper text",
    href: "/components/input",
  },
];

export function ComponentsShowcase() {
  return (
    <section className="relative z-10 py-24 px-4 md:px-16 bg-background/5 border-t border-b border-border/50">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Heading 
          level={2} 
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-foreground to-cyan-500 bg-clip-text text-transparent"
        >
          Components
        </Heading>
        <Text color="muted" className="text-lg">
          Browse all available components and their APIs
        </Text>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {components.map((component, index) => (
          <Card 
            key={component.name}
            className="bg-secondary/50 border-border/80 hover:border-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/15 transition-all animate-fade-in-up"
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          >
            <CardHeader>
              <CardTitle className="text-lg mb-2">{component.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm mb-6 leading-relaxed">
                {component.description}
              </CardDescription>
              <Link href={component.href}>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

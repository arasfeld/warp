"use client";

import Link from "next/link";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@warp/react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  animationDelay?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  animationDelay = '0s',
}: FeatureCardProps) {
  return (
    <Card 
      className="bg-background/5 backdrop-blur-sm border-border/50 hover:bg-background/10 hover:border-purple-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 transition-all animate-fade-in-up"
      style={{ animationDelay }}
    >
      <CardHeader>
        <div 
          className="bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl mb-6" 
          style={{ width: '60px', height: '60px' }}
        >
          {icon}
        </div>
        <CardTitle className="text-xl mb-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-6 leading-relaxed">
          {description}
        </CardDescription>
        <Link href={actionHref}>
          <Button variant="outline" size="sm">
            {actionLabel}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

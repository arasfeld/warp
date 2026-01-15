"use client";

import { ReactNode } from "react";
import { cn } from "@warp/react";

import { CodeToggle } from "./code-toggle";
import { DemoArea } from "./demo-area";
import { SectionHeader } from "./section-header";

interface ComponentCardProps {
  title: string;
  description: string;
  category: string;
  demo: ReactNode;
  code: string;
  animationDelay?: string;
}

export function ComponentCard({
  title,
  description,
  category,
  demo,
  code,
  animationDelay = "0s",
}: ComponentCardProps) {
  return (
    <div
      className={cn("animate-[fadeInUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both]")}
      data-category={category}
      style={{ animationDelay }}
    >
      <div className="mb-8">
        <SectionHeader title={title} subtitle={description} />
      </div>
      <DemoArea>{demo}</DemoArea>
      <CodeToggle code={code} />
    </div>
  );
}

"use client";

import React from "react";
import { Heading as WarpHeading, cn } from "@warp/react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export function Heading({
  level = 1,
  children,
  className,
  ...props
}: HeadingProps) {
  const baseStyles = "font-bold";
  const levelStyles = {
    1: "text-5xl md:text-6xl lg:text-7xl mb-4 bg-gradient-to-r from-text-primary via-purple-500 to-cyan-400 bg-clip-text text-transparent",
    2: "text-3xl md:text-4xl mb-3",
    3: "text-2xl md:text-3xl mb-2 mt-8",
    4: "text-xl md:text-2xl mb-2",
    5: "text-lg md:text-xl mb-2",
    6: "text-base md:text-lg mb-2",
  };

  return (
    <WarpHeading
      order={level}
      className={cn(baseStyles, levelStyles[level], className)}
      {...props}
    >
      {children}
    </WarpHeading>
  );
}

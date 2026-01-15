"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@warp/react";

export function AnimatedBackground() {
  const particleFieldRef = useRef<HTMLDivElement>(null);
  const particlesInitialized = useRef(false);

  useLayoutEffect(() => {
    // Only initialize particles once to prevent regeneration on navigation
    if (particleFieldRef.current && !particlesInitialized.current) {
      const particleCount = 80;
      const particleField = particleFieldRef.current;

      // Clear existing particles
      particleField.innerHTML = "";

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = cn(
          "absolute w-0.5 h-0.5 bg-purple-500/40 dark:bg-white rounded-full",
          "animate-particle-float"
        );

        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        particle.style.left = startX + "%";
        particle.style.top = startY + "%";

        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;

        particle.style.setProperty("--tx", tx + "px");
        particle.style.setProperty("--ty", ty + "px");
        particle.style.animationDelay = Math.random() * 20 + "s";

        particleField.appendChild(particle);
      }

      particlesInitialized.current = true;
    }
  }, []);

  return (
    <>
      {/* Animations are now defined in tailwind.config.js */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Vortex Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 dark:opacity-40">
          <div className="absolute rounded-full border-[3px] border-purple-500/40 dark:border-purple-500/30 w-[800px] h-[800px] animate-vortex-rotate" style={{ animationDuration: "15s" }} />
          <div className="absolute rounded-full border-[3px] border-blue-500/40 dark:border-blue-500/30 w-[650px] h-[650px] animate-vortex-rotate" style={{ animationDuration: "12s" }} />
          <div className="absolute rounded-full border-[3px] border-cyan-400/40 dark:border-cyan-400/30 w-[500px] h-[500px] animate-vortex-rotate" style={{ animationDuration: "9s" }} />
        </div>

        {/* Particle Field */}
        <div className="absolute inset-0" ref={particleFieldRef} />

        {/* Gradient Orbs - Pink/Purple and Blue/Cyan glows */}
        <div 
          className="absolute rounded-full blur-[120px] opacity-20 dark:opacity-20 w-[800px] h-[800px] -top-[300px] -right-[300px] animate-float-orb"
          style={{
            background: "radial-gradient(circle, rgb(168, 85, 247), transparent)",
          }}
        />
        <div 
          className="absolute rounded-full blur-[120px] opacity-20 dark:opacity-20 w-[700px] h-[700px] -bottom-[250px] -left-[250px] animate-float-orb"
          style={{
            background: "radial-gradient(circle, rgb(34, 211, 238), transparent)",
            animationDelay: "8s",
          }}
        />
        <div 
          className="absolute rounded-full blur-[120px] opacity-20 dark:opacity-20 w-[600px] h-[600px] top-[40%] left-[40%] animate-float-orb"
          style={{
            background: "radial-gradient(circle, rgb(102, 126, 234), transparent)",
            animationDelay: "16s",
          }}
        />
      </div>
    </>
  );
}

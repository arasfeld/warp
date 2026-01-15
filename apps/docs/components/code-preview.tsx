"use client";

import { Card, cn } from "@warp/react";

export function CodePreview() {
  return (
    <section className="relative z-10 py-32 px-4 md:px-16 max-w-5xl mx-auto">
      <div className="text-center mb-16 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
        <h2
          className={cn(
            "text-[clamp(2.5rem,6vw,4rem)] mb-4 font-extrabold",
            "bg-gradient-to-r from-text-primary to-purple-500 bg-clip-text text-transparent"
          )}
        >
          Simple & Elegant
        </h2>
        <p className="text-muted-foreground text-xl">
          Clean API that just makes sense
        </p>
      </div>
      <Card
        className={cn(
          "bg-background-paper dark:bg-[#16161f] border border-divider dark:border-white/[0.08] rounded-[20px] overflow-hidden",
          "shadow-[0_30px_90px_rgba(0,0,0,0.4)]",
          "transition-all duration-500 group",
          "animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_both]",
          "hover:-translate-y-1 hover:shadow-[0_40px_120px_rgba(168,85,247,0.2)]"
        )}
        withBorder={false}
        padding="none"
      >
        <div className="bg-white/[0.03] dark:bg-white/[0.03] px-7 py-5 flex items-center gap-2.5 border-b border-white/[0.05] dark:border-white/[0.05]">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] transition-transform duration-300 group-hover:scale-125" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] transition-transform duration-300 group-hover:scale-125" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#28ca42] transition-transform duration-300 group-hover:scale-125" />
        </div>
        <div className="p-10 font-mono text-[0.95rem] leading-[2] text-muted-foreground overflow-x-auto">
          <span className="block py-1 transition-colors duration-200 hover:bg-purple-500/10">
            <span className="text-purple-500 font-semibold">import</span> {"{"}{" "}
            <span className="text-cyan-400">Button</span>,{" "}
            <span className="text-cyan-400">Card</span>,{" "}
            <span className="text-cyan-400">Text</span> {"}"}{" "}
            <span className="text-purple-500 font-semibold">from</span>{" "}
            <span className="text-[#50fa7b]">'@warp/react'</span>;
          </span>
          <span className="block py-1" />
          <span className="block py-1 transition-colors duration-200 hover:bg-purple-500/10">
            <span className="text-purple-500 font-semibold">function</span>{" "}
            <span className="text-cyan-400">App</span>() {"{"}
          </span>
          <span className="block py-1 transition-colors duration-200 hover:bg-purple-500/10">
            {"  "}
            <span className="text-purple-500 font-semibold">return</span> (
          </span>
          <span className="block py-1 transition-colors duration-200 hover:bg-purple-500/10">
            {"    "}&lt;<span className="text-cyan-400">Card</span>&gt;
          </span>
          <span className="block py-1 transition-colors duration-200 hover:bg-purple-500/10">
            {"      "}&lt;<span className="text-cyan-400">Text</span> size=
            <span className="text-[#50fa7b]">"large"</span> weight=
            <span className="text-[#50fa7b]">"bold"</span>&gt;
          </span>
          <span className="block py-1 transition-colors duration-200 hover:bg-purple-500/10">
            {"        "}Welcome to Warp UI
          </span>
          <span className="block py-1 transition-colors duration-200 hover:bg-purple-500/10">
            {"      "}&lt;/<span className="text-cyan-400">Text</span>&gt;
          </span>
          <span className="block py-1 transition-colors duration-200 hover:bg-purple-500/10">
            {"      "}&lt;<span className="text-cyan-400">Button</span> variant=
            <span className="text-[#50fa7b]">"primary"</span>&gt;Get
            Started&lt;/
            <span className="text-cyan-400">Button</span>&gt;
          </span>
          <span className="block py-1 transition-colors duration-200 hover:bg-purple-500/10">
            {"    "}&lt;/<span className="text-cyan-400">Card</span>&gt;
          </span>
          <span className="block py-1 transition-colors duration-200 hover:bg-purple-500/10">
            {"  "});
          </span>
          <span className="block py-1 transition-colors duration-200 hover:bg-purple-500/10">
            {"}"}
          </span>
        </div>
      </Card>
    </section>
  );
}

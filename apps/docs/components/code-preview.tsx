"use client";

import { Card, CardContent } from "@warp/react";

export function CodePreview() {
  return (
    <section className="relative z-10 py-24 px-4 md:px-16 max-w-5xl mx-auto">
      <Card className="bg-secondary/50 border-border/80 shadow-2xl overflow-hidden">
        <div className="bg-background/30 px-6 py-4 flex items-center gap-2 border-b border-border/50">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <CardContent className="p-8">
          <pre className="font-mono text-sm leading-relaxed text-muted-foreground overflow-x-auto">
            <code>
              <span className="text-purple-500">import</span> {'{'} <span className="text-cyan-500">Button</span>, <span className="text-cyan-500">Card</span>, <span className="text-cyan-500">Text</span> {'}'} <span className="text-purple-500">from</span> <span className="text-green-500">'@warp/react'</span>;{'\n'}
              {'\n'}
              <span className="text-purple-500">function</span> <span className="text-cyan-500">App</span>() {'{'}{'\n'}
              {'  '}<span className="text-purple-500">return</span> ({'\n'}
              {'    '}&lt;<span className="text-cyan-500">Card</span>&gt;{'\n'}
              {'      '}&lt;<span className="text-cyan-500">Text</span> size=<span className="text-green-500">"large"</span> weight=<span className="text-green-500">"bold"</span>&gt;{'\n'}
              {'        '}Welcome to Warp UI{'\n'}
              {'      '}&lt;/<span className="text-cyan-500">Text</span>&gt;{'\n'}
              {'      '}&lt;<span className="text-cyan-500">Button</span> variant=<span className="text-green-500">"primary"</span>&gt;Get Started&lt;/<span className="text-cyan-500">Button</span>&gt;{'\n'}
              {'    '}&lt;/<span className="text-cyan-500">Card</span>&gt;{'\n'}
              {'  '});{'\n'}
              {'}'}
            </code>
          </pre>
        </CardContent>
      </Card>
    </section>
  );
}

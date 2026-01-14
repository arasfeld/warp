"use client";

import { Button } from "@warp/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <main className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Warp UI - Next.js Example
          </h1>
          <p className="text-lg text-muted-foreground">
            Demonstration of Warp UI components integrated with Next.js
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Button Variants</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => console.log("primary clicked")}
              >
                Primary Button
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={() => console.log("secondary clicked")}
              >
                Secondary Button
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => console.log("outline clicked")}
              >
                Outline Button
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Button Sizes</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="sm"
                onClick={() => console.log("small clicked")}
              >
                Small Button
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={() => console.log("medium clicked")}
              >
                Medium Button
              </Button>

              <Button
                variant="primary"
                size="lg"
                onClick={() => console.log("large clicked")}
              >
                Large Button
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Button States</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                disabled
                onClick={() => console.log("disabled clicked")}
              >
                Disabled Button
              </Button>

              <Button
                variant="primary"
                size="md"
                loading
                onClick={() => console.log("loading clicked")}
              >
                Loading Button
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

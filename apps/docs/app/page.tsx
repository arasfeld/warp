"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { CodePreview } from "@/components/code-preview";
import { ComponentsShowcase } from "@/components/components-showcase";
import { FeaturesGrid } from "@/components/features-grid";
import { HeroSection } from "@/components/hero-section";
import { HomeFooter } from "@/components/home-footer";
import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Layout>
        <HeroSection />
        <FeaturesGrid />
        <ComponentsShowcase />
        <CodePreview />
        <HomeFooter />
      </Layout>
    </>
  );
}

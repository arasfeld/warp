"use client";

import { Container, Text } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function ContainerPage() {
  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "size", title: "Size", level: 2 },
    { id: "fluid", title: "Fluid", level: 2 },
    { id: "padding", title: "Padding", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Container"
        description="Wrapper that centers content with a max-width constraint"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader title="Usage" subtitle="Basic centered container" />
        <DemoArea className="!p-0 overflow-hidden">
          <div className="w-full bg-surface/30">
            <Container className="bg-primary/10 py-8">
              <Text className="text-center">Content is centered with max-width</Text>
            </Container>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Container>
  <Text>Content is centered with max-width</Text>
</Container>`}
        />
      </Section>

      {/* Size */}
      <Section id="size">
        <SectionHeader title="Size" subtitle="Different max-width presets" />
        <DemoArea className="flex-col !p-0 gap-4 overflow-hidden">
          <div className="w-full bg-surface/30 py-2">
            <Container size="xs" className="bg-primary/20 py-4">
              <Text size="sm" className="text-center">xs - 540px</Text>
            </Container>
          </div>
          <div className="w-full bg-surface/30 py-2">
            <Container size="sm" className="bg-primary/20 py-4">
              <Text size="sm" className="text-center">sm - 720px</Text>
            </Container>
          </div>
          <div className="w-full bg-surface/30 py-2">
            <Container size="md" className="bg-primary/20 py-4">
              <Text size="sm" className="text-center">md - 960px (default)</Text>
            </Container>
          </div>
          <div className="w-full bg-surface/30 py-2">
            <Container size="lg" className="bg-primary/20 py-4">
              <Text size="sm" className="text-center">lg - 1140px</Text>
            </Container>
          </div>
          <div className="w-full bg-surface/30 py-2">
            <Container size="xl" className="bg-primary/20 py-4">
              <Text size="sm" className="text-center">xl - 1320px</Text>
            </Container>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Container size="xs">...</Container>  {/* 540px */}
<Container size="sm">...</Container>  {/* 720px */}
<Container size="md">...</Container>  {/* 960px - default */}
<Container size="lg">...</Container>  {/* 1140px */}
<Container size="xl">...</Container>  {/* 1320px */}`}
        />
      </Section>

      {/* Fluid */}
      <Section id="fluid">
        <SectionHeader title="Fluid" subtitle="Full width container that ignores size" />
        <DemoArea className="!p-0 overflow-hidden">
          <div className="w-full bg-surface/30">
            <Container fluid className="bg-primary/10 py-8">
              <Text className="text-center">Full width container</Text>
            </Container>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Container fluid>
  <Text>Full width container</Text>
</Container>`}
        />
      </Section>

      {/* Padding */}
      <Section id="padding">
        <SectionHeader title="Padding" subtitle="Horizontal padding options" />
        <DemoArea className="flex-col !p-0 gap-4 overflow-hidden">
          <div className="w-full bg-surface/30">
            <Container size="sm" px="none" className="bg-primary/20 py-4">
              <Text size="sm">px="none" - No horizontal padding</Text>
            </Container>
          </div>
          <div className="w-full bg-surface/30">
            <Container size="sm" px="xs" className="bg-primary/20 py-4">
              <Text size="sm">px="xs" - 8px padding</Text>
            </Container>
          </div>
          <div className="w-full bg-surface/30">
            <Container size="sm" px="sm" className="bg-primary/20 py-4">
              <Text size="sm">px="sm" - 16px padding</Text>
            </Container>
          </div>
          <div className="w-full bg-surface/30">
            <Container size="sm" px="md" className="bg-primary/20 py-4">
              <Text size="sm">px="md" - 24px padding (default)</Text>
            </Container>
          </div>
          <div className="w-full bg-surface/30">
            <Container size="sm" px="lg" className="bg-primary/20 py-4">
              <Text size="sm">px="lg" - 32px padding</Text>
            </Container>
          </div>
          <div className="w-full bg-surface/30">
            <Container size="sm" px="xl" className="bg-primary/20 py-4">
              <Text size="sm">px="xl" - 48px padding</Text>
            </Container>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Container px="none">...</Container>  {/* 0px */}
<Container px="xs">...</Container>    {/* 8px */}
<Container px="sm">...</Container>    {/* 16px */}
<Container px="md">...</Container>    {/* 24px - default */}
<Container px="lg">...</Container>    {/* 32px */}
<Container px="xl">...</Container>    {/* 48px */}`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

"use client";

import { Button, Stack, Text } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function StackPage() {
  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "gap", title: "Gap", level: 2 },
    { id: "align", title: "Align", level: 2 },
    { id: "justify", title: "Justify", level: 2 },
    { id: "numeric-gap", title: "Numeric Gap", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Stack"
        description="Vertical flex container with consistent gap spacing"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader title="Usage" subtitle="Basic vertical stack layout" />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-xs">
            <div className="h-10 bg-primary/20 rounded flex items-center justify-center">
              <Text>Item 1</Text>
            </div>
            <div className="h-10 bg-primary/20 rounded flex items-center justify-center">
              <Text>Item 2</Text>
            </div>
            <div className="h-10 bg-primary/20 rounded flex items-center justify-center">
              <Text>Item 3</Text>
            </div>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Stack gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`}
        />
      </Section>

      {/* Gap */}
      <Section id="gap">
        <SectionHeader title="Gap" subtitle="Different gap sizes between items" />
        <DemoArea className="flex-col items-start gap-8">
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">xs</Text>
            <Stack gap="xs" className="bg-surface/50 p-2 rounded">
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
            </Stack>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">sm</Text>
            <Stack gap="sm" className="bg-surface/50 p-2 rounded">
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
            </Stack>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">md (default)</Text>
            <Stack gap="md" className="bg-surface/50 p-2 rounded">
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
            </Stack>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">lg</Text>
            <Stack gap="lg" className="bg-surface/50 p-2 rounded">
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
            </Stack>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">xl</Text>
            <Stack gap="xl" className="bg-surface/50 p-2 rounded">
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
            </Stack>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Stack gap="xs">...</Stack>
<Stack gap="sm">...</Stack>
<Stack gap="md">...</Stack>  {/* default */}
<Stack gap="lg">...</Stack>
<Stack gap="xl">...</Stack>`}
        />
      </Section>

      {/* Align */}
      <Section id="align">
        <SectionHeader title="Align" subtitle="Cross-axis alignment (align-items)" />
        <DemoArea className="flex-col items-start gap-8">
          <div className="w-full">
            <Text size="sm" className="mb-2 text-muted-foreground">stretch (default)</Text>
            <Stack gap="sm" align="stretch" className="bg-surface/50 p-4 rounded w-48">
              <div className="h-8 bg-primary/30 rounded" />
              <div className="h-8 bg-primary/30 rounded" />
            </Stack>
          </div>
          <div className="w-full">
            <Text size="sm" className="mb-2 text-muted-foreground">flex-start</Text>
            <Stack gap="sm" align="flex-start" className="bg-surface/50 p-4 rounded w-48">
              <div className="h-8 w-16 bg-primary/30 rounded" />
              <div className="h-8 w-24 bg-primary/30 rounded" />
            </Stack>
          </div>
          <div className="w-full">
            <Text size="sm" className="mb-2 text-muted-foreground">center</Text>
            <Stack gap="sm" align="center" className="bg-surface/50 p-4 rounded w-48">
              <div className="h-8 w-16 bg-primary/30 rounded" />
              <div className="h-8 w-24 bg-primary/30 rounded" />
            </Stack>
          </div>
          <div className="w-full">
            <Text size="sm" className="mb-2 text-muted-foreground">flex-end</Text>
            <Stack gap="sm" align="flex-end" className="bg-surface/50 p-4 rounded w-48">
              <div className="h-8 w-16 bg-primary/30 rounded" />
              <div className="h-8 w-24 bg-primary/30 rounded" />
            </Stack>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Stack align="stretch">...</Stack>  {/* default */}
<Stack align="flex-start">...</Stack>
<Stack align="center">...</Stack>
<Stack align="flex-end">...</Stack>`}
        />
      </Section>

      {/* Justify */}
      <Section id="justify">
        <SectionHeader title="Justify" subtitle="Main-axis alignment (justify-content)" />
        <DemoArea className="flex-col items-start gap-8">
          <div className="w-full">
            <Text size="sm" className="mb-2 text-muted-foreground">flex-start (default)</Text>
            <Stack gap="sm" justify="flex-start" className="bg-surface/50 p-4 rounded h-40">
              <div className="h-8 w-full bg-primary/30 rounded" />
              <div className="h-8 w-full bg-primary/30 rounded" />
            </Stack>
          </div>
          <div className="w-full">
            <Text size="sm" className="mb-2 text-muted-foreground">center</Text>
            <Stack gap="sm" justify="center" className="bg-surface/50 p-4 rounded h-40">
              <div className="h-8 w-full bg-primary/30 rounded" />
              <div className="h-8 w-full bg-primary/30 rounded" />
            </Stack>
          </div>
          <div className="w-full">
            <Text size="sm" className="mb-2 text-muted-foreground">flex-end</Text>
            <Stack gap="sm" justify="flex-end" className="bg-surface/50 p-4 rounded h-40">
              <div className="h-8 w-full bg-primary/30 rounded" />
              <div className="h-8 w-full bg-primary/30 rounded" />
            </Stack>
          </div>
          <div className="w-full">
            <Text size="sm" className="mb-2 text-muted-foreground">space-between</Text>
            <Stack gap="sm" justify="space-between" className="bg-surface/50 p-4 rounded h-40">
              <div className="h-8 w-full bg-primary/30 rounded" />
              <div className="h-8 w-full bg-primary/30 rounded" />
            </Stack>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Stack justify="flex-start">...</Stack>  {/* default */}
<Stack justify="center">...</Stack>
<Stack justify="flex-end">...</Stack>
<Stack justify="space-between">...</Stack>`}
        />
      </Section>

      {/* Numeric Gap */}
      <Section id="numeric-gap">
        <SectionHeader title="Numeric Gap" subtitle="Use a number for custom gap values" />
        <DemoArea>
          <Stack gap={2} className="bg-surface/50 p-4 rounded">
            <Button size="sm">Button 1</Button>
            <Button size="sm" variant="outline">Button 2</Button>
            <Button size="sm" variant="light">Button 3</Button>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`{/* gap={2} = 0.5rem (8px) */}
<Stack gap={2}>
  <Button>Button 1</Button>
  <Button variant="outline">Button 2</Button>
  <Button variant="light">Button 3</Button>
</Stack>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

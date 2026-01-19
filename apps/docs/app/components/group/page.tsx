"use client";

import { Button, Group, Text } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function GroupPage() {
  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "gap", title: "Gap", level: 2 },
    { id: "justify", title: "Justify", level: 2 },
    { id: "align", title: "Align", level: 2 },
    { id: "wrap", title: "Wrap", level: 2 },
    { id: "grow", title: "Grow", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Group"
        description="Horizontal flex container with consistent gap spacing"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader title="Usage" subtitle="Basic horizontal group layout" />
        <DemoArea>
          <Group gap="md">
            <Button>Save</Button>
            <Button variant="outline">Cancel</Button>
            <Button variant="light">Reset</Button>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`<Group gap="md">
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
  <Button variant="light">Reset</Button>
</Group>`}
        />
      </Section>

      {/* Gap */}
      <Section id="gap">
        <SectionHeader title="Gap" subtitle="Different gap sizes between items" />
        <DemoArea className="flex-col items-start gap-8">
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">xs</Text>
            <Group gap="xs" className="bg-surface/50 p-2 rounded">
              <div className="h-8 w-12 bg-primary/30 rounded" />
              <div className="h-8 w-12 bg-primary/30 rounded" />
              <div className="h-8 w-12 bg-primary/30 rounded" />
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">sm</Text>
            <Group gap="sm" className="bg-surface/50 p-2 rounded">
              <div className="h-8 w-12 bg-primary/30 rounded" />
              <div className="h-8 w-12 bg-primary/30 rounded" />
              <div className="h-8 w-12 bg-primary/30 rounded" />
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">md (default)</Text>
            <Group gap="md" className="bg-surface/50 p-2 rounded">
              <div className="h-8 w-12 bg-primary/30 rounded" />
              <div className="h-8 w-12 bg-primary/30 rounded" />
              <div className="h-8 w-12 bg-primary/30 rounded" />
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">lg</Text>
            <Group gap="lg" className="bg-surface/50 p-2 rounded">
              <div className="h-8 w-12 bg-primary/30 rounded" />
              <div className="h-8 w-12 bg-primary/30 rounded" />
              <div className="h-8 w-12 bg-primary/30 rounded" />
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">xl</Text>
            <Group gap="xl" className="bg-surface/50 p-2 rounded">
              <div className="h-8 w-12 bg-primary/30 rounded" />
              <div className="h-8 w-12 bg-primary/30 rounded" />
              <div className="h-8 w-12 bg-primary/30 rounded" />
            </Group>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Group gap="xs">...</Group>
<Group gap="sm">...</Group>
<Group gap="md">...</Group>  {/* default */}
<Group gap="lg">...</Group>
<Group gap="xl">...</Group>`}
        />
      </Section>

      {/* Justify */}
      <Section id="justify">
        <SectionHeader title="Justify" subtitle="Main-axis alignment (justify-content)" />
        <DemoArea className="flex-col items-stretch gap-8 w-full">
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">flex-start (default)</Text>
            <Group gap="sm" justify="flex-start" className="bg-surface/50 p-4 rounded">
              <div className="h-8 w-16 bg-primary/30 rounded" />
              <div className="h-8 w-16 bg-primary/30 rounded" />
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">center</Text>
            <Group gap="sm" justify="center" className="bg-surface/50 p-4 rounded">
              <div className="h-8 w-16 bg-primary/30 rounded" />
              <div className="h-8 w-16 bg-primary/30 rounded" />
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">flex-end</Text>
            <Group gap="sm" justify="flex-end" className="bg-surface/50 p-4 rounded">
              <div className="h-8 w-16 bg-primary/30 rounded" />
              <div className="h-8 w-16 bg-primary/30 rounded" />
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">space-between</Text>
            <Group gap="sm" justify="space-between" className="bg-surface/50 p-4 rounded">
              <div className="h-8 w-16 bg-primary/30 rounded" />
              <div className="h-8 w-16 bg-primary/30 rounded" />
            </Group>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Group justify="flex-start">...</Group>  {/* default */}
<Group justify="center">...</Group>
<Group justify="flex-end">...</Group>
<Group justify="space-between">...</Group>`}
        />
      </Section>

      {/* Align */}
      <Section id="align">
        <SectionHeader title="Align" subtitle="Cross-axis alignment (align-items)" />
        <DemoArea className="flex-col items-stretch gap-8 w-full">
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">center (default)</Text>
            <Group gap="sm" align="center" className="bg-surface/50 p-4 rounded h-20">
              <div className="h-8 w-16 bg-primary/30 rounded" />
              <div className="h-12 w-16 bg-primary/30 rounded" />
              <div className="h-6 w-16 bg-primary/30 rounded" />
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">flex-start</Text>
            <Group gap="sm" align="flex-start" className="bg-surface/50 p-4 rounded h-20">
              <div className="h-8 w-16 bg-primary/30 rounded" />
              <div className="h-12 w-16 bg-primary/30 rounded" />
              <div className="h-6 w-16 bg-primary/30 rounded" />
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">flex-end</Text>
            <Group gap="sm" align="flex-end" className="bg-surface/50 p-4 rounded h-20">
              <div className="h-8 w-16 bg-primary/30 rounded" />
              <div className="h-12 w-16 bg-primary/30 rounded" />
              <div className="h-6 w-16 bg-primary/30 rounded" />
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">stretch</Text>
            <Group gap="sm" align="stretch" className="bg-surface/50 p-4 rounded h-20">
              <div className="w-16 bg-primary/30 rounded" />
              <div className="w-16 bg-primary/30 rounded" />
              <div className="w-16 bg-primary/30 rounded" />
            </Group>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Group align="center">...</Group>  {/* default */}
<Group align="flex-start">...</Group>
<Group align="flex-end">...</Group>
<Group align="stretch">...</Group>`}
        />
      </Section>

      {/* Wrap */}
      <Section id="wrap">
        <SectionHeader title="Wrap" subtitle="Control how items wrap to new lines" />
        <DemoArea className="flex-col items-stretch gap-8 w-full">
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">wrap (default)</Text>
            <Group gap="sm" wrap="wrap" className="bg-surface/50 p-4 rounded max-w-xs">
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
              <div className="h-8 w-20 bg-primary/30 rounded" />
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">nowrap</Text>
            <Group gap="sm" wrap="nowrap" className="bg-surface/50 p-4 rounded max-w-xs overflow-hidden">
              <div className="h-8 w-20 flex-shrink-0 bg-primary/30 rounded" />
              <div className="h-8 w-20 flex-shrink-0 bg-primary/30 rounded" />
              <div className="h-8 w-20 flex-shrink-0 bg-primary/30 rounded" />
              <div className="h-8 w-20 flex-shrink-0 bg-primary/30 rounded" />
            </Group>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Group wrap="wrap">...</Group>  {/* default */}
<Group wrap="nowrap">...</Group>
<Group wrap="wrap-reverse">...</Group>`}
        />
      </Section>

      {/* Grow */}
      <Section id="grow">
        <SectionHeader title="Grow" subtitle="Make children grow to fill available space" />
        <DemoArea className="flex-col items-stretch gap-8 w-full">
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">Without grow</Text>
            <Group gap="sm" className="bg-surface/50 p-4 rounded">
              <Button size="sm">First</Button>
              <Button size="sm" variant="outline">Second</Button>
              <Button size="sm" variant="light">Third</Button>
            </Group>
          </div>
          <div>
            <Text size="sm" className="mb-2 text-muted-foreground">With grow</Text>
            <Group gap="sm" grow className="bg-surface/50 p-4 rounded">
              <Button size="sm">First</Button>
              <Button size="sm" variant="outline">Second</Button>
              <Button size="sm" variant="light">Third</Button>
            </Group>
          </div>
        </DemoArea>
        <CodeBlock
          code={`{/* Without grow - buttons take natural width */}
<Group gap="sm">
  <Button>First</Button>
  <Button variant="outline">Second</Button>
  <Button variant="light">Third</Button>
</Group>

{/* With grow - buttons fill available space equally */}
<Group gap="sm" grow>
  <Button>First</Button>
  <Button variant="outline">Second</Button>
  <Button variant="light">Third</Button>
</Group>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

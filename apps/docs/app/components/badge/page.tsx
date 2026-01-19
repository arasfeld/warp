"use client";

import { Badge, Stack, Group, Text } from "@warp/react";
import { Bell, Mail, ShoppingCart, User } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function BadgePage() {
  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "variants", title: "Variants", level: 2 },
    { id: "colors", title: "Colors", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "with-sections", title: "With Sections", level: 2 },
    { id: "circle", title: "Circle Badge", level: 2 },
    { id: "dot-variant", title: "Dot Variant", level: 2 },
    { id: "max-value", title: "Max Value", level: 2 },
    { id: "processing", title: "Processing State", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Badge"
        description="Display badges, pills, and status indicators"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic badge with default styling"
        />
        <DemoArea>
          <Group gap="sm">
            <Badge>Default</Badge>
            <Badge color="blue">Blue</Badge>
            <Badge color="green">Green</Badge>
            <Badge color="red">Red</Badge>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`<Badge>Default</Badge>
<Badge color="blue">Blue</Badge>
<Badge color="green">Green</Badge>
<Badge color="red">Red</Badge>`}
        />
      </Section>

      {/* Variants */}
      <Section id="variants">
        <SectionHeader
          title="Variants"
          subtitle="Different visual styles for badges"
        />
        <DemoArea>
          <Stack gap="md">
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Filled (default)
              </Text>
              <Group gap="sm">
                <Badge variant="filled" color="primary">Primary</Badge>
                <Badge variant="filled" color="blue">Blue</Badge>
                <Badge variant="filled" color="red">Red</Badge>
              </Group>
            </div>
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Outline
              </Text>
              <Group gap="sm">
                <Badge variant="outline" color="primary">Primary</Badge>
                <Badge variant="outline" color="blue">Blue</Badge>
                <Badge variant="outline" color="red">Red</Badge>
              </Group>
            </div>
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Light
              </Text>
              <Group gap="sm">
                <Badge variant="light" color="primary">Primary</Badge>
                <Badge variant="light" color="blue">Blue</Badge>
                <Badge variant="light" color="red">Red</Badge>
              </Group>
            </div>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`{/* Filled */}
<Badge variant="filled" color="primary">Primary</Badge>

{/* Outline */}
<Badge variant="outline" color="blue">Blue</Badge>

{/* Light */}
<Badge variant="light" color="red">Red</Badge>`}
        />
      </Section>

      {/* Colors */}
      <Section id="colors">
        <SectionHeader title="Colors" subtitle="Available color options" />
        <DemoArea>
          <Group gap="sm" wrap="wrap">
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="error">Error</Badge>
            <Badge color="info">Info</Badge>
            <Badge color="gray">Gray</Badge>
            <Badge color="red">Red</Badge>
            <Badge color="orange">Orange</Badge>
            <Badge color="yellow">Yellow</Badge>
            <Badge color="green">Green</Badge>
            <Badge color="blue">Blue</Badge>
            <Badge color="purple">Purple</Badge>
            <Badge color="pink">Pink</Badge>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`<Badge color="primary">Primary</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="error">Error</Badge>
<Badge color="blue">Blue</Badge>
<Badge color="purple">Purple</Badge>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader title="Sizes" subtitle="Different badge sizes" />
        <DemoArea>
          <Group gap="sm" align="center">
            <Badge size="xs">Extra Small</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
            <Badge size="xl">Extra Large</Badge>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`<Badge size="xs">Extra Small</Badge>
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
<Badge size="xl">Extra Large</Badge>`}
        />
      </Section>

      {/* With Sections */}
      <Section id="with-sections">
        <SectionHeader
          title="With Sections"
          subtitle="Badges with left or right sections"
        />
        <DemoArea>
          <Group gap="sm">
            <Badge
              leftSection={<Mail className="h-3 w-3" />}
              color="blue"
            >
              Email
            </Badge>
            <Badge
              leftSection={<Bell className="h-3 w-3" />}
              color="orange"
            >
              Notifications
            </Badge>
            <Badge
              rightSection={<ShoppingCart className="h-3 w-3" />}
              color="green"
            >
              Cart
            </Badge>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`<Badge leftSection={<Mail className="h-3 w-3" />} color="blue">
  Email
</Badge>
<Badge leftSection={<Bell className="h-3 w-3" />} color="orange">
  Notifications
</Badge>
<Badge rightSection={<ShoppingCart className="h-3 w-3" />} color="green">
  Cart
</Badge>`}
        />
      </Section>

      {/* Circle Badge */}
      <Section id="circle">
        <SectionHeader
          title="Circle Badge"
          subtitle="Circular badges for numbers or single characters"
        />
        <DemoArea>
          <Group gap="sm" align="center">
            <Badge circle size="xs">1</Badge>
            <Badge circle size="sm">5</Badge>
            <Badge circle size="md" color="red">9</Badge>
            <Badge circle size="lg" color="blue">!</Badge>
            <Badge circle size="xl" color="green">A</Badge>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`<Badge circle size="xs">1</Badge>
<Badge circle size="sm">5</Badge>
<Badge circle size="md" color="red">9</Badge>
<Badge circle size="lg" color="blue">!</Badge>
<Badge circle size="xl" color="green">A</Badge>`}
        />
      </Section>

      {/* Dot Variant */}
      <Section id="dot-variant">
        <SectionHeader
          title="Dot Variant"
          subtitle="Status indicators with dot style"
        />
        <DemoArea>
          <Stack gap="sm">
            <Badge variant="dot" color="green">Online</Badge>
            <Badge variant="dot" color="yellow">Away</Badge>
            <Badge variant="dot" color="red">Offline</Badge>
            <Badge variant="dot" color="gray">Unknown</Badge>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Badge variant="dot" color="green">Online</Badge>
<Badge variant="dot" color="yellow">Away</Badge>
<Badge variant="dot" color="red">Offline</Badge>
<Badge variant="dot" color="gray">Unknown</Badge>`}
        />
      </Section>

      {/* Max Value */}
      <Section id="max-value">
        <SectionHeader
          title="Max Value"
          subtitle="Cap displayed number with max prop"
        />
        <DemoArea>
          <Group gap="md">
            <div className="flex items-center gap-2">
              <Text size="sm" className="text-muted-foreground">Count: 5</Text>
              <Badge circle color="red" label={5} max={99} />
            </div>
            <div className="flex items-center gap-2">
              <Text size="sm" className="text-muted-foreground">Count: 150</Text>
              <Badge circle color="red" label={150} max={99} />
            </div>
            <div className="flex items-center gap-2">
              <Text size="sm" className="text-muted-foreground">Count: 1000</Text>
              <Badge color="red" label={1000} max={999} />
            </div>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`{/* Shows "5" */}
<Badge circle color="red" label={5} max={99} />

{/* Shows "99+" */}
<Badge circle color="red" label={150} max={99} />

{/* Shows "999+" */}
<Badge color="red" label={1000} max={999} />`}
        />
      </Section>

      {/* Processing State */}
      <Section id="processing">
        <SectionHeader
          title="Processing State"
          subtitle="Animated pulse effect for loading states"
        />
        <DemoArea>
          <Group gap="sm">
            <Badge processing color="blue">Loading</Badge>
            <Badge processing variant="dot" color="green">Syncing</Badge>
            <Badge processing variant="outline" color="orange">Processing</Badge>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`<Badge processing color="blue">Loading</Badge>
<Badge processing variant="dot" color="green">Syncing</Badge>
<Badge processing variant="outline" color="orange">Processing</Badge>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

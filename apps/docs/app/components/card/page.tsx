import { Button, Card, Text } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function CardPage() {
  const tocItems = [
    { id: "basic", title: "Basic Card", level: 2 },
    { id: "with-sections", title: "Card with Sections", level: 2 },
    { id: "padding", title: "Padding", level: 2 },
    { id: "radius", title: "Radius", level: 2 },
    { id: "shadow", title: "Shadow", level: 2 },
    { id: "with-border", title: "With Border", level: 2 },
    { id: "polymorphic", title: "Polymorphic Component", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Card"
        description="Card component with comprehensive API. Supports padding, radius, shadow, sections, and more."
      />

      {/* Basic Card */}
      <Section id="basic">
        <SectionHeader
          title="Basic Card"
          subtitle="A simple card with header, content, and footer"
        />
        <DemoArea>
          <Card padding="lg" withBorder>
            <Card.Section>
              <Text className="mb-4">This is the card content area.</Text>
              <Button size="sm">Action</Button>
            </Card.Section>
          </Card>
        </DemoArea>
        <CodeBlock
          code={`<Card padding="lg" withBorder>
  <Card.Section>
    <Text className="mb-4">This is the card content area.</Text>
    <Button size="sm">Action</Button>
  </Card.Section>
</Card>`}
        />
      </Section>

      {/* Card with Sections */}
      <Section id="with-sections">
        <SectionHeader
          title="Card with Sections"
          subtitle="Card.Section removes padding from its children"
        />
        <DemoArea>
          <Card padding="xl" withBorder>
            <Card.Section>
              <Text className="mb-4">
                Content with padding (from Card padding prop)
              </Text>
              <Card.Section className="bg-background-paper/50 py-4">
                <Text className="px-4">
                  This section has no horizontal padding (negative margins)
                </Text>
              </Card.Section>
              <Text className="mt-4">More content with padding</Text>
              <Card.Section withBorder inheritPadding className="mt-4 py-2">
                <Text>Section with border and inherited padding</Text>
              </Card.Section>
            </Card.Section>
          </Card>
        </DemoArea>
        <CodeBlock
          code={`<Card padding="xl" withBorder>
  <Card.Section>
    <Text>Content with padding (from Card padding prop)</Text>
    <Card.Section className="bg-background-paper/50 py-4">
      <Text className="px-4">
        This section has no horizontal padding (negative margins)
      </Text>
    </Card.Section>
    <Text className="mt-4">More content with padding</Text>
    <Card.Section withBorder inheritPadding className="mt-4 py-2">
      <Text>Section with border and inherited padding</Text>
    </Card.Section>
  </Card.Section>
</Card>`}
        />
      </Section>

      {/* Padding */}
      <Section id="padding">
        <SectionHeader
          title="Padding"
          subtitle="Different padding values"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <Card padding="xs" withBorder>
            <Text size="sm">Padding: xs</Text>
          </Card>
          <Card padding="sm" withBorder>
            <Text size="sm">Padding: sm</Text>
          </Card>
          <Card padding="md" withBorder>
            <Text size="sm">Padding: md (default)</Text>
          </Card>
          <Card padding="lg" withBorder>
            <Text size="sm">Padding: lg</Text>
          </Card>
          <Card padding="xl" withBorder>
            <Text size="sm">Padding: xl</Text>
          </Card>
          <Card padding={32} withBorder>
            <Text size="sm">Padding: 32px (custom number)</Text>
          </Card>
        </DemoArea>
        <CodeBlock
          code={`<Card padding="xs" withBorder>
  <Text size="sm">Padding: xs</Text>
</Card>

<Card padding="sm" withBorder>
  <Text size="sm">Padding: sm</Text>
</Card>

<Card padding="md" withBorder>
  <Text size="sm">Padding: md (default)</Text>
</Card>

<Card padding="lg" withBorder>
  <Text size="sm">Padding: lg</Text>
</Card>

<Card padding="xl" withBorder>
  <Text size="sm">Padding: xl</Text>
</Card>

<Card padding={32} withBorder>
  <Text size="sm">Padding: 32px (custom number)</Text>
</Card>`}
        />
      </Section>

      {/* Radius */}
      <Section id="radius">
        <SectionHeader
          title="Radius"
          subtitle="Different border radius values"
        />
        <DemoArea className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card padding="md" radius="xs" withBorder>
            <Text size="sm">xs</Text>
          </Card>
          <Card padding="md" radius="sm" withBorder>
            <Text size="sm">sm</Text>
          </Card>
          <Card padding="md" radius="md" withBorder>
            <Text size="sm">md</Text>
          </Card>
          <Card padding="md" radius="lg" withBorder>
            <Text size="sm">lg</Text>
          </Card>
          <Card padding="md" radius="xl" withBorder>
            <Text size="sm">xl</Text>
          </Card>
          <Card padding="md" radius="full" withBorder>
            <Text size="sm">full</Text>
          </Card>
        </DemoArea>
        <CodeBlock
          code={`<Card padding="md" radius="xs" withBorder>
  <Text size="sm">xs</Text>
</Card>

<Card padding="md" radius="sm" withBorder>
  <Text size="sm">sm</Text>
</Card>

<Card padding="md" radius="md" withBorder>
  <Text size="sm">md</Text>
</Card>

<Card padding="md" radius="lg" withBorder>
  <Text size="sm">lg</Text>
</Card>

<Card padding="md" radius="xl" withBorder>
  <Text size="sm">xl</Text>
</Card>

<Card padding="md" radius="full" withBorder>
  <Text size="sm">full</Text>
</Card>`}
        />
      </Section>

      {/* Shadow */}
      <Section id="shadow">
        <SectionHeader
          title="Shadow"
          subtitle="Different shadow values"
        />
        <DemoArea className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card padding="md" shadow="xs" withBorder>
            <Text size="sm">xs</Text>
          </Card>
          <Card padding="md" shadow="sm" withBorder>
            <Text size="sm">sm</Text>
          </Card>
          <Card padding="md" shadow="md" withBorder>
            <Text size="sm">md</Text>
          </Card>
          <Card padding="md" shadow="lg" withBorder>
            <Text size="sm">lg</Text>
          </Card>
          <Card padding="md" shadow="xl" withBorder>
            <Text size="sm">xl</Text>
          </Card>
        </DemoArea>
        <CodeBlock
          code={`<Card padding="md" shadow="xs" withBorder>
  <Text size="sm">xs</Text>
</Card>

<Card padding="md" shadow="sm" withBorder>
  <Text size="sm">sm</Text>
</Card>

<Card padding="md" shadow="md" withBorder>
  <Text size="sm">md</Text>
</Card>

<Card padding="md" shadow="lg" withBorder>
  <Text size="sm">lg</Text>
</Card>

<Card padding="md" shadow="xl" withBorder>
  <Text size="sm">xl</Text>
</Card>`}
        />
      </Section>

      {/* With Border */}
      <Section id="with-border">
        <SectionHeader
          title="With Border"
          subtitle="Card with and without border"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <Card padding="md" withBorder>
            <Text size="sm">Card with border</Text>
          </Card>
          <Card padding="md">
            <Text size="sm">Card without border</Text>
          </Card>
        </DemoArea>
        <CodeBlock
          code={`<Card padding="md" withBorder>
  <Text size="sm">Card with border</Text>
</Card>

<Card padding="md">
  <Text size="sm">Card without border</Text>
</Card>`}
        />
      </Section>

      {/* Polymorphic Component */}
      <Section id="polymorphic">
        <SectionHeader
          title="Polymorphic Component"
          subtitle="Card can be rendered as different elements"
        />
        <DemoArea>
          <Card
            component="a"
            href="#"
            padding="md"
            withBorder
            className="block hover:bg-background-paper/50 transition-colors"
          >
            <Text size="sm">Card as link (hover to see effect)</Text>
          </Card>
        </DemoArea>
        <CodeBlock
          code={`<Card
  component="a"
  href="#"
  padding="md"
  withBorder
  className="block hover:bg-background-paper/50 transition-colors"
>
  <Text size="sm">Card as link (hover to see effect)</Text>
</Card>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

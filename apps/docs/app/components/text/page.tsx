import { Text } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function TextPage() {
  const tocItems = [
    { id: "sizes", title: "Text Sizes", level: 2 },
    { id: "font-weights", title: "Font Weights", level: 2 },
    { id: "font-styles", title: "Font Styles", level: 2 },
    { id: "colors", title: "Text Colors", level: 2 },
    { id: "transform-align", title: "Text Transform & Alignment", level: 2 },
    { id: "gradient", title: "Gradient Variant", level: 2 },
    { id: "truncate", title: "Truncate & Line Clamp", level: 2 },
    { id: "inherit-inline", title: "Inherit & Inline", level: 2 },
    { id: "polymorphic", title: "Polymorphic Component", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Text"
        description="Text component with comprehensive typography controls"
      />

      {/* Text Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Text Sizes"
          subtitle="Size variants"
        />
        <DemoArea className="flex-col items-start">
          <Text size="xs">Extra small text</Text>
          <Text size="sm">Small text</Text>
          <Text size="md">Default text</Text>
          <Text size="lg">Large text</Text>
          <Text size="xl">Extra large text</Text>
        </DemoArea>
        <CodeBlock
          code={`<Text size="xs">Extra small text</Text>
<Text size="sm">Small text</Text>
<Text size="md">Default text</Text>
<Text size="lg">Large text</Text>
<Text size="xl">Extra large text</Text>`}
        />
      </Section>

      {/* Font Weights */}
      <Section id="font-weights">
        <SectionHeader
          title="Font Weights"
          subtitle="Using fw prop with numbers or strings"
        />
        <DemoArea className="flex-col items-start">
          <Text fw={400}>Font weight 400</Text>
          <Text fw={500}>Semibold (500)</Text>
          <Text fw={700}>Bold (700)</Text>
          <Text fw="normal">Normal</Text>
          <Text fw="bold">Bold</Text>
        </DemoArea>
        <CodeBlock
          code={`<Text fw={400}>Font weight 400</Text>
<Text fw={500}>Semibold (500)</Text>
<Text fw={700}>Bold (700)</Text>
<Text fw="normal">Normal</Text>
<Text fw="bold">Bold</Text>`}
        />
      </Section>

      {/* Font Styles */}
      <Section id="font-styles">
        <SectionHeader
          title="Font Styles"
          subtitle="Using fs and td props"
        />
        <DemoArea className="flex-col items-start">
          <Text fs="italic">Italic text</Text>
          <Text td="underline">Underlined text</Text>
          <Text td="line-through">Strikethrough text</Text>
        </DemoArea>
        <CodeBlock
          code={`<Text fs="italic">Italic text</Text>
<Text td="underline">Underlined text</Text>
<Text td="line-through">Strikethrough text</Text>`}
        />
      </Section>

      {/* Text Colors */}
      <Section id="colors">
        <SectionHeader
          title="Text Colors"
          subtitle="Using c prop with theme colors or CSS colors"
        />
        <DemoArea className="flex-col items-start">
          <Text>Default color</Text>
          <Text c="dimmed">Dimmed text</Text>
          <Text c="primary">Primary color</Text>
          <Text c="blue">Blue text</Text>
          <Text c="error">Error color</Text>
          <Text c="success">Success color</Text>
        </DemoArea>
        <CodeBlock
          code={`<Text>Default color</Text>
<Text c="dimmed">Dimmed text</Text>
<Text c="primary">Primary color</Text>
<Text c="blue">Blue text</Text>
<Text c="error">Error color</Text>
<Text c="success">Success color</Text>`}
        />
      </Section>

      {/* Text Transform & Align */}
      <Section id="transform-align">
        <SectionHeader
          title="Text Transform & Alignment"
          subtitle="Using tt and ta props"
        />
        <DemoArea className="flex-col items-start">
          <Text tt="uppercase">Uppercase text</Text>
          <Text tt="capitalize">capitalized text</Text>
          <Text ta="center">Aligned to center</Text>
          <Text ta="right">Aligned to right</Text>
        </DemoArea>
        <CodeBlock
          code={`<Text tt="uppercase">Uppercase text</Text>
<Text tt="capitalize">capitalized text</Text>
<Text ta="center">Aligned to center</Text>
<Text ta="right">Aligned to right</Text>`}
        />
      </Section>

      {/* Gradient */}
      <Section id="gradient">
        <SectionHeader
          title="Gradient Variant"
          subtitle="Gradient text with custom gradient configuration"
        />
        <DemoArea className="flex-col items-start">
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            Gradient Text
          </Text>
          <Text
            size="lg"
            fw={700}
            variant="gradient"
            gradient={{ from: "#a855f7", to: "#22d3ee", deg: 135 }}
          >
            Purple to Cyan Gradient
          </Text>
        </DemoArea>
        <CodeBlock
          code={`<Text
  size="xl"
  fw={900}
  variant="gradient"
  gradient={{ from: "blue", to: "cyan", deg: 90 }}
>
  Gradient Text
</Text>
<Text
  size="lg"
  fw={700}
  variant="gradient"
  gradient={{ from: "#a855f7", to: "#22d3ee", deg: 135 }}
>
  Purple to Cyan Gradient
</Text>`}
        />
      </Section>

      {/* Truncate & Line Clamp */}
      <Section id="truncate">
        <SectionHeader
          title="Truncate & Line Clamp"
          subtitle="Text truncation and line clamping"
        />
        <DemoArea className="flex-col items-start">
          <div className="w-64">
            <Text truncate="end">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde provident eos fugiat id necessitatibus magni ducimus molestias.
            </Text>
          </div>
          <Text lineClamp={3} className="max-w-md">
            From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon that has blue-green skin with darker patches. It has red eyes with white pupils, pointed, ear-like structures on top of its head, and a short, blunt snout with a wide mouth. A pair of small, pointed teeth are visible in the upper jaw when its mouth is open.
          </Text>
        </DemoArea>
        <CodeBlock
          code={`<div className="w-64">
  <Text truncate="end">
    Lorem ipsum dolor sit amet consectetur adipisicing elit...
  </Text>
</div>

<Text lineClamp={3}>
  From Bulbapedia: Bulbasaur is a small, quadrupedal Pokémon...
</Text>`}
        />
      </Section>

      {/* Inherit & Inline */}
      <Section id="inherit-inline">
        <SectionHeader
          title="Inherit & Inline"
          subtitle="Inheriting parent styles and inline mode"
        />
        <DemoArea className="flex-col items-start">
          <h3 className="text-2xl font-bold mb-2">
            Title in which you want to{" "}
            <Text span c="blue" inherit>
              highlight
            </Text>{" "}
            something
          </h3>
          <Text inline c="dimmed">Inline text with line-height: 1</Text>
        </DemoArea>
        <CodeBlock
          code={`<h3>
  Title in which you want to{" "}
  <Text span c="blue" inherit>
    highlight
  </Text>{" "}
  something
</h3>
<Text inline c="dimmed">Inline text with line-height: 1</Text>`}
        />
      </Section>

      {/* Polymorphic */}
      <Section id="polymorphic">
        <SectionHeader
          title="Polymorphic Component"
          subtitle="Render as different HTML elements"
        />
        <DemoArea className="flex-col items-start">
          <Text component="span">Rendered as span</Text>
          <Text span>Shorthand for component="span"</Text>
          <Text component="div">Rendered as div</Text>
          <Text component="a" href="#" className="text-blue-500 hover:underline">
            Rendered as link
          </Text>
        </DemoArea>
        <CodeBlock
          code={`<Text component="span">Rendered as span</Text>
<Text span>Shorthand for component="span"</Text>
<Text component="div">Rendered as div</Text>
<Text component="a" href="#" className="text-blue-500 hover:underline">
  Rendered as link
</Text>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

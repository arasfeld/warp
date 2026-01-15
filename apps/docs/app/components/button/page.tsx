import { ArrowRight, Download, Image } from "lucide-react";
import { Button } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function ButtonPage() {
  const tocItems = [
    { id: "variants", title: "Variants", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "full-width", title: "Full Width", level: 2 },
    { id: "left-right-sections", title: "Left and Right Sections", level: 2 },
    { id: "sections-position", title: "Sections Position", level: 2 },
    { id: "radius", title: "Radius", level: 2 },
    { id: "gradient-variant", title: "Gradient Variant", level: 2 },
    { id: "states", title: "States", level: 2 },
    { id: "button-group", title: "Button Group", level: 2 },
    { id: "polymorphic", title: "Polymorphic Component", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Button"
        description="Button component with comprehensive API. Supports variants, sizes, sections, loading states, and more."
      />

      {/* Variants */}
      <Section id="variants">
        <SectionHeader
          title="Variants"
          subtitle="Button component with different style variants"
        />
        <DemoArea>
          <Button
            variant="filled"
            className="bg-gradient-to-r from-[#a855f7] to-[#667eea] text-white shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(168,85,247,0.4)]"
          >
            Filled
          </Button>
          <Button
            variant="light"
            className="bg-white/10 text-[#e0e0ff] hover:bg-white/15"
          >
            Light
          </Button>
          <Button
            variant="outline"
            className="border-2 border-white/20 bg-transparent text-[#e0e0ff] hover:border-[#a855f7] hover:bg-[rgba(168,85,247,0.1)]"
          >
            Outline
          </Button>
          <Button
            variant="default"
            className="bg-white/5 text-[#8888aa] hover:bg-white/8 hover:text-[#e0e0ff]"
          >
            Default
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            className="shadow-[0_10px_30px_rgba(34,211,238,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(34,211,238,0.4)]"
          >
            Gradient
          </Button>
        </DemoArea>
        <CodeBlock
          code={`<Button variant="filled">Filled</Button>
<Button variant="light">Light</Button>
<Button variant="outline">Outline</Button>
<Button variant="default">Default</Button>
<Button
  variant="gradient"
  gradient={{ from: "blue", to: "cyan" }}
>
  Gradient
</Button>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="Different sizes including compact variants"
        />
        <DemoArea>
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </DemoArea>
        <SectionHeader title="Compact Sizes" level={3} />
        <DemoArea>
          <Button size="compact-xs">Compact XS</Button>
          <Button size="compact-sm">Compact SM</Button>
          <Button size="compact-md">Compact MD</Button>
          <Button size="compact-lg">Compact LG</Button>
          <Button size="compact-xl">Compact XL</Button>
        </DemoArea>
        <CodeBlock
          code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

<Button size="compact-xs">Compact XS</Button>
<Button size="compact-sm">Compact SM</Button>
<Button size="compact-md">Compact MD</Button>
<Button size="compact-lg">Compact LG</Button>
<Button size="compact-xl">Compact XL</Button>`}
        />
      </Section>

      {/* Full Width */}
      <Section id="full-width">
        <SectionHeader
          title="Full Width"
          subtitle="Button can take 100% width of its parent"
        />
        <DemoArea>
          <Button fullWidth variant="filled">
            Full Width Button
          </Button>
        </DemoArea>
        <CodeBlock
          code={`<Button fullWidth variant="filled">
  Full Width Button
</Button>`}
        />
      </Section>

      {/* Left and Right Sections */}
      <Section id="left-right-sections">
        <SectionHeader
          title="Left and Right Sections"
          subtitle="Add icons or content to the left and right sides of the button"
        />
        <DemoArea>
          <Button
            leftSection={<Image className="w-3.5 h-3.5" />}
            variant="default"
          >
            Gallery
          </Button>
          <Button rightSection={<Download className="w-3.5 h-3.5" />}>
            Download
          </Button>
          <Button
            variant="light"
            leftSection={<Image className="w-3.5 h-3.5" />}
            rightSection={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Visit gallery
          </Button>
        </DemoArea>
        <CodeBlock
          code={`import { Image, Download, ArrowRight } from "lucide-react";

<Button 
  leftSection={<Image className="w-3.5 h-3.5" />} 
  variant="default"
>
  Gallery
</Button>

<Button rightSection={<Download className="w-3.5 h-3.5" />}>
  Download
</Button>

<Button
  variant="light"
  leftSection={<Image className="w-3.5 h-3.5" />}
  rightSection={<ArrowRight className="w-3.5 h-3.5" />}
>
  Visit gallery
</Button>`}
        />
      </Section>

      {/* Sections Position */}
      <Section id="sections-position">
        <SectionHeader
          title="Sections Position"
          subtitle="Use justify prop to control section alignment"
        />
        <DemoArea>
          <Button
            justify="space-between"
            fullWidth
            leftSection={<Image className="w-3.5 h-3.5" />}
            rightSection={<ArrowRight className="w-3.5 h-3.5" />}
            variant="default"
          >
            Button label
          </Button>
        </DemoArea>
        <CodeBlock
          code={`<Button
  justify="space-between"
  fullWidth
  leftSection={<Image className="w-3.5 h-3.5" />}
  rightSection={<ArrowRight className="w-3.5 h-3.5" />}
  variant="default"
>
  Button label
</Button>`}
        />
      </Section>

      {/* Radius */}
      <Section id="radius">
        <SectionHeader title="Radius" subtitle="Customize border radius" />
        <DemoArea>
          <Button radius="xs">XS Radius</Button>
          <Button radius="sm">SM Radius</Button>
          <Button radius="md">MD Radius</Button>
          <Button radius="lg">LG Radius</Button>
          <Button radius="xl">XL Radius</Button>
          <Button radius="full">Full Radius</Button>
        </DemoArea>
        <CodeBlock
          code={`<Button radius="xs">XS Radius</Button>
<Button radius="sm">SM Radius</Button>
<Button radius="md">MD Radius</Button>
<Button radius="lg">LG Radius</Button>
<Button radius="xl">XL Radius</Button>
<Button radius="full">Full Radius</Button>`}
        />
      </Section>

      {/* Gradient Variant */}
      <Section id="gradient-variant">
        <SectionHeader
          title="Gradient Variant"
          subtitle="Gradient buttons with customizable gradient configuration"
        />
        <DemoArea>
          <Button
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            Gradient 90deg
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "purple", to: "pink", deg: 45 }}
          >
            Gradient 45deg
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red", deg: 180 }}
          >
            Gradient 180deg
          </Button>
        </DemoArea>
        <CodeBlock
          code={`<Button
  variant="gradient"
  gradient={{ from: "blue", to: "cyan", deg: 90 }}
>
  Gradient 90deg
</Button>

<Button
  variant="gradient"
  gradient={{ from: "purple", to: "pink", deg: 45 }}
>
  Gradient 45deg
</Button>

<Button
  variant="gradient"
  gradient={{ from: "orange", to: "red", deg: 180 }}
>
  Gradient 180deg
</Button>`}
        />
      </Section>

      {/* States */}
      <Section id="states">
        <SectionHeader title="States" subtitle="Disabled and loading states" />
        <DemoArea>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button loading loaderProps={{ type: "dots" }}>
            Loading (dots)
          </Button>
          <Button loading loaderProps={{ type: "bars" }}>
            Loading (bars)
          </Button>
        </DemoArea>
        <CodeBlock
          code={`<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
<Button loading loaderProps={{ type: "dots" }}>
  Loading (dots)
</Button>
<Button loading loaderProps={{ type: "bars" }}>
  Loading (bars)
</Button>`}
        />
      </Section>

      {/* Button Group */}
      <Section id="button-group">
        <SectionHeader
          title="Button Group"
          subtitle="Group buttons together with connected borders"
        />
        <DemoArea className="flex-col">
          <Button.Group>
            <Button variant="default">First</Button>
            <Button variant="default">Second</Button>
            <Button variant="default">Third</Button>
          </Button.Group>
          <Button.Group orientation="vertical">
            <Button variant="default">First</Button>
            <Button variant="default">Second</Button>
            <Button variant="default">Third</Button>
          </Button.Group>
        </DemoArea>
        <CodeBlock
          code={`<Button.Group>
  <Button variant="default">First</Button>
  <Button variant="default">Second</Button>
  <Button variant="default">Third</Button>
</Button.Group>

<Button.Group orientation="vertical">
  <Button variant="default">First</Button>
  <Button variant="default">Second</Button>
  <Button variant="default">Third</Button>
</Button.Group>`}
        />
      </Section>

      {/* Polymorphic Component */}
      <Section id="polymorphic">
        <SectionHeader
          title="Polymorphic Component"
          subtitle="Button can be rendered as different elements using component prop"
        />
        <DemoArea>
          <Button component="a" href="#">
            Link Button
          </Button>
          <Button component="div" role="button" tabIndex={0}>
            Div Button
          </Button>
        </DemoArea>
        <CodeBlock
          code={`<Button component="a" href="#">
  Link Button
</Button>

<Button component="div" role="button" tabIndex={0}>
  Div Button
</Button>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

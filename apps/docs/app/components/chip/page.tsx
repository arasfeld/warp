"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Chip } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function ChipPage() {
  const [checked, setChecked] = useState(false);
  const [singleValue, setSingleValue] = useState<string>("react");
  const [multipleValue, setMultipleValue] = useState<string[]>(["react"]);

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "controlled", title: "Controlled", level: 2 },
    { id: "color", title: "Color", level: 2 },
    { id: "variant", title: "Variant", level: 2 },
    { id: "size", title: "Size", level: 2 },
    { id: "radius", title: "Radius", level: 2 },
    { id: "icon", title: "Change Checked Icon", level: 2 },
    { id: "chip-group", title: "Chip.Group", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Chip"
        description="Pick one or multiple values with inline controls"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader title="Usage" subtitle="Basic chip component" />
        <DemoArea>
          <Chip defaultChecked>Awesome chip</Chip>
        </DemoArea>
        <CodeBlock code={`<Chip defaultChecked>Awesome chip</Chip>`} />
      </Section>

      {/* Controlled */}
      <Section id="controlled">
        <SectionHeader
          title="Controlled"
          subtitle="Controlled chip component"
        />
        <DemoArea>
          <Chip checked={checked} onChange={setChecked}>
            My chip
          </Chip>
        </DemoArea>
        <CodeBlock
          code={`const [checked, setChecked] = useState(false);

<Chip checked={checked} onChange={setChecked}>
  My chip
</Chip>`}
        />
      </Section>

      {/* Color */}
      <Section id="color">
        <SectionHeader title="Color" subtitle="Different color variants" />
        <DemoArea>
          <Chip defaultChecked color="primary">
            Primary
          </Chip>
          <Chip defaultChecked color="blue">
            Blue
          </Chip>
          <Chip defaultChecked color="red">
            Red
          </Chip>
        </DemoArea>
        <CodeBlock
          code={`<Chip defaultChecked color="primary">Primary</Chip>
<Chip defaultChecked color="blue">Blue</Chip>
<Chip defaultChecked color="red">Red</Chip>`}
        />
      </Section>

      {/* Variant */}
      <Section id="variant">
        <SectionHeader title="Variant" subtitle="Different style variants" />
        <DemoArea>
          <Chip defaultChecked variant="filled" color="primary">
            Filled
          </Chip>
          <Chip defaultChecked variant="outline" color="primary">
            Outline
          </Chip>
          <Chip defaultChecked variant="light" color="primary">
            Light
          </Chip>
        </DemoArea>
        <CodeBlock
          code={`<Chip defaultChecked variant="filled" color="primary">
  Filled
</Chip>
<Chip defaultChecked variant="outline" color="primary">
  Outline
</Chip>
<Chip defaultChecked variant="light" color="primary">
  Light
</Chip>`}
        />
      </Section>

      {/* Size */}
      <Section id="size">
        <SectionHeader title="Size" subtitle="Different chip sizes" />
        <DemoArea>
          <Chip defaultChecked size="xs">
            Extra Small
          </Chip>
          <Chip defaultChecked size="sm">
            Small
          </Chip>
          <Chip defaultChecked size="md">
            Medium
          </Chip>
          <Chip defaultChecked size="lg">
            Large
          </Chip>
          <Chip defaultChecked size="xl">
            Extra Large
          </Chip>
        </DemoArea>
        <CodeBlock
          code={`<Chip defaultChecked size="xs">Extra Small</Chip>
<Chip defaultChecked size="sm">Small</Chip>
<Chip defaultChecked size="md">Medium</Chip>
<Chip defaultChecked size="lg">Large</Chip>
<Chip defaultChecked size="xl">Extra Large</Chip>`}
        />
      </Section>

      {/* Radius */}
      <Section id="radius">
        <SectionHeader
          title="Radius"
          subtitle="Different border radius values"
        />
        <DemoArea>
          <Chip defaultChecked radius="sm">
            Small Radius
          </Chip>
          <Chip defaultChecked radius="md">
            Medium Radius
          </Chip>
          <Chip defaultChecked radius="lg">
            Large Radius
          </Chip>
          <Chip defaultChecked radius="xl">
            Extra Large
          </Chip>
          <Chip defaultChecked radius="full">
            Full
          </Chip>
        </DemoArea>
        <CodeBlock
          code={`<Chip defaultChecked radius="sm">Small Radius</Chip>
<Chip defaultChecked radius="md">Medium Radius</Chip>
<Chip defaultChecked radius="lg">Large Radius</Chip>
<Chip defaultChecked radius="xl">Extra Large</Chip>
<Chip defaultChecked radius="full">Full</Chip>`}
        />
      </Section>

      {/* Icon */}
      <Section id="icon">
        <SectionHeader
          title="Change Checked Icon"
          subtitle="Custom icon for checked state"
        />
        <DemoArea>
          <Chip
            icon={<X size={16} />}
            color="red"
            variant="filled"
            defaultChecked
          >
            Forbidden
          </Chip>
        </DemoArea>
        <CodeBlock
          code={`<Chip
  icon={<X size={16} />}
  color="red"
  variant="filled"
  defaultChecked
>
  Forbidden
</Chip>`}
        />
      </Section>

      {/* Chip.Group */}
      <Section id="chip-group">
        <SectionHeader
          title="Chip.Group"
          subtitle="Manage state of multiple chips"
        />
        <DemoArea className="flex-col items-start gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Single selection:</p>
            <Chip.Group
              multiple={false}
              value={singleValue}
              onChange={(val) => setSingleValue(val as string)}
            >
              <Chip value="react">React</Chip>
              <Chip value="ng">Angular</Chip>
              <Chip value="svelte">Svelte</Chip>
              <Chip value="vue">Vue</Chip>
            </Chip.Group>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Multiple selection:</p>
            <Chip.Group
              multiple
              value={multipleValue}
              onChange={(val) => setMultipleValue(val as string[])}
            >
              <Chip value="react">React</Chip>
              <Chip value="ng">Angular</Chip>
              <Chip value="svelte">Svelte</Chip>
              <Chip value="vue">Vue</Chip>
            </Chip.Group>
          </div>
        </DemoArea>
        <CodeBlock
          code={`// Single selection
const [value, setValue] = useState("react");

<Chip.Group multiple={false} value={value} onChange={setValue}>
  <Chip value="react">React</Chip>
  <Chip value="ng">Angular</Chip>
  <Chip value="svelte">Svelte</Chip>
  <Chip value="vue">Vue</Chip>
</Chip.Group>

// Multiple selection
const [value, setValue] = useState(["react"]);

<Chip.Group multiple value={value} onChange={setValue}>
  <Chip value="react">React</Chip>
  <Chip value="ng">Angular</Chip>
  <Chip value="svelte">Svelte</Chip>
  <Chip value="vue">Vue</Chip>
</Chip.Group>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

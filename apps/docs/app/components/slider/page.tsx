"use client";

import { useState } from "react";
import { Slider, Stack, Text, Group } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function SliderPage() {
  const [value, setValue] = useState(50);

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "controlled", title: "Controlled", level: 2 },
    { id: "min-max-step", title: "Min, Max & Step", level: 2 },
    { id: "marks", title: "Marks", level: 2 },
    { id: "label", title: "Label", level: 2 },
    { id: "disabled", title: "Disabled", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "colors", title: "Colors", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Slider"
        description="Capture numeric value from a range"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic slider for selecting a value from a range"
        />
        <DemoArea>
          <Slider defaultValue={40} className="w-full max-w-md" />
        </DemoArea>
        <CodeBlock
          code={`<Slider defaultValue={40} />`}
        />
      </Section>

      {/* Controlled */}
      <Section id="controlled">
        <SectionHeader
          title="Controlled"
          subtitle="Control the slider value programmatically"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-md">
            <Slider value={value} onChange={setValue} />
            <Text size="sm" c="dimmed">Value: {value}</Text>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`const [value, setValue] = useState(50);

<Slider value={value} onChange={setValue} />
<Text size="sm" c="dimmed">Value: {value}</Text>`}
        />
      </Section>

      {/* Min, Max & Step */}
      <Section id="min-max-step">
        <SectionHeader
          title="Min, Max & Step"
          subtitle="Configure the range and step increment"
        />
        <DemoArea>
          <Stack gap="lg" className="w-full max-w-md">
            <Stack gap="xs">
              <Text size="sm" fw={500}>Range 0-100, Step 10</Text>
              <Slider min={0} max={100} step={10} defaultValue={50} />
            </Stack>
            <Stack gap="xs">
              <Text size="sm" fw={500}>Range 0-1000, Step 100</Text>
              <Slider min={0} max={1000} step={100} defaultValue={500} />
            </Stack>
            <Stack gap="xs">
              <Text size="sm" fw={500}>Decimal: Step 0.1</Text>
              <Slider min={0} max={1} step={0.1} defaultValue={0.5} />
            </Stack>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Slider min={0} max={100} step={10} defaultValue={50} />
<Slider min={0} max={1000} step={100} defaultValue={500} />
<Slider min={0} max={1} step={0.1} defaultValue={0.5} />`}
        />
      </Section>

      {/* Marks */}
      <Section id="marks">
        <SectionHeader
          title="Marks"
          subtitle="Display marks at specific positions"
        />
        <DemoArea>
          <Stack gap="xl" className="w-full max-w-md">
            <Slider
              defaultValue={40}
              marks={[
                { value: 0, label: "0%" },
                { value: 25, label: "25%" },
                { value: 50, label: "50%" },
                { value: 75, label: "75%" },
                { value: 100, label: "100%" },
              ]}
            />
            <Slider
              defaultValue={50}
              marks={[
                { value: 0 },
                { value: 25 },
                { value: 50 },
                { value: 75 },
                { value: 100 },
              ]}
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Slider
  defaultValue={40}
  marks={[
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ]}
/>

<Slider
  defaultValue={50}
  marks={[
    { value: 0 },
    { value: 25 },
    { value: 50 },
    { value: 75 },
    { value: 100 },
  ]}
/>`}
        />
      </Section>

      {/* Label */}
      <Section id="label">
        <SectionHeader
          title="Label"
          subtitle="Show a tooltip with the current value"
        />
        <DemoArea>
          <Stack gap="lg" className="w-full max-w-md">
            <Stack gap="xs">
              <Text size="sm" fw={500}>Always visible</Text>
              <Slider defaultValue={50} label={(v) => `${v}%`} labelAlwaysOn />
            </Stack>
            <Stack gap="xs">
              <Text size="sm" fw={500}>On hover</Text>
              <Slider defaultValue={50} label={(v) => `${v}%`} />
            </Stack>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Slider defaultValue={50} label={(v) => \`\${v}%\`} labelAlwaysOn />
<Slider defaultValue={50} label={(v) => \`\${v}%\`} />`}
        />
      </Section>

      {/* Disabled */}
      <Section id="disabled">
        <SectionHeader
          title="Disabled"
          subtitle="Disable the slider interaction"
        />
        <DemoArea>
          <Slider defaultValue={60} disabled className="w-full max-w-md" />
        </DemoArea>
        <CodeBlock
          code={`<Slider defaultValue={60} disabled />`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="Slider supports multiple sizes"
        />
        <DemoArea>
          <Stack gap="xl" className="w-full max-w-md">
            <Stack gap="xs">
              <Text size="sm" fw={500}>Extra small</Text>
              <Slider size="xs" defaultValue={40} />
            </Stack>
            <Stack gap="xs">
              <Text size="sm" fw={500}>Small</Text>
              <Slider size="sm" defaultValue={40} />
            </Stack>
            <Stack gap="xs">
              <Text size="sm" fw={500}>Medium (default)</Text>
              <Slider size="md" defaultValue={40} />
            </Stack>
            <Stack gap="xs">
              <Text size="sm" fw={500}>Large</Text>
              <Slider size="lg" defaultValue={40} />
            </Stack>
            <Stack gap="xs">
              <Text size="sm" fw={500}>Extra large</Text>
              <Slider size="xl" defaultValue={40} />
            </Stack>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Slider size="xs" defaultValue={40} />
<Slider size="sm" defaultValue={40} />
<Slider size="md" defaultValue={40} />
<Slider size="lg" defaultValue={40} />
<Slider size="xl" defaultValue={40} />`}
        />
      </Section>

      {/* Colors */}
      <Section id="colors">
        <SectionHeader
          title="Colors"
          subtitle="Customize the slider color"
        />
        <DemoArea>
          <Stack gap="lg" className="w-full max-w-md">
            <Slider color="primary" defaultValue={40} />
            <Slider color="secondary" defaultValue={40} />
            <Slider color="success" defaultValue={40} />
            <Slider color="warning" defaultValue={40} />
            <Slider color="error" defaultValue={40} />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Slider color="primary" defaultValue={40} />
<Slider color="secondary" defaultValue={40} />
<Slider color="success" defaultValue={40} />
<Slider color="warning" defaultValue={40} />
<Slider color="error" defaultValue={40} />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

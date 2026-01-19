"use client";

import { useState } from "react";
import { Radio, RadioGroup, Stack, Text } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function RadioPage() {
  const [controlled, setControlled] = useState<string>("react");
  const [framework, setFramework] = useState<string>("next");

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "group", title: "Radio.Group", level: 2 },
    { id: "controlled", title: "Controlled", level: 2 },
    { id: "orientation", title: "Orientation", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "variants", title: "Variants", level: 2 },
    { id: "colors", title: "Colors", level: 2 },
    { id: "disabled", title: "Disabled", level: 2 },
    { id: "label-position", title: "Label Position", level: 2 },
    { id: "with-description", title: "With Description", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Radio"
        description="Capture single selection from a group of options"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic radio button with label"
        />
        <DemoArea>
          <Radio value="option1" label="I agree to the terms" />
        </DemoArea>
        <CodeBlock
          code={`<Radio value="option1" label="I agree to the terms" />`}
        />
      </Section>

      {/* Radio.Group */}
      <Section id="group">
        <SectionHeader
          title="Radio.Group"
          subtitle="Group radios together for single selection"
        />
        <DemoArea>
          <RadioGroup label="Select your favorite framework" defaultValue="react">
            <Radio value="react" label="React" />
            <Radio value="vue" label="Vue" />
            <Radio value="angular" label="Angular" />
            <Radio value="svelte" label="Svelte" />
          </RadioGroup>
        </DemoArea>
        <CodeBlock
          code={`<RadioGroup label="Select your favorite framework" defaultValue="react">
  <Radio value="react" label="React" />
  <Radio value="vue" label="Vue" />
  <Radio value="angular" label="Angular" />
  <Radio value="svelte" label="Svelte" />
</RadioGroup>`}
        />
      </Section>

      {/* Controlled */}
      <Section id="controlled">
        <SectionHeader
          title="Controlled"
          subtitle="Controlled radio group with state management"
        />
        <DemoArea>
          <Stack gap="md">
            <RadioGroup
              label="Favorite library"
              value={controlled}
              onChange={setControlled}
            >
              <Radio value="react" label="React" />
              <Radio value="vue" label="Vue" />
              <Radio value="svelte" label="Svelte" />
            </RadioGroup>
            <Text size="sm" className="text-muted-foreground">
              Selected: {controlled}
            </Text>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`const [value, setValue] = useState("react");

<RadioGroup
  label="Favorite library"
  value={value}
  onChange={setValue}
>
  <Radio value="react" label="React" />
  <Radio value="vue" label="Vue" />
  <Radio value="svelte" label="Svelte" />
</RadioGroup>
<Text size="sm">Selected: {value}</Text>`}
        />
      </Section>

      {/* Orientation */}
      <Section id="orientation">
        <SectionHeader
          title="Orientation"
          subtitle="Vertical (default) or horizontal layout"
        />
        <DemoArea>
          <Stack gap="lg">
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Vertical (default)
              </Text>
              <RadioGroup defaultValue="react" orientation="vertical">
                <Radio value="react" label="React" />
                <Radio value="vue" label="Vue" />
                <Radio value="svelte" label="Svelte" />
              </RadioGroup>
            </div>
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Horizontal
              </Text>
              <RadioGroup defaultValue="next" orientation="horizontal">
                <Radio value="next" label="Next.js" />
                <Radio value="remix" label="Remix" />
                <Radio value="astro" label="Astro" />
              </RadioGroup>
            </div>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`{/* Vertical (default) */}
<RadioGroup defaultValue="react" orientation="vertical">
  <Radio value="react" label="React" />
  <Radio value="vue" label="Vue" />
  <Radio value="svelte" label="Svelte" />
</RadioGroup>

{/* Horizontal */}
<RadioGroup defaultValue="next" orientation="horizontal">
  <Radio value="next" label="Next.js" />
  <Radio value="remix" label="Remix" />
  <Radio value="astro" label="Astro" />
</RadioGroup>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="Different radio sizes"
        />
        <DemoArea>
          <RadioGroup defaultValue="md">
            <Radio value="xs" label="Extra small (xs)" size="xs" />
            <Radio value="sm" label="Small (sm)" size="sm" />
            <Radio value="md" label="Medium (md)" size="md" />
            <Radio value="lg" label="Large (lg)" size="lg" />
            <Radio value="xl" label="Extra large (xl)" size="xl" />
          </RadioGroup>
        </DemoArea>
        <CodeBlock
          code={`<Radio value="xs" label="Extra small (xs)" size="xs" />
<Radio value="sm" label="Small (sm)" size="sm" />
<Radio value="md" label="Medium (md)" size="md" />
<Radio value="lg" label="Large (lg)" size="lg" />
<Radio value="xl" label="Extra large (xl)" size="xl" />`}
        />
      </Section>

      {/* Variants */}
      <Section id="variants">
        <SectionHeader
          title="Variants"
          subtitle="Filled and outline variants"
        />
        <DemoArea>
          <Stack gap="lg">
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Filled (default)
              </Text>
              <RadioGroup defaultValue="react">
                <Stack gap="sm">
                  <Radio value="react" label="React" variant="filled" />
                  <Radio value="vue" label="Vue" variant="filled" />
                </Stack>
              </RadioGroup>
            </div>
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Outline
              </Text>
              <RadioGroup defaultValue="next">
                <Stack gap="sm">
                  <Radio value="next" label="Next.js" variant="outline" />
                  <Radio value="remix" label="Remix" variant="outline" />
                </Stack>
              </RadioGroup>
            </div>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`{/* Filled variant */}
<Radio value="react" label="React" variant="filled" />

{/* Outline variant */}
<Radio value="next" label="Next.js" variant="outline" />`}
        />
      </Section>

      {/* Colors */}
      <Section id="colors">
        <SectionHeader title="Colors" subtitle="Different color options" />
        <DemoArea>
          <Stack gap="sm">
            <Radio value="primary" label="Primary" color="primary" checked />
            <Radio value="blue" label="Blue" color="blue" checked />
            <Radio value="red" label="Red" color="red" checked />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Radio value="primary" label="Primary" color="primary" checked />
<Radio value="blue" label="Blue" color="blue" checked />
<Radio value="red" label="Red" color="red" checked />`}
        />
      </Section>

      {/* Disabled */}
      <Section id="disabled">
        <SectionHeader
          title="Disabled"
          subtitle="Disabled radio buttons"
        />
        <DemoArea>
          <RadioGroup label="Disabled group" disabled defaultValue="option1">
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
          </RadioGroup>
        </DemoArea>
        <CodeBlock
          code={`{/* Disable entire group */}
<RadioGroup label="Disabled group" disabled defaultValue="option1">
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>

{/* Or disable individual radios */}
<Radio value="disabled" label="Disabled option" disabled />`}
        />
      </Section>

      {/* Label Position */}
      <Section id="label-position">
        <SectionHeader
          title="Label Position"
          subtitle="Position label to the left or right"
        />
        <DemoArea>
          <Stack gap="md">
            <Radio value="right" label="Label on right (default)" labelPosition="right" />
            <Radio value="left" label="Label on left" labelPosition="left" />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Radio value="right" label="Label on right (default)" labelPosition="right" />
<Radio value="left" label="Label on left" labelPosition="left" />`}
        />
      </Section>

      {/* With Description */}
      <Section id="with-description">
        <SectionHeader
          title="With Description"
          subtitle="Radio group with description and error states"
        />
        <DemoArea>
          <Stack gap="lg">
            <RadioGroup
              label="Select a framework"
              description="Choose the framework you want to use for your project"
              value={framework}
              onChange={setFramework}
            >
              <Radio value="next" label="Next.js" />
              <Radio value="remix" label="Remix" />
              <Radio value="astro" label="Astro" />
            </RadioGroup>

            <RadioGroup
              label="Required selection"
              error="Please select an option"
              required
            >
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </RadioGroup>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<RadioGroup
  label="Select a framework"
  description="Choose the framework you want to use for your project"
  value={framework}
  onChange={setFramework}
>
  <Radio value="next" label="Next.js" />
  <Radio value="remix" label="Remix" />
  <Radio value="astro" label="Astro" />
</RadioGroup>

<RadioGroup
  label="Required selection"
  error="Please select an option"
  required
>
  <Radio value="yes" label="Yes" />
  <Radio value="no" label="No" />
</RadioGroup>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

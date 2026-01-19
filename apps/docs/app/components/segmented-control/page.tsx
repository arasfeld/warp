"use client";

import { useState } from "react";
import { SegmentedControl, Stack, Text } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function SegmentedControlPage() {
  const [value, setValue] = useState("react");

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "controlled", title: "Controlled", level: 2 },
    { id: "disabled", title: "Disabled", level: 2 },
    { id: "full-width", title: "Full Width", level: 2 },
    { id: "orientation", title: "Orientation", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "colors", title: "Colors", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="SegmentedControl"
        description="Horizontal control to switch between options"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic segmented control for switching between options"
        />
        <DemoArea>
          <SegmentedControl
            data={[
              { label: "React", value: "react" },
              { label: "Angular", value: "angular" },
              { label: "Vue", value: "vue" },
            ]}
            defaultValue="react"
          />
        </DemoArea>
        <CodeBlock
          code={`<SegmentedControl
  data={[
    { label: "React", value: "react" },
    { label: "Angular", value: "angular" },
    { label: "Vue", value: "vue" },
  ]}
  defaultValue="react"
/>`}
        />
      </Section>

      {/* Controlled */}
      <Section id="controlled">
        <SectionHeader
          title="Controlled"
          subtitle="Control the value programmatically"
        />
        <DemoArea>
          <Stack gap="md" align="flex-start">
            <SegmentedControl
              data={[
                { label: "React", value: "react" },
                { label: "Angular", value: "angular" },
                { label: "Vue", value: "vue" },
                { label: "Svelte", value: "svelte" },
              ]}
              value={value}
              onChange={setValue}
            />
            <Text size="sm" c="dimmed">Selected: {value}</Text>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`const [value, setValue] = useState("react");

<SegmentedControl
  data={[
    { label: "React", value: "react" },
    { label: "Angular", value: "angular" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ]}
  value={value}
  onChange={setValue}
/>
<Text size="sm" c="dimmed">Selected: {value}</Text>`}
        />
      </Section>

      {/* Disabled */}
      <Section id="disabled">
        <SectionHeader
          title="Disabled"
          subtitle="Disable the entire control or individual items"
        />
        <DemoArea>
          <Stack gap="md" align="flex-start">
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Fully disabled</Text>
              <SegmentedControl
                data={[
                  { label: "React", value: "react" },
                  { label: "Angular", value: "angular" },
                  { label: "Vue", value: "vue" },
                ]}
                defaultValue="react"
                disabled
              />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Individual item disabled</Text>
              <SegmentedControl
                data={[
                  { label: "React", value: "react" },
                  { label: "Angular", value: "angular", disabled: true },
                  { label: "Vue", value: "vue" },
                ]}
                defaultValue="react"
              />
            </Stack>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`{/* Fully disabled */}
<SegmentedControl
  data={[
    { label: "React", value: "react" },
    { label: "Angular", value: "angular" },
    { label: "Vue", value: "vue" },
  ]}
  defaultValue="react"
  disabled
/>

{/* Individual item disabled */}
<SegmentedControl
  data={[
    { label: "React", value: "react" },
    { label: "Angular", value: "angular", disabled: true },
    { label: "Vue", value: "vue" },
  ]}
  defaultValue="react"
/>`}
        />
      </Section>

      {/* Full Width */}
      <Section id="full-width">
        <SectionHeader
          title="Full Width"
          subtitle="Make the control span full width"
        />
        <DemoArea>
          <SegmentedControl
            data={[
              { label: "Daily", value: "daily" },
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" },
            ]}
            defaultValue="weekly"
            fullWidth
            className="max-w-md"
          />
        </DemoArea>
        <CodeBlock
          code={`<SegmentedControl
  data={[
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ]}
  defaultValue="weekly"
  fullWidth
/>`}
        />
      </Section>

      {/* Orientation */}
      <Section id="orientation">
        <SectionHeader
          title="Orientation"
          subtitle="Display vertically"
        />
        <DemoArea>
          <SegmentedControl
            data={[
              { label: "Preview", value: "preview" },
              { label: "Code", value: "code" },
              { label: "Export", value: "export" },
            ]}
            defaultValue="preview"
            orientation="vertical"
          />
        </DemoArea>
        <CodeBlock
          code={`<SegmentedControl
  data={[
    { label: "Preview", value: "preview" },
    { label: "Code", value: "code" },
    { label: "Export", value: "export" },
  ]}
  defaultValue="preview"
  orientation="vertical"
/>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="SegmentedControl supports multiple sizes"
        />
        <DemoArea>
          <Stack gap="md" align="flex-start">
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Extra small</Text>
              <SegmentedControl
                size="xs"
                data={[
                  { label: "A", value: "a" },
                  { label: "B", value: "b" },
                  { label: "C", value: "c" },
                ]}
                defaultValue="a"
              />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Small</Text>
              <SegmentedControl
                size="sm"
                data={[
                  { label: "A", value: "a" },
                  { label: "B", value: "b" },
                  { label: "C", value: "c" },
                ]}
                defaultValue="a"
              />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Medium (default)</Text>
              <SegmentedControl
                size="md"
                data={[
                  { label: "A", value: "a" },
                  { label: "B", value: "b" },
                  { label: "C", value: "c" },
                ]}
                defaultValue="a"
              />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Large</Text>
              <SegmentedControl
                size="lg"
                data={[
                  { label: "A", value: "a" },
                  { label: "B", value: "b" },
                  { label: "C", value: "c" },
                ]}
                defaultValue="a"
              />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Extra large</Text>
              <SegmentedControl
                size="xl"
                data={[
                  { label: "A", value: "a" },
                  { label: "B", value: "b" },
                  { label: "C", value: "c" },
                ]}
                defaultValue="a"
              />
            </Stack>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<SegmentedControl size="xs" data={...} />
<SegmentedControl size="sm" data={...} />
<SegmentedControl size="md" data={...} />
<SegmentedControl size="lg" data={...} />
<SegmentedControl size="xl" data={...} />`}
        />
      </Section>

      {/* Colors */}
      <Section id="colors">
        <SectionHeader
          title="Colors"
          subtitle="Customize the active segment color"
        />
        <DemoArea>
          <Stack gap="md" align="flex-start">
            <SegmentedControl
              color="primary"
              data={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
              defaultValue="1"
            />
            <SegmentedControl
              color="secondary"
              data={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
              defaultValue="1"
            />
            <SegmentedControl
              color="success"
              data={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
              defaultValue="1"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<SegmentedControl color="primary" data={...} />
<SegmentedControl color="secondary" data={...} />
<SegmentedControl color="success" data={...} />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

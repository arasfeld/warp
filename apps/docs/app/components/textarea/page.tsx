"use client";

import { Textarea, Stack } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function TextareaPage() {
  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "autosize", title: "Autosize", level: 2 },
    { id: "rows", title: "Fixed Rows", level: 2 },
    { id: "resize", title: "Resize", level: 2 },
    { id: "error-state", title: "Error State", level: 2 },
    { id: "disabled", title: "Disabled", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "variants", title: "Variants", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Textarea"
        description="Multi-line text input with optional auto-resize"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic textarea for multi-line text input"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-md">
            <Textarea
              label="Description"
              placeholder="Enter description..."
            />
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself"
              description="Maximum 500 characters"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Textarea
  label="Description"
  placeholder="Enter description..."
/>

<Textarea
  label="Bio"
  placeholder="Tell us about yourself"
  description="Maximum 500 characters"
/>`}
        />
      </Section>

      {/* Autosize */}
      <Section id="autosize">
        <SectionHeader
          title="Autosize"
          subtitle="Automatically resize based on content"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-md">
            <Textarea
              label="Auto-growing textarea"
              placeholder="Type here and watch it grow..."
              autosize
              minRows={2}
            />
            <Textarea
              label="With max rows"
              placeholder="Grows up to 6 rows, then scrolls..."
              autosize
              minRows={2}
              maxRows={6}
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Textarea
  label="Auto-growing textarea"
  placeholder="Type here and watch it grow..."
  autosize
  minRows={2}
/>

<Textarea
  label="With max rows"
  placeholder="Grows up to 6 rows, then scrolls..."
  autosize
  minRows={2}
  maxRows={6}
/>`}
        />
      </Section>

      {/* Fixed Rows */}
      <Section id="rows">
        <SectionHeader
          title="Fixed Rows"
          subtitle="Set a specific number of rows"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-md">
            <Textarea
              label="3 rows"
              placeholder="Fixed 3 rows"
              rows={3}
            />
            <Textarea
              label="6 rows"
              placeholder="Fixed 6 rows"
              rows={6}
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Textarea
  label="3 rows"
  placeholder="Fixed 3 rows"
  rows={3}
/>

<Textarea
  label="6 rows"
  placeholder="Fixed 6 rows"
  rows={6}
/>`}
        />
      </Section>

      {/* Resize */}
      <Section id="resize">
        <SectionHeader
          title="Resize"
          subtitle="Control resize behavior"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-md">
            <Textarea
              label="Vertical resize (default)"
              placeholder="Resize vertically..."
              resize="vertical"
              rows={3}
            />
            <Textarea
              label="No resize"
              placeholder="Cannot be resized"
              resize="none"
              rows={3}
            />
            <Textarea
              label="Both directions"
              placeholder="Resize in any direction..."
              resize="both"
              rows={3}
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Textarea
  label="Vertical resize (default)"
  placeholder="Resize vertically..."
  resize="vertical"
/>

<Textarea
  label="No resize"
  placeholder="Cannot be resized"
  resize="none"
/>

<Textarea
  label="Both directions"
  placeholder="Resize in any direction..."
  resize="both"
/>`}
        />
      </Section>

      {/* Error State */}
      <Section id="error-state">
        <SectionHeader
          title="Error State"
          subtitle="Display validation errors"
        />
        <DemoArea>
          <Textarea
            label="Description"
            placeholder="Enter description..."
            error="Description is required"
            className="max-w-md"
          />
        </DemoArea>
        <CodeBlock
          code={`<Textarea
  label="Description"
  placeholder="Enter description..."
  error="Description is required"
/>`}
        />
      </Section>

      {/* Disabled */}
      <Section id="disabled">
        <SectionHeader
          title="Disabled"
          subtitle="Disabled textarea state"
        />
        <DemoArea>
          <Textarea
            label="Description"
            placeholder="Cannot edit..."
            disabled
            className="max-w-md"
          />
        </DemoArea>
        <CodeBlock
          code={`<Textarea
  label="Description"
  placeholder="Cannot edit..."
  disabled
/>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="Textarea supports multiple sizes"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-md">
            <Textarea size="xs" label="Extra small" placeholder="xs size" rows={2} />
            <Textarea size="sm" label="Small" placeholder="sm size" rows={2} />
            <Textarea size="md" label="Medium" placeholder="md size" rows={2} />
            <Textarea size="lg" label="Large" placeholder="lg size" rows={2} />
            <Textarea size="xl" label="Extra large" placeholder="xl size" rows={2} />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Textarea size="xs" label="Extra small" placeholder="xs size" />
<Textarea size="sm" label="Small" placeholder="sm size" />
<Textarea size="md" label="Medium" placeholder="md size" />
<Textarea size="lg" label="Large" placeholder="lg size" />
<Textarea size="xl" label="Extra large" placeholder="xl size" />`}
        />
      </Section>

      {/* Variants */}
      <Section id="variants">
        <SectionHeader
          title="Variants"
          subtitle="Different visual styles"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-md">
            <Textarea variant="default" label="Default" placeholder="Default variant" rows={2} />
            <Textarea variant="filled" label="Filled" placeholder="Filled variant" rows={2} />
            <Textarea variant="unstyled" label="Unstyled" placeholder="Unstyled variant" rows={2} />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Textarea variant="default" label="Default" placeholder="Default variant" />
<Textarea variant="filled" label="Filled" placeholder="Filled variant" />
<Textarea variant="unstyled" label="Unstyled" placeholder="Unstyled variant" />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

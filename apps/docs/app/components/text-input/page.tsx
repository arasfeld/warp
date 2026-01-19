"use client";

import { TextInput, Stack, Group } from "@warp/react";
import { Mail, Search, User } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function TextInputPage() {
  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "with-sections", title: "With Sections", level: 2 },
    { id: "error-state", title: "Error State", level: 2 },
    { id: "disabled", title: "Disabled", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "variants", title: "Variants", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="TextInput"
        description="Capture string input from user with label, description, and error support"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="TextInput combines Input with Input.Wrapper for a complete form field"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              description="We'll never share your email"
            />
            <TextInput
              label="Username"
              placeholder="Enter username"
              required
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<TextInput
  label="Email"
  placeholder="your@email.com"
  description="We'll never share your email"
/>

<TextInput
  label="Username"
  placeholder="Enter username"
  required
/>`}
        />
      </Section>

      {/* With Sections */}
      <Section id="with-sections">
        <SectionHeader
          title="With Sections"
          subtitle="Add icons or content to left and right sections"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              leftSection={<Mail className="h-4 w-4 text-muted-foreground" />}
            />
            <TextInput
              label="Search"
              placeholder="Search..."
              leftSection={<Search className="h-4 w-4 text-muted-foreground" />}
            />
            <TextInput
              label="Username"
              placeholder="Enter username"
              leftSection={<User className="h-4 w-4 text-muted-foreground" />}
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`import { Mail, Search, User } from "lucide-react";

<TextInput
  label="Email"
  placeholder="your@email.com"
  leftSection={<Mail className="h-4 w-4" />}
/>

<TextInput
  label="Search"
  placeholder="Search..."
  leftSection={<Search className="h-4 w-4" />}
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
          <Stack gap="md" className="w-full max-w-sm">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              error="Please enter a valid email address"
            />
            <TextInput
              label="Username"
              placeholder="Enter username"
              error="Username is already taken"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<TextInput
  label="Email"
  placeholder="your@email.com"
  error="Please enter a valid email address"
/>

<TextInput
  label="Username"
  placeholder="Enter username"
  error="Username is already taken"
/>`}
        />
      </Section>

      {/* Disabled */}
      <Section id="disabled">
        <SectionHeader
          title="Disabled"
          subtitle="Disabled input state"
        />
        <DemoArea>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            disabled
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`<TextInput
  label="Email"
  placeholder="your@email.com"
  disabled
/>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="TextInput supports multiple sizes"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <TextInput size="xs" label="Extra small" placeholder="xs size" />
            <TextInput size="sm" label="Small" placeholder="sm size" />
            <TextInput size="md" label="Medium" placeholder="md size" />
            <TextInput size="lg" label="Large" placeholder="lg size" />
            <TextInput size="xl" label="Extra large" placeholder="xl size" />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<TextInput size="xs" label="Extra small" placeholder="xs size" />
<TextInput size="sm" label="Small" placeholder="sm size" />
<TextInput size="md" label="Medium" placeholder="md size" />
<TextInput size="lg" label="Large" placeholder="lg size" />
<TextInput size="xl" label="Extra large" placeholder="xl size" />`}
        />
      </Section>

      {/* Variants */}
      <Section id="variants">
        <SectionHeader
          title="Variants"
          subtitle="Different visual styles"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <TextInput variant="default" label="Default" placeholder="Default variant" />
            <TextInput variant="filled" label="Filled" placeholder="Filled variant" />
            <TextInput variant="unstyled" label="Unstyled" placeholder="Unstyled variant" />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<TextInput variant="default" label="Default" placeholder="Default variant" />
<TextInput variant="filled" label="Filled" placeholder="Filled variant" />
<TextInput variant="unstyled" label="Unstyled" placeholder="Unstyled variant" />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

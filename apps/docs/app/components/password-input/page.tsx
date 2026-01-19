"use client";

import { useState } from "react";
import { PasswordInput, Stack, Button, Group } from "@warp/react";
import { Lock } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function PasswordInputPage() {
  const [visible, setVisible] = useState(false);

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "controlled", title: "Controlled Visibility", level: 2 },
    { id: "with-icon", title: "With Icon", level: 2 },
    { id: "error-state", title: "Error State", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="PasswordInput"
        description="Password input with visibility toggle"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Password input with built-in visibility toggle"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              description="Must match the password above"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<PasswordInput
  label="Password"
  placeholder="Enter your password"
/>

<PasswordInput
  label="Confirm Password"
  placeholder="Confirm your password"
  description="Must match the password above"
/>`}
        />
      </Section>

      {/* Controlled Visibility */}
      <Section id="controlled">
        <SectionHeader
          title="Controlled Visibility"
          subtitle="Control visibility state programmatically"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              visible={visible}
              onVisibilityChange={setVisible}
            />
            <Group gap="sm">
              <Button size="sm" variant="outline" onClick={() => setVisible(!visible)}>
                {visible ? "Hide" : "Show"} Password
              </Button>
            </Group>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`const [visible, setVisible] = useState(false);

<PasswordInput
  label="Password"
  placeholder="Enter your password"
  visible={visible}
  onVisibilityChange={setVisible}
/>

<Button onClick={() => setVisible(!visible)}>
  {visible ? "Hide" : "Show"} Password
</Button>`}
        />
      </Section>

      {/* With Icon */}
      <Section id="with-icon">
        <SectionHeader
          title="With Icon"
          subtitle="Add a left section icon"
        />
        <DemoArea>
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            leftSection={<Lock className="h-4 w-4 text-muted-foreground" />}
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`import { Lock } from "lucide-react";

<PasswordInput
  label="Password"
  placeholder="Enter your password"
  leftSection={<Lock className="h-4 w-4" />}
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
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              error="Password must be at least 8 characters"
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              error="Passwords do not match"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<PasswordInput
  label="Password"
  placeholder="Enter your password"
  error="Password must be at least 8 characters"
/>

<PasswordInput
  label="Confirm Password"
  placeholder="Confirm your password"
  error="Passwords do not match"
/>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="PasswordInput supports multiple sizes"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <PasswordInput size="xs" label="Extra small" placeholder="xs size" />
            <PasswordInput size="sm" label="Small" placeholder="sm size" />
            <PasswordInput size="md" label="Medium" placeholder="md size" />
            <PasswordInput size="lg" label="Large" placeholder="lg size" />
            <PasswordInput size="xl" label="Extra large" placeholder="xl size" />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<PasswordInput size="xs" label="Extra small" placeholder="xs size" />
<PasswordInput size="sm" label="Small" placeholder="sm size" />
<PasswordInput size="md" label="Medium" placeholder="md size" />
<PasswordInput size="lg" label="Large" placeholder="lg size" />
<PasswordInput size="xl" label="Extra large" placeholder="xl size" />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

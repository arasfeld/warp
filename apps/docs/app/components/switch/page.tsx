"use client";

import { useState } from "react";
import { Switch } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function SwitchPage() {
  const [checked, setChecked] = useState(false);

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "controlled", title: "Controlled", level: 2 },
    { id: "label-position", title: "Label Position", level: 2 },
    { id: "label-description-error", title: "Label, Description, Error", level: 2 },
    { id: "internal-labels", title: "Internal Labels", level: 2 },
    { id: "thumb-icon", title: "Thumb Icon", level: 2 },
    { id: "color", title: "Color", level: 2 },
    { id: "size", title: "Size", level: 2 },
    { id: "disabled", title: "Disabled", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Switch"
        description="Toggle between on and off states"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader title="Usage" subtitle="Basic switch component" />
        <DemoArea>
          <Switch defaultChecked label="Enable notifications" />
        </DemoArea>
        <CodeBlock
          code={`<Switch defaultChecked label="Enable notifications" />`}
        />
      </Section>

      {/* Controlled */}
      <Section id="controlled">
        <SectionHeader
          title="Controlled"
          subtitle="Controlled switch component"
        />
        <DemoArea>
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            label="Controlled switch"
          />
        </DemoArea>
        <CodeBlock
          code={`const [checked, setChecked] = useState(false);

<Switch
  checked={checked}
  onCheckedChange={setChecked}
  label="Controlled switch"
/>`}
        />
      </Section>

      {/* Label Position */}
      <Section id="label-position">
        <SectionHeader
          title="Label Position"
          subtitle="Label can be positioned left or right"
        />
        <DemoArea className="flex-col items-start gap-4">
          <Switch
            defaultChecked
            label="Label on the right"
            labelPosition="right"
          />
          <Switch
            defaultChecked
            label="Label on the left"
            labelPosition="left"
          />
        </DemoArea>
        <CodeBlock
          code={`<Switch defaultChecked label="Label on the right" labelPosition="right" />
<Switch defaultChecked label="Label on the left" labelPosition="left" />`}
        />
      </Section>

      {/* Label, Description, Error */}
      <Section id="label-description-error">
        <SectionHeader
          title="Label, Description, Error"
          subtitle="Switch with label, description, and error states"
        />
        <DemoArea className="flex-col items-start gap-6">
          <Switch
            defaultChecked
            label="Switch with description"
            description="This setting enables push notifications for your account"
          />
          <Switch
            label="Switch with error"
            error="You must accept the terms and conditions"
          />
        </DemoArea>
        <CodeBlock
          code={`<Switch
  defaultChecked
  label="Switch with description"
  description="This setting enables push notifications for your account"
/>

<Switch
  label="Switch with error"
  error="You must accept the terms and conditions"
/>`}
        />
      </Section>

      {/* Internal Labels */}
      <Section id="internal-labels">
        <SectionHeader
          title="Internal Labels"
          subtitle="Display on/off labels inside the track"
        />
        <DemoArea className="flex-col items-start gap-4">
          <Switch
            defaultChecked
            onLabel="ON"
            offLabel="OFF"
            size="md"
          />
          <Switch
            onLabel="I"
            offLabel="O"
            size="lg"
          />
        </DemoArea>
        <CodeBlock
          code={`<Switch defaultChecked onLabel="ON" offLabel="OFF" size="md" />
<Switch onLabel="I" offLabel="O" size="lg" />`}
        />
      </Section>

      {/* Thumb Icon */}
      <Section id="thumb-icon">
        <SectionHeader
          title="Thumb Icon"
          subtitle="Display an icon inside the thumb"
        />
        <DemoArea className="flex-col items-start gap-4">
          <Switch
            defaultChecked
            size="lg"
            thumbIcon={
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            }
          />
        </DemoArea>
        <CodeBlock
          code={`<Switch
  defaultChecked
  size="lg"
  thumbIcon={
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  }
/>`}
        />
      </Section>

      {/* Color */}
      <Section id="color">
        <SectionHeader title="Color" subtitle="Different color variants" />
        <DemoArea className="flex-col items-start gap-4">
          <Switch defaultChecked label="Primary" color="primary" />
          <Switch defaultChecked label="Secondary" color="secondary" />
          <Switch defaultChecked label="Success" color="success" />
          <Switch defaultChecked label="Warning" color="warning" />
          <Switch defaultChecked label="Error" color="error" />
          <Switch defaultChecked label="Info" color="info" />
        </DemoArea>
        <CodeBlock
          code={`<Switch defaultChecked label="Primary" color="primary" />
<Switch defaultChecked label="Secondary" color="secondary" />
<Switch defaultChecked label="Success" color="success" />
<Switch defaultChecked label="Warning" color="warning" />
<Switch defaultChecked label="Error" color="error" />
<Switch defaultChecked label="Info" color="info" />`}
        />
      </Section>

      {/* Size */}
      <Section id="size">
        <SectionHeader title="Size" subtitle="Different switch sizes" />
        <DemoArea className="flex-col items-start gap-4">
          <Switch defaultChecked label="Extra Small" size="xs" />
          <Switch defaultChecked label="Small" size="sm" />
          <Switch defaultChecked label="Medium" size="md" />
          <Switch defaultChecked label="Large" size="lg" />
          <Switch defaultChecked label="Extra Large" size="xl" />
        </DemoArea>
        <CodeBlock
          code={`<Switch defaultChecked label="Extra Small" size="xs" />
<Switch defaultChecked label="Small" size="sm" />
<Switch defaultChecked label="Medium" size="md" />
<Switch defaultChecked label="Large" size="lg" />
<Switch defaultChecked label="Extra Large" size="xl" />`}
        />
      </Section>

      {/* Disabled */}
      <Section id="disabled">
        <SectionHeader title="Disabled" subtitle="Disabled switch states" />
        <DemoArea className="flex-col items-start gap-4">
          <Switch label="Disabled unchecked" disabled />
          <Switch label="Disabled checked" checked disabled />
        </DemoArea>
        <CodeBlock
          code={`<Switch label="Disabled unchecked" disabled />
<Switch label="Disabled checked" checked disabled />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

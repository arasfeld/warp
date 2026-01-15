"use client";

import { useState } from "react";
import { Checkbox } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function CheckboxPage() {
  const [checked, setChecked] = useState(false);
  const [groupValue, setGroupValue] = useState<string[]>([]);

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "controlled", title: "Controlled", level: 2 },
    { id: "label-position", title: "Label Position", level: 2 },
    {
      id: "label-description-error",
      title: "Label, Description, Error",
      level: 2,
    },
    { id: "color", title: "Color", level: 2 },
    { id: "variant", title: "Variant", level: 2 },
    { id: "size", title: "Size", level: 2 },
    { id: "radius", title: "Radius", level: 2 },
    { id: "disabled", title: "Disabled", level: 2 },
    { id: "indeterminate", title: "Indeterminate", level: 2 },
    { id: "checkbox-group", title: "Checkbox.Group", level: 2 },
    { id: "checkbox-indicator", title: "Checkbox.Indicator", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Checkbox"
        description="Capture boolean input from user"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader title="Usage" subtitle="Basic checkbox component" />
        <DemoArea>
          <Checkbox defaultChecked label="I agree to sell my privacy" />
        </DemoArea>
        <CodeBlock
          code={`<Checkbox defaultChecked label="I agree to sell my privacy" />`}
        />
      </Section>

      {/* Controlled */}
      <Section id="controlled">
        <SectionHeader
          title="Controlled"
          subtitle="Controlled checkbox component"
        />
        <DemoArea>
          <Checkbox
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            label="Controlled checkbox"
          />
        </DemoArea>
        <CodeBlock
          code={`const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={(event) => setChecked(event.currentTarget.checked)}
  label="Controlled checkbox"
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
          <Checkbox
            defaultChecked
            label="Label on the right"
            labelPosition="right"
          />
          <Checkbox
            defaultChecked
            label="Label on the left"
            labelPosition="left"
          />
        </DemoArea>
        <CodeBlock
          code={`<Checkbox defaultChecked label="Label on the right" labelPosition="right" />
<Checkbox defaultChecked label="Label on the left" labelPosition="left" />`}
        />
      </Section>

      {/* Label, Description, Error */}
      <Section id="label-description-error">
        <SectionHeader
          title="Label, Description, Error"
          subtitle="Checkbox with label, description, and error states"
        />
        <DemoArea className="flex-col items-start gap-6">
          <Checkbox
            defaultChecked
            label="Checkbox with description"
            description="This is a helpful description"
          />
          <Checkbox
            label="Checkbox with error"
            error="This field is required"
          />
        </DemoArea>
        <CodeBlock
          code={`<Checkbox
  defaultChecked
  label="Checkbox with description"
  description="This is a helpful description"
/>

<Checkbox
  label="Checkbox with error"
  error="This field is required"
/>`}
        />
      </Section>

      {/* Color */}
      <Section id="color">
        <SectionHeader title="Color" subtitle="Different color variants" />
        <DemoArea>
          <Checkbox defaultChecked label="Primary" color="primary" />
          <Checkbox defaultChecked label="Blue" color="blue" />
          <Checkbox defaultChecked label="Red" color="red" />
        </DemoArea>
        <CodeBlock
          code={`<Checkbox defaultChecked label="Primary" color="primary" />
<Checkbox defaultChecked label="Blue" color="blue" />
<Checkbox defaultChecked label="Red" color="red" />`}
        />
      </Section>

      {/* Variant */}
      <Section id="variant">
        <SectionHeader title="Variant" subtitle="Different style variants" />
        <DemoArea className="flex-col items-start gap-4">
          <Checkbox
            defaultChecked
            label="Filled variant"
            variant="filled"
            color="primary"
          />
          <Checkbox
            defaultChecked
            label="Outline variant"
            variant="outline"
            color="primary"
          />
        </DemoArea>
        <CodeBlock
          code={`<Checkbox defaultChecked label="Filled variant" variant="filled" color="primary" />
<Checkbox defaultChecked label="Outline variant" variant="outline" color="primary" />`}
        />
      </Section>

      {/* Size */}
      <Section id="size">
        <SectionHeader title="Size" subtitle="Different checkbox sizes" />
        <DemoArea className="flex-col items-start gap-4">
          <Checkbox defaultChecked label="Extra Small" size="xs" />
          <Checkbox defaultChecked label="Small" size="sm" />
          <Checkbox defaultChecked label="Medium" size="md" />
          <Checkbox defaultChecked label="Large" size="lg" />
          <Checkbox defaultChecked label="Extra Large" size="xl" />
        </DemoArea>
        <CodeBlock
          code={`<Checkbox defaultChecked label="Extra Small" size="xs" />
<Checkbox defaultChecked label="Small" size="sm" />
<Checkbox defaultChecked label="Medium" size="md" />
<Checkbox defaultChecked label="Large" size="lg" />
<Checkbox defaultChecked label="Extra Large" size="xl" />`}
        />
      </Section>

      {/* Radius */}
      <Section id="radius">
        <SectionHeader
          title="Radius"
          subtitle="Different border radius values"
        />
        <DemoArea className="flex-col items-start gap-4">
          <Checkbox defaultChecked label="Small radius" radius="sm" />
          <Checkbox defaultChecked label="Medium radius" radius="md" />
          <Checkbox defaultChecked label="Large radius" radius="lg" />
          <Checkbox defaultChecked label="Full radius" radius="full" />
        </DemoArea>
        <CodeBlock
          code={`<Checkbox defaultChecked label="Small radius" radius="sm" />
<Checkbox defaultChecked label="Medium radius" radius="md" />
<Checkbox defaultChecked label="Large radius" radius="lg" />
<Checkbox defaultChecked label="Full radius" radius="full" />`}
        />
      </Section>

      {/* Disabled */}
      <Section id="disabled">
        <SectionHeader title="Disabled" subtitle="Disabled checkbox states" />
        <DemoArea className="flex-col items-start gap-4">
          <Checkbox label="Disabled checkbox" disabled />
          <Checkbox label="Disabled checked" checked disabled />
          <Checkbox label="Disabled indeterminate" indeterminate disabled />
        </DemoArea>
        <CodeBlock
          code={`<Checkbox label="Disabled checkbox" disabled />
<Checkbox label="Disabled checked" checked disabled />
<Checkbox label="Disabled indeterminate" indeterminate disabled />`}
        />
      </Section>

      {/* Indeterminate */}
      <Section id="indeterminate">
        <SectionHeader
          title="Indeterminate"
          subtitle="Indeterminate checkbox state"
        />
        <DemoArea className="flex-col items-start gap-4">
          <Checkbox
            label="Default checkbox"
            checked={false}
            onChange={() => {}}
          />
          <Checkbox
            label="Indeterminate checkbox"
            indeterminate
            onChange={() => {}}
          />
          <Checkbox label="Checked checkbox" checked onChange={() => {}} />
          <Checkbox
            label="Outline checked"
            checked
            variant="outline"
            onChange={() => {}}
          />
          <Checkbox
            label="Outline indeterminate"
            variant="outline"
            indeterminate
            onChange={() => {}}
          />
        </DemoArea>
        <CodeBlock
          code={`<Checkbox label="Default checkbox" checked={false} onChange={() => {}} />
<Checkbox label="Indeterminate checkbox" indeterminate onChange={() => {}} />
<Checkbox label="Checked checkbox" checked onChange={() => {}} />
<Checkbox label="Outline checked" checked variant="outline" onChange={() => {}} />
<Checkbox label="Outline indeterminate" variant="outline" indeterminate onChange={() => {}} />`}
        />
      </Section>

      {/* Checkbox.Group */}
      <Section id="checkbox-group">
        <SectionHeader
          title="Checkbox.Group"
          subtitle="Manage state of multiple checkboxes"
        />
        <DemoArea className="flex-col items-start gap-6">
          <Checkbox.Group
            value={groupValue}
            onChange={setGroupValue}
            label="Select your favorite frameworks/libraries"
            description="This is anonymous"
            withAsterisk
          >
            <Checkbox value="react" label="React" />
            <Checkbox value="svelte" label="Svelte" />
            <Checkbox value="ng" label="Angular" />
            <Checkbox value="vue" label="Vue" />
          </Checkbox.Group>
        </DemoArea>
        <CodeBlock
          code={`const [value, setValue] = useState<string[]>([]);

<Checkbox.Group
  value={value}
  onChange={setValue}
  label="Select your favorite frameworks/libraries"
  description="This is anonymous"
  withAsterisk
>
  <Checkbox value="react" label="React" />
  <Checkbox value="svelte" label="Svelte" />
  <Checkbox value="ng" label="Angular" />
  <Checkbox value="vue" label="Vue" />
</Checkbox.Group>`}
        />
      </Section>

      {/* Checkbox.Indicator */}
      <Section id="checkbox-indicator">
        <SectionHeader
          title="Checkbox.Indicator"
          subtitle="Visual representation of checkbox state without interaction"
        />
        <DemoArea>
          <Checkbox.Indicator />
          <Checkbox.Indicator checked />
          <Checkbox.Indicator indeterminate />
          <Checkbox.Indicator disabled />
          <Checkbox.Indicator disabled checked />
          <Checkbox.Indicator disabled indeterminate />
        </DemoArea>
        <CodeBlock
          code={`<Checkbox.Indicator />
<Checkbox.Indicator checked />
<Checkbox.Indicator indeterminate />
<Checkbox.Indicator disabled />
<Checkbox.Indicator disabled checked />
<Checkbox.Indicator disabled indeterminate />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

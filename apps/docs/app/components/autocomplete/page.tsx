"use client";

import { useState } from "react";
import { Autocomplete, Stack, Text } from "@warp/react";
import { Search, MapPin } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

const frameworks = [
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "preact", label: "Preact" },
  { value: "qwik", label: "Qwik" },
];

const cities = [
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "houston", label: "Houston" },
  { value: "phoenix", label: "Phoenix" },
  { value: "philadelphia", label: "Philadelphia" },
  { value: "san-antonio", label: "San Antonio" },
  { value: "san-diego", label: "San Diego" },
];

export default function AutocompletePage() {
  const [value, setValue] = useState("");

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "controlled", title: "Controlled", level: 2 },
    { id: "with-icon", title: "With Icon", level: 2 },
    { id: "max-dropdown-height", title: "Dropdown Height", level: 2 },
    { id: "disabled", title: "Disabled", level: 2 },
    { id: "error-state", title: "Error State", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Autocomplete"
        description="Text input with suggestions dropdown"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic autocomplete with suggestions"
        />
        <DemoArea>
          <Autocomplete
            label="Framework"
            placeholder="Search frameworks..."
            data={frameworks}
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`const frameworks = [
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
];

<Autocomplete
  label="Framework"
  placeholder="Search frameworks..."
  data={frameworks}
/>`}
        />
      </Section>

      {/* Controlled */}
      <Section id="controlled">
        <SectionHeader
          title="Controlled"
          subtitle="Control the input value programmatically"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <Autocomplete
              label="Framework"
              placeholder="Search frameworks..."
              data={frameworks}
              value={value}
              onChange={setValue}
            />
            <Text size="sm" c="dimmed">
              Input value: {value || "(empty)"}
            </Text>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`const [value, setValue] = useState("");

<Autocomplete
  label="Framework"
  placeholder="Search frameworks..."
  data={frameworks}
  value={value}
  onChange={setValue}
/>
<Text size="sm" c="dimmed">
  Input value: {value || "(empty)"}
</Text>`}
        />
      </Section>

      {/* With Icon */}
      <Section id="with-icon">
        <SectionHeader
          title="With Icon"
          subtitle="Add icons to the autocomplete input"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <Autocomplete
              label="Search"
              placeholder="Search..."
              data={frameworks}
              leftSection={<Search className="h-4 w-4 text-muted-foreground" />}
            />
            <Autocomplete
              label="City"
              placeholder="Search cities..."
              data={cities}
              leftSection={<MapPin className="h-4 w-4 text-muted-foreground" />}
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`import { Search, MapPin } from "lucide-react";

<Autocomplete
  label="Search"
  placeholder="Search..."
  data={frameworks}
  leftSection={<Search className="h-4 w-4" />}
/>

<Autocomplete
  label="City"
  placeholder="Search cities..."
  data={cities}
  leftSection={<MapPin className="h-4 w-4" />}
/>`}
        />
      </Section>

      {/* Max Dropdown Height */}
      <Section id="max-dropdown-height">
        <SectionHeader
          title="Dropdown Height"
          subtitle="Control the maximum height of the dropdown"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <Autocomplete
              label="Small dropdown"
              placeholder="Search cities..."
              data={cities}
              maxDropdownHeight={120}
              description="Max height: 120px"
            />
            <Autocomplete
              label="Large dropdown"
              placeholder="Search cities..."
              data={cities}
              maxDropdownHeight={300}
              description="Max height: 300px"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Autocomplete
  label="Small dropdown"
  placeholder="Search cities..."
  data={cities}
  maxDropdownHeight={120}
/>

<Autocomplete
  label="Large dropdown"
  placeholder="Search cities..."
  data={cities}
  maxDropdownHeight={300}
/>`}
        />
      </Section>

      {/* Disabled */}
      <Section id="disabled">
        <SectionHeader
          title="Disabled"
          subtitle="Disable the autocomplete input"
        />
        <DemoArea>
          <Autocomplete
            label="Framework"
            placeholder="Search frameworks..."
            data={frameworks}
            disabled
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`<Autocomplete
  label="Framework"
  placeholder="Search frameworks..."
  data={frameworks}
  disabled
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
          <Autocomplete
            label="Framework"
            placeholder="Search frameworks..."
            data={frameworks}
            error="Please select a valid framework"
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`<Autocomplete
  label="Framework"
  placeholder="Search frameworks..."
  data={frameworks}
  error="Please select a valid framework"
/>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="Autocomplete supports multiple sizes"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <Autocomplete size="xs" label="Extra small" placeholder="xs size" data={frameworks} />
            <Autocomplete size="sm" label="Small" placeholder="sm size" data={frameworks} />
            <Autocomplete size="md" label="Medium" placeholder="md size" data={frameworks} />
            <Autocomplete size="lg" label="Large" placeholder="lg size" data={frameworks} />
            <Autocomplete size="xl" label="Extra large" placeholder="xl size" data={frameworks} />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Autocomplete size="xs" label="Extra small" data={frameworks} />
<Autocomplete size="sm" label="Small" data={frameworks} />
<Autocomplete size="md" label="Medium" data={frameworks} />
<Autocomplete size="lg" label="Large" data={frameworks} />
<Autocomplete size="xl" label="Extra large" data={frameworks} />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

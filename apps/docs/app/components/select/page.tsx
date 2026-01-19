"use client";

import { useState } from "react";
import { Select, InputWrapper } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

const sampleData = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt.js" },
];

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

export default function SelectPage() {
  const [singleValue, setSingleValue] = useState<string | null>(null);
  const [multipleValue, setMultipleValue] = useState<string[]>([]);
  const [searchableValue, setSearchableValue] = useState<string | null>(null);
  const [clearableValue, setClearableValue] = useState<string | null>("react");

  const tocItems = [
    { id: "basic", title: "Basic Select", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "variants", title: "Variants", level: 2 },
    { id: "multiple", title: "Multiple Selection", level: 2 },
    { id: "searchable", title: "Searchable", level: 2 },
    { id: "clearable", title: "Clearable", level: 2 },
    { id: "states", title: "States", level: 2 },
    { id: "with-wrapper", title: "With Input Wrapper", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Select"
        description="Dropdown select component with keyboard navigation, search, and multiple selection support"
      />

      {/* Basic Select */}
      <Section id="basic">
        <SectionHeader
          title="Basic Select"
          subtitle="Simple dropdown select with options"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper label="Framework">
            <Select
              data={sampleData}
              value={singleValue}
              onChange={setSingleValue}
              placeholder="Select a framework..."
            />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`import { Select, InputWrapper } from '@warp/react';

const data = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
];

function MyComponent() {
  const [value, setValue] = useState(null);

  return (
    <InputWrapper label="Framework">
      <Select
        data={data}
        value={value}
        onChange={setValue}
        placeholder="Select a framework..."
      />
    </InputWrapper>
  );
}`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="Different select sizes matching Input component"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper label="Extra Small" size="xs">
            <Select
              size="xs"
              data={sampleData}
              placeholder="Select option..."
            />
          </InputWrapper>
          <InputWrapper label="Small" size="sm">
            <Select
              size="sm"
              data={sampleData}
              placeholder="Select option..."
            />
          </InputWrapper>
          <InputWrapper label="Medium" size="md">
            <Select
              size="md"
              data={sampleData}
              placeholder="Select option..."
            />
          </InputWrapper>
          <InputWrapper label="Large" size="lg">
            <Select
              size="lg"
              data={sampleData}
              placeholder="Select option..."
            />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`<InputWrapper label="Small" size="sm">
  <Select size="sm" data={data} placeholder="Select option..." />
</InputWrapper>

<InputWrapper label="Medium" size="md">
  <Select size="md" data={data} placeholder="Select option..." />
</InputWrapper>

<InputWrapper label="Large" size="lg">
  <Select size="lg" data={data} placeholder="Select option..." />
</InputWrapper>`}
        />
      </Section>

      {/* Variants */}
      <Section id="variants">
        <SectionHeader
          title="Variants"
          subtitle="Different select style variants matching Input component"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper label="Default">
            <Select
              variant="default"
              data={sampleData}
              placeholder="Default variant..."
            />
          </InputWrapper>
          <InputWrapper label="Filled">
            <Select
              variant="filled"
              data={sampleData}
              placeholder="Filled variant..."
            />
          </InputWrapper>
          <InputWrapper label="Unstyled">
            <Select
              variant="unstyled"
              data={sampleData}
              placeholder="Unstyled variant..."
            />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`<InputWrapper label="Default">
  <Select variant="default" data={data} placeholder="Default variant..." />
</InputWrapper>

<InputWrapper label="Filled">
  <Select variant="filled" data={data} placeholder="Filled variant..." />
</InputWrapper>

<InputWrapper label="Unstyled">
  <Select variant="unstyled" data={data} placeholder="Unstyled variant..." />
</InputWrapper>`}
        />
      </Section>

      {/* Multiple Selection */}
      <Section id="multiple">
        <SectionHeader
          title="Multiple Selection"
          subtitle="Select multiple options at once"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper label="Select Multiple">
            <Select
              data={sampleData}
              value={multipleValue}
              onChange={setMultipleValue}
              multiple
              placeholder="Select frameworks..."
            />
          </InputWrapper>
          {multipleValue.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Selected: {multipleValue.join(", ")}
            </div>
          )}
        </DemoArea>
        <CodeBlock
          code={`function MyComponent() {
  const [value, setValue] = useState([]);

  return (
    <InputWrapper label="Select Multiple">
      <Select
        data={data}
        value={value}
        onChange={setValue}
        multiple
        placeholder="Select frameworks..."
      />
    </InputWrapper>
  );
}`}
        />
      </Section>

      {/* Searchable */}
      <Section id="searchable">
        <SectionHeader
          title="Searchable"
          subtitle="Filter options by typing to search"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper label="Searchable Select">
            <Select
              data={countries}
              value={searchableValue}
              onChange={setSearchableValue}
              searchable
              placeholder="Search countries..."
            />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`<InputWrapper label="Searchable Select">
  <Select
    data={countries}
    value={value}
    onChange={setValue}
    searchable
    placeholder="Search countries..."
  />
</InputWrapper>`}
        />
      </Section>

      {/* Clearable */}
      <Section id="clearable">
        <SectionHeader
          title="Clearable"
          subtitle="Show clear button to reset selection"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper label="Clearable Select">
            <Select
              data={sampleData}
              value={clearableValue}
              onChange={setClearableValue}
              clearable
              placeholder="Select option..."
            />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`<InputWrapper label="Clearable Select">
  <Select
    data={data}
    value={value}
    onChange={setValue}
    clearable
    placeholder="Select option..."
  />
</InputWrapper>`}
        />
      </Section>

      {/* States */}
      <Section id="states">
        <SectionHeader
          title="States"
          subtitle="Error and disabled states"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper
            label="With Error"
            error="Please select an option"
          >
            <Select
              data={sampleData}
              error
              placeholder="Select option..."
            />
          </InputWrapper>
          <InputWrapper label="Disabled">
            <Select
              data={sampleData}
              disabled
              placeholder="Cannot select..."
            />
          </InputWrapper>
          <InputWrapper label="Disabled with Value">
            <Select
              data={sampleData}
              value="react"
              disabled
              placeholder="Cannot select..."
            />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`<InputWrapper label="With Error" error="Please select an option">
  <Select data={data} error placeholder="Select option..." />
</InputWrapper>

<InputWrapper label="Disabled">
  <Select data={data} disabled placeholder="Cannot select..." />
</InputWrapper>

<InputWrapper label="Disabled with Value">
  <Select data={data} value="react" disabled placeholder="Cannot select..." />
</InputWrapper>`}
        />
      </Section>

      {/* With Wrapper */}
      <Section id="with-wrapper">
        <SectionHeader
          title="With Input Wrapper"
          subtitle="Use InputWrapper for labels, descriptions, and error messages"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper
            label="Country"
            description="Select your country of residence"
            required
          >
            <Select
              data={countries}
              placeholder="Select country..."
            />
          </InputWrapper>
          <InputWrapper
            label="Framework"
            description="Choose your preferred framework"
            error="This field is required"
          >
            <Select
              data={sampleData}
              error
              placeholder="Select framework..."
            />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`<InputWrapper
  label="Country"
  description="Select your country of residence"
  required
>
  <Select data={countries} placeholder="Select country..." />
</InputWrapper>

<InputWrapper
  label="Framework"
  description="Choose your preferred framework"
  error="This field is required"
>
  <Select data={sampleData} error placeholder="Select framework..." />
</InputWrapper>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

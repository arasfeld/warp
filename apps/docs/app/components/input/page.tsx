import { Input, InputWrapper } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function InputPage() {
  const tocItems = [
    { id: "basic", title: "Basic Input", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "variants", title: "Variants", level: 2 },
    { id: "states", title: "States", level: 2 },
    { id: "sections", title: "Left and Right Sections", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Input"
        description="Text input component with variants, sizes, and validation states"
      />

      {/* Basic Input */}
      <Section id="basic">
        <SectionHeader
          title="Basic Input"
          subtitle="Simple text input with label"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper label="Email">
            <Input type="email" placeholder="Enter your email" />
          </InputWrapper>
          <InputWrapper label="Password">
            <Input type="password" placeholder="Enter your password" />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`<InputWrapper label="Email">
  <Input type="email" placeholder="Enter your email" />
</InputWrapper>

<InputWrapper label="Password">
  <Input type="password" placeholder="Enter your password" />
</InputWrapper>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="Different input sizes"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper label="Small" size="sm">
            <Input size="sm" placeholder="Small input" />
          </InputWrapper>
          <InputWrapper label="Medium" size="md">
            <Input size="md" placeholder="Medium input" />
          </InputWrapper>
          <InputWrapper label="Large" size="lg">
            <Input size="lg" placeholder="Large input" />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`<InputWrapper label="Small" size="sm">
  <Input size="sm" placeholder="Small input" />
</InputWrapper>

<InputWrapper label="Medium" size="md">
  <Input size="md" placeholder="Medium input" />
</InputWrapper>

<InputWrapper label="Large" size="lg">
  <Input size="lg" placeholder="Large input" />
</InputWrapper>`}
        />
      </Section>

      {/* Variants */}
      <Section id="variants">
        <SectionHeader
          title="Variants"
          subtitle="Different input style variants"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper label="Default">
            <Input variant="default" placeholder="Default variant" />
          </InputWrapper>
          <InputWrapper label="Filled">
            <Input variant="filled" placeholder="Filled variant" />
          </InputWrapper>
          <InputWrapper label="Unstyled">
            <Input variant="unstyled" placeholder="Unstyled variant" />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`<InputWrapper label="Default">
  <Input variant="default" placeholder="Default variant" />
</InputWrapper>

<InputWrapper label="Filled">
  <Input variant="filled" placeholder="Filled variant" />
</InputWrapper>

<InputWrapper label="Unstyled">
  <Input variant="unstyled" placeholder="Unstyled variant" />
</InputWrapper>`}
        />
      </Section>

      {/* States */}
      <Section id="states">
        <SectionHeader
          title="States"
          subtitle="Error and helper text states"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper
            label="With Helper Text"
            description="This is helpful information"
          >
            <Input placeholder="Enter value" />
          </InputWrapper>
          <InputWrapper
            label="With Error"
            error="This field is required"
          >
            <Input placeholder="Enter value" error />
          </InputWrapper>
          <InputWrapper label="Disabled">
            <Input placeholder="Cannot type here" disabled />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`<InputWrapper
  label="With Helper Text"
  description="This is helpful information"
>
  <Input placeholder="Enter value" />
</InputWrapper>

<InputWrapper
  label="With Error"
  error="This field is required"
>
  <Input placeholder="Enter value" error />
</InputWrapper>

<InputWrapper label="Disabled">
  <Input placeholder="Cannot type here" disabled />
</InputWrapper>`}
        />
      </Section>

      {/* Sections */}
      <Section id="sections">
        <SectionHeader
          title="Left and Right Sections"
          subtitle="Input with icon sections"
        />
        <DemoArea className="flex-col items-stretch gap-4">
          <InputWrapper label="Left Section">
            <Input
              placeholder="Search..."
              leftSection={<span className="text-muted-foreground">@</span>}
            />
          </InputWrapper>
          <InputWrapper label="Right Section">
            <Input
              placeholder="Enter amount"
              rightSection={<span className="text-muted-foreground">$</span>}
            />
          </InputWrapper>
          <InputWrapper label="Both Sections">
            <Input
              placeholder="Enter value"
              leftSection={<span className="text-muted-foreground">$</span>}
              rightSection={<span className="text-muted-foreground">USD</span>}
            />
          </InputWrapper>
        </DemoArea>
        <CodeBlock
          code={`<InputWrapper label="Left Section">
  <Input
    placeholder="Search..."
    leftSection={<span>@</span>}
  />
</InputWrapper>

<InputWrapper label="Right Section">
  <Input
    placeholder="Enter amount"
    rightSection={<span>$</span>}
  />
</InputWrapper>

<InputWrapper label="Both Sections">
  <Input
    placeholder="Enter value"
    leftSection={<span>$</span>}
    rightSection={<span>USD</span>}
  />
</InputWrapper>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

"use client";

import { useState, useRef } from "react";
import { NumberInput, Stack, Group, Button } from "@warp/react";
import type { NumberInputHandlers } from "@warp/react";
import { DollarSign } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function NumberInputPage() {
  const [value, setValue] = useState<number | string>(0);
  const handlersRef = useRef<NumberInputHandlers>(null);

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "min-max", title: "Min & Max", level: 2 },
    { id: "step", title: "Step", level: 2 },
    { id: "decimal", title: "Decimal Numbers", level: 2 },
    { id: "formatting", title: "Formatting", level: 2 },
    { id: "handlers-ref", title: "Handlers Ref", level: 2 },
    { id: "hide-controls", title: "Hide Controls", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="NumberInput"
        description="Numeric input with increment/decrement controls"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic number input with increment/decrement buttons"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <NumberInput
              label="Quantity"
              placeholder="Enter quantity"
            />
            <NumberInput
              label="Age"
              placeholder="Enter your age"
              description="Must be 18 or older"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<NumberInput
  label="Quantity"
  placeholder="Enter quantity"
/>

<NumberInput
  label="Age"
  placeholder="Enter your age"
  description="Must be 18 or older"
/>`}
        />
      </Section>

      {/* Min & Max */}
      <Section id="min-max">
        <SectionHeader
          title="Min & Max"
          subtitle="Constrain value within a range"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <NumberInput
              label="Quantity (1-10)"
              min={1}
              max={10}
              defaultValue={5}
            />
            <NumberInput
              label="Percentage (0-100)"
              min={0}
              max={100}
              suffix="%"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<NumberInput
  label="Quantity (1-10)"
  min={1}
  max={10}
  defaultValue={5}
/>

<NumberInput
  label="Percentage (0-100)"
  min={0}
  max={100}
  suffix="%"
/>`}
        />
      </Section>

      {/* Step */}
      <Section id="step">
        <SectionHeader
          title="Step"
          subtitle="Control increment/decrement amount"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <NumberInput
              label="Step of 5"
              step={5}
              defaultValue={0}
            />
            <NumberInput
              label="Step of 0.1"
              step={0.1}
              decimalScale={1}
              defaultValue={0}
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<NumberInput
  label="Step of 5"
  step={5}
  defaultValue={0}
/>

<NumberInput
  label="Step of 0.1"
  step={0.1}
  decimalScale={1}
  defaultValue={0}
/>`}
        />
      </Section>

      {/* Decimal Numbers */}
      <Section id="decimal">
        <SectionHeader
          title="Decimal Numbers"
          subtitle="Control decimal precision"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <NumberInput
              label="Two decimal places"
              decimalScale={2}
              fixedDecimalScale
              defaultValue={10.5}
            />
            <NumberInput
              label="Integers only"
              allowDecimal={false}
              placeholder="No decimals allowed"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<NumberInput
  label="Two decimal places"
  decimalScale={2}
  fixedDecimalScale
  defaultValue={10.5}
/>

<NumberInput
  label="Integers only"
  allowDecimal={false}
  placeholder="No decimals allowed"
/>`}
        />
      </Section>

      {/* Formatting */}
      <Section id="formatting">
        <SectionHeader
          title="Formatting"
          subtitle="Add prefix, suffix, and thousand separators"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <NumberInput
              label="Price"
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
              defaultValue={1234.56}
              leftSection={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            />
            <NumberInput
              label="Weight"
              suffix=" kg"
              decimalScale={1}
            />
            <NumberInput
              label="With thousands separator"
              thousandSeparator=","
              defaultValue={1000000}
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<NumberInput
  label="Price"
  prefix="$"
  decimalScale={2}
  fixedDecimalScale
  thousandSeparator
  defaultValue={1234.56}
/>

<NumberInput
  label="Weight"
  suffix=" kg"
  decimalScale={1}
/>

<NumberInput
  label="With thousands separator"
  thousandSeparator=","
  defaultValue={1000000}
/>`}
        />
      </Section>

      {/* Handlers Ref */}
      <Section id="handlers-ref">
        <SectionHeader
          title="Handlers Ref"
          subtitle="Programmatically control increment/decrement"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <NumberInput
              label="Controlled with ref"
              value={value}
              onChange={setValue}
              handlersRef={handlersRef}
            />
            <Group gap="sm">
              <Button size="sm" onClick={() => handlersRef.current?.decrement()}>
                - Decrement
              </Button>
              <Button size="sm" onClick={() => handlersRef.current?.increment()}>
                + Increment
              </Button>
            </Group>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`const [value, setValue] = useState(0);
const handlersRef = useRef<NumberInputHandlers>(null);

<NumberInput
  label="Controlled with ref"
  value={value}
  onChange={setValue}
  handlersRef={handlersRef}
/>

<Button onClick={() => handlersRef.current?.decrement()}>
  - Decrement
</Button>
<Button onClick={() => handlersRef.current?.increment()}>
  + Increment
</Button>`}
        />
      </Section>

      {/* Hide Controls */}
      <Section id="hide-controls">
        <SectionHeader
          title="Hide Controls"
          subtitle="Hide increment/decrement buttons"
        />
        <DemoArea>
          <NumberInput
            label="No controls"
            hideControls
            placeholder="Use keyboard arrows"
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`<NumberInput
  label="No controls"
  hideControls
  placeholder="Use keyboard arrows"
/>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="NumberInput supports multiple sizes"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <NumberInput size="xs" label="Extra small" />
            <NumberInput size="sm" label="Small" />
            <NumberInput size="md" label="Medium" />
            <NumberInput size="lg" label="Large" />
            <NumberInput size="xl" label="Extra large" />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<NumberInput size="xs" label="Extra small" />
<NumberInput size="sm" label="Small" />
<NumberInput size="md" label="Medium" />
<NumberInput size="lg" label="Large" />
<NumberInput size="xl" label="Extra large" />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

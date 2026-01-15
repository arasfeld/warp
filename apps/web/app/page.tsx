"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Text,
  Heading,
  Input,
  InputWrapper,
  Chip,
  Checkbox,
} from "@warp/react";

export default function Home() {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [checkboxGroup, setCheckboxGroup] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background p-8">
      <main className="mx-auto max-w-6xl space-y-16">
        <div className="text-center space-y-4">
          <Heading order={1} className="mb-4">
            Warp UI - Next.js Example
          </Heading>
          <Text size="lg" c="dimmed">
            Demonstration of Warp UI components integrated with Next.js
          </Text>
        </div>

        {/* Buttons */}
        <section className="space-y-6">
          <Heading order={2}>Buttons</Heading>

          <div className="space-y-4">
            <div>
              <Heading order={3} className="mb-3">
                Button Variants
              </Heading>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  variant="filled"
                  size="md"
                  onClick={() => console.log("primary clicked")}
                >
                  Primary Button
                </Button>
                <Button
                  variant="default"
                  size="md"
                  onClick={() => console.log("secondary clicked")}
                >
                  Secondary Button
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => console.log("outline clicked")}
                >
                  Outline Button
                </Button>
                <Button
                  variant="light"
                  size="md"
                  onClick={() => console.log("light clicked")}
                >
                  Light Button
                </Button>
              </div>
            </div>

            <div>
              <Heading order={3} className="mb-3">
                Button Sizes
              </Heading>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="filled" size="sm">
                  Small Button
                </Button>
                <Button variant="filled" size="md">
                  Medium Button
                </Button>
                <Button variant="filled" size="lg">
                  Large Button
                </Button>
              </div>
            </div>

            <div>
              <Heading order={3} className="mb-3">
                Button States
              </Heading>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="filled" size="md" disabled>
                  Disabled Button
                </Button>
                <Button variant="filled" size="md" loading>
                  Loading Button
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <Heading order={2}>Cards</Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="lg" withBorder>
              <Heading order={3} size="lg" className="mb-2">
                Card Title
              </Heading>
              <Text className="mb-4">
                This is a card component with padding and border. Cards are
                useful for grouping related content.
              </Text>
              <Button size="sm">Action</Button>
            </Card>

            <Card padding="xl" withBorder shadow="md">
              <Heading order={3} size="lg" className="mb-2">
                Card with Shadow
              </Heading>
              <Text>
                This card has a shadow applied for more depth and visual
                separation.
              </Text>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <Heading order={2}>Typography</Heading>

          <div className="space-y-4">
            <div>
              <Heading order={3} className="mb-3">
                Headings
              </Heading>
              <div className="space-y-2">
                <Heading order={1}>Heading 1</Heading>
                <Heading order={2}>Heading 2</Heading>
                <Heading order={3}>Heading 3</Heading>
                <Heading order={4}>Heading 4</Heading>
              </div>
            </div>

            <div>
              <Heading order={3} className="mb-3">
                Text Sizes
              </Heading>
              <div className="space-y-2">
                <Text size="xs">Extra small text</Text>
                <Text size="sm">Small text</Text>
                <Text size="md">Default text</Text>
                <Text size="lg">Large text</Text>
                <Text size="xl">Extra large text</Text>
              </div>
            </div>

            <div>
              <Heading order={3} className="mb-3">
                Text Styles
              </Heading>
              <div className="space-y-2">
                <Text fw={400}>Font weight 400</Text>
                <Text fw={600}>Font weight 600</Text>
                <Text fw={700}>Font weight 700</Text>
                <Text fs="italic">Italic text</Text>
                <Text td="underline">Underlined text</Text>
                <Text
                  variant="gradient"
                  gradient={{ from: "#a855f7", to: "#06b6d4" }}
                >
                  Gradient text
                </Text>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-6">
          <Heading order={2}>Inputs</Heading>

          <div className="space-y-4">
            <div>
              <Heading order={3} className="mb-3">
                Text Input
              </Heading>
              <div className="max-w-md space-y-4">
                <InputWrapper label="Email">
                  <Input type="email" placeholder="Enter your email" />
                </InputWrapper>
                <InputWrapper label="Password">
                  <Input type="password" placeholder="Enter your password" />
                </InputWrapper>
                <InputWrapper
                  label="Description"
                  description="This is a helpful description"
                >
                  <Input placeholder="Enter description" />
                </InputWrapper>
                <InputWrapper
                  label="Error State"
                  error="This field is required"
                >
                  <Input placeholder="This field has an error" />
                </InputWrapper>
              </div>
            </div>
          </div>
        </section>

        {/* Chips */}
        <section className="space-y-6">
          <Heading order={2}>Chips</Heading>

          <div className="space-y-4">
            <div>
              <Heading order={3} className="mb-3">
                Chip Variants
              </Heading>
              <div className="flex flex-wrap items-center gap-4">
                <Chip defaultChecked variant="filled" color="primary">
                  Filled
                </Chip>
                <Chip defaultChecked variant="outline" color="primary">
                  Outline
                </Chip>
                <Chip defaultChecked variant="light" color="primary">
                  Light
                </Chip>
              </div>
            </div>

            <div>
              <Heading order={3} className="mb-3">
                Chip Group
              </Heading>
              <Chip.Group
                multiple
                value={selectedChips}
                onChange={(val) => setSelectedChips(val as string[])}
              >
                <Chip value="react" variant="filled" color="primary">
                  React
                </Chip>
                <Chip value="vue" variant="filled" color="primary">
                  Vue
                </Chip>
                <Chip value="angular" variant="filled" color="primary">
                  Angular
                </Chip>
                <Chip value="svelte" variant="filled" color="primary">
                  Svelte
                </Chip>
              </Chip.Group>
            </div>
          </div>
        </section>

        {/* Checkboxes */}
        <section className="space-y-6">
          <Heading order={2}>Checkboxes</Heading>

          <div className="space-y-4">
            <div>
              <Heading order={3} className="mb-3">
                Checkbox Variants
              </Heading>
              <div className="space-y-3">
                <Checkbox
                  defaultChecked
                  label="Filled checkbox"
                  variant="filled"
                />
                <Checkbox
                  defaultChecked
                  label="Outline checkbox"
                  variant="outline"
                />
                <Checkbox label="Unchecked checkbox" />
              </div>
            </div>

            <div>
              <Heading order={3} className="mb-3">
                Checkbox Group
              </Heading>
              <Checkbox.Group
                value={checkboxGroup}
                onChange={setCheckboxGroup}
                label="Select frameworks"
              >
                <Checkbox value="react" label="React" />
                <Checkbox value="vue" label="Vue" />
                <Checkbox value="angular" label="Angular" />
                <Checkbox value="svelte" label="Svelte" />
              </Checkbox.Group>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Stack,
  Group,
  Text,
  TextInput,
  Textarea,
} from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function DialogPage() {
  const [basicOpened, setBasicOpened] = useState(false);
  const [confirmOpened, setConfirmOpened] = useState(false);
  const [formOpened, setFormOpened] = useState(false);
  const [sizeOpened, setSizeOpened] = useState(false);
  const [currentSize, setCurrentSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "confirmation", title: "Confirmation Dialog", level: 2 },
    { id: "form", title: "Form Dialog", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "customization", title: "Customization", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Dialog"
        description="Modal dialog for focused user interactions"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic dialog with title and content"
        />
        <DemoArea>
          <Button onClick={() => setBasicOpened(true)}>Open Dialog</Button>
          <Dialog
            opened={basicOpened}
            onClose={() => setBasicOpened(false)}
            title="Welcome"
          >
            <Text>
              This is a basic dialog with a title and content. Click outside or
              press Escape to close.
            </Text>
          </Dialog>
        </DemoArea>
        <CodeBlock
          code={`const [opened, setOpened] = useState(false);

<Button onClick={() => setOpened(true)}>Open Dialog</Button>

<Dialog
  opened={opened}
  onClose={() => setOpened(false)}
  title="Welcome"
>
  <Text>
    This is a basic dialog with a title and content.
    Click outside or press Escape to close.
  </Text>
</Dialog>`}
        />
      </Section>

      {/* Confirmation Dialog */}
      <Section id="confirmation">
        <SectionHeader
          title="Confirmation Dialog"
          subtitle="Dialog with action buttons for user confirmation"
        />
        <DemoArea>
          <Button color="error" onClick={() => setConfirmOpened(true)}>
            Delete Item
          </Button>
          <Dialog
            opened={confirmOpened}
            onClose={() => setConfirmOpened(false)}
            title="Delete Item"
            withCloseButton={false}
          >
            <Text className="mb-4">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </Text>
            <Group justify="flex-end" gap="sm">
              <Button variant="outline" onClick={() => setConfirmOpened(false)}>
                Cancel
              </Button>
              <Button color="error" onClick={() => setConfirmOpened(false)}>
                Delete
              </Button>
            </Group>
          </Dialog>
        </DemoArea>
        <CodeBlock
          code={`<Dialog
  opened={opened}
  onClose={() => setOpened(false)}
  title="Delete Item"
  withCloseButton={false}
>
  <Text className="mb-4">
    Are you sure you want to delete this item?
    This action cannot be undone.
  </Text>
  <Group justify="flex-end" gap="sm">
    <Button variant="outline" onClick={() => setOpened(false)}>
      Cancel
    </Button>
    <Button color="error" onClick={() => setOpened(false)}>
      Delete
    </Button>
  </Group>
</Dialog>`}
        />
      </Section>

      {/* Form Dialog */}
      <Section id="form">
        <SectionHeader
          title="Form Dialog"
          subtitle="Dialog containing a form with structured sections"
        />
        <DemoArea>
          <Button onClick={() => setFormOpened(true)}>Edit Profile</Button>
          <Dialog
            opened={formOpened}
            onClose={() => setFormOpened(false)}
            title="Edit Profile"
            size="md"
          >
            <DialogBody className="px-0">
              <Stack gap="md">
                <TextInput label="Name" placeholder="Enter your name" />
                <TextInput label="Email" type="email" placeholder="Enter your email" />
                <Textarea
                  label="Bio"
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </Stack>
            </DialogBody>
            <DialogFooter className="px-0 border-0 pt-2">
              <Button variant="outline" onClick={() => setFormOpened(false)}>
                Cancel
              </Button>
              <Button onClick={() => setFormOpened(false)}>Save Changes</Button>
            </DialogFooter>
          </Dialog>
        </DemoArea>
        <CodeBlock
          code={`<Dialog
  opened={opened}
  onClose={() => setOpened(false)}
  title="Edit Profile"
  size="md"
>
  <DialogBody className="px-0">
    <Stack gap="md">
      <Input label="Name" placeholder="Enter your name" />
      <Input label="Email" type="email" placeholder="Enter your email" />
      <Input
        label="Bio"
        placeholder="Tell us about yourself"
        component="textarea"
      />
    </Stack>
  </DialogBody>
  <DialogFooter className="px-0 border-0 pt-2">
    <Button variant="outline" onClick={() => setOpened(false)}>
      Cancel
    </Button>
    <Button onClick={() => setOpened(false)}>Save Changes</Button>
  </DialogFooter>
</Dialog>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="Different dialog sizes for various content"
        />
        <DemoArea>
          <Group gap="sm" wrap="wrap">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <Button
                key={size}
                variant="outline"
                onClick={() => {
                  setCurrentSize(size);
                  setSizeOpened(true);
                }}
              >
                {size.toUpperCase()}
              </Button>
            ))}
          </Group>
          <Dialog
            opened={sizeOpened}
            onClose={() => setSizeOpened(false)}
            title={`Size: ${currentSize.toUpperCase()}`}
            size={currentSize}
          >
            <Text>
              This dialog is using the <strong>{currentSize}</strong> size.
              Dialog sizes help accommodate different amounts of content while
              maintaining a consistent design.
            </Text>
          </Dialog>
        </DemoArea>
        <CodeBlock
          code={`<Dialog size="xs" ... />  {/* max-w-xs */}
<Dialog size="sm" ... />  {/* max-w-sm */}
<Dialog size="md" ... />  {/* max-w-md (default) */}
<Dialog size="lg" ... />  {/* max-w-lg */}
<Dialog size="xl" ... />  {/* max-w-xl */}
<Dialog size="full" ... />  {/* Full screen with padding */}`}
        />
      </Section>

      {/* Customization */}
      <Section id="customization">
        <SectionHeader
          title="Customization"
          subtitle="Customize dialog behavior and appearance"
        />
        <DemoArea>
          <Stack gap="sm">
            <Text size="sm" className="text-muted-foreground">
              Props for customizing dialog behavior:
            </Text>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li><code>closeOnEscape</code> - Close on Escape key (default: true)</li>
              <li><code>closeOnClickOutside</code> - Close on overlay click (default: true)</li>
              <li><code>withCloseButton</code> - Show close button (default: true)</li>
              <li><code>centered</code> - Center vertically (default: true)</li>
              <li><code>withOverlay</code> - Show overlay (default: true)</li>
              <li><code>overlayOpacity</code> - Overlay opacity (default: 0.5)</li>
              <li><code>overlayBlur</code> - Overlay blur in px (default: 0)</li>
            </ul>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Dialog
  opened={opened}
  onClose={onClose}
  title="Custom Dialog"
  closeOnEscape={true}
  closeOnClickOutside={true}
  withCloseButton={true}
  centered={true}
  withOverlay={true}
  overlayOpacity={0.5}
  overlayBlur={2}
  radius="lg"
>
  {/* Dialog content */}
</Dialog>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

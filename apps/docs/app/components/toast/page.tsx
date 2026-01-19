"use client";

import { Button, Toast, Toaster, toast, Stack, Group } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function ToastPage() {
  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "variants", title: "Variants", level: 2 },
    { id: "with-title", title: "With Title", level: 2 },
    { id: "loading", title: "Loading State", level: 2 },
    { id: "positions", title: "Positions", level: 2 },
    { id: "programmatic", title: "Programmatic API", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Toast"
        description="Display brief, non-blocking notifications"
      />

      {/* Toaster containers for all positions */}
      <Toaster position="top-left" />
      <Toaster position="top-center" />
      <Toaster position="top-right" />
      <Toaster position="bottom-left" />
      <Toaster position="bottom-center" />
      <Toaster position="bottom-right" />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Toast component with default styling"
        />
        <DemoArea>
          <Stack gap="md">
            <Toast message="This is a default toast notification" />
            <Button onClick={() => toast.show({ message: "Hello from toast!", position: "top-right" })}>
              Show Toast
            </Button>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`// Add Toaster to your app root
<Toaster position="bottom-right" />

// Then use toast anywhere
<Button onClick={() => toast.show({ message: "Hello!" })}>
  Show Toast
</Button>

// Or use the Toast component directly
<Toast message="This is a toast notification" />`}
        />
      </Section>

      {/* Variants */}
      <Section id="variants">
        <SectionHeader
          title="Variants"
          subtitle="Different toast variants for various contexts"
        />
        <DemoArea>
          <Stack gap="sm">
            <Toast variant="default" message="Default notification" />
            <Toast variant="success" message="Operation completed successfully" />
            <Toast variant="error" message="Something went wrong" />
            <Toast variant="warning" message="Please review before continuing" />
            <Toast variant="info" message="Here's some helpful information" />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Toast variant="default" message="Default notification" />
<Toast variant="success" message="Operation completed successfully" />
<Toast variant="error" message="Something went wrong" />
<Toast variant="warning" message="Please review before continuing" />
<Toast variant="info" message="Here's some helpful information" />

// Using the toast API
toast.success("Saved successfully!")
toast.error("Failed to save")
toast.warning("Are you sure?")
toast.info("Did you know?")`}
        />
      </Section>

      {/* With Title */}
      <Section id="with-title">
        <SectionHeader
          title="With Title"
          subtitle="Toasts with title and message"
        />
        <DemoArea>
          <Stack gap="sm">
            <Toast
              title="File uploaded"
              message="Your file has been uploaded successfully"
              variant="success"
            />
            <Toast
              title="Connection lost"
              message="Please check your internet connection"
              variant="error"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Toast
  title="File uploaded"
  message="Your file has been uploaded successfully"
  variant="success"
/>

// Using the toast API
toast.show({
  title: "File uploaded",
  message: "Your file has been uploaded successfully",
  variant: "success"
})`}
        />
      </Section>

      {/* Loading State */}
      <Section id="loading">
        <SectionHeader
          title="Loading State"
          subtitle="Toast with loading indicator"
        />
        <DemoArea>
          <Stack gap="md">
            <Toast loading message="Uploading files..." />
            <Button
              onClick={() => {
                const id = toast.loading("Processing...", { position: "top-right" });
                setTimeout(() => {
                  toast.update(id, {
                    message: "Completed!",
                    variant: "success",
                    loading: false,
                    autoClose: 3000,
                    withCloseButton: true,
                  });
                }, 2000);
              }}
            >
              Show Loading Toast
            </Button>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`// Show loading toast and update when done
const id = toast.loading("Processing...");

// Later, update the toast
toast.update(id, {
  message: "Completed!",
  variant: "success",
  loading: false,
  autoClose: 3000,
});`}
        />
      </Section>

      {/* Positions */}
      <Section id="positions">
        <SectionHeader
          title="Positions"
          subtitle="Toast container position options"
        />
        <DemoArea>
          <Group gap="sm" wrap="wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Top left!", { autoClose: 2000, position: "top-left" })}
            >
              Top Left
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Top center!", { autoClose: 2000, position: "top-center" })}
            >
              Top Center
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Top right!", { autoClose: 2000, position: "top-right" })}
            >
              Top Right
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Bottom left!", { autoClose: 2000, position: "bottom-left" })}
            >
              Bottom Left
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Bottom center!", { autoClose: 2000, position: "bottom-center" })}
            >
              Bottom Center
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Bottom right!", { autoClose: 2000, position: "bottom-right" })}
            >
              Bottom Right
            </Button>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`// Add Toasters for each position you need
<Toaster position="top-left" />
<Toaster position="top-right" />
<Toaster position="bottom-right" />

// Specify position when showing toast
toast.info("Top left!", { position: "top-left" })
toast.success("Bottom right!", { position: "bottom-right" })`}
        />
      </Section>

      {/* Programmatic API */}
      <Section id="programmatic">
        <SectionHeader
          title="Programmatic API"
          subtitle="Full control over toast notifications"
        />
        <DemoArea>
          <Group gap="sm" wrap="wrap">
            <Button onClick={() => toast.success("Success!", { position: "top-right" })}>Success</Button>
            <Button onClick={() => toast.error("Error!", { position: "top-right" })}>Error</Button>
            <Button onClick={() => toast.warning("Warning!", { position: "top-right" })}>Warning</Button>
            <Button onClick={() => toast.info("Info!", { position: "top-right" })}>Info</Button>
            <Button variant="outline" onClick={() => toast.dismissAll()}>
              Dismiss All
            </Button>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`// Show toasts
toast.show({ message: "Custom toast" })
toast.success("Success message")
toast.error("Error message")
toast.warning("Warning message")
toast.info("Info message")
toast.loading("Loading...")

// Update a toast
const id = toast.show({ message: "Initial" })
toast.update(id, { message: "Updated!" })

// Dismiss toasts
toast.dismiss(id)     // Dismiss specific toast
toast.dismissAll()    // Dismiss all toasts`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

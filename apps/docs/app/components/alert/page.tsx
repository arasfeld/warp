"use client";

import { AlertCircle, CheckCircle, Info, TriangleAlert, X } from "lucide-react";
import { Alert } from "@warp/react";

import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function AlertPage() {
  const tocItems = [
    { id: "variants", title: "Variants", level: 2 },
    { id: "with-icon", title: "With Icon", level: 2 },
    { id: "with-title", title: "With Title", level: 2 },
    { id: "with-close-button", title: "With Close Button", level: 2 },
    { id: "composition", title: "Composition", level: 2 },
    { id: "api", title: "API", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Alert"
        description="Displays important messages with semantic styling and accessibility features."
      />

      {/* Variants */}
      <Section id="variants">
        <SectionHeader
          title="Variants"
          subtitle="Different alert styles for various message types"
        />
        <DemoArea>
          <div className="grid gap-4">
            <Alert variant="default">
              This is a default alert with informational styling.
            </Alert>
            <Alert variant="destructive" title="Error">
              Something went wrong! Please check your input and try again.
            </Alert>
            <Alert variant="warning" title="Warning">
              Please review your settings before proceeding.
            </Alert>
            <Alert variant="info" title="Information">
              Here's some useful information about this feature.
            </Alert>
            <Alert variant="success" title="Success">
              Your changes have been saved successfully.
            </Alert>
          </div>
        </DemoArea>
      </Section>

      {/* With Icon */}
      <Section id="with-icon">
        <SectionHeader
          title="With Icon"
          subtitle="Add contextual icons to enhance visual communication"
        />
        <DemoArea>
          <div className="grid gap-4">
            <Alert variant="destructive" icon={<AlertCircle className="size-4" />}>
              Critical error occurred during operation.
            </Alert>
            <Alert variant="warning" icon={<TriangleAlert className="size-4" />}>
              Please verify your email address.
            </Alert>
            <Alert variant="info" icon={<Info className="size-4" />}>
              New features are available in this update.
            </Alert>
            <Alert variant="success" icon={<CheckCircle className="size-4" />}>
              File uploaded successfully.
            </Alert>
          </div>
        </DemoArea>
      </Section>

      {/* With Title */}
      <Section id="with-title">
        <SectionHeader
          title="With Title"
          subtitle="Use title prop for emphasis"
        />
        <DemoArea>
          <Alert variant="default" title="System Update">
            A new version is available. Please update to get latest features and security improvements.
          </Alert>
          <Alert variant="destructive" title="Authentication Failed">
            Invalid credentials. Please check your username and password.
          </Alert>
        </DemoArea>
      </Section>

      {/* With Close Button */}
      <Section id="with-close-button">
        <SectionHeader
          title="With Close Button"
          subtitle="Allow users to dismiss alerts with onClose callback"
        />
        <DemoArea>
          <div className="grid gap-4">
            <Alert
              variant="default"
              title="Dismissible Alert"
              withCloseButton
              onClose={() => console.log("Alert closed")}
            >
              This alert can be closed by clicking the × button in the top-right corner.
            </Alert>
            <Alert
              variant="default"
              title="Auto-dismiss Notification"
              withCloseButton
              closeButtonLabel="Got it"
              onClose={() => console.log("Notification acknowledged")}
            >
              Settings have been saved. This notification will auto-dismiss in 5 seconds.
            </Alert>
          </div>
        </DemoArea>
      </Section>

      {/* Composition */}
      <Section id="composition">
        <SectionHeader
          title="Composition"
          subtitle="Use title prop for emphasis and children for description"
        />
        <DemoArea>
          <div className="space-y-4">
            <Alert variant="default" title="Custom Layout Example">
              This demonstrates using the title prop for emphasis and children for the main content.
            </Alert>
          </div>
        </DemoArea>
      </Section>

      {/* API */}
      <Section id="api">
        <SectionHeader
          title="API"
          subtitle="Complete reference for Alert component props"
        />
        <DemoArea>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-divider">
                  <th className="text-left p-3 font-medium">Prop</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Default</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-divider">
                  <td className="p-3 font-mono text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">variant</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">AlertVariant</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">"default"</code>
                  </td>
                  <td className="p-3 text-sm text-text-secondary">
                    Default alert style with neutral styling
                  </td>
                </tr>
                <tr className="border-b border-divider">
                  <td className="p-3 font-mono text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">title</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">ReactNode</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">-</code>
                  </td>
                  <td className="p-3 text-sm text-text-secondary">
                    Title displayed prominently above alert content
                  </td>
                </tr>
                <tr className="border-b border-divider">
                  <td className="p-3 font-mono text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">children</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">ReactNode</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">-</code>
                  </td>
                  <td className="p-3 text-sm text-text-secondary">
                    Alert content or description text
                  </td>
                </tr>
                <tr className="border-b border-divider">
                  <td className="p-3 font-mono text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">withCloseButton</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">boolean</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">false</code>
                  </td>
                  <td className="p-3 text-sm text-text-secondary">
                    Show close button in top-right corner
                  </td>
                </tr>
                <tr className="border-b border-divider">
                  <td className="p-3 font-mono text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">onClose</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">() =&gt; void</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">-</code>
                  </td>
                  <td className="p-3 text-sm text-text-secondary">
                    Callback when close button is clicked
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">icon</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">ReactNode</code>
                  </td>
                  <td className="p-3 text-sm">
                    <code className="bg-muted px-1 py-0.5 rounded">-</code>
                  </td>
                  <td className="p-3 text-sm text-text-secondary">
                    Icon displayed next to the title
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DemoArea>
      </Section>
    </ComponentPageLayout>
  );
}
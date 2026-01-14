import { DocsLayout } from "../docs-layout";
import { Input } from "@warp/react";
import { Heading, Text } from "@warp/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@warp/react";

export default function InputPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <Heading level={1}>Input</Heading>
          <Text size="lg" color="muted">
            Text input component with variants, sizes, and validation states
          </Text>
        </div>

        {/* Basic Input */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Input</CardTitle>
            <CardDescription>Simple text input with label</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Email" type="email" placeholder="Enter your email" />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
          </CardContent>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader>
            <CardTitle>Sizes</CardTitle>
            <CardDescription>Different input sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input size="sm" label="Small" placeholder="Small input" />
            <Input size="md" label="Medium" placeholder="Medium input" />
            <Input size="lg" label="Large" placeholder="Large input" />
          </CardContent>
        </Card>

        {/* Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Variants</CardTitle>
            <CardDescription>Different input style variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input variant="default" label="Default" placeholder="Default variant" />
            <Input variant="outline" label="Outline" placeholder="Outline variant" />
            <Input variant="filled" label="Filled" placeholder="Filled variant" />
          </CardContent>
        </Card>

        {/* States */}
        <Card>
          <CardHeader>
            <CardTitle>States</CardTitle>
            <CardDescription>Error and helper text states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="With Helper Text"
              placeholder="Enter value"
              helperText="This is helpful information"
            />
            <Input
              label="With Error"
              placeholder="Enter value"
              error
              errorMessage="This field is required"
            />
            <Input
              label="Disabled"
              placeholder="Cannot type here"
              disabled
            />
          </CardContent>
        </Card>
      </div>
    </DocsLayout>
  );
}

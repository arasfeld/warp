import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@warp/react";
import { Layout } from "@/components/layout";

export default function TextPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <Heading level={1}>Text & Heading</Heading>
          <Text size="lg" color="muted">
            Typography components with size, weight, and color variants
          </Text>
        </div>

        {/* Headings */}
        <Card>
          <CardHeader>
            <CardTitle>Headings</CardTitle>
            <CardDescription>Heading levels 1-6</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Heading level={1}>Heading 1</Heading>
            <Heading level={2}>Heading 2</Heading>
            <Heading level={3}>Heading 3</Heading>
            <Heading level={4}>Heading 4</Heading>
            <Heading level={5}>Heading 5</Heading>
            <Heading level={6}>Heading 6</Heading>
          </CardContent>
        </Card>

        {/* Text Sizes */}
        <Card>
          <CardHeader>
            <CardTitle>Text Sizes</CardTitle>
            <CardDescription>
              Different text sizes from xs to 4xl
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Text size="xs">Extra Small Text</Text>
            <Text size="sm">Small Text</Text>
            <Text size="md">Medium Text (default)</Text>
            <Text size="lg">Large Text</Text>
            <Text size="xl">Extra Large Text</Text>
            <Text size="2xl">2X Large Text</Text>
            <Text size="3xl">3X Large Text</Text>
            <Text size="4xl">4X Large Text</Text>
          </CardContent>
        </Card>

        {/* Text Weights */}
        <Card>
          <CardHeader>
            <CardTitle>Text Weights</CardTitle>
            <CardDescription>Different font weights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Text weight="normal">Normal weight</Text>
            <Text weight="medium">Medium weight</Text>
            <Text weight="semibold">Semibold weight</Text>
            <Text weight="bold">Bold weight</Text>
          </CardContent>
        </Card>

        {/* Text Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Text Colors</CardTitle>
            <CardDescription>Different color variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Text color="default">Default color</Text>
            <Text color="muted">Muted color</Text>
            <Text color="primary">Primary color</Text>
            <Text color="secondary">Secondary color</Text>
            <Text color="error">Error color</Text>
            <Text color="success">Success color</Text>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

import Link from "next/link";
import { DocsLayout } from "./components/docs-layout";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Heading, Text } from "@warp/react";

export default function Home() {
  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <Heading level={1}>Warp UI</Heading>
            <Text size="xl" color="muted">
              Cross-platform UI components for React and React Native with
              shared theming
            </Text>
          </div>

          {/* Quick Links */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  Install and configure Warp UI in your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/setup">
                  <Button>View Setup Guide</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>
                  Browse all available components and their APIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/components/button">
                  <Button variant="outline">View Components</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Component Overview */}
          <div className="space-y-4">
            <Heading level={2}>Components</Heading>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card interactive>
                <CardHeader>
                  <CardTitle>Button</CardTitle>
                  <CardDescription>
                    Interactive button with multiple variants and sizes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/components/button">
                    <Button size="sm">View</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card interactive>
                <CardHeader>
                  <CardTitle>Card</CardTitle>
                  <CardDescription>
                    Container component with header, content, and footer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/components/card">
                    <Button size="sm" variant="outline">View</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card interactive>
                <CardHeader>
                  <CardTitle>Text</CardTitle>
                  <CardDescription>
                    Typography components with size, weight, and color variants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/components/text">
                    <Button size="sm" variant="outline">View</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card interactive>
                <CardHeader>
                  <CardTitle>Input</CardTitle>
                  <CardDescription>
                    Text input with variants, validation, and helper text
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/components/input">
                    <Button size="sm" variant="outline">View</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

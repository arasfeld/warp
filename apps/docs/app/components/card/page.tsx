import { DocsLayout } from "../docs-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from "@warp/react";
import { Heading, Text } from "@warp/react";

export default function CardPage() {
  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <Heading level={1}>Card</Heading>
          <Text size="lg" color="muted">
            Container component with optional header, content, and footer
            sections
          </Text>
        </div>

        {/* Basic Card */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Card</CardTitle>
            <CardDescription>
              A simple card with header, content, and footer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Text>This is the card content area.</Text>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>

        {/* Padded Card */}
        <Card padded>
          <Text>
            This card has padding applied directly to the card container.
          </Text>
        </Card>

        {/* Interactive Card */}
        <Card interactive>
          <CardHeader>
            <CardTitle>Interactive Card</CardTitle>
            <CardDescription>
              Hover over this card to see the interactive effect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Text>This card has interactive hover effects.</Text>
          </CardContent>
        </Card>

        {/* Multiple Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card 1</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>First card in a grid layout</Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card 2</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>Second card in a grid layout</Text>
            </CardContent>
          </Card>
        </div>
      </div>
    </DocsLayout>
  );
}

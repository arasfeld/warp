import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Text,
} from "@warp/react";
import { Layout } from "@/components/layout";
import { TableOfContents } from "@/components/table-of-contents";

// Simple icon components for demo (you can replace with actual icons)
const IconPhoto = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const IconDownload = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function ButtonPage() {
  const tocItems = [
    { id: "variants", title: "Variants", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "full-width", title: "Full Width", level: 2 },
    { id: "left-right-sections", title: "Left and Right Sections", level: 2 },
    { id: "sections-position", title: "Sections Position", level: 2 },
    { id: "radius", title: "Radius", level: 2 },
    { id: "gradient-variant", title: "Gradient Variant", level: 2 },
    { id: "states", title: "States", level: 2 },
    { id: "button-group", title: "Button Group", level: 2 },
    { id: "polymorphic", title: "Polymorphic Component", level: 2 },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 py-8 px-8">
        <div className="space-y-2">
          <Heading level={1}>Button</Heading>
          <Text size="lg" color="muted">
            Button component with Mantine-like API. Supports variants, sizes,
            sections, loading states, and more.
          </Text>
        </div>

        {/* Variants */}
        <Card id="variants">
          <CardHeader>
            <CardTitle>Variants</CardTitle>
            <CardDescription>
              Button component with different style variants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="filled">Filled</Button>
              <Button variant="light">Light</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="default">Default</Button>
              <Button variant="gradient" gradient={{ from: "blue", to: "cyan" }}>
                Gradient
              </Button>
            </div>
            <Text size="sm" color="muted">
              Legacy variants (primary, secondary, outline) are still supported
              for backward compatibility.
            </Text>
          </CardContent>
        </Card>

        {/* Sizes */}
        <Card id="sizes">
          <CardHeader>
            <CardTitle>Sizes</CardTitle>
            <CardDescription>
              Different sizes including compact variants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="compact-xs">Compact XS</Button>
              <Button size="compact-sm">Compact SM</Button>
              <Button size="compact-md">Compact MD</Button>
              <Button size="compact-lg">Compact LG</Button>
              <Button size="compact-xl">Compact XL</Button>
            </div>
          </CardContent>
        </Card>

        {/* Full Width */}
        <Card id="full-width">
          <CardHeader>
            <CardTitle>Full Width</CardTitle>
            <CardDescription>
              Button can take 100% width of its parent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button fullWidth variant="filled">
              Full Width Button
            </Button>
          </CardContent>
        </Card>

        {/* Left and Right Sections */}
        <Card id="left-right-sections">
          <CardHeader>
            <CardTitle>Left and Right Sections</CardTitle>
            <CardDescription>
              Add icons or content to the left and right sides of the button
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button leftSection={<IconPhoto size={14} />} variant="default">
                Gallery
              </Button>
              <Button rightSection={<IconDownload size={14} />}>
                Download
              </Button>
              <Button
                variant="light"
                leftSection={<IconPhoto size={14} />}
                rightSection={<IconArrowRight size={14} />}
              >
                Visit gallery
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sections Position */}
        <Card id="sections-position">
          <CardHeader>
            <CardTitle>Sections Position</CardTitle>
            <CardDescription>
              Use justify prop to control section alignment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              justify="space-between"
              fullWidth
              leftSection={<IconPhoto size={14} />}
              rightSection={<IconArrowRight size={14} />}
              variant="default"
            >
              Button label
            </Button>
          </CardContent>
        </Card>

        {/* Radius */}
        <Card id="radius">
          <CardHeader>
            <CardTitle>Radius</CardTitle>
            <CardDescription>Customize border radius</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button radius="xs">XS Radius</Button>
              <Button radius="sm">SM Radius</Button>
              <Button radius="md">MD Radius</Button>
              <Button radius="lg">LG Radius</Button>
              <Button radius="xl">XL Radius</Button>
              <Button radius="full">Full Radius</Button>
            </div>
          </CardContent>
        </Card>

        {/* Gradient Variant */}
        <Card id="gradient-variant">
          <CardHeader>
            <CardTitle>Gradient Variant</CardTitle>
            <CardDescription>
              Gradient buttons with customizable gradient configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
              >
                Gradient 90deg
              </Button>
              <Button
                variant="gradient"
                gradient={{ from: "purple", to: "pink", deg: 45 }}
              >
                Gradient 45deg
              </Button>
              <Button
                variant="gradient"
                gradient={{ from: "orange", to: "red", deg: 180 }}
              >
                Gradient 180deg
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* States */}
        <Card id="states">
          <CardHeader>
            <CardTitle>States</CardTitle>
            <CardDescription>Disabled and loading states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
              <Button loading loaderProps={{ type: "dots" }}>
                Loading (dots)
              </Button>
              <Button loading loaderProps={{ type: "bars" }}>
                Loading (bars)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Button Group */}
        <Card id="button-group">
          <CardHeader>
            <CardTitle>Button Group</CardTitle>
            <CardDescription>
              Group buttons together with connected borders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button.Group>
              <Button variant="default">First</Button>
              <Button variant="default">Second</Button>
              <Button variant="default">Third</Button>
            </Button.Group>
            <div className="mt-4">
              <Button.Group orientation="vertical">
                <Button variant="default">First</Button>
                <Button variant="default">Second</Button>
                <Button variant="default">Third</Button>
              </Button.Group>
            </div>
          </CardContent>
        </Card>

        {/* Polymorphic Component */}
        <Card id="polymorphic">
          <CardHeader>
            <CardTitle>Polymorphic Component</CardTitle>
            <CardDescription>
              Button can be rendered as different elements using component prop
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button component="a" href="#">
                Link Button
              </Button>
              <Button component="div" role="button" tabIndex={0}>
                Div Button
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <TableOfContents items={tocItems} />
    </Layout>
  );
}

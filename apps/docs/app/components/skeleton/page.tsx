"use client";

import { useState } from "react";
import {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Stack,
  Group,
  Text,
  Card,
  Button,
} from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function SkeletonPage() {
  const [loading, setLoading] = useState(true);

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "shapes", title: "Shapes", level: 2 },
    { id: "text", title: "Text Lines", level: 2 },
    { id: "animation", title: "Animation", level: 2 },
    { id: "content", title: "With Content", level: 2 },
    { id: "card-example", title: "Card Example", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Skeleton"
        description="Display placeholder content while loading"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic skeleton placeholder"
        />
        <DemoArea>
          <Stack gap="sm" className="w-full max-w-md">
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="80%" />
            <Skeleton height={20} width="60%" />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Skeleton height={20} width="100%" />
<Skeleton height={20} width="80%" />
<Skeleton height={20} width="60%" />`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="Different skeleton dimensions"
        />
        <DemoArea>
          <Stack gap="md">
            <Skeleton height={10} width={100} />
            <Skeleton height={20} width={150} />
            <Skeleton height={30} width={200} />
            <Skeleton height={40} width={250} />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Skeleton height={10} width={100} />
<Skeleton height={20} width={150} />
<Skeleton height={30} width={200} />
<Skeleton height={40} width={250} />`}
        />
      </Section>

      {/* Shapes */}
      <Section id="shapes">
        <SectionHeader
          title="Shapes"
          subtitle="Rectangle and circle skeletons"
        />
        <DemoArea>
          <Group gap="lg" align="center">
            <Stack gap="sm" align="center">
              <Skeleton height={100} width={100} radius="md" />
              <Text size="sm" className="text-muted-foreground">Rectangle</Text>
            </Stack>
            <Stack gap="sm" align="center">
              <Skeleton height={100} width={100} radius="xl" />
              <Text size="sm" className="text-muted-foreground">Rounded</Text>
            </Stack>
            <Stack gap="sm" align="center">
              <SkeletonCircle size={100} />
              <Text size="sm" className="text-muted-foreground">Circle</Text>
            </Stack>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`{/* Rectangle with radius */}
<Skeleton height={100} width={100} radius="md" />

{/* More rounded */}
<Skeleton height={100} width={100} radius="xl" />

{/* Circle - use SkeletonCircle helper */}
<SkeletonCircle size={100} />`}
        />
      </Section>

      {/* Text Lines */}
      <Section id="text">
        <SectionHeader
          title="Text Lines"
          subtitle="Skeleton for text content"
        />
        <DemoArea>
          <Stack gap="lg">
            <div className="w-full max-w-md">
              <Text size="sm" className="mb-2 text-muted-foreground">
                Default (3 lines)
              </Text>
              <SkeletonText />
            </div>
            <div className="w-full max-w-md">
              <Text size="sm" className="mb-2 text-muted-foreground">
                5 lines with custom height
              </Text>
              <SkeletonText lines={5} lineHeight={12} gap={6} />
            </div>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`{/* Default text skeleton */}
<SkeletonText />

{/* Custom lines */}
<SkeletonText lines={5} lineHeight={12} gap={6} />

{/* Full width last line */}
<SkeletonText lines={4} lastLineWidth="100%" />`}
        />
      </Section>

      {/* Animation */}
      <Section id="animation">
        <SectionHeader
          title="Animation"
          subtitle="Skeleton animation styles"
        />
        <DemoArea>
          <Stack gap="lg">
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Pulse (default)
              </Text>
              <Skeleton height={40} width={200} animate="pulse" />
            </div>
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                No animation
              </Text>
              <Skeleton height={40} width={200} animate={false} />
            </div>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`{/* Pulse animation (default) */}
<Skeleton height={40} width={200} animate="pulse" />

{/* No animation */}
<Skeleton height={40} width={200} animate={false} />`}
        />
      </Section>

      {/* With Content */}
      <Section id="content">
        <SectionHeader
          title="With Content"
          subtitle="Toggle between skeleton and content"
        />
        <DemoArea>
          <Stack gap="md">
            <Button onClick={() => setLoading(!loading)}>
              Toggle Loading: {loading ? "On" : "Off"}
            </Button>
            <Group gap="md" align="center">
              <Skeleton visible={loading} circle width={50} height={50}>
                <div className="w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  JD
                </div>
              </Skeleton>
              <div className="flex-1">
                <Skeleton visible={loading} height={20} width={150}>
                  <Text weight="bold">John Doe</Text>
                </Skeleton>
                <Skeleton visible={loading} height={16} width={200} className="mt-1">
                  <Text size="sm" className="text-muted-foreground">
                    Software Engineer
                  </Text>
                </Skeleton>
              </div>
            </Group>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`const [loading, setLoading] = useState(true);

<Skeleton visible={loading} circle width={50} height={50}>
  <Avatar>JD</Avatar>
</Skeleton>

<Skeleton visible={loading} height={20} width={150}>
  <Text weight="bold">John Doe</Text>
</Skeleton>`}
        />
      </Section>

      {/* Card Example */}
      <Section id="card-example">
        <SectionHeader
          title="Card Example"
          subtitle="Complete card skeleton layout"
        />
        <DemoArea>
          <div className="max-w-sm">
            <Card padding="lg">
              <Group gap="md" align="start">
                <SkeletonCircle size={48} />
                <div className="flex-1">
                  <Skeleton height={18} width={120} className="mb-2" />
                  <Skeleton height={14} width={80} />
                </div>
              </Group>
              <div className="mt-4">
                <SkeletonText lines={3} lineHeight={14} />
              </div>
              <Group gap="sm" className="mt-4">
                <Skeleton height={36} width={80} radius="md" />
                <Skeleton height={36} width={80} radius="md" />
              </Group>
            </Card>
          </div>
        </DemoArea>
        <CodeBlock
          code={`<Card padding="lg">
  <Group gap="md" align="start">
    <SkeletonCircle size={48} />
    <div className="flex-1">
      <Skeleton height={18} width={120} className="mb-2" />
      <Skeleton height={14} width={80} />
    </div>
  </Group>
  <div className="mt-4">
    <SkeletonText lines={3} lineHeight={14} />
  </div>
  <Group gap="sm" className="mt-4">
    <Skeleton height={36} width={80} radius="md" />
    <Skeleton height={36} width={80} radius="md" />
  </Group>
</Card>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

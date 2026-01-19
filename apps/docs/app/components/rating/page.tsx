"use client";

import { useState } from "react";
import { Rating, Stack, Text, Group } from "@warp/react";
import { Heart, ThumbsUp } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function RatingPage() {
  const [value, setValue] = useState(3);

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "controlled", title: "Controlled", level: 2 },
    { id: "fractions", title: "Fractions", level: 2 },
    { id: "count", title: "Symbol Count", level: 2 },
    { id: "custom-symbols", title: "Custom Symbols", level: 2 },
    { id: "read-only", title: "Read Only", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
    { id: "colors", title: "Colors", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Rating"
        description="Capture user feedback with star ratings"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic rating input with stars"
        />
        <DemoArea>
          <Rating defaultValue={3} />
        </DemoArea>
        <CodeBlock
          code={`<Rating defaultValue={3} />`}
        />
      </Section>

      {/* Controlled */}
      <Section id="controlled">
        <SectionHeader
          title="Controlled"
          subtitle="Control the rating value programmatically"
        />
        <DemoArea>
          <Stack gap="md" align="flex-start">
            <Rating value={value} onChange={setValue} />
            <Text size="sm" c="dimmed">Rating: {value} / 5</Text>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`const [value, setValue] = useState(3);

<Rating value={value} onChange={setValue} />
<Text size="sm" c="dimmed">Rating: {value} / 5</Text>`}
        />
      </Section>

      {/* Fractions */}
      <Section id="fractions">
        <SectionHeader
          title="Fractions"
          subtitle="Allow fractional ratings (half stars, etc.)"
        />
        <DemoArea>
          <Stack gap="md" align="flex-start">
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Fractions: 2 (half stars)</Text>
              <Rating defaultValue={2.5} fractions={2} />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Fractions: 4 (quarter stars)</Text>
              <Rating defaultValue={3.25} fractions={4} />
            </Stack>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Rating defaultValue={2.5} fractions={2} />
<Rating defaultValue={3.25} fractions={4} />`}
        />
      </Section>

      {/* Count */}
      <Section id="count">
        <SectionHeader
          title="Symbol Count"
          subtitle="Change the number of symbols"
        />
        <DemoArea>
          <Stack gap="md" align="flex-start">
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>3 stars</Text>
              <Rating defaultValue={2} count={3} />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>10 stars</Text>
              <Rating defaultValue={7} count={10} />
            </Stack>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Rating defaultValue={2} count={3} />
<Rating defaultValue={7} count={10} />`}
        />
      </Section>

      {/* Custom Symbols */}
      <Section id="custom-symbols">
        <SectionHeader
          title="Custom Symbols"
          subtitle="Use custom icons instead of stars"
        />
        <DemoArea>
          <Stack gap="md" align="flex-start">
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Hearts</Text>
              <Rating
                defaultValue={3}
                emptySymbol={<Heart className="w-6 h-6" />}
                fullSymbol={<Heart className="w-6 h-6 fill-current" />}
              />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Thumbs up</Text>
              <Rating
                defaultValue={4}
                emptySymbol={<ThumbsUp className="w-6 h-6" />}
                fullSymbol={<ThumbsUp className="w-6 h-6 fill-current" />}
              />
            </Stack>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`import { Heart, ThumbsUp } from "lucide-react";

<Rating
  defaultValue={3}
  emptySymbol={<Heart className="w-6 h-6" />}
  fullSymbol={<Heart className="w-6 h-6 fill-current" />}
/>

<Rating
  defaultValue={4}
  emptySymbol={<ThumbsUp className="w-6 h-6" />}
  fullSymbol={<ThumbsUp className="w-6 h-6 fill-current" />}
/>`}
        />
      </Section>

      {/* Read Only */}
      <Section id="read-only">
        <SectionHeader
          title="Read Only"
          subtitle="Display rating without interaction"
        />
        <DemoArea>
          <Group gap="lg">
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>4.5 stars</Text>
              <Rating value={4.5} fractions={2} readOnly />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>3 stars</Text>
              <Rating value={3} readOnly />
            </Stack>
          </Group>
        </DemoArea>
        <CodeBlock
          code={`<Rating value={4.5} fractions={2} readOnly />
<Rating value={3} readOnly />`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="Rating supports multiple sizes"
        />
        <DemoArea>
          <Stack gap="md" align="flex-start">
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Extra small</Text>
              <Rating size="xs" defaultValue={3} />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Small</Text>
              <Rating size="sm" defaultValue={3} />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Medium (default)</Text>
              <Rating size="md" defaultValue={3} />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Large</Text>
              <Rating size="lg" defaultValue={3} />
            </Stack>
            <Stack gap="xs" align="flex-start">
              <Text size="sm" fw={500}>Extra large</Text>
              <Rating size="xl" defaultValue={3} />
            </Stack>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Rating size="xs" defaultValue={3} />
<Rating size="sm" defaultValue={3} />
<Rating size="md" defaultValue={3} />
<Rating size="lg" defaultValue={3} />
<Rating size="xl" defaultValue={3} />`}
        />
      </Section>

      {/* Colors */}
      <Section id="colors">
        <SectionHeader
          title="Colors"
          subtitle="Customize the rating color"
        />
        <DemoArea>
          <Stack gap="md" align="flex-start">
            <Rating color="primary" defaultValue={4} />
            <Rating color="secondary" defaultValue={4} />
            <Rating color="success" defaultValue={4} />
            <Rating color="warning" defaultValue={4} />
            <Rating color="error" defaultValue={4} />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<Rating color="primary" defaultValue={4} />
<Rating color="secondary" defaultValue={4} />
<Rating color="success" defaultValue={4} />
<Rating color="warning" defaultValue={4} />
<Rating color="error" defaultValue={4} />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

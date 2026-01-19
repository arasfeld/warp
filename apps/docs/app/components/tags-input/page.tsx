"use client";

import { useState } from "react";
import { TagsInput, Stack, Text } from "@warp/react";
import { Tag } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function TagsInputPage() {
  const [tags, setTags] = useState<string[]>(["React", "TypeScript"]);

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "controlled", title: "Controlled", level: 2 },
    { id: "split-chars", title: "Split Characters", level: 2 },
    { id: "max-tags", title: "Max Tags", level: 2 },
    { id: "allow-duplicates", title: "Allow Duplicates", level: 2 },
    { id: "clearable", title: "Clearable", level: 2 },
    { id: "with-icon", title: "With Icon", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="TagsInput"
        description="Capture multiple tags with keyboard input"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic tags input for entering multiple values"
        />
        <DemoArea>
          <TagsInput
            label="Technologies"
            placeholder="Add a tag..."
            defaultValue={["React", "Next.js"]}
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`<TagsInput
  label="Technologies"
  placeholder="Add a tag..."
  defaultValue={["React", "Next.js"]}
/>`}
        />
      </Section>

      {/* Controlled */}
      <Section id="controlled">
        <SectionHeader
          title="Controlled"
          subtitle="Control the tags value programmatically"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <TagsInput
              label="Tags"
              placeholder="Add a tag..."
              value={tags}
              onChange={setTags}
            />
            <Text size="sm" c="dimmed">
              Tags: {tags.join(", ") || "None"}
            </Text>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`const [tags, setTags] = useState<string[]>(["React", "TypeScript"]);

<TagsInput
  label="Tags"
  placeholder="Add a tag..."
  value={tags}
  onChange={setTags}
/>
<Text size="sm" c="dimmed">
  Tags: {tags.join(", ") || "None"}
</Text>`}
        />
      </Section>

      {/* Split Characters */}
      <Section id="split-chars">
        <SectionHeader
          title="Split Characters"
          subtitle="Define characters that trigger tag creation"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <TagsInput
              label="Emails (comma or space separated)"
              placeholder="Enter emails..."
              splitChars={[",", " "]}
              description="Type emails separated by commas or spaces"
            />
            <TagsInput
              label="Semicolon separated"
              placeholder="Enter values..."
              splitChars={[";"]}
              description="Values are separated by semicolons"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<TagsInput
  label="Emails (comma or space separated)"
  placeholder="Enter emails..."
  splitChars={[",", " "]}
  description="Type emails separated by commas or spaces"
/>

<TagsInput
  label="Semicolon separated"
  placeholder="Enter values..."
  splitChars={[";"]}
  description="Values are separated by semicolons"
/>`}
        />
      </Section>

      {/* Max Tags */}
      <Section id="max-tags">
        <SectionHeader
          title="Max Tags"
          subtitle="Limit the number of tags"
        />
        <DemoArea>
          <TagsInput
            label="Skills (max 3)"
            placeholder="Add up to 3 skills..."
            maxTags={3}
            description="You can add up to 3 skills"
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`<TagsInput
  label="Skills (max 3)"
  placeholder="Add up to 3 skills..."
  maxTags={3}
  description="You can add up to 3 skills"
/>`}
        />
      </Section>

      {/* Allow Duplicates */}
      <Section id="allow-duplicates">
        <SectionHeader
          title="Allow Duplicates"
          subtitle="Control whether duplicate tags are allowed"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <TagsInput
              label="No duplicates (default)"
              placeholder="Add tags..."
              description="Duplicate tags are prevented"
            />
            <TagsInput
              label="Allow duplicates"
              placeholder="Add tags..."
              allowDuplicates
              description="Same tag can be added multiple times"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`{/* Duplicates prevented by default */}
<TagsInput
  label="No duplicates (default)"
  placeholder="Add tags..."
/>

{/* Allow duplicates */}
<TagsInput
  label="Allow duplicates"
  placeholder="Add tags..."
  allowDuplicates
/>`}
        />
      </Section>

      {/* Clearable */}
      <Section id="clearable">
        <SectionHeader
          title="Clearable"
          subtitle="Show a clear all button"
        />
        <DemoArea>
          <TagsInput
            label="Tags"
            placeholder="Add tags..."
            defaultValue={["Tag 1", "Tag 2", "Tag 3"]}
            clearable
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`<TagsInput
  label="Tags"
  placeholder="Add tags..."
  defaultValue={["Tag 1", "Tag 2", "Tag 3"]}
  clearable
/>`}
        />
      </Section>

      {/* With Icon */}
      <Section id="with-icon">
        <SectionHeader
          title="With Icon"
          subtitle="Add an icon to the tags input"
        />
        <DemoArea>
          <TagsInput
            label="Tags"
            placeholder="Add tags..."
            leftSection={<Tag className="h-4 w-4 text-muted-foreground" />}
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`import { Tag } from "lucide-react";

<TagsInput
  label="Tags"
  placeholder="Add tags..."
  leftSection={<Tag className="h-4 w-4" />}
/>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="TagsInput supports multiple sizes"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <TagsInput size="xs" label="Extra small" placeholder="xs size" />
            <TagsInput size="sm" label="Small" placeholder="sm size" />
            <TagsInput size="md" label="Medium" placeholder="md size" />
            <TagsInput size="lg" label="Large" placeholder="lg size" />
            <TagsInput size="xl" label="Extra large" placeholder="xl size" />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<TagsInput size="xs" label="Extra small" placeholder="xs size" />
<TagsInput size="sm" label="Small" placeholder="sm size" />
<TagsInput size="md" label="Medium" placeholder="md size" />
<TagsInput size="lg" label="Large" placeholder="lg size" />
<TagsInput size="xl" label="Extra large" placeholder="xl size" />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

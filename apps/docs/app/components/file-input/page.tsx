"use client";

import { useState } from "react";
import { FileInput, Stack, Text } from "@warp/react";
import { Upload, Image, FileText } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function FileInputPage() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "controlled", title: "Controlled", level: 2 },
    { id: "multiple", title: "Multiple Files", level: 2 },
    { id: "accept", title: "Accept Types", level: 2 },
    { id: "with-icon", title: "With Icon", level: 2 },
    { id: "clearable", title: "Clearable", level: 2 },
    { id: "custom-value", title: "Custom Value Display", level: 2 },
    { id: "sizes", title: "Sizes", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="FileInput"
        description="Capture files from user"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic file input for selecting files"
        />
        <DemoArea>
          <FileInput
            label="Upload file"
            placeholder="Click to select file"
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`<FileInput
  label="Upload file"
  placeholder="Click to select file"
/>`}
        />
      </Section>

      {/* Controlled */}
      <Section id="controlled">
        <SectionHeader
          title="Controlled"
          subtitle="Control the file value programmatically"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <FileInput
              label="Upload file"
              placeholder="Select a file"
              value={file}
              onChange={(v) => setFile(v as File | null)}
            />
            <Text size="sm" c="dimmed">
              Selected: {file ? file.name : "No file selected"}
            </Text>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`const [file, setFile] = useState<File | null>(null);

<FileInput
  label="Upload file"
  placeholder="Select a file"
  value={file}
  onChange={setFile}
/>
<Text size="sm" c="dimmed">
  Selected: {file ? file.name : "No file selected"}
</Text>`}
        />
      </Section>

      {/* Multiple */}
      <Section id="multiple">
        <SectionHeader
          title="Multiple Files"
          subtitle="Allow selecting multiple files"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <FileInput
              label="Upload files"
              placeholder="Select files"
              multiple
              value={files}
              onChange={(v) => setFiles((v as File[]) ?? [])}
            />
            <Text size="sm" c="dimmed">
              Selected: {files.length} file(s)
            </Text>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`const [files, setFiles] = useState<File[]>([]);

<FileInput
  label="Upload files"
  placeholder="Select files"
  multiple
  value={files}
  onChange={setFiles}
/>
<Text size="sm" c="dimmed">
  Selected: {files.length} file(s)
</Text>`}
        />
      </Section>

      {/* Accept */}
      <Section id="accept">
        <SectionHeader
          title="Accept Types"
          subtitle="Restrict file types that can be selected"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <FileInput
              label="Upload image"
              placeholder="Select an image"
              accept="image/*"
              description="Only image files are allowed"
            />
            <FileInput
              label="Upload document"
              placeholder="Select a document"
              accept=".pdf,.doc,.docx"
              description="PDF and Word documents only"
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<FileInput
  label="Upload image"
  placeholder="Select an image"
  accept="image/*"
  description="Only image files are allowed"
/>

<FileInput
  label="Upload document"
  placeholder="Select a document"
  accept=".pdf,.doc,.docx"
  description="PDF and Word documents only"
/>`}
        />
      </Section>

      {/* With Icon */}
      <Section id="with-icon">
        <SectionHeader
          title="With Icon"
          subtitle="Add icons to the file input"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <FileInput
              label="Upload file"
              placeholder="Select file"
              leftSection={<Upload className="h-4 w-4 text-muted-foreground" />}
            />
            <FileInput
              label="Upload image"
              placeholder="Select image"
              accept="image/*"
              leftSection={<Image className="h-4 w-4 text-muted-foreground" />}
            />
            <FileInput
              label="Upload document"
              placeholder="Select document"
              accept=".pdf,.doc,.docx"
              leftSection={<FileText className="h-4 w-4 text-muted-foreground" />}
            />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`import { Upload, Image, FileText } from "lucide-react";

<FileInput
  label="Upload file"
  placeholder="Select file"
  leftSection={<Upload className="h-4 w-4" />}
/>

<FileInput
  label="Upload image"
  placeholder="Select image"
  accept="image/*"
  leftSection={<Image className="h-4 w-4" />}
/>`}
        />
      </Section>

      {/* Clearable */}
      <Section id="clearable">
        <SectionHeader
          title="Clearable"
          subtitle="Show a clear button when a file is selected"
        />
        <DemoArea>
          <FileInput
            label="Upload file"
            placeholder="Select file"
            clearable
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`<FileInput
  label="Upload file"
  placeholder="Select file"
  clearable
/>`}
        />
      </Section>

      {/* Custom Value Display */}
      <Section id="custom-value">
        <SectionHeader
          title="Custom Value Display"
          subtitle="Customize how selected files are displayed"
        />
        <DemoArea>
          <FileInput
            label="Upload files"
            placeholder="Select files"
            multiple
            clearable
            valueComponent={({ value }) => {
              if (!value) return null;
              const fileList = Array.isArray(value) ? value : [value];
              return (
                <span className="text-sm">
                  {fileList.length} file(s) - {Math.round(fileList.reduce((acc, f) => acc + f.size, 0) / 1024)} KB
                </span>
              );
            }}
            className="max-w-sm"
          />
        </DemoArea>
        <CodeBlock
          code={`<FileInput
  label="Upload files"
  placeholder="Select files"
  multiple
  clearable
  valueComponent={({ value }) => {
    if (!value) return null;
    const fileList = Array.isArray(value) ? value : [value];
    return (
      <span className="text-sm">
        {fileList.length} file(s) - {Math.round(
          fileList.reduce((acc, f) => acc + f.size, 0) / 1024
        )} KB
      </span>
    );
  }}
/>`}
        />
      </Section>

      {/* Sizes */}
      <Section id="sizes">
        <SectionHeader
          title="Sizes"
          subtitle="FileInput supports multiple sizes"
        />
        <DemoArea>
          <Stack gap="md" className="w-full max-w-sm">
            <FileInput size="xs" label="Extra small" placeholder="xs size" />
            <FileInput size="sm" label="Small" placeholder="sm size" />
            <FileInput size="md" label="Medium" placeholder="md size" />
            <FileInput size="lg" label="Large" placeholder="lg size" />
            <FileInput size="xl" label="Extra large" placeholder="xl size" />
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`<FileInput size="xs" label="Extra small" placeholder="xs size" />
<FileInput size="sm" label="Small" placeholder="sm size" />
<FileInput size="md" label="Medium" placeholder="md size" />
<FileInput size="lg" label="Large" placeholder="lg size" />
<FileInput size="xl" label="Extra large" placeholder="xl size" />`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

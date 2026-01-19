"use client";

import { useMemo, useState } from "react";
import { Button, Card, Input, Select } from "@warp/react";

import { AnimatedBackground } from "@/components/animated-background";
import { Layout } from "@/components/layout";
import {
  ComponentCard,
  FilterTags,
  PageHeader,
  SearchBox,
} from "@/components/ui";

interface Component {
  title: string;
  description: string;
  category: string;
  demo: React.ReactNode;
  code: string;
}

const components: Component[] = [
  {
    title: "Button",
    description: "Interactive buttons with multiple variants and states",
    category: "buttons",
    demo: (
      <>
        <Button
          variant="filled"
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.4)]"
        >
          Primary
        </Button>
        <Button
          variant="light"
          className="bg-primary/10 text-primary hover:bg-primary/20"
        >
          Secondary
        </Button>
        <Button
          variant="outline"
          className="border-2 border-divider hover:border-purple-500 hover:text-primary"
        >
          Outline
        </Button>
      </>
    ),
    code: `import { Button } from '@warp/react';

<Button variant="filled">Primary</Button>
<Button variant="light">Secondary</Button>
<Button variant="outline">Outline</Button>`,
  },
  {
    title: "Card",
    description: "Container with header, content, and footer sections",
    category: "feedback",
    demo: (
      <Card
        className="max-w-[300px] bg-background-paper dark:bg-[#1e1e2e] border border-divider dark:border-white/8 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500 hover:shadow-[0_15px_40px_rgba(168,85,247,0.2)]"
        withBorder
      >
        <h3 className="text-2xl mb-3 font-bold text-foreground">Card Title</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          This is a card component with a gradient border effect on hover.
        </p>
        <Button variant="filled" size="sm">
          Learn More
        </Button>
      </Card>
    ),
    code: `import { Card, Button } from '@warp/react';

<Card>
  <Card.Section>
    <h3>Card Title</h3>
    <p>This is a card component...</p>
    <Button>Learn More</Button>
  </Card.Section>
</Card>`,
  },
  {
    title: "Input",
    description: "Text input with validation and helper text support",
    category: "inputs",
    demo: (
      <>
        <Input
          placeholder="Enter your email..."
          variant="filled"
          className="max-w-[350px] bg-white/5 dark:bg-white/5 border-white/10 focus:border-purple-500"
        />
        <Input
          type="password"
          placeholder="Enter password..."
          variant="filled"
          className="max-w-[350px] bg-white/5 dark:bg-white/5 border-white/10 focus:border-purple-500"
        />
      </>
    ),
    code: `import { Input } from '@warp/react';

<Input placeholder="Enter your email..." type="email" />
<Input placeholder="Enter password..." type="password" />`,
  },
  {
    title: "Select",
    description: "Dropdown select with search, multiple selection, and keyboard navigation",
    category: "inputs",
    demo: (
      <>
        <Select
          data={[
            { value: "react", label: "React" },
            { value: "vue", label: "Vue.js" },
            { value: "angular", label: "Angular" },
          ]}
          placeholder="Select framework..."
          variant="filled"
          className="max-w-[350px]"
          searchable
          clearable
        />
        <Select
          data={[
            { value: "react", label: "React" },
            { value: "vue", label: "Vue.js" },
            { value: "angular", label: "Angular" },
          ]}
          placeholder="Select multiple..."
          variant="filled"
          className="max-w-[350px]"
          multiple
        />
      </>
    ),
    code: `import { Select } from '@warp/react';

<Select
  data={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
  ]}
  placeholder="Select framework..."
  searchable
  clearable
/>

<Select
  data={data}
  placeholder="Select multiple..."
  multiple
/>`,
  },
  {
    title: "Text",
    description: "Typography component with size and weight variants",
    category: "feedback",
    demo: (
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Heading 1</h1>
        <h2 className="text-3xl font-semibold text-foreground">Heading 2</h2>
        <p className="text-base text-foreground">Regular paragraph text</p>
        <p className="text-sm text-muted-foreground">Small muted text</p>
      </div>
    ),
    code: `import { Text, Heading } from '@warp/react';

<Heading level={1}>Heading 1</Heading>
<Heading level={2}>Heading 2</Heading>
<Text>Regular paragraph text</Text>
<Text size="sm" color="muted">Small muted text</Text>`,
  },
];

const filterTags = [
  { id: "all", label: "All" },
  { id: "inputs", label: "Inputs" },
  { id: "buttons", label: "Buttons" },
  { id: "feedback", label: "Feedback" },
];

export default function ComponentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredComponents = useMemo(() => {
    return components.filter((component) => {
      const matchesSearch =
        searchTerm === "" ||
        component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "all" || component.category === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  return (
    <>
      <AnimatedBackground />
      <Layout showSidebar={false}>
        <main className="relative z-10 pt-32 max-w-7xl mx-auto px-4 md:px-16 pb-24">
          <PageHeader
            title="Components"
            description="Beautiful, accessible components built for React and React Native. Copy the code and customize to your needs."
          />

          <div className="flex flex-col md:flex-row gap-6 mb-16 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.4s_both]">
            <SearchBox
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search components..."
              className="w-full md:flex-1 md:min-w-[300px]"
            />
            <FilterTags
              tags={filterTags}
              activeTag={activeFilter}
              onTagClick={setActiveFilter}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredComponents.map((component, index) => (
              <ComponentCard
                key={component.title}
                title={component.title}
                description={component.description}
                category={component.category}
                demo={component.demo}
                code={component.code}
                animationDelay={`${(index + 1) * 0.1}s`}
              />
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No components found matching your search.
              </p>
            </div>
          )}
        </main>
      </Layout>
    </>
  );
}

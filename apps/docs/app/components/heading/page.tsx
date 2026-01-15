import { Heading } from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

export default function HeadingPage() {
  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "size", title: "Size", level: 2 },
    { id: "text-wrap", title: "Text Wrap", level: 2 },
    { id: "line-clamp", title: "Line Clamp", level: 2 },
    { id: "font-weight", title: "Font Weight", level: 2 },
    { id: "colors", title: "Colors", level: 2 },
    { id: "gradient", title: "Gradient Variant", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Heading"
        description="h1-h6 heading component with comprehensive typography controls"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Set order prop to render a specific element (h1-h6), default order is 1"
        />
        <DemoArea className="flex-col items-start">
          <Heading order={1}>This is h1 title</Heading>
          <Heading order={2}>This is h2 title</Heading>
          <Heading order={3}>This is h3 title</Heading>
          <Heading order={4}>This is h4 title</Heading>
          <Heading order={5}>This is h5 title</Heading>
          <Heading order={6}>This is h6 title</Heading>
        </DemoArea>
        <CodeBlock
          code={`<Heading order={1}>This is h1 title</Heading>
<Heading order={2}>This is h2 title</Heading>
<Heading order={3}>This is h3 title</Heading>
<Heading order={4}>This is h4 title</Heading>
<Heading order={5}>This is h5 title</Heading>
<Heading order={6}>This is h6 title</Heading>`}
        />
      </Section>

      {/* Size */}
      <Section id="size">
        <SectionHeader
          title="Size"
          subtitle="You can change Heading size independent of its order"
        />
        <DemoArea className="flex-col items-start">
          <Heading order={3} size="h1">
            H3 heading with h1 font-size
          </Heading>
          <Heading size="h4">H1 heading with h4 font-size</Heading>
          <Heading size={16}>H1 heading with 16px size</Heading>
          <Heading size="xs">H1 heading with xs size</Heading>
        </DemoArea>
        <CodeBlock
          code={`<Heading order={3} size="h1">
  H3 heading with h1 font-size
</Heading>
<Heading size="h4">H1 heading with h4 font-size</Heading>
<Heading size={16}>H1 heading with 16px size</Heading>
<Heading size="xs">H1 heading with xs size</Heading>`}
        />
      </Section>

      {/* Text Wrap */}
      <Section id="text-wrap">
        <SectionHeader
          title="Text Wrap"
          subtitle="Use textWrap prop to control text-wrap CSS property"
        />
        <DemoArea className="flex-col items-start max-w-md">
          <Heading order={3} textWrap="wrap">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
            voluptatibus inventore iusto cum dolore molestiae perspiciatis!
            Totam repudiandae impedit maxime!
          </Heading>
        </DemoArea>
        <CodeBlock
          code={`<Heading order={3} textWrap="wrap">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
  voluptatibus inventore iusto cum dolore molestiae perspiciatis! Totam
  repudiandae impedit maxime!
</Heading>`}
        />
      </Section>

      {/* Line Clamp */}
      <Section id="line-clamp">
        <SectionHeader
          title="Line Clamp"
          subtitle="Set lineClamp prop to truncate text after specified number of lines"
        />
        <DemoArea className="flex-col items-start max-w-md">
          <Heading order={2} lineClamp={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            doloremque quas dolorum. Quo amet earum alias consequuntur quam
            accusamus a quae beatae, odio, quod provident consectetur non
            repudiandae enim adipisci?
          </Heading>
        </DemoArea>
        <CodeBlock
          code={`<Heading order={2} lineClamp={2}>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
  doloremque quas dolorum. Quo amet earum alias consequuntur quam
  accusamus a quae beatae, odio, quod provident consectetur non
  repudiandae enim adipisci?
</Heading>`}
        />
      </Section>

      {/* Font Weight */}
      <Section id="font-weight">
        <SectionHeader
          title="Font Weight"
          subtitle="Control heading font weight with fw prop"
        />
        <DemoArea className="flex-col items-start">
          <Heading order={1} fw={400}>
            Font weight 400
          </Heading>
          <Heading order={1} fw={600}>
            Font weight 600
          </Heading>
          <Heading order={1} fw={700}>
            Font weight 700
          </Heading>
          <Heading order={1} fw={900}>
            Font weight 900
          </Heading>
        </DemoArea>
        <CodeBlock
          code={`<Heading order={1} fw={400}>Font weight 400</Heading>
<Heading order={1} fw={600}>Font weight 600</Heading>
<Heading order={1} fw={700}>Font weight 700</Heading>
<Heading order={1} fw={900}>Font weight 900</Heading>`}
        />
      </Section>

      {/* Colors */}
      <Section id="colors">
        <SectionHeader title="Colors" subtitle="Heading colors using c prop" />
        <DemoArea className="flex-col items-start">
          <Heading order={1}>Default color</Heading>
          <Heading order={1} c="primary">
            Primary color
          </Heading>
          <Heading order={1} c="blue">
            Blue color
          </Heading>
          <Heading order={1} c="error">
            Error color
          </Heading>
          <Heading order={1} c="success">
            Success color
          </Heading>
        </DemoArea>
        <CodeBlock
          code={`<Heading order={1}>Default color</Heading>
<Heading order={1} c="primary">Primary color</Heading>
<Heading order={1} c="blue">Blue color</Heading>
<Heading order={1} c="error">Error color</Heading>
<Heading order={1} c="success">Success color</Heading>`}
        />
      </Section>

      {/* Gradient */}
      <Section id="gradient">
        <SectionHeader
          title="Gradient Variant"
          subtitle="Gradient heading with custom gradient configuration"
        />
        <DemoArea className="flex-col items-start">
          <Heading
            order={1}
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            Gradient Heading
          </Heading>
          <Heading
            order={2}
            fw={700}
            variant="gradient"
            gradient={{ from: "#a855f7", to: "#22d3ee", deg: 135 }}
          >
            Purple to Cyan Gradient
          </Heading>
        </DemoArea>
        <CodeBlock
          code={`<Heading
  order={1}
  size="xl"
  fw={900}
  variant="gradient"
  gradient={{ from: "blue", to: "cyan", deg: 90 }}
>
  Gradient Heading
</Heading>
<Heading
  order={2}
  fw={700}
  variant="gradient"
  gradient={{ from: "#a855f7", to: "#22d3ee", deg: 135 }}
>
  Purple to Cyan Gradient
</Heading>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

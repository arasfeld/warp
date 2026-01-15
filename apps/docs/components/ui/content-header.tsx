import { Heading, Text, cn } from "@warp/react";

interface ContentHeaderProps {
  title: string;
  description: string;
}

export function ContentHeader({ title, description }: ContentHeaderProps) {
  return (
    <div className="mb-12 animate-[fadeInUp_0.6s_cubic-bezier(0.16,1,0.3,1)]">
      <Heading
        order={1}
        className={cn(
          "text-5xl md:text-6xl lg:text-7xl mb-4 font-extrabold",
          "bg-gradient-to-r from-text-primary to-purple-500 bg-clip-text text-transparent"
        )}
      >
        {title}
      </Heading>
      <Text size="lg" color="muted" className="leading-relaxed text-[1.15rem]">
        {description}
      </Text>
    </div>
  );
}

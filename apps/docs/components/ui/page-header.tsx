import { cn } from "@warp/react";

import { Heading } from "./heading";
import { Text } from "./text";

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="text-center mb-24 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]">
      <Heading
        level={1}
        className={cn(
          "text-[clamp(3rem,8vw,5rem)] mb-6 leading-tight",
          "bg-gradient-to-r from-text-primary via-purple-500 to-cyan-400 bg-clip-text text-transparent",
          "dark:from-white dark:via-purple-500 dark:to-cyan-400"
        )}
      >
        {title}
      </Heading>
      <Text size="xl" color="muted" className="max-w-[700px] mx-auto">
        {description}
      </Text>
    </div>
  );
}

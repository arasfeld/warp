import { cn } from "@warp/react";

import { Heading } from "./heading";
import { Text } from "./text";

interface SectionHeaderProps {
  level?: 2 | 3;
  subtitle?: string;
  title: string;
}

export function SectionHeader({
  level = 2,
  subtitle,
  title,
}: SectionHeaderProps) {
  return (
    <>
      <Heading
        level={level}
        className={cn("text-2xl mb-2 scroll-mt-[100px]")}
      >
        {title}
      </Heading>
      {subtitle && (
        <Text
          className={cn("text-[1.05rem] mb-6")}
          color="muted"
          size="lg"
        >
          {subtitle}
        </Text>
      )}
    </>
  );
}

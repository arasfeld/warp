import { Card, cn } from "@warp/react";

interface DemoAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DemoArea({ children, className, ...props }: DemoAreaProps) {
  return (
    <Card
      className={cn(
        "bg-gray-50 dark:bg-[#16161f]",
        "border border-gray-200 dark:border-white/[0.08]",
        "rounded-[20px] p-12 mb-6",
        "min-h-[150px]",
        "flex items-center justify-center gap-4 flex-wrap",
        "transition-all duration-300",
        "hover:border-purple-500 hover:shadow-[0_20px_60px_rgba(168,85,247,0.1)]",
        className
      )}
      withBorder={false}
      {...props}
    >
      {children}
    </Card>
  );
}

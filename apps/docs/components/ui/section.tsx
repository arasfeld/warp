import { cn } from "@warp/react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "mb-16 animate-[fadeInUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

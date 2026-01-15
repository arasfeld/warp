import { cn } from "@warp/react";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "default" | "muted";
  children: React.ReactNode;
}

export function Text({
  size = "md",
  color = "default",
  children,
  className,
  ...props
}: TextProps) {
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const colorStyles = {
    default: "text-text-primary",
    muted: "text-text-secondary",
  };

  return (
    <p
      className={cn(sizeStyles[size], colorStyles[color], className)}
      {...props}
    >
      {children}
    </p>
  );
}

import { cn } from "@warp/react";

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export function List({ children, className, ...props }: ListProps) {
  return (
    <ul className={cn("list-none", className)} {...props}>
      {children}
    </ul>
  );
}

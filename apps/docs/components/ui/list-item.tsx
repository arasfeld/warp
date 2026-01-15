import { cn } from "@warp/react";

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export function ListItem({ children, className, ...props }: ListItemProps) {
  return (
    <li className={cn(className)} {...props}>
      {children}
    </li>
  );
}

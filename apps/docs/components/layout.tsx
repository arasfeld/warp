import { Nav } from "./nav";
import { Sidebar } from "./sidebar";
import { cn } from "@warp/react";

interface LayoutProps {
  children: React.ReactNode;
  /** Whether to show the sidebar (default: true) */
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Nav />
      <div className="flex pt-16">
        {showSidebar && <Sidebar />}
        <main className={cn("flex-1 min-w-0", showSidebar && "ml-64")}>
          {children}
        </main>
      </div>
    </div>
  );
}

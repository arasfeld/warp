import { cn } from "@warp/react";

import { Nav } from "./nav";
import { Sidebar } from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
  /** Whether to show the sidebar (default: true) */
  showSidebar?: boolean;
  /** Whether this is a component page with fixed sidebar/TOC layout */
  isComponentPage?: boolean;
}

export function Layout({
  children,
  showSidebar = true,
  isComponentPage = false,
}: LayoutProps) {
  if (isComponentPage) {
    return (
      <div className="min-h-screen relative overflow-x-hidden">
        <Nav />
        {showSidebar && <Sidebar />}
        {children}
      </div>
    );
  }

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

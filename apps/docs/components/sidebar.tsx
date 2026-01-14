"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@warp/react";

const componentGroups = [
  {
    title: "Layout",
    items: [
      { name: "Container", href: "/components/container", comingSoon: true },
      { name: "Stack", href: "/components/stack", comingSoon: true },
      { name: "Group", href: "/components/group", comingSoon: true },
    ],
  },
  {
    title: "Inputs",
    items: [
      { name: "Button", href: "/components/button" },
      { name: "Input", href: "/components/input" },
      { name: "Checkbox", href: "/components/checkbox", comingSoon: true },
      { name: "Select", href: "/components/select", comingSoon: true },
    ],
  },
  {
    title: "Data Display",
    items: [
      { name: "Card", href: "/components/card" },
      { name: "Text", href: "/components/text" },
      { name: "Badge", href: "/components/badge", comingSoon: true },
      { name: "Table", href: "/components/table", comingSoon: true },
    ],
  },
  {
    title: "Feedback",
    items: [
      { name: "Alert", href: "/components/alert", comingSoon: true },
      { name: "Toast", href: "/components/toast", comingSoon: true },
      { name: "Dialog", href: "/components/dialog", comingSoon: true },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background overflow-y-auto">
      <nav className="p-4 space-y-6">
        {componentGroups.map((group) => (
          <div key={group.title}>
            <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        item.comingSoon && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {item.name}
                      {item.comingSoon && (
                        <span className="ml-2 text-xs opacity-70">Soon</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

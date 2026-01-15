"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertCircle,
  Badge,
  Bell,
  CheckSquare,
  ChevronDown,
  Container,
  CreditCard,
  FileText,
  FormInput as InputIcon,
  Layers,
  LayoutDashboard,
  MessageCircle,
  MessageSquare,
  MousePointerClick,
  Square as ButtonIcon,
  Table,
  Type,
  Users,
} from "lucide-react";
import { cn } from "@warp/react";

import { List, ListItem } from "./ui";

const componentIconMap: Record<string, typeof ButtonIcon> = {
  Container,
  Stack: Layers,
  Group: Users,
  Button: ButtonIcon,
  Input: InputIcon,
  Checkbox: CheckSquare,
  Select: ChevronDown,
  Card: CreditCard,
  Text: Type,
  Heading: Type,
  Chip: CheckSquare,
  Badge,
  Table,
  Alert: AlertCircle,
  Toast: Bell,
  Dialog: MessageCircle,
};

const componentGroups = [
  {
    title: "Layout",
    icon: LayoutDashboard,
    items: [
      { name: "Container", href: "/components/container", comingSoon: true },
      { name: "Stack", href: "/components/stack", comingSoon: true },
      { name: "Group", href: "/components/group", comingSoon: true },
    ],
  },
  {
    title: "Inputs",
    icon: MousePointerClick,
    items: [
      { name: "Button", href: "/components/button" },
      { name: "Select", href: "/components/select", comingSoon: true },
    ],
  },
  {
    title: "Data Display",
    icon: FileText,
    items: [
      { name: "Card", href: "/components/card" },
      { name: "Heading", href: "/components/heading" },
      { name: "Text", href: "/components/text" },
      { name: "Chip", href: "/components/chip" },
      { name: "Badge", href: "/components/badge", comingSoon: true },
      { name: "Table", href: "/components/table", comingSoon: true },
    ],
  },
  {
    title: "Form",
    icon: CheckSquare,
    items: [
      { name: "Input", href: "/components/input" },
      { name: "Checkbox", href: "/components/checkbox" },
      { name: "Radio", href: "/components/radio", comingSoon: true },
      { name: "Select", href: "/components/select", comingSoon: true },
    ],
  },
  {
    title: "Feedback",
    icon: MessageSquare,
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
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .component-sidebar::-webkit-scrollbar {
            width: 6px;
          }
          .component-sidebar::-webkit-scrollbar-track {
            background: transparent;
          }
          .component-sidebar::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 3px;
          }
          .dark .component-sidebar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
          }
          .component-sidebar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.2);
          }
          .dark .component-sidebar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `,
        }}
      />
      <aside className="component-sidebar fixed left-0 top-20 bottom-0 w-[280px] bg-white/50 dark:bg-[#16161f]/50 backdrop-blur-[20px] border-r border-black/5 dark:border-white/5 overflow-y-auto z-[100] py-8">
        <nav>
          {componentGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.title} className="mb-8">
                <div className="px-6 mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <GroupIcon className="w-3.5 h-3.5 opacity-50" />
                  {group.title}
                </div>
                <List>
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const ItemIcon = componentIconMap[item.name];
                    return (
                      <ListItem
                        key={item.href}
                        className={cn(
                          "relative",
                          item.comingSoon && "opacity-40"
                        )}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-6 py-3 text-[0.95rem] transition-all duration-300 relative",
                            "text-muted-foreground hover:text-foreground",
                            "before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px]",
                            "before:bg-gradient-to-b before:from-purple-500 before:to-cyan-400",
                            "before:opacity-0 before:transition-opacity before:duration-300",
                            isActive &&
                              "text-foreground bg-black/5 dark:bg-white/5 before:opacity-100",
                            !isActive &&
                              "hover:bg-black/5 dark:hover:bg-white/5"
                          )}
                        >
                          {ItemIcon && (
                            <ItemIcon className="w-[18px] h-[18px] opacity-60" />
                          )}
                          <span>{item.name}</span>
                          {item.comingSoon && (
                            <span className="ml-auto text-[0.7rem] px-2 py-1 bg-black/10 dark:bg-white/10 rounded text-muted-foreground">
                              Soon
                            </span>
                          )}
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

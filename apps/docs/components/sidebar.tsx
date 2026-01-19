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
  File,
  FileText,
  FormInput as InputIcon,
  Hash,
  KeyRound,
  Layers,
  LayoutDashboard,
  Loader,
  MessageCircle,
  MessageSquare,
  MousePointerClick,
  Search,
  SlidersHorizontal,
  Square as ButtonIcon,
  Star,
  Table,
  Tags,
  Text as TextIcon,
  ToggleLeft,
  ToggleRight,
  Type,
  Users,
  Radio,
} from "lucide-react";
import { cn } from "@warp/react";

import { List, ListItem } from "./ui";

const componentIconMap: Record<string, typeof ButtonIcon> = {
  Alert: AlertCircle,
  Autocomplete: Search,
  Badge,
  Button: ButtonIcon,
  Card: CreditCard,
  Checkbox: CheckSquare,
  Chip: CheckSquare,
  Container,
  Dialog: MessageCircle,
  FileInput: File,
  Group: Users,
  Heading: Type,
  Input: InputIcon,
  NumberInput: Hash,
  PasswordInput: KeyRound,
  Radio,
  Rating: Star,
  SegmentedControl: ToggleLeft,
  Select: ChevronDown,
  Skeleton: Loader,
  Slider: SlidersHorizontal,
  Stack: Layers,
  Switch: ToggleRight,
  Table,
  TagsInput: Tags,
  Text: Type,
  TextInput: TextIcon,
  Textarea: TextIcon,
  Toast: Bell,
};

const componentGroups = [
  {
    title: "Layout",
    icon: LayoutDashboard,
    items: [
      { name: "Container", href: "/components/container" },
      { name: "Stack", href: "/components/stack" },
      { name: "Group", href: "/components/group" },
    ],
  },
  {
    title: "Inputs",
    icon: MousePointerClick,
    items: [
      { name: "Autocomplete", href: "/components/autocomplete" },
      { name: "Button", href: "/components/button" },
      { name: "Checkbox", href: "/components/checkbox" },
      { name: "FileInput", href: "/components/file-input" },
      { name: "Input", href: "/components/input" },
      { name: "NumberInput", href: "/components/number-input" },
      { name: "PasswordInput", href: "/components/password-input" },
      { name: "Radio", href: "/components/radio" },
      { name: "Rating", href: "/components/rating" },
      { name: "SegmentedControl", href: "/components/segmented-control" },
      { name: "Select", href: "/components/select" },
      { name: "Slider", href: "/components/slider" },
      { name: "Switch", href: "/components/switch" },
      { name: "TagsInput", href: "/components/tags-input" },
      { name: "TextInput", href: "/components/text-input" },
      { name: "Textarea", href: "/components/textarea" },
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
      { name: "Badge", href: "/components/badge" },
      { name: "Table", href: "/components/table" },
    ],
  },
  {
    title: "Feedback",
    icon: MessageSquare,
    items: [
      { name: "Alert", href: "/components/alert" },
      { name: "Toast", href: "/components/toast" },
      { name: "Dialog", href: "/components/dialog" },
      { name: "Skeleton", href: "/components/skeleton" },
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
                      <ListItem key={item.href} className="relative">
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

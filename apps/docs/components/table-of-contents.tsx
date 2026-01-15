"use client";

import { useEffect, useState } from "react";
import { cn } from "@warp/react";

import { List, ListItem } from "./ui";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that's most visible in the viewport
        let maxIntersection = 0;
        let activeSection = "";

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > maxIntersection
          ) {
            maxIntersection = entry.intersectionRatio;
            activeSection = entry.target.id;
          }
        });

        // If we found an active section, set it
        if (activeSection) {
          setActiveId(activeSection);
        } else {
          // Fallback: find the first section that's above the viewport
          const scrollPosition = window.scrollY + 150; // Offset for header
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && section.offsetTop <= scrollPosition) {
              setActiveId(section.id);
              break;
            }
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-100px 0px -60% 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Also handle scroll events as a fallback
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveId(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .component-toc::-webkit-scrollbar {
            width: 6px;
          }
          .component-toc::-webkit-scrollbar-track {
            background: transparent;
          }
          .component-toc::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.15);
            border-radius: 3px;
          }
          .dark .component-toc::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
          }
          .component-toc::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.25);
          }
          .dark .component-toc::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `,
        }}
      />
      <aside
        className={cn(
          "component-toc fixed right-0 top-[70px] bottom-0 w-[260px]",
          "bg-white/40 dark:bg-[#16161f]/30 backdrop-blur-[20px]",
          "border-l border-gray-200/50 dark:border-white/5",
          "overflow-y-auto z-[100] px-6 py-8",
          className
        )}
      >
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
          Table of Contents
        </div>
        <List>
          {items.map((item) => (
            <ListItem key={item.id} className="mb-2">
              <a
                href={`#${item.id}`}
                className={cn(
                  "block py-2 pl-3 pr-0 text-[0.9rem] transition-all duration-300",
                  "border-l-2",
                  activeId === item.id
                    ? "text-foreground dark:text-[#e0e0ff] border-l-[#a855f7] pl-4 font-medium"
                    : "text-muted-foreground dark:text-[#8888aa] border-l-gray-300/50 dark:border-l-white/10 hover:text-foreground dark:hover:text-[#e0e0ff] hover:border-l-[#a855f7] hover:pl-4"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                {item.title}
              </a>
            </ListItem>
          ))}
        </List>
      </aside>
    </>
  );
}

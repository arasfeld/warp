"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "@warp/react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { mode } = useTheme();
  const isDark = mode === "dark";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .code-block-header {
            background-color: #f9fafb;
          }
          .dark .code-block-header {
            background-color: #252526;
          }
          .syntax-highlighter-wrapper {
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
          }
          .syntax-highlighter-wrapper pre {
            margin: 0 !important;
            padding: 1rem !important;
            background: transparent !important;
            font-size: 0.875rem !important;
            line-height: 1.5rem !important;
          }
        `,
        }}
      />
      <div className="relative group mt-4">
        <div className="rounded-lg overflow-hidden border border-divider bg-white dark:bg-[#1e1e2e]">
          <div className="code-block-header flex items-center justify-between px-4 py-2 border-b border-divider">
            <span className="text-xs text-muted-foreground font-mono uppercase">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="syntax-highlighter-wrapper">
            <SyntaxHighlighter
              language={language}
              style={isDark ? oneDark : oneLight}
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: isDark ? "#1e1e2e" : "#ffffff",
              }}
              codeTagProps={{
                style: {
                  fontFamily:
                    "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                },
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </>
  );
}

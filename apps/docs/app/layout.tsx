import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@warp/react";

import { AnimatedBackground } from "@/components/animated-background";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Warp UI - Component Library",
  description: "Cross-platform UI components for React and React Native",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var themePreference = localStorage.getItem('warp-theme-preference');
                  var mode = 'system';
                  
                  if (themePreference) {
                    var parsed = JSON.parse(themePreference);
                    if (parsed && parsed.mode) {
                      mode = parsed.mode;
                    }
                  }
                  
                  var effectiveMode;
                  if (mode === 'system') {
                    effectiveMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  } else {
                    effectiveMode = mode;
                  }
                  
                  if (effectiveMode === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Ignore errors, fallback to default (light)
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <AnimatedBackground />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

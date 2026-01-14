"use client";

import { Button, useTheme } from "@warp/react";

export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      {mode === "light" ? "🌙" : "☀️"}
    </Button>
  );
}

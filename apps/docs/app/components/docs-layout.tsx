import { Nav } from "./nav";

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

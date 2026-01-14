import { Nav } from "./nav";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Nav />
      <main className="relative z-10">{children}</main>
    </div>
  );
}

import { Layout } from "@/components/layout";
import { TableOfContents } from "@/components/table-of-contents";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface ComponentPageLayoutProps {
  children: React.ReactNode;
  tocItems: TocItem[];
}

export function ComponentPageLayout({
  children,
  tocItems,
}: ComponentPageLayoutProps) {
  return (
    <Layout isComponentPage={true}>
      <main className="relative z-10 ml-[280px] mr-[260px] mt-20 px-16 py-12 max-w-[900px]">
        {children}
      </main>
      <aside className="fixed top-20 right-0 w-[260px] h-[calc(100vh-5rem)] overflow-y-auto pt-12 pr-8 pb-12 z-10">
        <TableOfContents items={tocItems} />
      </aside>
    </Layout>
  );
}

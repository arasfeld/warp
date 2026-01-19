"use client";

import {
  Table,
  TableThead,
  TableTbody,
  TableTfoot,
  TableTr,
  TableTh,
  TableTd,
  TableCaption,
  TableScrollContainer,
  Stack,
  Text,
  Badge,
} from "@warp/react";

import { CodeBlock } from "@/components/code-block";
import {
  ComponentPageLayout,
  ContentHeader,
  DemoArea,
  Section,
  SectionHeader,
} from "@/components/ui";

// Sample data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Viewer", status: "Pending" },
];

export default function TablePage() {
  const tocItems = [
    { id: "usage", title: "Usage", level: 2 },
    { id: "striped", title: "Striped Rows", level: 2 },
    { id: "hover", title: "Hover Highlight", level: 2 },
    { id: "borders", title: "Borders", level: 2 },
    { id: "spacing", title: "Spacing", level: 2 },
    { id: "with-elements", title: "With Elements", level: 2 },
    { id: "responsive", title: "Responsive", level: 2 },
  ];

  return (
    <ComponentPageLayout tocItems={tocItems}>
      <ContentHeader
        title="Table"
        description="Display data in rows and columns"
      />

      {/* Usage */}
      <Section id="usage">
        <SectionHeader
          title="Usage"
          subtitle="Basic table with header and body"
        />
        <DemoArea>
          <Table>
            <TableThead>
              <TableTr>
                <TableTh>Name</TableTh>
                <TableTh>Email</TableTh>
                <TableTh>Role</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {users.slice(0, 3).map((user) => (
                <TableTr key={user.id}>
                  <TableTd>{user.name}</TableTd>
                  <TableTd>{user.email}</TableTd>
                  <TableTd>{user.role}</TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </DemoArea>
        <CodeBlock
          code={`<Table>
  <TableThead>
    <TableTr>
      <TableTh>Name</TableTh>
      <TableTh>Email</TableTh>
      <TableTh>Role</TableTh>
    </TableTr>
  </TableThead>
  <TableTbody>
    {users.map((user) => (
      <TableTr key={user.id}>
        <TableTd>{user.name}</TableTd>
        <TableTd>{user.email}</TableTd>
        <TableTd>{user.role}</TableTd>
      </TableTr>
    ))}
  </TableTbody>
</Table>`}
        />
      </Section>

      {/* Striped Rows */}
      <Section id="striped">
        <SectionHeader
          title="Striped Rows"
          subtitle="Alternate row backgrounds for better readability"
        />
        <DemoArea>
          <Stack gap="lg">
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Striped odd rows (default)
              </Text>
              <Table striped>
                <TableThead>
                  <TableTr>
                    <TableTh>Name</TableTh>
                    <TableTh>Email</TableTh>
                    <TableTh>Role</TableTh>
                  </TableTr>
                </TableThead>
                <TableTbody>
                  {users.map((user) => (
                    <TableTr key={user.id}>
                      <TableTd>{user.name}</TableTd>
                      <TableTd>{user.email}</TableTd>
                      <TableTd>{user.role}</TableTd>
                    </TableTr>
                  ))}
                </TableTbody>
              </Table>
            </div>
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Striped even rows
              </Text>
              <Table striped="even">
                <TableThead>
                  <TableTr>
                    <TableTh>Name</TableTh>
                    <TableTh>Email</TableTh>
                    <TableTh>Role</TableTh>
                  </TableTr>
                </TableThead>
                <TableTbody>
                  {users.map((user) => (
                    <TableTr key={user.id}>
                      <TableTd>{user.name}</TableTd>
                      <TableTd>{user.email}</TableTd>
                      <TableTd>{user.role}</TableTd>
                    </TableTr>
                  ))}
                </TableTbody>
              </Table>
            </div>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`{/* Stripe odd rows */}
<Table striped>
  ...
</Table>

{/* Stripe even rows */}
<Table striped="even">
  ...
</Table>`}
        />
      </Section>

      {/* Hover Highlight */}
      <Section id="hover">
        <SectionHeader
          title="Hover Highlight"
          subtitle="Highlight rows on mouse hover"
        />
        <DemoArea>
          <Table highlightOnHover>
            <TableThead>
              <TableTr>
                <TableTh>Name</TableTh>
                <TableTh>Email</TableTh>
                <TableTh>Role</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {users.slice(0, 3).map((user) => (
                <TableTr key={user.id}>
                  <TableTd>{user.name}</TableTd>
                  <TableTd>{user.email}</TableTd>
                  <TableTd>{user.role}</TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </DemoArea>
        <CodeBlock
          code={`<Table highlightOnHover>
  ...
</Table>`}
        />
      </Section>

      {/* Borders */}
      <Section id="borders">
        <SectionHeader
          title="Borders"
          subtitle="Table and column border options"
        />
        <DemoArea>
          <Stack gap="lg">
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                With table border
              </Text>
              <Table withTableBorder>
                <TableThead>
                  <TableTr>
                    <TableTh>Name</TableTh>
                    <TableTh>Email</TableTh>
                    <TableTh>Role</TableTh>
                  </TableTr>
                </TableThead>
                <TableTbody>
                  {users.slice(0, 2).map((user) => (
                    <TableTr key={user.id}>
                      <TableTd>{user.name}</TableTd>
                      <TableTd>{user.email}</TableTd>
                      <TableTd>{user.role}</TableTd>
                    </TableTr>
                  ))}
                </TableTbody>
              </Table>
            </div>
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                With column borders
              </Text>
              <Table withTableBorder withColumnBorders>
                <TableThead>
                  <TableTr>
                    <TableTh>Name</TableTh>
                    <TableTh>Email</TableTh>
                    <TableTh>Role</TableTh>
                  </TableTr>
                </TableThead>
                <TableTbody>
                  {users.slice(0, 2).map((user) => (
                    <TableTr key={user.id}>
                      <TableTd>{user.name}</TableTd>
                      <TableTd>{user.email}</TableTd>
                      <TableTd>{user.role}</TableTd>
                    </TableTr>
                  ))}
                </TableTbody>
              </Table>
            </div>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`{/* Table border */}
<Table withTableBorder>
  ...
</Table>

{/* Column borders */}
<Table withTableBorder withColumnBorders>
  ...
</Table>

{/* No row borders */}
<Table withRowBorders={false}>
  ...
</Table>`}
        />
      </Section>

      {/* Spacing */}
      <Section id="spacing">
        <SectionHeader
          title="Spacing"
          subtitle="Control cell padding"
        />
        <DemoArea>
          <Stack gap="lg">
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Compact (xs spacing)
              </Text>
              <Table verticalSpacing="xs" horizontalSpacing="xs" withTableBorder>
                <TableThead>
                  <TableTr>
                    <TableTh>Name</TableTh>
                    <TableTh>Email</TableTh>
                    <TableTh>Role</TableTh>
                  </TableTr>
                </TableThead>
                <TableTbody>
                  {users.slice(0, 2).map((user) => (
                    <TableTr key={user.id}>
                      <TableTd>{user.name}</TableTd>
                      <TableTd>{user.email}</TableTd>
                      <TableTd>{user.role}</TableTd>
                    </TableTr>
                  ))}
                </TableTbody>
              </Table>
            </div>
            <div>
              <Text size="sm" className="mb-2 text-muted-foreground">
                Spacious (lg spacing)
              </Text>
              <Table verticalSpacing="lg" horizontalSpacing="lg" withTableBorder>
                <TableThead>
                  <TableTr>
                    <TableTh>Name</TableTh>
                    <TableTh>Email</TableTh>
                    <TableTh>Role</TableTh>
                  </TableTr>
                </TableThead>
                <TableTbody>
                  {users.slice(0, 2).map((user) => (
                    <TableTr key={user.id}>
                      <TableTd>{user.name}</TableTd>
                      <TableTd>{user.email}</TableTd>
                      <TableTd>{user.role}</TableTd>
                    </TableTr>
                  ))}
                </TableTbody>
              </Table>
            </div>
          </Stack>
        </DemoArea>
        <CodeBlock
          code={`{/* Compact */}
<Table verticalSpacing="xs" horizontalSpacing="xs">
  ...
</Table>

{/* Spacious */}
<Table verticalSpacing="lg" horizontalSpacing="lg">
  ...
</Table>`}
        />
      </Section>

      {/* With Elements */}
      <Section id="with-elements">
        <SectionHeader
          title="With Elements"
          subtitle="Tables can contain any React elements"
        />
        <DemoArea>
          <Table striped highlightOnHover>
            <TableThead>
              <TableTr>
                <TableTh>Name</TableTh>
                <TableTh>Email</TableTh>
                <TableTh>Role</TableTh>
                <TableTh>Status</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {users.map((user) => (
                <TableTr key={user.id}>
                  <TableTd className="font-medium">{user.name}</TableTd>
                  <TableTd className="text-muted-foreground">{user.email}</TableTd>
                  <TableTd>{user.role}</TableTd>
                  <TableTd>
                    <Badge
                      size="sm"
                      color={
                        user.status === "Active"
                          ? "success"
                          : user.status === "Pending"
                            ? "warning"
                            : "gray"
                      }
                      variant="light"
                    >
                      {user.status}
                    </Badge>
                  </TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </DemoArea>
        <CodeBlock
          code={`<Table striped highlightOnHover>
  <TableThead>
    <TableTr>
      <TableTh>Name</TableTh>
      <TableTh>Status</TableTh>
    </TableTr>
  </TableThead>
  <TableTbody>
    {users.map((user) => (
      <TableTr key={user.id}>
        <TableTd className="font-medium">{user.name}</TableTd>
        <TableTd>
          <Badge color={user.status === "Active" ? "success" : "gray"}>
            {user.status}
          </Badge>
        </TableTd>
      </TableTr>
    ))}
  </TableTbody>
</Table>`}
        />
      </Section>

      {/* Responsive */}
      <Section id="responsive">
        <SectionHeader
          title="Responsive"
          subtitle="Horizontal scrolling for wide tables"
        />
        <DemoArea>
          <TableScrollContainer minWidth={600}>
            <Table withTableBorder>
              <TableThead>
                <TableTr>
                  <TableTh>ID</TableTh>
                  <TableTh>Name</TableTh>
                  <TableTh>Email</TableTh>
                  <TableTh>Role</TableTh>
                  <TableTh>Status</TableTh>
                  <TableTh>Actions</TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                {users.slice(0, 3).map((user) => (
                  <TableTr key={user.id}>
                    <TableTd>{user.id}</TableTd>
                    <TableTd>{user.name}</TableTd>
                    <TableTd>{user.email}</TableTd>
                    <TableTd>{user.role}</TableTd>
                    <TableTd>{user.status}</TableTd>
                    <TableTd>
                      <Text size="sm" className="text-primary cursor-pointer">
                        Edit
                      </Text>
                    </TableTd>
                  </TableTr>
                ))}
              </TableTbody>
              <TableCaption>A list of users in the system</TableCaption>
            </Table>
          </TableScrollContainer>
        </DemoArea>
        <CodeBlock
          code={`<TableScrollContainer minWidth={600}>
  <Table withTableBorder>
    <TableThead>
      <TableTr>
        <TableTh>ID</TableTh>
        <TableTh>Name</TableTh>
        <TableTh>Email</TableTh>
        {/* More columns... */}
      </TableTr>
    </TableThead>
    <TableTbody>
      {users.map((user) => (
        <TableTr key={user.id}>
          <TableTd>{user.id}</TableTd>
          <TableTd>{user.name}</TableTd>
          <TableTd>{user.email}</TableTd>
          {/* More cells... */}
        </TableTr>
      ))}
    </TableTbody>
    <TableCaption>A list of users in the system</TableCaption>
  </Table>
</TableScrollContainer>`}
        />
      </Section>
    </ComponentPageLayout>
  );
}

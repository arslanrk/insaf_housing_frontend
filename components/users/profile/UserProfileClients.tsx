"use client";

import type { User } from "@/lib/mock-users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface UserProfileClientsProps {
  user: User;
}

// Mock clients assigned to this user
const MOCK_CLIENTS = [
  { id: "c1", name: "Ali Hassan", phone: "+92 300 1112233", unit: "A-101" },
  { id: "c2", name: "Sana Mahmood", phone: "+92 321 4445566", unit: "B-205" },
  { id: "c3", name: "Rashid Ahmed", phone: "+92 333 7778899", unit: "A-302" },
];

export function UserProfileClients({ user }: UserProfileClientsProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
          <h3 className="text-sm font-semibold text-foreground">
            Clients assigned to {user.name}
          </h3>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {MOCK_CLIENTS.length} client{MOCK_CLIENTS.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
              <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Name
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Phone
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Unit
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_CLIENTS.map((client, index) => (
              <TableRow
                key={client.id}
                className={cn(
                  "border-border transition-colors hover:bg-muted/50",
                  index % 2 === 1 && "bg-muted/20"
                )}
              >
                <TableCell className="px-6 py-4 font-medium text-foreground">
                  {client.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-muted-foreground">
                  {client.phone}
                </TableCell>
                <TableCell className="px-6 py-4 text-muted-foreground">
                  {client.unit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

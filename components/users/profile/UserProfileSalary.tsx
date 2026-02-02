"use client";

import { Banknote, CheckCircle2, Clock } from "lucide-react";
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

interface UserProfileSalaryProps {
  user: User;
}

export type SalaryStatus = "paid" | "pending";

export interface SalaryRecord {
  id: string;
  date: string;
  month: string;
  amount: number;
  status: SalaryStatus;
}

// Mock salary payment records — replace with API data
const MOCK_SALARY_RECORDS: SalaryRecord[] = [
  { id: "1", date: "01-09-2024", month: "September 2024", amount: 85000, status: "paid" },
  { id: "2", date: "01-08-2024", month: "August 2024", amount: 85000, status: "paid" },
  { id: "3", date: "01-07-2024", month: "July 2024", amount: 85000, status: "pending" },
];

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatusBadge({ status }: { status: SalaryStatus }) {
  if (status === "paid") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success"
        title="Paid"
      >
        <CheckCircle2 className="size-3.5 shrink-0" aria-hidden />
        Paid
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning"
      title="Pending"
    >
      <Clock className="size-3.5 shrink-0" aria-hidden />
      Pending
    </span>
  );
}

export function UserProfileSalary({ user }: UserProfileSalaryProps) {
  const salary = user.salary ?? 0;
  const formatted = formatAmount(salary);
  const paidCount = MOCK_SALARY_RECORDS.filter((r) => r.status === "paid").length;
  const pendingCount = MOCK_SALARY_RECORDS.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-6">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-sm">
            <Banknote className="size-7" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Monthly salary</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{formatted}</p>
            <p className="text-sm text-muted-foreground mt-0.5">Per month</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
          <h3 className="text-sm font-semibold text-foreground">
            Payment history
          </h3>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
              {paidCount} paid
            </span>
            <span className="rounded-full bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning">
              {pendingCount} pending
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Month
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Amount
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_SALARY_RECORDS.map((record, index) => (
                <TableRow
                  key={record.id}
                  className={cn(
                    "border-border transition-colors hover:bg-muted/50",
                    index % 2 === 1 && "bg-muted/30"
                  )}
                >
                  <TableCell className="whitespace-nowrap px-5 py-4 font-medium text-foreground">
                    {record.date}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                    {record.month}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-5 py-4 text-right font-medium text-foreground">
                    {formatAmount(record.amount)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-5 py-4">
                    <StatusBadge status={record.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

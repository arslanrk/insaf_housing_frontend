"use client";

import { Percent, CheckCircle2, Clock } from "lucide-react";
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

interface UserProfileCommissionProps {
  user: User;
}

export type CommissionStatus = "paid" | "pending";

export interface CommissionRecord {
  date: string;
  month: string;
  clientName: string;
  houseSize: string;
  commissionAmount: number;
  commissionType: string;
  status: CommissionStatus;
}

// Mock commission data — replace with API data
const MOCK_COMMISSION_RATE = 2.5;
const MOCK_COMMISSION_RECORDS: CommissionRecord[] = [
  {
    date: "20-08-2024",
    month: "August 2024",
    clientName: "Shoukat Ali s/o Irshad ul Haq",
    houseSize: "2 marla single story",
    commissionAmount: 10000,
    commissionType: "Booking",
    status: "paid",
  },
  {
    date: "22-08-2024",
    month: "August 2024",
    clientName: "Mujeeb Ur Rahman s/o Ali Raza",
    houseSize: "2 marla single story",
    commissionAmount: 10000,
    commissionType: "Booking",
    status: "pending",
  },
];

function StatusBadge({ status }: { status: CommissionStatus }) {
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

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function UserProfileCommission({ user }: UserProfileCommissionProps) {
  const totalCommission = MOCK_COMMISSION_RECORDS.reduce(
    (sum, r) => sum + r.commissionAmount,
    0
  );
  const formattedTotal = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalCommission);
  const paidCount = MOCK_COMMISSION_RECORDS.filter((r) => r.status === "paid").length;
  const pendingCount = MOCK_COMMISSION_RECORDS.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-6">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-sm">
            <Percent className="size-7" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Commission rate</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">
              {MOCK_COMMISSION_RATE}%
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">Per booking</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex flex-col gap-2 border-b border-border bg-muted/30 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            Commission history
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Total: <span className="font-semibold text-foreground">{formattedTotal}</span>
            </span>
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
                <TableHead className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Client name
                </TableHead>
                <TableHead className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  House size
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Commission amount
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Commission type
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_COMMISSION_RECORDS.map((record, index) => (
                <TableRow
                  key={`${record.date}-${record.clientName}-${index}`}
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
                  <TableCell className="px-5 py-4 text-foreground">
                    {record.clientName}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-muted-foreground">
                    {record.houseSize}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-5 py-4 text-right font-medium text-foreground">
                    {formatAmount(record.commissionAmount)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                    {record.commissionType}
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

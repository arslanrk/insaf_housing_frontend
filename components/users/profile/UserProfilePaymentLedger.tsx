"use client";

import { BookOpen } from "lucide-react";
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

interface UserProfilePaymentLedgerProps {
  user: User;
}

export interface PaymentLedgerRecord {
  customerName: string;
  houseSize: string;
  houseNo: string;
  totalCommission: number;
  paidCommission: number;
  balanceCommission: number;
}

// Mock payment ledger data — replace with API data
const MOCK_PAYMENT_LEDGER_RECORDS: PaymentLedgerRecord[] = [
  {
    customerName: "Shoukat Ali s/o Irshad ul Haq",
    houseSize: "2 marla single story",
    houseNo: "A-101",
    totalCommission: 10000,
    paidCommission: 10000,
    balanceCommission: 0,
  },
  {
    customerName: "Mujeeb Ur Rahman s/o Ali Raza",
    houseSize: "2 marla single story",
    houseNo: "B-205",
    totalCommission: 10000,
    paidCommission: 5000,
    balanceCommission: 5000,
  },
];

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function UserProfilePaymentLedger({ user }: UserProfilePaymentLedgerProps) {
  const totalCommission = MOCK_PAYMENT_LEDGER_RECORDS.reduce(
    (sum, r) => sum + r.totalCommission,
    0
  );
  const totalPaid = MOCK_PAYMENT_LEDGER_RECORDS.reduce(
    (sum, r) => sum + r.paidCommission,
    0
  );
  const totalBalance = MOCK_PAYMENT_LEDGER_RECORDS.reduce(
    (sum, r) => sum + r.balanceCommission,
    0
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex flex-col gap-2 border-b border-border bg-muted/30 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Payment ledger
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {MOCK_PAYMENT_LEDGER_RECORDS.length} record{MOCK_PAYMENT_LEDGER_RECORDS.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Total: {formatAmount(totalCommission)}
            </span>
            <span className="rounded-lg bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
              Paid: {formatAmount(totalPaid)}
            </span>
            <span className="rounded-lg bg-warning/10 px-3 py-1.5 text-xs font-medium text-warning">
              Balance: {formatAmount(totalBalance)}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                <TableHead className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Customer name
                </TableHead>
                <TableHead className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  House size
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  House no
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total commission
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Paid commission
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Balance commission
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PAYMENT_LEDGER_RECORDS.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={6} className="px-5 py-12 text-center text-sm text-muted-foreground">
                    No payment ledger entries yet.
                  </TableCell>
                </TableRow>
              ) : (
                MOCK_PAYMENT_LEDGER_RECORDS.map((record, index) => (
                  <TableRow
                    key={`${record.customerName}-${record.houseNo}-${index}`}
                    className={cn(
                      "border-border transition-colors hover:bg-muted/50",
                      index % 2 === 1 && "bg-muted/30"
                    )}
                  >
                    <TableCell className="px-5 py-4 font-medium text-foreground">
                      {record.customerName}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-muted-foreground">
                      {record.houseSize}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {record.houseNo}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-right font-medium text-foreground">
                      {formatAmount(record.totalCommission)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-right font-medium text-foreground">
                      {formatAmount(record.paidCommission)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-right font-medium text-foreground">
                      {formatAmount(record.balanceCommission)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

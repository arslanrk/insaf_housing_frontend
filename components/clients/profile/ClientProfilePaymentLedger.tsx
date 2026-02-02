"use client";

import { BookOpen } from "lucide-react";
import type { PaymentLedgerEntry } from "@/lib/client-profile-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface ClientProfilePaymentLedgerProps {
  entries: PaymentLedgerEntry[];
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ClientProfilePaymentLedger({ entries }: ClientProfilePaymentLedgerProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-6 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="size-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Payment ledger</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {entries.length} record{entries.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
                <TableHead className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Payment description
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Install no.
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Due amount
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Received amount
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Outstanding amount
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Book no
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Receipt no
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Payment mode
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Paid date
                </TableHead>
                <TableHead className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Paid amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={11} className="px-5 py-12 text-center text-sm text-muted-foreground">
                    No payment ledger entries yet.
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry, index) => (
                  <TableRow
                    key={`${entry.installNo}-${entry.date}-${index}`}
                    className={cn(
                      "border-border transition-colors hover:bg-muted/50",
                      index % 2 === 1 && "bg-muted/30"
                    )}
                  >
                    <TableCell className="px-5 py-4 font-medium text-foreground">
                      {entry.paymentDescription}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {entry.installNo}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {entry.date}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-right font-medium text-foreground">
                      {formatAmount(entry.dueAmount)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-right font-medium text-success">
                      {formatAmount(entry.receivedAmount)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-right font-medium text-foreground">
                      {formatAmount(entry.outstandingAmount)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {entry.bookNo}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {entry.receiptNo}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {entry.paymentMode}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {entry.paidDate}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-5 py-4 text-right font-medium text-foreground">
                      {formatAmount(entry.paidAmount)}
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

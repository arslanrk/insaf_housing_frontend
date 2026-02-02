"use client";

import { Banknote, TrendingUp, Users } from "lucide-react";
import type { ClientProfileData } from "@/lib/client-profile-data";
import { cn } from "@/lib/utils";

interface ClientProfilePaymentDetailsProps {
  profile: ClientProfileData;
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ClientProfilePaymentDetails({ profile }: ClientProfilePaymentDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-6 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Banknote className="size-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Payment details</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Amounts and progress</p>
          </div>
        </div>
        <dl className="grid gap-0 sm:grid-cols-2">
          {[
            { label: "Net price", value: formatAmount(profile.netPrice), highlight: false },
            { label: "Total received %", value: `${profile.totalReceivedPercent}%`, highlight: false },
            { label: "Outstanding amount", value: formatAmount(profile.outstandingAmount), highlight: false },
            { label: "Received amount", value: formatAmount(profile.receivedAmount), highlight: "success" },
            { label: "Over due + surcharge amount", value: formatAmount(profile.overDueSurchargeAmount), highlight: false },
            { label: "Net price + surcharge amount", value: formatAmount(profile.netPriceSurchargeAmount), highlight: false },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="border-b border-border px-6 py-4 even:sm:border-s sm:border-b-0 hover:bg-muted/20 transition-colors">
              <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</dt>
              <dd className={cn("mt-1.5 text-sm font-medium", highlight === "success" && "text-success")}>
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-6 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <TrendingUp className="size-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Summary</h3>
            <p className="text-xs text-muted-foreground mt-0.5">House net sale, expenses & profit</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center rounded-lg bg-muted/20 px-4 py-3">
            <dt className="text-sm text-muted-foreground">House net sale amount</dt>
            <dd className="text-sm font-semibold text-foreground">
              {formatAmount(profile.houseNetSaleAmount)}
            </dd>
          </div>
          <div className="flex justify-between items-center rounded-lg bg-muted/20 px-4 py-3">
            <dt className="text-sm text-muted-foreground">House total expenses</dt>
            <dd className="text-sm font-semibold text-foreground">
              {formatAmount(profile.houseTotalExpenses)}
            </dd>
          </div>
          <div className={cn(
            "flex justify-between items-center rounded-xl px-4 py-4 border-2",
            profile.netProfit >= 0 ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"
          )}>
            <dt className="text-sm font-semibold text-foreground">Net profit</dt>
            <dd className={cn(
              "text-lg font-bold",
              profile.netProfit >= 0 ? "text-success" : "text-destructive"
            )}>
              {formatAmount(profile.netProfit)}
            </dd>
          </div>
        </div>
      </div>

      {profile.commissionDetails && profile.commissionDetails.length > 0 && (
        <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-6 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Commission detail</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{profile.commissionDetails.length} user{profile.commissionDetails.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4">User name</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {profile.commissionDetails.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{row.userName}</td>
                    <td className="px-6 py-4 text-right font-medium text-foreground">
                      {formatAmount(row.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

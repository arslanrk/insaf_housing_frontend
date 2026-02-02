"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, User, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getClientProfile, getClientPaymentLedger } from "@/lib/client-profile-data";
import { cn } from "@/lib/utils";
import { ClientProfileOverview } from "@/components/clients/profile/ClientProfileOverview";
import { ClientProfilePlotInfo } from "@/components/clients/profile/ClientProfilePlotInfo";
import { ClientProfilePaymentDetails } from "@/components/clients/profile/ClientProfilePaymentDetails";
import { ClientProfilePaymentLedger } from "@/components/clients/profile/ClientProfilePaymentLedger";

const TAB_VALUES = ["overview", "plot-info", "payment-details", "payment-ledger"] as const;

export default function ClientProfilePage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [activeTab, setActiveTab] = useState(TAB_VALUES[0]);

  const profile = getClientProfile(id);
  const paymentLedgerEntries = getClientPaymentLedger(id);

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-border bg-card px-6 py-20 shadow-sm">
        <span
          className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground"
          aria-hidden
        >
          <User className="size-8" />
        </span>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">Client not found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This client may have been removed or the link is incorrect.
          </p>
        </div>
        <Button asChild variant="outline" className="gap-2 rounded-lg">
          <Link href="/dashboard/clients">
            <ArrowLeft className="size-4" />
            Back to clients
          </Link>
        </Button>
      </div>
    );
  }

  const initials = profile.clientName
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const isActive = profile.status === "active";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-lg"
            aria-label="Back to clients"
          >
            <Link href="/dashboard/clients">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <Avatar className="size-14 rounded-xl ring-2 ring-border/50">
              <AvatarFallback className="rounded-xl bg-primary/10 text-lg font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-foreground truncate">
                {profile.clientName}
              </h1>
              <p className="text-sm text-muted-foreground truncate">{profile.cnic}</p>
              <span
                className={cn(
                  "mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                  isActive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                )}
              >
                {isActive ? (
                  <>
                    <CheckCircle2 className="size-3.5" aria-hidden />
                    Active
                  </>
                ) : (
                  <>
                    <XCircle className="size-3.5" aria-hidden />
                    Inactive
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as (typeof TAB_VALUES)[number])}>
        <TabsList className="w-full flex-wrap h-auto gap-1 sm:w-auto sm:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plot-info">Plot information</TabsTrigger>
          <TabsTrigger value="payment-details">Payment details</TabsTrigger>
          <TabsTrigger value="payment-ledger">Payment ledger</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ClientProfileOverview profile={profile} />
        </TabsContent>
        <TabsContent value="plot-info">
          <ClientProfilePlotInfo profile={profile} />
        </TabsContent>
        <TabsContent value="payment-details">
          <ClientProfilePaymentDetails profile={profile} />
        </TabsContent>
        <TabsContent value="payment-ledger">
          <ClientProfilePaymentLedger entries={paymentLedgerEntries} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

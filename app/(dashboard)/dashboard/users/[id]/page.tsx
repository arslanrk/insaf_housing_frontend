"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserById } from "@/lib/mock-users";
import { UserProfileOverview } from "@/components/users/profile/UserProfileOverview";
import { UserProfileClients } from "@/components/users/profile/UserProfileClients";
import { UserProfileSalary } from "@/components/users/profile/UserProfileSalary";
import { UserProfileCommission } from "@/components/users/profile/UserProfileCommission";
import { UserProfilePaymentLedger } from "@/components/users/profile/UserProfilePaymentLedger";

const TAB_VALUES = ["overview", "clients", "salary", "commission", "payment-ledger"] as const;

export default function UserProfilePage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [activeTab, setActiveTab] = useState(TAB_VALUES[0]);

  const user = getUserById(id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-border bg-card px-6 py-20 shadow-sm">
        <span className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground" aria-hidden>
          <User className="size-8" />
        </span>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">User not found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This user may have been removed or the link is incorrect.
          </p>
        </div>
        <Button asChild variant="outline" className="gap-2 rounded-lg">
          <Link href="/dashboard/users">
            <ArrowLeft className="size-4" />
            Back to users
          </Link>
        </Button>
      </div>
    );
  }

  const initials = user.name
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Button asChild variant="ghost" size="icon" className="shrink-0 rounded-lg" aria-label="Back to users">
            <Link href="/dashboard/users">
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
                {user.name}
              </h1>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as (typeof TAB_VALUES)[number])}>
        <TabsList className="w-full flex-wrap h-auto gap-1 sm:w-auto sm:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="payment-ledger">Payment Ledger</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <UserProfileOverview user={user} />
        </TabsContent>
        <TabsContent value="clients">
          <UserProfileClients user={user} />
        </TabsContent>
        <TabsContent value="salary">
          <UserProfileSalary user={user} />
        </TabsContent>
        <TabsContent value="commission">
          <UserProfileCommission user={user} />
        </TabsContent>
        <TabsContent value="payment-ledger">
          <UserProfilePaymentLedger user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

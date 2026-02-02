"use client";

import { Mail, Phone, CheckCircle2, XCircle, User } from "lucide-react";
import type { User as UserType } from "@/lib/mock-users";
import { cn } from "@/lib/utils";

interface UserProfileOverviewProps {
  user: UserType;
}

export function UserProfileOverview({ user }: UserProfileOverviewProps) {
  const isActive = user.status === "active";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-6 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <User className="size-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact & status</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Basic information</p>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <dl className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg bg-muted/20 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
                <Mail className="size-5" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</dt>
                <dd className="mt-0.5 text-sm font-medium text-foreground break-all">{user.email}</dd>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-muted/20 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
                <Phone className="size-5" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</dt>
                <dd className="mt-0.5 text-sm font-medium text-foreground">{user.phone}</dd>
              </div>
            </div>
          </dl>
          <div className="pt-4 border-t border-border">
            <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Status</dt>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
                isActive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              )}
            >
              {isActive ? (
                <>
                  <CheckCircle2 className="size-4" aria-hidden />
                  Active
                </>
              ) : (
                <>
                  <XCircle className="size-4" aria-hidden />
                  Inactive
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

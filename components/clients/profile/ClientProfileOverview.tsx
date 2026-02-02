"use client";

import { Mail, Phone, MapPin, FileText, CreditCard } from "lucide-react";
import type { ClientProfileData } from "@/lib/client-profile-data";

interface ClientProfileOverviewProps {
  profile: ClientProfileData;
}

export function ClientProfileOverview({ profile }: ClientProfileOverviewProps) {
  const rows = [
    { icon: FileText, label: "Registration no", value: profile.registrationNo || "—" },
    { icon: CreditCard, label: "CNIC no", value: profile.cnic },
    { icon: MapPin, label: "Address", value: profile.address || "—" },
    { icon: Phone, label: "Mobile", value: profile.mobile || "—" },
    { icon: Mail, label: "Email", value: profile.email || "—" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-6 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="size-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Overview</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Client contact & identification</p>
          </div>
        </div>
        <dl className="divide-y divide-border">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-foreground break-words">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

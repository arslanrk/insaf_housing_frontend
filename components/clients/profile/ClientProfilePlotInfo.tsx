"use client";

import { Home } from "lucide-react";
import type { ClientProfileData } from "@/lib/client-profile-data";

interface ClientProfilePlotInfoProps {
  profile: ClientProfileData;
}

export function ClientProfilePlotInfo({ profile }: ClientProfilePlotInfoProps) {
  const fields = [
    { label: "Block number", value: profile.blockNumber || "—" },
    { label: "House / Plot no", value: profile.housePlotNo || "—" },
    { label: "Type", value: profile.type || "—" },
    { label: "Street #", value: profile.streetNo || "—" },
    { label: "House size / Marla", value: profile.houseSizeMarla ? `${profile.houseSizeMarla} marla` : profile.houseSize || "—" },
    { label: "Story", value: profile.story || "—" },
    { label: "Booking date", value: profile.bookingDate || "—" },
    { label: "Society name", value: profile.societyName || "—" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-6 py-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Home className="size-5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Plot information</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Unit and location details</p>
          </div>
        </div>
        <dl className="grid gap-0 sm:grid-cols-2">
          {fields.map(({ label, value }) => (
            <div key={label} className="border-b border-border px-6 py-4 even:sm:border-s hover:bg-muted/20 transition-colors">
              <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</dt>
              <dd className="mt-1.5 text-sm font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

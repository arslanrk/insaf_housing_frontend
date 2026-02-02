"use client";

import { usePathname } from "next/navigation";
import { Menu, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/clients": "Clients",
  "/dashboard/units": "Units / Inventory",
  "/dashboard/bookings": "Bookings",
  "/dashboard/installments": "Installments",
  "/dashboard/payments": "Payments",
  "/dashboard/expenses": "Expenses",
  "/dashboard/reports": "Reports",
  "/dashboard/users": "Users",
};

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/dashboard/users/") && pathname !== "/dashboard/users") {
    return "User profile";
  }
  if (pathname.startsWith("/dashboard/clients/") && pathname !== "/dashboard/clients") {
    return "Client profile";
  }
  return PAGE_TITLES[pathname] ?? "Dashboard";
}

interface HeaderProps {
  onMenuClick?: () => void;
  className?: string;
}

export function Header({ onMenuClick, className }: HeaderProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-lg transition-colors hover:bg-muted/70"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 sm:flex">
          <span className="text-sm text-muted-foreground">Time period:</span>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-lg border-border font-normal text-foreground transition-colors hover:bg-muted/50"
          >
            <Calendar className="size-4" />
            This month
          </Button>
        </div>
        <Button size="sm" className="gap-2 rounded-lg transition-colors hover:opacity-90">
          <Plus className="size-4" />
          Add data
        </Button>
      </div>
    </header>
  );
}

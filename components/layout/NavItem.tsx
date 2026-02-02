"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItemConfig } from "./nav-config";
import { cn } from "@/lib/utils";

interface NavItemProps {
  item: NavItemConfig;
  expanded: boolean;
}

export function NavItem({ item, expanded }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      title={!expanded ? item.label : undefined}
      className={cn(
        "flex items-center rounded-xl py-2.5 text-sm font-medium transition-colors duration-200",
        expanded ? "gap-3 px-3" : "justify-center px-0",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:outline-none"
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      {expanded && <span className="truncate">{item.label}</span>}
    </Link>
  );
}

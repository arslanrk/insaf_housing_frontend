"use client";

import { Building2, PanelLeftClose, PanelLeft, LogOut, User } from "lucide-react";
import Link from "next/link";
import { navSections } from "./nav-config";
import { NavItem } from "./NavItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SidebarProps {
  expanded: boolean;
  onToggle?: () => void;
  className?: string;
  userName?: string;
  userRole?: string;
  userInitials?: string;
}

export function Sidebar({
  expanded,
  onToggle,
  className,
  userName = "User",
  userRole = "Admin",
  userInitials = "U",
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-border bg-card shadow-sm transition-[width] duration-200 ease-out",
        expanded ? "w-64" : "w-16",
        className
      )}
    >
      <div className="shrink-0 border-b border-border p-4">
        <div
          className={cn(
            "flex items-center gap-2",
            expanded ? "flex-row" : "flex-col"
          )}
        >
          <Link
            href="/dashboard"
            className={cn(
              "flex min-w-0 flex-1 items-center font-semibold text-foreground",
              expanded ? "gap-2" : "justify-center"
            )}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Building2 className="size-5" />
            </span>
            {expanded && <span className="truncate">Insaf Housing</span>}
          </Link>
          {onToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="shrink-0 rounded-lg transition-colors hover:bg-muted/70"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {expanded ? (
                <PanelLeftClose className="size-5" />
              ) : (
                <PanelLeft className="size-5" />
              )}
            </Button>
          )}
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-4" aria-label="Main navigation">
        {navSections.map((section, index) => (
          <div key={index}>
            {index > 0 && <Separator className="my-4" />}
            {expanded && section.title && (
              <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <NavItem item={item} expanded={expanded} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      {expanded && (
        <div className="shrink-0 border-t border-border p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex w-full items-center gap-3 rounded-xl px-0 hover:bg-muted/70"
                aria-label="User menu"
              >
                <Avatar className="size-9 shrink-0">
                  <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 truncate text-left">
                  <p className="truncate text-sm font-medium text-foreground">
                    {userName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {userRole}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <User className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {!expanded && onToggle && (
        <div className="shrink-0 border-t border-border p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-full rounded-xl"
                aria-label="User menu"
              >
                <Avatar className="size-8 shrink-0">
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="right" className="w-48">
              <DropdownMenuItem>
                <User className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </aside>
  );
}

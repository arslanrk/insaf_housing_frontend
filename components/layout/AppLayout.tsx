"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileSidebar } from "./MobileSidebar";
import { cn } from "@/lib/utils";

const SIDEBAR_STORAGE_KEY = "sidebar-expanded";

function getStoredSidebarExpanded(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return stored !== "false";
  } catch {
    return true;
  }
}

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    setSidebarExpanded(getStoredSidebarExpanded());
  }, []);

  const handleSidebarToggle = () => {
    setSidebarExpanded((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <>
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />
      <div
        className={cn(
          "grid h-dvh w-full bg-background md:grid-rows-[auto_1fr]",
          sidebarExpanded ? "md:grid-cols-[16rem_1fr]" : "md:grid-cols-[4rem_1fr]",
          className
        )}
      >
        <aside className="hidden md:block md:row-span-2 md:overflow-y-auto">
          <Sidebar
            expanded={sidebarExpanded}
            onToggle={handleSidebarToggle}
          />
        </aside>
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="min-h-0 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </>
  );
}

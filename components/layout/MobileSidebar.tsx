"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

export function MobileSidebar({ open, onClose, className }: MobileSidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 md:hidden",
          open ? "block" : "hidden"
        )}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={-1}
        aria-hidden={!open}
        aria-label="Close menu"
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
          className
        )}
        aria-modal={open}
        aria-label="Navigation menu"
      >
        <Sidebar expanded className="h-full border-r-0" />
      </div>
    </>
  );
}

import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  CreditCard,
  Wallet,
  Receipt,
  BarChart3,
  UserCog,
} from "lucide-react";

export interface NavItemConfig {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSectionConfig {
  title?: string;
  items: NavItemConfig[];
}

export const navSections: NavSectionConfig[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Clients", href: "/dashboard/clients", icon: Users },
      { label: "Units / Inventory", href: "/dashboard/units", icon: Building2 },
      { label: "Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
    ],
  },
  {
    title: "Financial",
    items: [
      { label: "Installments", href: "/dashboard/installments", icon: CreditCard },
      { label: "Payments", href: "/dashboard/payments", icon: Wallet },
      { label: "Expenses", href: "/dashboard/expenses", icon: Receipt },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
      { label: "Users", href: "/dashboard/users", icon: UserCog },
    ],
  },
];

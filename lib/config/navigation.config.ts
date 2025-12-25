import {
  Camera,
  CreditCard,
  LayoutDashboard,
  LucideIcon,
  Settings,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import { UserRole } from "../types";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface NavigationConfig {
  [key: string]: NavigationItem[];
}

// Navigation items for user role

export const userNavigation: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard/user",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    href: "/dashboard/user/profile",
    icon: User,
  },
  {
    name: "Headshots",
    href: "/dashboard/user/headshots",
    icon: Camera,
  },
  {
    name: "Credits",
    href: "/dashboard/user/credits",
    icon: CreditCard,
  },
];

// Navigation items for admin role


export const adminNavigation: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
    badge: "new"
  },
  {
    name: "Orders",
    href: "/dashboard/admin/orders",
    icon: ShoppingCart,
  }
];



// Get navigation config based on user role

export function getNavigationConfig(role?: UserRole): NavigationItem[]{
    switch(role){
        case UserRole.ADMIN:
            return adminNavigation;
        case UserRole.USER:
            return userNavigation;
        default:
            return userNavigation;
    }
}
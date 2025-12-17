import { UserRole } from "../types";

export function isAdmin(role?: UserRole): boolean {
  return role === UserRole.ADMIN;
}

export function isUser(role?: UserRole): boolean {
  return role === UserRole.USER;
}

export function getDashboardPath(role?: UserRole): string {
  return isAdmin(role) ? "/dashboard/admin" : "/dashboard/user";
}

export function getRoleDisplayName(role?: UserRole): string {
  if (!role) return "Unknown";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

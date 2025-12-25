"use client";

import { useUser } from "@/lib/context";
import { useLogout } from "@/lib/hooks";
import { getDashboardPath } from "@/lib/util/role-util";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { Icon, LogOut } from "lucide-react";
import { getNavigationConfig } from "@/lib/config/navigation.config";
import { ThemeToggle } from "@/components/theme-toggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const DashboardLayout = ({ children, onLogout }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // useLogout hook
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const { user } = useUser();

  const userRole = user?.role;

  const navigationItems = getNavigationConfig(userRole);


  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href={"/"}
            className="text-lg font-semibold text-foreground"
          >
            Headshot Pro Build
          </Link>

          {/* Right Side - Theme Toggle, User & Logout */}
          <div className="flex items-center gap-3">
            {/*Theme toggle */}
            <ThemeToggle />
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {user?.name || "User"}
              </p>
            </div>
            <Button
                onClick={handleLogout}
              disabled={isLoggingOut}
              variant="outline"
              size="sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* sidebar */}
        
          {navigationItems.length > 0 && (
            <aside className="hidden w048 shrink-0 md:block">
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                 

                  const Icon = item.icon;
                  const isExactMatch = pathname === item.href;

                  const isChildRoute =
                    pathname.startsWith(item.href + "/") &&
                    !item.href.endsWith("/user") &&
                    !item.href.endsWith("admin");

                  const isActive = isExactMatch || isChildRoute;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />

                      <span>{item.name}</span>
                    
                      {item.badge && (
                        <span className={`ml-auto rounded-full ${isActive ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary/60"}  px-2 py-0.5 text-xs`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          )}
          {/* Main Content Area */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

"use client";

import { Users, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your platform and users
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/admin/users">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">User Management</h2>
                <p className="text-muted-foreground">
                  Manage users, roles, and credits
                </p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/admin/orders">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Order Management</h2>
                <p className="text-muted-foreground">
                  Create manual orders for users
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}

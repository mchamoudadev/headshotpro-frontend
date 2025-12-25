"use client";
import {
  useAdminOrders,
  useAdminUsers,
  useCreateManualOrder,
  useGetCreditPackages,
} from "@/lib/hooks";
import { useState } from "react";

import { ShoppingCart, Plus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Order, PaymentPlatform, PaymentStatus } from "@/lib/types";
import { toast } from "sonner";

const AdminOrdersPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [status, setStatus] = useState<PaymentStatus | undefined>(PaymentStatus.COMPLETED);
  const [platform, setPlatform] = useState<PaymentPlatform | undefined>("STRIPE");
  const { data: usersData } = useAdminUsers();
  const { data: packagesData } = useGetCreditPackages();
  const { data: ordersData, isLoading } = useAdminOrders({ page, limit, status, platform });
  const createOrder = useCreateManualOrder();

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [packageId, setPackageId] = useState("");
  const [amount, setAmount] = useState("");

  const handleCreate = async () => {
    if (!userId || !packageId || !amount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await createOrder.mutateAsync({
        userId,
        packageId,
        amount: Number(amount),
      });
      toast.success("Order created successfully");
      setOpen(false);
      setUserId("");
      setPackageId("");
      setAmount("");
    } catch (error: any) {
      toast.error(error?.message || "Failed to create order");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <ShoppingCart className="h-8 w-8" />
            Order Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Create manual orders for users
          </p>
        </div>

        {/* Create Order Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Manual Order</DialogTitle>
            </DialogHeader>
            {/* Form */}
            <div className="space-y-4">
              {/* Select User */}
              <div className="space-y-2">
                <Label>Select User</Label>
                <Select value={userId} onValueChange={setUserId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {usersData?.users.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.email} ({user.credits} credits)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Select Package */}
              <div className="space-y-2">
                <Label>Select Package</Label>
                <Select
                  value={packageId}
                  onValueChange={(val) => {
                    setPackageId(val);
                    const pkg = packagesData?.find((p: any) => p._id === val);
                    if (pkg) setAmount(pkg.price.toString());
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    {packagesData?.map((pkg: any) => (
                      <SelectItem key={pkg._id} value={pkg._id}>
                        {pkg.name} - {pkg.credits} credits (${pkg.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label>Amount ($)</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleCreate}
                disabled={
                  !userId || !packageId || !amount || createOrder.isPending
                }
                className="w-full"
              >
                {createOrder.isPending ? "Creating..." : "Create Order"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* All Orders Table */}
      <Card className="p-6">
        {/* Table Header */}
        <h2 className="text-xl font-semibold mb-4">All Orders</h2>

        <div className="flex items-center gap-2">
          <Select value={platform} onValueChange={(val) => setPlatform(val as PaymentPlatform)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STRIPE">Stripe</SelectItem>
              <SelectItem value="EVC">EVC</SelectItem>
              <SelectItem value="ZAAD">ZAAD</SelectItem>
              <SelectItem value="SAHAL">SAHAL</SelectItem>
              <SelectItem value="EBIR">EBIR</SelectItem>
              <SelectItem value="LOCAL">LOCAL</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select value={status} onValueChange={(val) => setStatus(val as PaymentStatus)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="PROCESSING">Processing</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
            <SelectItem value="REFUNDED">Refunded</SelectItem>
          </SelectContent>
        </Select>

        {/* Table Body (Loading, No Orders, Orders) */}
        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="h-10 w-10 mx-auto text-muted-foreground mb-4 animate-spin" />
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        ) : ordersData?.orders?.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground">
              Create your first manual order using the button above.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersData?.orders?.map((order: Order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    {typeof order.user === "object" && order.user
                      ? (order.user as any).email
                      : typeof order.user === "string"
                      ? order.user
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {typeof order.package === "object" && order.package
                      ? (order.package as any).name
                      : typeof order.package === "string"
                      ? order.package
                      : "-"}
                  </TableCell>
                  <TableCell>${order.amount}</TableCell>
                  <TableCell>{order.credits}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.platform}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === PaymentStatus.COMPLETED
                          ? "default"
                          : order.status === PaymentStatus.PENDING
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {ordersData?.pagination && ordersData.pagination.pages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              Page {page} of {ordersData.pagination.pages} (
              {ordersData.pagination.total} total)
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => p - 1)}
                    className={
                      page === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => p + 1)}
                    className={
                      page >= ordersData.pagination.pages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminOrdersPage;

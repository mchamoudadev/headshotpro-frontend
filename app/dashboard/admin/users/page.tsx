"use client";

import React, { useState } from "react";

import {
  useAddCredits,
  useDeleteUser,
  useAdminUsers,
  useUpdateUserRole,
} from "@/lib/hooks/useAdmin";
import { User, UserRole } from "@/lib/types/user.types";
import { Coins, Loader2, Shield, Trash2, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const UsersPage = () => {
  const { data, isLoading } = useAdminUsers();
  const updateRole = useUpdateUserRole();
  const addCredits = useAddCredits();
  const deleteUser = useDeleteUser();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [creditsDialogOpen, setCreditsDialogOpen] = useState(false);
  const [credits, setCredits] = useState("");


  const handleUpdateRole = async (role: UserRole) => {
    if (!selectedUser) return;
    try {
      await updateRole.mutateAsync({ userId: selectedUser._id, role });
      toast.success('Role updated successfully');
      setRoleDialogOpen(false);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update role');
    }
  };


  const handleAddCredits = async () => {
    if (!selectedUser || !credits) return;
    try {
      await addCredits.mutateAsync({ userId: selectedUser._id, credits: Number(credits) });
      toast.success(`Added ${credits} credits`);
      setCreditsDialogOpen(false);
      setCredits('');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to add credits');
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser.mutateAsync(userId);
      toast.success('User deleted successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete user');
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <Users className="h-8 w-8" />
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage users, roles, and credits
          </p>
        </div>
      </div>

      {/* User Table */}
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name || "-"}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.credits}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.isEmailVerified ? "default" : "destructive"}
                  >
                    {user.isEmailVerified ? "Verified" : "Unverified"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog
                      open={roleDialogOpen && selectedUser?._id === user._id}
                      onOpenChange={setRoleDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Role</DialogTitle>
                        </DialogHeader>
                        <Select
                        onValueChange={(value) => handleUpdateRole(value as UserRole)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={UserRole.USER}>User</SelectItem>
                            <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={creditsDialogOpen && selectedUser?._id === user._id}
                      onOpenChange={setCreditsDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Coins className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Credits</DialogTitle>
                        </DialogHeader>
                        <Input
                          type="number"
                          placeholder="Enter credits"
                          value={credits}
                          onChange={(e) => setCredits(e.target.value)}
                        />
                        <Button
                          onClick={handleAddCredits}
                          disabled={!credits}
                        >
                          Add Credits
                        </Button>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete User</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {user.email}? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                          onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default UsersPage;

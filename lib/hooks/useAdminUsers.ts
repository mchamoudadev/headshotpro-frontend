import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminUserService } from "../services";
import { UserRole } from "../types/user.types";


export const useAdminUsers = () => {
    return useQuery({
        queryKey: ['admin-users'],
        queryFn: () => adminUserService.getAllUsers(),
    });
}

export const useUpdateUserRole = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { userId: string, role: UserRole }) => adminUserService.updateUserRole(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        },
    })
}

export const useAddCredits = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { userId: string, credits: number }) => adminUserService.addCredits(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        },
    })
}

export const useDeleteUser = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: string) => adminUserService.deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        },
    })
}
import { api } from "../api";
import { User, UserRole } from "../types/user.types";

export const adminUserService = {  



    getAllUsers: async () => {
        return api.get<{ users: User[], total: number }>('/admin/users');
    },

    updateUserRole: async (data: { userId: string, role: UserRole }) => {
        return api.put<User>(`/admin/users/role`, data);
    },

    addCredits: async (data: { userId: string, credits: number }) => {
        return api.post<{ user: User , addedCredits: number }>(`/admin/users/credits`, data);
    },

    deleteUser: async (userId: string) => {
        return api.delete<void>(`/admin/users/${userId}`);
    },
 }
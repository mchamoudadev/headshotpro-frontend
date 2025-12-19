import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoginInput, RegisterInput } from "@/lib/types"
import { authService } from "@/lib/services"
import { error } from "console"

export const authKeys = {
    all: ['auth'] as const,
    currentUser: () => [...authKeys.all, 'currentUser'] as const,
}

export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterInput)=> authService.register(data)
    })
}

export function useVerifyemail() {
    return useMutation({
        mutationFn: (token: string) => authService.verifyEmail(token)
    })
}

export function useResendVerification() {
    return useMutation({
        mutationFn: (email: string) => authService.resendVerification(email)
    })
}

export function useLogin() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginInput) => authService.login(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: authKeys.currentUser() })
        }
    })
}

export function useCurrentUser(options?: { redirectOnError? : boolean}) {
    return useQuery({
        queryKey: authKeys.all,
        queryFn: () => authService.getCurrentUser(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
        throwOnError: (error: any) => {
            // only redirect if explictly request 
            if(options?.redirectOnError && typeof window !== "undefined"){
                window.location.href ="/login"
            }
            return false
        }
    })
}

export function useLogout() {
    return useMutation({
        mutationFn: () => authService.logout()
    })
}
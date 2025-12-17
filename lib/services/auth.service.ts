import { api } from "../api";
import { CurrentUserResponse, LoginInput, LoginResponse, RegisterInput, RegisterResponse, User, VerifyEmailResponse } from "../types";



export  const authService = {

    //  register new user

    register: async(data: RegisterInput): Promise<RegisterResponse> => {
        return api.post<RegisterResponse>('/auth/register', data)
    },

    // verify email

    verifyEmail: async(token: string) : Promise<VerifyEmailResponse> => {
        return api.get<VerifyEmailResponse>(`/auth/verify-email?token=${token}`)
    },

    // resend verification email

    resendVerification: async(email: string) : Promise<VerifyEmailResponse> => {
        return api.post<VerifyEmailResponse>('/auth/resend-verification', { email })
    },


    // login
    login: async(data: LoginInput) : Promise<LoginResponse> => {
        return api.post<LoginResponse>('/auth/login', data)
    },

    // get current user

    getCurrentUser: async() : Promise<CurrentUserResponse> => {
        return api.get<CurrentUserResponse>('/auth/me')
    },
    
}
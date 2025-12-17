export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}


export interface User {
    id: string;
    email: string;
    name?: string;
    role: UserRole;
    credits: number;
    isEmailVerified: boolean;
    isActive?: boolean; // Optional for backward compatibility
    createdAt?: string;
    updatedAt?: string;
}
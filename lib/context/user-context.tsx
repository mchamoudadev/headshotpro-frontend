"use client";

import { createContext, useContext, ReactNode } from "react";
import { User } from "../types";


interface UserContextType {
    user: User | null;
}

interface UserProviderProps {
    children: ReactNode;
    user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, user} : UserProviderProps) {

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )

}


export function useUser() {

    const context = useContext(UserContext);

    if(!context){
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
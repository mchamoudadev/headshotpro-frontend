"use client"

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryCient } from "./client";
import { useState } from "react";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

export function QueryProvider({children}: {children: React.ReactNode}) {
    const [queryClient]  = useState(()=> getQueryCient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
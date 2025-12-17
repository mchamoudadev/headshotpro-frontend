// Query Configuration

import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: process.env.NODE_ENV === "production",
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;


export function getQueryCient() {

    if(typeof window === 'undefined'){
        // server : Always make a new client
        return makeQueryClient()
    }else{
        // client
        if(!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
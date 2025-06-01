"use client";

import { PropsWithChildren } from "react";
// Update the import path if the file is located elsewhere, for example:
import { queryClient, trpc } from "../trpc/client"; // Adjust the path as needed

// Or, if the file does not exist, create 'client.ts' in the correct directory with the following content:
// export const queryClient = ...;
// export const trpc = ...;
// export const trpcClient = ...;
import { QueryClientProvider } from "@tanstack/react-query";

export default function TrpcProvider({
  children,
}: PropsWithChildren){
    return(
        <trpc.Provider queryClient={queryClient}> 
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        </trpc.Provider>
    )

}
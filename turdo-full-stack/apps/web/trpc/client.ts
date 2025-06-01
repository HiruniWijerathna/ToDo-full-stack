import { createTRPCReact, CreateTRPCReact, httpBatchLink } from "@trpc/react-query";


// Update the import path below to the actual location of your AppRouter export.
// For example, if it's in 'packages/trpc/src/router.ts', use the relative path:
// Update the path below to the correct location of your AppRouter export.
// Example: If AppRouter is in 'packages/trpc/router.ts', use the correct relative path.
// Update the path below to the correct location of your AppRouter export.
// Example: If AppRouter is in 'packages/trpc/src/router.ts', use the correct relative path.
// Update the path below to the correct location of your AppRouter export.
// Example: If AppRouter is in 'packages/trpc/router.ts', use the correct relative path.
// Update the path below to the correct location of your AppRouter export.
// Example: If AppRouter is in 'packages/trpc/src/router.ts', use the correct relative path.
// TODO: Update the path below to the correct location of your AppRouter export.
// Example: If AppRouter is in 'packages/trpc/router.ts', use the correct relative path.
// Update the import path below to the actual location of your AppRouter export.
// Example: If AppRouter is in '../../packages/trpc/src/router.ts', use the correct relative path.
// TODO: Update the path below to the correct location of your AppRouter export.
// Example: If AppRouter is in '../../packages/trpc/src/router.ts', use the correct relative path.
import { AppRouter } from "../../packages/trpc/src/router";
import { QueryClient } from "@tanstack/react-query";


export const trpc: CreateTRPCReact<AppRouter, object > = createTRPCReact<AppRouter,object>();

export const queryClient = new QueryClient()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_TRPC_URL ! 
    })
  ]
});
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { QueryClient } from '@tanstack/react-query';

import { AppRouter } from '@repo/trpc/router'


// ✅ Create tRPC React instance
export const trpc = createTRPCReact<AppRouter>();

// ✅ React Query Client
export const queryClient = new QueryClient();

// ✅ tRPC Client
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      // ✅ Set TRPC URL properly
      url: process.env.NEXT_PUBLIC_TRPC_URL || 'http://localhost:3000/api/trpc',
    }),
  ],
});

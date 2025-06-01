import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { createTRPCProxyClient } from '@trpc/client';
import type { AppRouter } from '@repo/trpc/router'; // use `type` import for types only
import { QueryClient } from '@tanstack/react-query';

// Create tRPC React hooks bound to your router type
export const trpc = createTRPCReact<AppRouter>();

// React Query client instance to use in your app
export const queryClient = new QueryClient();

// Factory to create tRPC client for server communication
export const createTrpcClient = (url: string) => {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url,
      }),
    ],
  });
};

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../api/query-client";

export function Provides({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

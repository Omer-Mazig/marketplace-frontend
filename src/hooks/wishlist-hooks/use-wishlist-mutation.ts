import {
  QueryClient,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Product } from "@/types/products.types";
import { useToast } from "@/components/ui/use-toast";
import { LoggedInUser, useAuth } from "@/providers/auth-provider";

// Define the strategy type
export type UpdateStrategy = (
  queryKey: QueryKey,
  currentProduct: Product,
  queryClient: QueryClient,
  loggedInUser: LoggedInUser | null | undefined
) => void;

interface UseWishlistMutationOptions {
  mutationFn: (productId: number) => Promise<void>;
  updateStrategies: { [key: string]: UpdateStrategy };
  product: Product;
  queryKey: QueryKey;
  successMessage: string;
  errorMessage: string;
}

export function useWishlistMutation({
  mutationFn,
  updateStrategies,
  product,
  queryKey,
  successMessage,
  errorMessage,
}: UseWishlistMutationOptions) {
  const queryClient = useQueryClient();
  const { loggedInUser } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => mutationFn(product.id),

    // Optimistic update
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      // Snapshot of previous data for rollback
      const previousData = queryClient.getQueryData(queryKey);

      // Get the base query key to match the strategy
      const baseQueryKey = Array.isArray(queryKey) ? queryKey[0] : queryKey;

      // Run the appropriate strategy based on the queryKey
      const strategy = updateStrategies[baseQueryKey];
      if (strategy) {
        strategy(queryKey, product, queryClient, loggedInUser);
      }

      // Pass the snapshot for rollback
      return { previousData };
    },

    onError: (err, _variables, context) => {
      // Rollback to the previous state
      queryClient.setQueryData(queryKey, context?.previousData);

      toast({
        variant: "destructive",
        title: err?.message || "Something went wrong.",
        description: errorMessage,
      });
    },

    onSuccess: () => {
      toast({
        description: successMessage,
      });
    },
  });
}

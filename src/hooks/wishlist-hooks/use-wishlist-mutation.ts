import {
  QueryClient,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Product } from "@/types/products.types";
import { useToast } from "@/components/ui/use-toast";
import { LoggedInUser, useAuth } from "@/providers/auth-provider";
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

// Define the strategy type
export type UpdateStrategy = (
  queryKey: QueryKey,
  currentProduct: Product,
  queryClient: QueryClient,
  loggedInUser: LoggedInUser | null | undefined
) => void;

// Explicitly restrict AllowedUpdateStrategies to only these 3 keys
// (not include 'test' for exmple)
export type AllowedUpdateStrategies = Partial<{
  [key in (typeof QUERY_KEY_DICT)[keyof typeof QUERY_KEY_DICT] as key extends
    | "user-profile-data"
    | "products"
    | "product"
    ? key
    : never]: UpdateStrategy;
}>;

// TODO: fix: updateStrategies can handle key that are not included
interface UseWishlistMutationOptions {
  mutationFn: (productId: number) => Promise<void>;
  updateStrategies: AllowedUpdateStrategies;
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

      // Ensure baseQueryKey is a valid key in updateStrategies
      if (baseQueryKey in updateStrategies) {
        const strategy =
          updateStrategies[baseQueryKey as keyof typeof updateStrategies];
        strategy?.(queryKey, product, queryClient, loggedInUser);
      } else {
        console.warn(`No update strategy found for query key: ${baseQueryKey}`);
        throw new Error(
          `No update strategy found for query key: ${baseQueryKey}`
        );
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

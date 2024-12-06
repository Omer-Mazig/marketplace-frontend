// Third-party libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Custom hooks
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/auth-provider";

// Types
import { UseWishlistMutationOptions } from "./interfaces";

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

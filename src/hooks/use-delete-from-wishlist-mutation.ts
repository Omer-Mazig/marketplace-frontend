import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types/products.types";
import { deleteFromWishlist } from "@/services/wishlist.service";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/auth-provider";

export function useDeleteFromWishlistMutation(
  product: Product,
  queryKey: QueryKey
) {
  const queryClient = useQueryClient();
  const { loggedInUser } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => deleteFromWishlist(product.id),

    // Optimistic update
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      // Snapshot of previous data for rollback
      const previousData = queryClient.getQueryData(queryKey);

      // Optimistically update for 'user-profile-data' (WishlistItem)
      if (queryKey[0] === "user-profile-data") {
        queryClient.setQueryData(queryKey, (oldData: any) => {
          if (!oldData) return oldData;

          // Remove product from wishlist
          return {
            ...oldData,
            wishlist: oldData.wishlist.filter(
              (item: Product) => item.id !== product.id
            ),
          };
        });
      }

      // Optimistically update for 'products' (AddToWishlistBtn)
      if (queryKey[0] === "products" && loggedInUser) {
        queryClient.setQueryData(queryKey, (oldData: Product[] | undefined) => {
          if (!oldData) return oldData;

          return oldData.map((p) =>
            p.id === product.id
              ? {
                  ...p,
                  wishlistUsers: p.wishlistUsers.filter(
                    (user) => user.id !== loggedInUser.id
                  ),
                }
              : p
          );
        });
      }

      return { previousData }; // Pass the snapshot for rollback
    },

    onError: (err, variables, context) => {
      // Rollback to the previous state
      queryClient.setQueryData(queryKey, context?.previousData);

      toast({
        variant: "destructive",
        title: err?.message || "Something went wrong.",
        description: `There was a problem removing from your wishlist. Please try again later.`,
      });
    },

    onSuccess: () => {
      toast({
        description: `${product.name} was removed from your wishlist.`,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

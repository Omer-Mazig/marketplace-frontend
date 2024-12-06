import {
  QueryClient,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Product } from "@/types/products.types";
import { deleteFromWishlist } from "@/services/wishlist.service";
import { useToast } from "@/components/ui/use-toast";
import { LoggedInUser, useAuth } from "@/providers/auth-provider";

// Define the strategy type
type UpdateStrategy = (
  queryKey: QueryKey,
  product: Product,
  queryClient: QueryClient, // or any?
  loggedInUser?: LoggedInUser | null | undefined
) => void;

// Strategy for 'user-profile-data'
const userProfileStrategy: UpdateStrategy = (
  queryKey,
  currentProduct,
  queryClient
) => {
  queryClient.setQueryData(queryKey, (data: any) => {
    if (!data) return data;

    return {
      ...data,
      wishlist: data.wishlist.filter(
        (p: Product) => p.id !== currentProduct.id
      ),
    };
  });
};

// Strategy for 'products'
const productsStrategy: UpdateStrategy = (
  queryKey,
  currentProduct,
  queryClient,
  loggedInUser
) => {
  queryClient.setQueryData(queryKey, (products: Product[] | undefined) => {
    if (!products) return;

    return products.map((p) =>
      p.id === currentProduct.id
        ? {
            ...p,
            wishlistUsers: p.wishlistUsers.filter(
              (user) => user.id !== loggedInUser?.id
            ),
          }
        : p
    );
  });
};

// Strategy for 'product'
const productStrategy: UpdateStrategy = (
  queryKey,
  _currentProduct,
  queryClient,
  loggedInUser
) => {
  queryClient.setQueryData(queryKey, (product: Product | undefined) => {
    if (!product) return;
    return {
      ...product,
      wishlistUsers: product.wishlistUsers.filter(
        (user) => user.id !== loggedInUser?.id
      ),
    };
  });
};

// Strategy map
const updateStrategies: { [key: string]: UpdateStrategy } = {
  "user-profile-data": userProfileStrategy,
  products: productsStrategy,
  product: productStrategy,
  // Add more strategies as needed
};

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
        description: `There was a problem removing from your wishlist. Please try again later.`,
      });
    },

    onSuccess: () => {
      toast({
        description: `${product.name} was removed from your wishlist.`,
      });
    },

    // TODO: decide if invalidateQueries needed or not
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey });
    // },
  });
}

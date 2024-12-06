import {
  QueryClient,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Product } from "@/types/products.types";
import { addToWishlist } from "@/services/wishlist.service";
import { useToast } from "@/components/ui/use-toast";
import { LoggedInUser, useAuth } from "@/providers/auth-provider";

// Define the strategy type
type UpdateStrategy = (
  queryKey: QueryKey,
  product: Product,
  queryClient: QueryClient, // or any?
  loggedInUser?: LoggedInUser | null | undefined
) => void;

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
    if (!loggedInUser) return;
    return {
      ...product,
      wishlistUsers: [
        ...product.wishlistUsers,
        {
          id: loggedInUser.id,
          email: loggedInUser?.email,
          firstName: loggedInUser?.firstName,
          lastName: loggedInUser?.lastName,
          imageUrl: loggedInUser?.imageUrl,
        },
      ],
    } satisfies Product;
  });
};

// Strategy map
const updateStrategies: { [key: string]: UpdateStrategy } = {
  products: productsStrategy,
  product: productStrategy,
  // Add more strategies as needed
};

// TODO: handle strategy for ProductDetails
export function useAddToWishlistMutation(product: Product, queryKey: QueryKey) {
  const queryClient = useQueryClient();
  const { loggedInUser } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => addToWishlist(product.id),

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
        title: err?.message || "Somthing want wrong.",
        description: `There was a problem saving ${product.name} to your wishlist. Please try again later`,
      });
    },
    onSuccess: () => {
      toast({
        description: `${product.name} was added to your wishlist.`,
      });
    },
  });
}

// // TODO: handle strategy for ProductDetails
// export function useAddToWishlistMutation(product: Product, queryKey: QueryKey) {
//   const queryClient = useQueryClient();
//   const { loggedInUser } = useAuth();
//   const { toast } = useToast();

//   return useMutation({
//     mutationFn: () => addToWishlist(product.id),

//     // Optimistic update
//     onMutate: async () => {
//       const previousProducts = queryClient.getQueryData<Product[]>([
//         "products",
//       ]);

//       queryClient.setQueryData(
//         ["products"],
//         previousProducts?.map((p) =>
//           p.id === product.id
//             ? { ...p, wishlistUsers: [...p.wishlistUsers, loggedInUser] }
//             : p
//         )
//       );

//       return { previousProducts };
//     },
//     onError: (err, vars, context) => {
//       queryClient.setQueryData(["products"], context?.previousProducts);
//       toast({
//         variant: "destructive",
//         title: err?.message || "Somthing want wrong.",
//         description: `There was a problem saving ${product.name} to your wishlist. Please try again later`,
//       });
//     },
//     onSuccess: () => {
//       toast({
//         description: `${product.name} was added to your wishlist.`,
//       });
//     },
//   });
// }

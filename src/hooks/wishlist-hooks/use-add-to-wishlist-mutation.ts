import { addToWishlist } from "@/services/wishlist.service";
import {
  AllowedUpdateStrategies,
  UpdateStrategy,
  useWishlistMutation,
} from "./use-wishlist-mutation";
import { Product } from "@/types/products.types";
import { QueryKey } from "@tanstack/react-query";

//TODO: figure out return type (baba is allowed) type for data
export const productsStrategy: UpdateStrategy = (
  queryKey,
  currentProduct,
  queryClient,
  loggedInUser
) => {
  queryClient.setQueryData(queryKey, (products: Product[] | undefined) => {
    if (!products) return;
    if (!loggedInUser) return;

    return products.map((product) =>
      product.id === currentProduct.id
        ? {
            ...product,
            wishlistUsers: [
              ...product.wishlistUsers,
              {
                id: loggedInUser.id,
                email: loggedInUser?.email,
                firstName: loggedInUser?.firstName,
                lastName: loggedInUser?.lastName,
                imageUrl: loggedInUser?.imageUrl,
                // baba: 2,
              },
            ],
          }
        : product
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

export function useAddToWishlistMutation(product: Product, queryKey: QueryKey) {
  const updateStrategies: AllowedUpdateStrategies = {
    products: productsStrategy,
    product: productStrategy,
  };

  return useWishlistMutation({
    mutationFn: addToWishlist,
    updateStrategies,
    product,
    queryKey,
    successMessage: `${product.name} was added to your wishlist.`,
    errorMessage: `There was a problem saving ${product.name} to your wishlist. Please try again later.`,
  });
}

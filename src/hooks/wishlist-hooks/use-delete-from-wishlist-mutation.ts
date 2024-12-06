// Third-party libraries
import { QueryKey } from "@tanstack/react-query";

// Services
import { deleteFromWishlist } from "@/services/wishlist.service";

// Hooks
import { useWishlistMutation } from "./use-wishlist-mutation";

// Types
import { Product } from "@/types/products.types";
import { UserProfileData } from "@/types/users.types";
import { AllowedUpdateStrategies, UpdateStrategy } from "./types";

const userProfileStrategy: UpdateStrategy = (
  queryKey,
  currentProduct,
  queryClient
) => {
  queryClient.setQueryData(queryKey, (data: UserProfileData) => {
    if (!data) return;

    return {
      ...data,
      wishlist: data.wishlist.filter(
        (product) => product.id !== currentProduct.id
      ),
    };
  });
};

const productsStrategy: UpdateStrategy = (
  queryKey,
  currentProduct,
  queryClient,
  loggedInUser
) => {
  queryClient.setQueryData(queryKey, (products: Product[] | undefined) => {
    if (!products) return;

    return products.map((product) =>
      product.id === currentProduct.id
        ? {
            ...product,
            wishlistUsers: product.wishlistUsers.filter(
              (user) => user.id !== loggedInUser?.id
            ),
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
    return {
      ...product,
      wishlistUsers: product.wishlistUsers.filter(
        (user) => user.id !== loggedInUser?.id
      ),
    };
  });
};

export function useDeleteFromWishlistMutation(
  product: Product,
  queryKey: QueryKey
) {
  const updateStrategies: AllowedUpdateStrategies = {
    "user-profile-data": userProfileStrategy,
    products: productsStrategy,
    product: productStrategy,
  };

  return useWishlistMutation({
    mutationFn: deleteFromWishlist,
    updateStrategies,
    product,
    queryKey,
    successMessage: `${product.name} was removed from your wishlist.`,
    errorMessage: `There was a problem removing ${product.name} from your wishlist. Please try again later.`,
  });
}

// Types
import { Product } from "@/types/products.types";
import { AllowedUpdateStrategies } from "./types";

// Third-party libraries
import { QueryKey } from "@tanstack/react-query";

/**
 * Configuration options for a wishlist-related mutation.
 *
 * @property mutationFn - The asynchronous function that performs the mutation.
 *    It receives the product ID to be added/removed from the wishlist and returns a Promise.
 *
 * @property updateStrategies - A collection of update strategies mapped to specific query keys.
 *    This defines how the React Query cache should be updated after the mutation.
 *    - Must follow the `AllowedUpdateStrategies` type.
 *
 * @property product - The product being mutated.
 *
 * @property queryKey - The key used to identify the React Query cache entry for this operation.
 *
 * @property successMessage - A string to display when the mutation succeeds.
 *
 * @property errorMessage - A string to display when the mutation fails.
 */
export interface UseWishlistMutationOptions {
  mutationFn: (productId: number) => Promise<void>;
  updateStrategies: AllowedUpdateStrategies;
  product: Product;
  queryKey: QueryKey;
  successMessage: string;
  errorMessage: string;
}

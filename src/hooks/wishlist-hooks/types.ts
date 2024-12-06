import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";
import { LoggedInUser } from "@/providers/auth-provider";
import { Product } from "@/types/products.types";
import { QueryClient, QueryKey } from "@tanstack/react-query";

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

export interface UseWishlistMutationOptions {
  mutationFn: (productId: number) => Promise<void>;
  updateStrategies: AllowedUpdateStrategies;
  product: Product;
  queryKey: QueryKey;
  successMessage: string;
  errorMessage: string;
}

import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";
import { LoggedInUser } from "@/providers/auth-provider";
import { Product } from "@/types/products.types";
import { QueryClient, QueryKey } from "@tanstack/react-query";

/**
 * Defines a strategy for updating cached data in React Query.
 *
 * @param queryKey - The unique key representing the query in React Query.
 * @param currentProduct - The product being updated.
 * @param queryClient - The instance of React Query's QueryClient.
 * @param loggedInUser - The currently logged-in user, if any.
 */
export type UpdateStrategy = (
  queryKey: QueryKey,
  currentProduct: Product,
  queryClient: QueryClient,
  loggedInUser: LoggedInUser | null | undefined
) => void;

/**
 * Restricts the keys in `QUERY_KEY_DICT` that can be used as update strategies.
 *
 * Only allows the following keys:
 * - `"user-profile-data"`
 * - `"products"`
 * - `"product"`
 *
 * Each key maps to an `UpdateStrategy` function, or the key can be omitted entirely (optional).
 */
export type AllowedUpdateStrategies = Partial<{
  [key in (typeof QUERY_KEY_DICT)[keyof typeof QUERY_KEY_DICT] as key extends
    | "user-profile-data"
    | "products"
    | "product"
    ? key
    : never]: UpdateStrategy;
}>;

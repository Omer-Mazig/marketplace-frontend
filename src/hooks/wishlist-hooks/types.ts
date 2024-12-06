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
 * Restricts keys in `QUERY_KEY_DICT` that can be used as update strategies.
 *
 * ### Overview:
 * This type ensures type safety by allowing only specific keys from `QUERY_KEY_DICT`
 * to be associated with an `UpdateStrategy` function. All keys are optional, offering
 * flexibility while maintaining strict type control.
 *
 * ### Adding a New Strategy:
 * To add support for a new query key:
 * 1. **Add the key to `QUERY_KEY_DICT`**:
 *    ```typescript
 *    export const QUERY_KEY_DICT = {
 *      USER_PROFILE_DATA: "user-profile-data",
 *      PRODUCTS: "products",
 *      PRODUCT: "product"
 *      TEST: "test", // New query key
 *    } as const;
 *    ```
 * 2. **Update the type definition**:
 *    Ensure the new key is included in the allowed strategies:
 *    ```typescript
 *    export type AllowedUpdateStrategies = Partial<{
 *      [key in (typeof QUERY_KEY_DICT)[keyof typeof QUERY_KEY_DICT] as key extends
 *        | "user-profile-data"
 *        | "products"
 *        | "product"
 *        | "test" // Include the new key
 *        ? key
 *        : never]: UpdateStrategy;
 *    }>;
 *    ```
 *
 * This keeps `QUERY_KEY_DICT` and allowed strategies in sync.
 */
export type AllowedUpdateStrategies = Partial<{
  [key in (typeof QUERY_KEY_DICT)[keyof typeof QUERY_KEY_DICT] as key extends
    | "user-profile-data"
    | "products"
    | "product"
    ? key
    : never]: UpdateStrategy;
}>;

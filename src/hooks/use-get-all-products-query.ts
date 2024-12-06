// Third-party libraries
import { useQuery } from "@tanstack/react-query";

// Services
import { getAllProducts } from "@/services/products.service";

// Constants
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

export function useGetAllProductsQuery() {
  return useQuery({
    queryKey: [QUERY_KEY_DICT.PRODUCTS],
    queryFn: getAllProducts,
    // staleTime: 5 * 1000, 👈 consider added staleTime to reduce api calls
  });
}

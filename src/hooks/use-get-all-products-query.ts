import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";
import { getAllProducts } from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";

export function useGetAllProductsQuery() {
  return useQuery({
    queryKey: [QUERY_KEY_DICT.PRODUCTS],
    queryFn: getAllProducts,
    // staleTime: 5 * 1000, 👈 consider added staleTime to reduce api calls
  });
}

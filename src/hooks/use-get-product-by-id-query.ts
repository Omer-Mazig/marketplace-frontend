import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";
import { getProductById } from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";

export function useGetProductById(productId: number) {
  return useQuery({
    queryKey: [QUERY_KEY_DICT.PRODUCT, { productId }],
    queryFn: () => getProductById(productId),
    // staleTime: 5 * 1000, 👈 consider added staleTime to reduce api calls
  });
}

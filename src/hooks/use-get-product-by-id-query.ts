// Third-party libraries
import { useQuery } from "@tanstack/react-query";

// Services
import { getProductById } from "@/services/products.service";

// Constants
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

export function useGetProductById(
  productId: number,
  refetchOnWindowFocus: boolean = true
) {
  return useQuery({
    queryKey: [QUERY_KEY_DICT.PRODUCT, { productId }],
    queryFn: () => getProductById(productId),
    refetchOnWindowFocus,
  });
}

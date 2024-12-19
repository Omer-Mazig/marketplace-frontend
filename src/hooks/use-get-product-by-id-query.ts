// Third-party libraries
import { useQuery } from "@tanstack/react-query";

// Services
import { getProductById } from "@/services/products.service";

// Constants
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

export function useGetProductById(productId: number) {
  return useQuery({
    queryKey: [QUERY_KEY_DICT.PRODUCT, { productId }],
    queryFn: () => getProductById(productId),
    // initialData: () => queryClient.getQueryData([QUERY_KEY_DICT.PRODUCTS , {category}])?.find((d) => d.id === productId));
  });
}

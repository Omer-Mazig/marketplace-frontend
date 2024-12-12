// Third-party libraries
import { useQuery } from "@tanstack/react-query";

// Services
import { getAllProducts } from "@/services/products.service";

// Constants
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

export function useGetAllProductsQuery({ category }: any) {
  return useQuery({
    queryKey: [QUERY_KEY_DICT.PRODUCTS, { category }],
    queryFn: () => getAllProducts({ category }),
    // staleTime: 5 * 1000, 👈 consider added staleTime to reduce api calls
  });
}

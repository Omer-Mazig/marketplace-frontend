// Third-party libraries
import { useQuery } from "@tanstack/react-query";

// Services
import { getAllProducts } from "@/services/products.service";

// Constants
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

export function useGetAllProductsQuery({ params }: any) {
  return useQuery({
    queryKey: [QUERY_KEY_DICT.PRODUCTS, { params }],
    queryFn: () => getAllProducts({ params }),
    // staleTime: 5 * 1000, 👈 consider added staleTime to reduce api calls
  });
}

import { getProductById } from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";

export function useGetProductById(productId: number) {
  return useQuery({
    queryKey: ["product", { productId }],
    queryFn: () => getProductById(productId),
    // staleTime: 5 * 1000, 👈 consider added staleTime to reduce api calls
  });
}

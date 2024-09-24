import { getAllProducts } from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    // staleTime: 5 * 1000, 👈 consider added staleTime to reduce api calls
  });
}

import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";
import { deleteProduct } from "@/services/products.service";
import { Product } from "@/types/products.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteProductMutation(product: Product) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => deleteProduct(product.id),

    onError: (err) => {
      toast({
        variant: "destructive",
        title: err?.message || "Something went wrong.",
        description: `There was a problem removing from your wishlist. Please try again later.`,
      });
    },

    onSuccess: () => {
      toast({
        description: `${product.name} was removed from your products.`,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_DICT.USER_PROFILE_DATA],
      });
    },
  });
}

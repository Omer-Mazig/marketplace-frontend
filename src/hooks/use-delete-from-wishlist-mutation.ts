import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types/products.types";
import { deleteFromWishlist } from "@/services/wishlist.service";
import { useToast } from "@/components/ui/use-toast";

// TODO: try to implment optemistic update with strategy pattern
export function useDeleteFromWishlistMutation(
  product: Product,
  queryKey: string[]
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => deleteFromWishlist(product.id),

    onError: (err) => {
      toast({
        variant: "destructive",
        title: err?.message || "Somthing want wrong.",
        description: `There was a problem removing from your wishlist. Please try again later`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        description: `${product.name} was removed from your wishlist.`,
      });
    },
  });
}

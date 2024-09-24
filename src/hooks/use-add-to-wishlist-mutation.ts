import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types/products.types";
import { addToWishlist } from "@/services/wishlist.service";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/auth-provider";

export function useAddToWishlistMutation(product: Product) {
  const queryClient = useQueryClient();
  const { loggedInUser } = useAuth();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => addToWishlist(product.id),
    onMutate: async () => {
      const previousProducts = queryClient.getQueryData<Product[]>([
        "products",
      ]);

      queryClient.setQueryData(
        ["products"],
        previousProducts?.map((p) =>
          p.id === product.id
            ? { ...p, wishlistUsers: [...p.wishlistUsers, loggedInUser] }
            : p
        )
      );

      return { previousProducts };
    },
    onError: (err, p, context) => {
      queryClient.setQueryData(["products"], context?.previousProducts);
      toast({
        variant: "destructive",
        title: err?.message || "Somthing want wrong.",
        description: `There was a problem saving ${product.name} to your wishlist. Please try again later`,
      });
    },
    onSuccess: () => {
      toast({
        description: `${product.name} was added to your wishlist.`,
      });
    },
  });
}

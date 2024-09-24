import { addToWishlist, deleteFromWishlist } from "@/services/wishlist.service";
import { useMutation } from "@tanstack/react-query";

export function useAddToWishlistMutation(productId: number) {
  return useMutation({
    mutationFn: () => addToWishlist(productId),
  });
}
export function useDeleteFromWishlistMutation(productId: number) {
  return useMutation({
    mutationFn: () => deleteFromWishlist(productId),
  });
}

import { Button } from "@/components/ui/button";
import {
  useAddToWishlistMutation,
  useDeleteFromWishlistMutation,
} from "@/hooks/useWishlistMutation";
import api from "@/lib/api";
import { LoggedInUser } from "@/providers/auth-provider";
import { Product } from "@/types/products.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";

interface AddToWishlistBtnProps {
  product: Product;
  loggedInUser: LoggedInUser | null | undefined;
}

export function AddToWishlistBtn({
  product,
  loggedInUser,
}: AddToWishlistBtnProps) {
  const queryClient = useQueryClient();

  const isProductOnUserWishlist = product.wishlistUsers.some(
    (u) => u.id === loggedInUser?.id
  );

  // TODO: Check if a user is logged in or not. if not, show a model to let the user to loggin
  // NOTE: The endpoint is alreay secure and require a active user on the server
  function onClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.stopPropagation();

    if (!loggedInUser) {
      // Add logic to show modal and break the function (return)
      return;
    }

    if (isProductOnUserWishlist) {
      deleteFromWishlistMutation.mutate();
    } else {
      addToWishlistMutation.mutate();
    }

    queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  const addToWishlistMutation = useAddToWishlistMutation(product.id);
  const deleteFromWishlistMutation = useDeleteFromWishlistMutation(product.id);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
      >
        {isProductOnUserWishlist ? (
          <Heart
            fill="#000"
            className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-500 transition-colors"
          />
        ) : (
          <Heart className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
        )}
      </Button>
    </>
  );
}

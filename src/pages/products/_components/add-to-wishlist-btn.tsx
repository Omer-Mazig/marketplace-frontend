import { LoggedInUser } from "@/providers/auth-provider";
import { Product } from "@/types/products.types";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAddToWishlistMutation } from "@/hooks/use-add-to-wishlist-mutation";
import { useDeleteFromWishlistMutation } from "@/hooks/use-delete-from-wishlist-mutation";

interface AddToWishlistBtnProps {
  product: Product;
  loggedInUser: LoggedInUser | null | undefined;
}

export function AddToWishlistBtn({
  product,
  loggedInUser,
}: AddToWishlistBtnProps) {
  const isProductOnUserWishlist = product.wishlistUsers.some(
    (u) => u.id === loggedInUser?.id
  );

  const addToWishlistMutation = useAddToWishlistMutation(product);
  const deleteFromWishlistMutation = useDeleteFromWishlistMutation(product, [
    "products",
  ]);

  // TODO: Check if a user is logged in or not. if not, show a model to let the user to login
  // NOTE: The endpoint is alreay secure and require a active user on the server
  async function onClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.stopPropagation();

    if (!loggedInUser) {
      // Add logic to show modal and break the function (return)
      return;
    }

    try {
      if (isProductOnUserWishlist) {
        await deleteFromWishlistMutation.mutateAsync();
      } else {
        await addToWishlistMutation.mutateAsync();
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
      >
        {isProductOnUserWishlist ? (
          <Heart
            fill="rgb(249, 115, 22)"
            stroke="rgb(249, 115, 22)"
            className="w-5 h-5 cursor-pointer transition-colors"
          />
        ) : (
          <Heart className="w-5 h-5 text-gray-400 cursor-pointer transition-colors" />
        )}
      </Button>
    </>
  );
}

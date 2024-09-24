import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { LoggedInUser } from "@/providers/auth-provider";
import { Product } from "@/types/products.types";
import { Heart } from "lucide-react";

interface AddToWishlistBtnProps {
  product: Product;
  loggedInUser: LoggedInUser | null | undefined;
}

export function AddToWishlistBtn({
  product,
  loggedInUser,
}: AddToWishlistBtnProps) {
  const isProductOnUSerWishlist = product.wishlistUsers.some(
    (u) => u.id === loggedInUser?.id
  );

  // TODO: Check if a user is logged in or not. if not, show a model to let the user to loggin
  // NOTE: The endpoint is alreay secure and require a active user on the server
  function onClick() {
    if (!loggedInUser) {
      // Add logic to show modal and break the function (return)

      return;
    }

    if (isProductOnUSerWishlist) {
      handleDeleteToWishlist(product.id);
    } else {
      handleAddToWishlist(product.id);
    }
  }

  function handleAddToWishlist(productId: number) {
    api.post("wishlist/" + productId);
    console.log("handleAddToWishlist");
  }

  function handleDeleteToWishlist(productId: number) {
    api.delete("wishlist/" + productId);
    console.log("handleDeleteToWishlist");
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
      >
        {isProductOnUSerWishlist ? (
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

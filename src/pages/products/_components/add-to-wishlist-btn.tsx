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
  function handleAddToWishlist(productId: number) {
    api.post("wishlist/" + productId);
    console.log("handleAddToWishlist");
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleAddToWishlist(product.id)}
      >
        {product.wishlistUsers.some((u) => u.id === loggedInUser?.id) ? (
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

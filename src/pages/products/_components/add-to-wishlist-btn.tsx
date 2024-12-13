// Third-party libraries
import { Heart } from "lucide-react";
import { QueryKey } from "@tanstack/react-query";

// Custom hooks
import { useAddToWishlistMutation } from "@/hooks/wishlist-hooks/use-add-to-wishlist-mutation";
import { useDeleteFromWishlistMutation } from "@/hooks/wishlist-hooks/use-delete-from-wishlist-mutation";

// UI components
import { Button } from "@/components/ui/button";

// Custom providers
import { useAuth } from "@/providers/auth-provider";

// Types
import { Product } from "@/types/products.types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddToWishlistBtnProps {
  product: Product;
  queryKey: QueryKey;
}

export function AddToWishlistBtn({ product, queryKey }: AddToWishlistBtnProps) {
  const { loggedInUser, setShouldShowLoginAlertDialog } = useAuth();
  const isProductOnUserWishlist = product.wishlistUsers.some(
    (u) => u.id === loggedInUser?.id
  );

  const addToWishlistMutation = useAddToWishlistMutation(product, queryKey);
  const deleteFromWishlistMutation = useDeleteFromWishlistMutation(
    product,
    queryKey
  );

  async function onClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.stopPropagation();

    if (!loggedInUser) {
      setShouldShowLoginAlertDialog(true);
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
          >
            {isProductOnUserWishlist ? (
              <Heart
                // fill="rgb(249, 115, 22)"
                // stroke="rgb(249, 115, 22)"
                className="w-5 h-5 text-primary cursor-pointer transition-colors"
              />
            ) : (
              <Heart className="w-5 h-5 text-gray-400 cursor-pointer transition-colors" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isProductOnUserWishlist ? "Remove from wishlist" : "Add to wishlist"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

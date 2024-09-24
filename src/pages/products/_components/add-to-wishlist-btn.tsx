import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { LoggedInUser } from "@/providers/auth-provider";
import { Product } from "@/types/products.types";

import { addToWishlist, deleteFromWishlist } from "@/services/wishlist.service";
import { useToast } from "@/components/ui/use-toast";

interface AddToWishlistBtnProps {
  product: Product;
  loggedInUser: LoggedInUser | null | undefined;
}

export function AddToWishlistBtn({
  product,
  loggedInUser,
}: AddToWishlistBtnProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const isProductOnUserWishlist = product.wishlistUsers.some(
    (u) => u.id === loggedInUser?.id
  );

  const addToWishlistMutation = useMutation({
    mutationFn: () => addToWishlist(product.id),
    onMutate: async (product: Product) => {
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
    onError: (err, product, context) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      queryClient.setQueryData(["products"], context?.previousProducts);
    },
    onSuccess: () => {
      toast({
        title: "Great!",
        description: `${product.name} was added to your wishlist.`,
      });
    },
  });
  const deleteFromWishlistMutation = useMutation({
    mutationFn: () => deleteFromWishlist(product.id),
    // add optemisic update
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

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
      addToWishlistMutation.mutate(product);
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

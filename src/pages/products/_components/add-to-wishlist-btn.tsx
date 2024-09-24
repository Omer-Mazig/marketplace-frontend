import { LoggedInUser } from "@/providers/auth-provider";
import { Product } from "@/types/products.types";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAddToWishlistMutation } from "@/hooks/useAddToWishlistMutation";
import { useDeleteFromWishlistMutation } from "@/hooks/useDeleteFromWishlistMutation";

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
  const deleteFromWishlistMutation = useDeleteFromWishlistMutation(product);

  // const addToWishlistMutation = useMutation({
  //   mutationFn: () => addToWishlist(product.id),
  //   onMutate: async () => {
  //     const previousProducts = queryClient.getQueryData<Product[]>([
  //       "products",
  //     ]);

  //     queryClient.setQueryData(
  //       ["products"],
  //       previousProducts?.map((p) =>
  //         p.id === product.id
  //           ? { ...p, wishlistUsers: [...p.wishlistUsers, loggedInUser] }
  //           : p
  //       )
  //     );

  //     return { previousProducts };
  //   },
  //   onError: (err, product, context) => {
  //     queryClient.setQueryData(["products"], context?.previousProducts);
  //   },
  //   onSuccess: () => {
  //     toast({
  //       title: "Great!",
  //       description: `${product.name} was added to your wishlist.`,
  //     });
  //   },
  // });
  // const deleteFromWishlistMutation = useMutation({
  //   mutationFn: () => deleteFromWishlist(product.id),
  //   // TODO: implement optemistic update
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["products"] });
  //     toast({
  //       title: "Great!",
  //       description: `${product.name} was removed from your wishlist.`,
  //     });
  //   },
  // });

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

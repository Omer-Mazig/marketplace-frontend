import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserWishlistSkeleton } from "./user-wishlist-page-skeleton";
import Error from "@/components/custom/error";
import { useUserProfileContext } from "../user-profile-layout";
import { GenericItemRow } from "../_components/generic-item-row";
import { Trash2 } from "lucide-react";
import { Product } from "@/types/products.types";
import { useDeleteFromWishlistMutation } from "@/hooks/wishlist-hooks/use-delete-from-wishlist-mutation";

export default function UserWishlistPage() {
  const { data: userProfileData, isLoading, error } = useUserProfileContext();

  if (isLoading) return <UserWishlistSkeleton />;
  if (error || !userProfileData) {
    return <Error />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Wishlist</CardTitle>
        <CardDescription>Products you're interested in.</CardDescription>
      </CardHeader>
      <CardContent>
        {userProfileData.wishlist.length ? (
          <ul className="space-y-4">
            {userProfileData.wishlist.map((product) => (
              <GenericItemRow
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
              >
                <WishlistItemActions product={product} />
              </GenericItemRow>
            ))}
          </ul>
        ) : (
          <p>You have no saved products </p>
        )}
      </CardContent>
    </Card>
  );
}

function WishlistItemActions({ product }: { product: Product }) {
  const deleteFromWishlistMutation = useDeleteFromWishlistMutation(product, [
    "user-profile-data",
  ]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => deleteFromWishlistMutation.mutate()}
      className="sm:opacity-0 group-hover:opacity-100"
    >
      <Trash2 className="w-5 h-5" />
    </Button>
  );
}

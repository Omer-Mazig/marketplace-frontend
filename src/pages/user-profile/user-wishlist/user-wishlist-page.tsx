import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UserWishlistSkeleton } from "./user-wishlist-page-skeleton";
import Error from "@/components/custom/error";
import { WishlistItem } from "../_components/wishlist-item";
import { useUserProfileContext } from "../user-profile-layout";

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
              <WishlistItem
                key={product.id}
                product={product}
              />
            ))}
          </ul>
        ) : (
          <p>You have no saved products </p>
        )}
      </CardContent>
    </Card>
  );
}

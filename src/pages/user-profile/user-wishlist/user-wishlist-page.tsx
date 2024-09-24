import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useUserProfileDataQuery } from "@/hooks/useUserProfileDataQuery";
import { UserWishlistSkeleton } from "./user-wishlist-page-skeleton";
import Error from "@/components/custom/error";
import api from "@/lib/api";

export default function UserWishlistPage() {
  const { data: userProfileData, isLoading, error } = useUserProfileDataQuery();

  function handleDeleteFromWishlist(productId: number) {
    api.delete("wishlist/" + productId);
    console.log("handleDeleteFromWishlist");
  }

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
            {userProfileData.wishlist.map((item) => (
              <li
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2"
              >
                <span className="mb-2 md:mb-0">{item.name}</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">${item.price.toFixed(2)}</Badge>
                  <Button
                    onClick={() => handleDeleteFromWishlist(item.id)}
                    variant="ghost"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no saved products </p>
        )}
      </CardContent>
    </Card>
  );
}

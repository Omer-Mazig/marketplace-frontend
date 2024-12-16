// React
import { useEffect } from "react";

// UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Custom components
import { UserWishlistSkeleton } from "./user-wishlist-page-skeleton";
import Error from "@/components/shared/error";
import { GenericItemRow } from "../_components/generic-item-row";

// Icons
import { Trash2 } from "lucide-react";

// Types
import { Product } from "@/types/products.types";

// Hooks
import { useDeleteFromWishlistMutation } from "@/hooks/wishlist-hooks/use-delete-from-wishlist-mutation";

// Constants
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

// Providers
import { useUserProfileContext } from "../user-profile-layout";
import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";

export default function UserWishlistPage() {
  const { data: userProfileData, isLoading, error } = useUserProfileContext();

  const setBreadcrumpItems = useSetBreadcrumpItems();

  useEffect(() => {
    setBreadcrumpItems([
      { href: "/platform/user-profile", label: "Profile" },
      { href: "/platform/user-profile/wishlist", label: "Wishlist" },
    ]);
  }, []);

  if (isLoading) return <UserWishlistSkeleton />;
  if (error || !userProfileData) {
    return <Error />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Wishlist ({userProfileData.wishlist.length})</CardTitle>
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
    QUERY_KEY_DICT.USER_PROFILE_DATA,
  ]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteFromWishlistMutation.mutate()}
            className="sm:opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-5 h-5 text-gray-400" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Remove from wishlist</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

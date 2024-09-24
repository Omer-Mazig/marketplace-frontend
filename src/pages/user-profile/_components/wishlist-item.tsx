import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDeleteFromWishlistMutation } from "@/hooks/use-delete-from-wishlist-mutation";
import { Product } from "@/types/products.types";

interface WishlistItemProps {
  product: Product;
}

export function WishlistItem({ product }: WishlistItemProps) {
  const deleteFromWishlistMutation = useDeleteFromWishlistMutation(product, [
    "user-profile-data",
  ]);

  return (
    <li
      key={product.id}
      className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2"
    >
      <span className="mb-2 md:mb-0">{product.name}</span>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">${product.price.toFixed(2)}</Badge>
        <Button
          onClick={() => deleteFromWishlistMutation.mutate()}
          variant="ghost"
          size="sm"
        >
          Remove
        </Button>
      </div>
    </li>
  );
}

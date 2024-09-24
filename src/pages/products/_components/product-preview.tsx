import { MiniUserRow } from "@/components/custom/mini-user-row";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/products.types";
import { Link } from "react-router-dom";
import { AddToWishlistBtn } from "./add-to-wishlist-btn";
import { useAuth } from "@/providers/auth-provider";

interface ProductPreviewProps {
  product: Product;
}

export default function ProductPreview({ product }: ProductPreviewProps) {
  const { loggedInUser } = useAuth();

  return (
    <Link to={`${product.id}`}>
      <Card
        key={product.id}
        className="flex flex-col h-full"
      >
        <CardHeader>
          <img
            src={
              product.imageURL ||
              `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                product.name
              )}`
            }
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="flex-grow">
          <CardTitle className="mb-2">{product.name}</CardTitle>
          <p className="text-sm text-gray-600 mb-2">
            {product.description || "Nothing to say about this product"}
          </p>
          <div className="flex flex-wrap gap-1">
            {product.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="text-xs"
              >
                {category}
              </Badge>
            ))}
          </div>
          {loggedInUser?.id !== product.owner.id ? (
            <MiniUserRow user={product.owner} />
          ) : (
            <p className="mt-4 italic text-muted-foreground">Your product</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          {loggedInUser?.id !== product.owner.id ? (
            <AddToWishlistBtn
              product={product}
              loggedInUser={loggedInUser}
            />
          ) : null}
        </CardFooter>
      </Card>
    </Link>
  );
}

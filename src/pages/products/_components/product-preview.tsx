// Third-party libraries
import { useNavigate, useParams } from "react-router-dom";

// Custom components
import { MiniUserRow } from "@/components/custom/mini-user-row";
import { AddToWishlistBtn } from "./add-to-wishlist-btn";

// UI components
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Custom providers
import { useAuth } from "@/providers/auth-provider";

// Constants
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

// Types
import { Product } from "@/types/products.types";

interface ProductPreviewProps {
  product: Product;
}

export default function ProductPreview({ product }: ProductPreviewProps) {
  const { loggedInUser } = useAuth();

  const navigate = useNavigate();
  const { category } = useParams();

  function goToDetails() {
    navigate(`/product/${product.id}`);
  }

  return (
    <Card
      key={product.id}
      className="flex flex-col h-full cursor-pointer max-w-96 hover:shadow-xl"
      onClick={goToDetails}
    >
      <CardHeader className="p-0">
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
      <CardContent className="flex-grow pb-4 pt-8 px-4">
        <CardTitle className="mb-2">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">
          {product.description || "Nothing to say about this product"}
        </p>
        <div className="flex flex-wrap gap-1">
          {product.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="text-xs mb-4"
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
            queryKey={[QUERY_KEY_DICT.PRODUCTS, { category }]}
          />
        ) : (
          "Edit"
        )}
      </CardFooter>
    </Card>
  );
}
``;

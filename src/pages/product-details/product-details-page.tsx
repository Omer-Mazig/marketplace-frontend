// Third-party libraries
import { format } from "date-fns";
import { useParams } from "react-router-dom";

// Custom hooks
import { useGetProductById } from "@/hooks/use-get-product-by-id-query";

// UI components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Custom components
import Error from "@/components/custom/error";
import { MiniUserRow } from "@/components/custom/mini-user-row";
import { AddToWishlistBtn } from "../products/_components/add-to-wishlist-btn";

// Constants
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

// Providers
import { useAuth } from "@/providers/auth-provider";

export default function ProductDetails() {
  const { productId: _productId } = useParams();
  const productId = parseInt(_productId || "");

  const { data: product, error, isLoading } = useGetProductById(productId);
  const { loggedInUser } = useAuth();

  if (isLoading) return <ProductSkeleton />;
  if (error || !product) return <Error />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {product.imageURL && (
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={
                    product.imageURL ||
                    `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                      product.name
                    )}`
                  }
                  alt="product image"
                />
              )}
            </div>
            <div className="space-y-4">
              <p className="text-lg">{product.description}</p>
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              <p>Stock: {product.stock}</p>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              {product.location && <p>Location: {product.location}</p>}
              <p>
                {product.isNegotiable ? "Price is negotiable" : "Fixed price"}
              </p>
              <p>Views: {product.viewCount}</p>
              <p>Created: {format(product.createdAt, "PPP")}</p>
              <p>Last updated: {format(product.updatedAt, "PPP")}</p>
              <div className="flex items-center justify-between space-x-2">
                <MiniUserRow user={product.owner} />
                {loggedInUser?.id !== product.owner.id ? (
                  <AddToWishlistBtn
                    product={product}
                    queryKey={[QUERY_KEY_DICT.PRODUCT, { productId }]}
                  />
                ) : (
                  "Edit"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-2/3" />
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-[300px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Third-party libraries
import { format } from "date-fns";
import { useParams } from "react-router-dom";

// Custom hooks
import { useGetProductById } from "@/hooks/use-get-product-by-id-query";

// UI components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeading } from "@/components/ui/page-heading";

// Custom components
import Error from "@/components/shared/error";
import { MiniUserRow } from "@/components/shared/mini-user-row";
import { AddToWishlistBtn } from "../_components/add-to-wishlist-btn";

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
      <PageHeading>Product Details</PageHeading>
      <Card>
        <CardHeader className="flex-row justify-between">
          <CardTitle>{product.name}</CardTitle>
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-lg">{product.description}</p>
              <p>Stock: {product.stock}</p>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="default"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              {product.location && <p>Location: {product.location}</p>}
              <p>
                {product.isNegotiable ? "Price is negotiable" : "Fixed price"}
              </p>
              <p>Currently views: {product.viewCount}</p>
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
            <div>
              {
                <img
                  className="w-full max-h-[400px] object-cover rounded-t-lg"
                  src={product.imageURL}
                  alt="product image"
                />
              }
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
            <Skeleton className="h-[300px] w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

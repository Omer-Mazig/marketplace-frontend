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
import { ProductProvider, useProduct } from "./product-provider";

const ProductDetails = () => {
  const { productId: _productId } = useParams();
  const productId = parseInt(_productId || "");
  const { data: product, error, isLoading } = useGetProductById(productId);

  if (isLoading) return <ProductSkeleton />;
  if (error || !product) return <Error />;

  return (
    <ProductProvider product={product}>
      <div>
        <PageHeading>Product Details</PageHeading>
        <Card>
          <ProductDetails.Header />
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <ProductDetails.Info />
              <ProductDetails.Image />
            </div>
          </CardContent>
        </Card>
      </div>
    </ProductProvider>
  );
};

ProductDetails.Header = () => {
  const product = useProduct();
  return (
    <CardHeader className="flex-row justify-between">
      <CardTitle>{product.name}</CardTitle>
      <p className="text-2xl font-bold text-primary">
        ${product.price.toFixed(2)}
      </p>
    </CardHeader>
  );
};

ProductDetails.Info = () => {
  const product = useProduct();
  const { loggedInUser } = useAuth();

  return (
    <div className="space-y-4">
      <p className="text-lg">{product.description}</p>
      <p>Stock: {product.stock}</p>
      <ProductDetails.Categories />
      {product.location && <p>Location: {product.location}</p>}
      <p>{product.isNegotiable ? "Price is negotiable" : "Fixed price"}</p>
      <p>Currently views: {product.viewCount}</p>
      <p>Created: {format(product.createdAt, "PPP")}</p>
      <p>Last updated: {format(product.updatedAt, "PPP")}</p>
      <div className="flex items-center justify-between space-x-2">
        <MiniUserRow user={product.owner} />
        {loggedInUser?.id !== product.owner.id ? (
          <AddToWishlistBtn
            product={product}
            queryKey={[QUERY_KEY_DICT.PRODUCT, { productId: product.id }]}
          />
        ) : (
          "Edit"
        )}
      </div>
    </div>
  );
};

ProductDetails.Categories = () => {
  const product = useProduct();
  return (
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
  );
};

ProductDetails.Image = () => {
  const product = useProduct();
  return (
    <div>
      <img
        className="w-full max-h-[400px] object-cover rounded-t-lg"
        src={product.imageURL}
        alt="product image"
      />
    </div>
  );
};

export default ProductDetails;

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

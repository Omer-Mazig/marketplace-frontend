// Third-party libraries
import { format } from "date-fns";
import { useParams } from "react-router-dom";

// Custom hooks
import { useGetProductById } from "@/hooks/use-get-product-by-id-query";

// UI components
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeading } from "@/components/ui/page-heading";

// Custom components
import { ProductDetailsSkeleton } from "./_components/product-details-skelaton";
import Error from "@/components/shared/error";
import { MiniUserRow } from "@/components/shared/mini-user-row";
import { AddToWishlistBtn } from "../_components/add-to-wishlist-btn";

// Constants
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

// Providers
import { useAuth } from "@/providers/auth-provider";
import { ProductProvider, useProduct } from "./product-provider";

export default function ProductDetails() {
  const { productId: _productId } = useParams();
  const productId = parseInt(_productId || "");
  const { data: product, error, isLoading } = useGetProductById(productId);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error || !product) return <Error />;

  return (
    <ProductProvider product={product}>
      <PageHeading>Product Details</PageHeading>
      <Card>
        <CardHeader className="flex-row justify-between">
          <div>
            <ProductDetails.Title />
            <ProductDetails.Description />
          </div>

          <ProductDetails.Price />
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6 justify-between">
              <div className="space-y-4">
                <ProductDetails.Categories />
                <ProductDetails.Stock />
                <ProductDetails.Location />
                <ProductDetails.NegotiableStatus />
                <ProductDetails.ViewCount />
                {/* <ProductDetails.Dates /> */}
              </div>
              <ProductDetails.OwnerInfo />
            </div>
            <ProductDetails.Image />
          </div>
        </CardContent>
      </Card>
    </ProductProvider>
  );
}

ProductDetails.Title = () => {
  const product = useProduct();
  return <CardTitle>{product.name}</CardTitle>;
};

ProductDetails.Price = () => {
  const product = useProduct();
  return (
    <p className="text-2xl font-bold text-primary">
      ${product.price.toFixed(2)}
    </p>
  );
};

ProductDetails.Description = () => {
  const product = useProduct();
  return (
    <CardDescription className="mt-2">{product.description}</CardDescription>
  );
};

ProductDetails.Stock = () => {
  const product = useProduct();
  return <p>Stock: {product.stock}</p>;
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

ProductDetails.Location = () => {
  const product = useProduct();
  return product.location && <p>Location: {product.location}</p>;
};

ProductDetails.NegotiableStatus = () => {
  const product = useProduct();
  return <p>{product.isNegotiable ? "Price is negotiable" : "Fixed price"}</p>;
};

ProductDetails.ViewCount = () => {
  const product = useProduct();
  return <p>Currently views: {product.viewCount}</p>;
};

ProductDetails.Dates = () => {
  const product = useProduct();
  return (
    <>
      <p>Created: {format(product.createdAt, "PPP")}</p>
      <p>Last updated: {format(product.updatedAt, "PPP")}</p>
    </>
  );
};

ProductDetails.OwnerInfo = () => {
  const product = useProduct();
  const { loggedInUser } = useAuth();

  return (
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

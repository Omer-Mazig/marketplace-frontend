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
import { Separator } from "@/components/ui/separator";

export default function ProductDetails() {
  const { productId: _productId } = useParams();
  const productId = parseInt(_productId || "");
  const { data: product, error, isLoading } = useGetProductById(productId);

  const { loggedInUser } = useAuth();

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error || !product) return <Error />;

  return (
    <ProductProvider product={product}>
      <PageHeading>Product Details</PageHeading>
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <ProductDetails.Image />
          <div className="flex flex-col">
            <CardHeader className="flex-row justify-between">
              <div>
                <ProductDetails.Title />
                <ProductDetails.Description />
              </div>
              <ProductDetails.Price />
            </CardHeader>
            <Separator className="mb-6" />
            <CardContent className="grow flex flex-col gap-8">
              <div className="space-y-4 grow flex flex-col">
                <ProductDetails.Categories />
                <div className=" rounded-lg py-4 px-6 grow">
                  <h4 className="font-bold mb-4">Info:</h4>
                  <ProductDetails.Stock />
                  <Separator className="my-4" />
                  <ProductDetails.Location />
                  <Separator className="my-4" />
                  <ProductDetails.NegotiableStatus />
                  <Separator className="my-4" />
                  <ProductDetails.ViewCount />
                </div>
              </div>
              <div className="space-y-4">
                {loggedInUser?.id === product.owner.id && (
                  <ProductDetails.Dates />
                )}

                <ProductDetails.OwnerInfo />
              </div>
            </CardContent>
          </div>
        </div>
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
    <CardDescription className="mt-2 italic">
      {product.description}
    </CardDescription>
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
    <div>
      <p>Created: {format(product.createdAt, "PPP")}</p>
      <p>Last updated: {format(product.updatedAt, "PPP")}</p>
    </div>
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
        className="w-full max-h-[600px] object-cover"
        src={product.imageURL}
        alt="product image"
      />
    </div>
  );
};

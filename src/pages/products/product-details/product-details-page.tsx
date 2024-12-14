import { useParams } from "react-router-dom";
import { useGetProductById } from "@/hooks/use-get-product-by-id-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageHeading } from "@/components/ui/page-heading";
import { ProductDetailsSkeleton } from "./_components/product-details-skelaton";
import Error from "@/components/shared/error";
import { AddToWishlistBtn } from "../_components/add-to-wishlist-btn";
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";
import { useAuth } from "@/providers/auth-provider";
import { Separator } from "@/components/ui/separator";
import {
  ProductImage,
  ProductTitle,
  ProductDescription,
  ProductCategories,
  ProductPrice,
  ProductStock,
  ProductLocation,
  ProductNegotiableStatus,
  ProductViewCount,
  ProductDates,
} from "../_components/shared-product-components";
import { ProductProvider } from "../product-provider";
import { MiniUserRow } from "@/components/shared/mini-user-row";

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
          <div className="max-h-[600px]">
            <ProductImage />
          </div>
          <div className="flex flex-col">
            <CardHeader className="flex-row justify-between gap-3 space-y-0">
              <div>
                <ProductTitle />
                <ProductDescription />
              </div>
              <ProductPrice />
            </CardHeader>
            <Separator className="mb-6" />
            <CardContent className="grow flex flex-col gap-8">
              <div className="space-y-4 grow flex flex-col">
                <ProductCategories />
                <div className="rounded-lg py-4 px-6 grow">
                  <h4 className="font-bold mb-4">Info:</h4>
                  <ProductStock />
                  <Separator className="my-4" />
                  <ProductLocation />
                  <Separator className="my-4" />
                  <ProductNegotiableStatus />
                  <Separator className="my-4" />
                  <ProductViewCount />
                </div>
              </div>
              <div className="space-y-4">
                {loggedInUser?.id === product.owner.id && <ProductDates />}

                <div className="flex items-center justify-between space-x-2">
                  <MiniUserRow user={product.owner} />
                  {loggedInUser?.id !== product.owner.id ? (
                    <AddToWishlistBtn
                      product={product}
                      queryKey={[
                        QUERY_KEY_DICT.PRODUCT,
                        { productId: product.id },
                      ]}
                    />
                  ) : (
                    "Edit"
                  )}
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </ProductProvider>
  );
}

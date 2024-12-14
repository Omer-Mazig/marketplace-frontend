import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/providers/auth-provider";
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";
import { Product } from "@/types/products.types";
import { AddToWishlistBtn } from "@/pages/products/_components/add-to-wishlist-btn";
import {
  ProductImage,
  ProductTitle,
  ProductDescription,
  ProductCategories,
  ProductPrice,
} from "../../_components/shared-product-components";
import { ProductProvider } from "../../product-provider";
import { MiniUserRow } from "@/components/shared/mini-user-row";

import { EditProductButton } from "../../_components/edit-product-button";

interface ProductPreviewProps {
  product: Product;
}

export function ProductPreview({ product }: ProductPreviewProps) {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();
  const { category } = useParams();

  function goToDetails() {
    navigate(`/product/${product.id}`);
  }

  return (
    <ProductProvider product={product}>
      <Card
        className="flex flex-col h-full cursor-pointer max-w-96 overflow-hidden hover:shadow-xl hover:outline outline-primary outline-offset-4"
        onClick={goToDetails}
      >
        <div className="max-h-[200px]">
          <ProductImage />
        </div>
        <CardHeader>
          <ProductTitle />
          <ProductDescription />
        </CardHeader>
        <CardContent className="flex-grow pb-4 pt-8 px-4 space-y-3 flex flex-col justify-end">
          <ProductCategories />
          <MiniUserRow user={product.owner} />
        </CardContent>
        <CardFooter className="flex justify-between items-center min-h-16">
          <ProductPrice />
          {loggedInUser?.id !== product.owner.id ? (
            <AddToWishlistBtn
              product={product}
              queryKey={[QUERY_KEY_DICT.PRODUCTS, { category }]}
            />
          ) : (
            <EditProductButton />
          )}
        </CardFooter>
      </Card>
    </ProductProvider>
  );
}

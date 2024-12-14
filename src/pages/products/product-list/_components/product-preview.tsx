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
  ProductLocation,
} from "../../_components/shared-product-components";
import { ProductProvider } from "../../product-provider";
import { MiniUserRow } from "@/components/shared/mini-user-row";

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
        <CardHeader className="p-0">
          <div className="max-h-[200px]">
            <ProductImage />
          </div>
        </CardHeader>
        <CardContent className="flex-grow pb-4 pt-8 px-4">
          <ProductTitle />
          <ProductDescription />
          <ProductCategories />
          <ProductLocation />
          <MiniUserRow user={product.owner} />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <ProductPrice />
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
    </ProductProvider>
  );
}

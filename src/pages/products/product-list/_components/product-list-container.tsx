import { Product } from "@/types/products.types";
import { ProductPreview } from "./product-preview";
import { FetchInBackgroundCardLoader } from "@/components/shared/fetch-in-backgound-card-loader";

interface ProductListContainerProps {
  isLoading: boolean;
  isFetching: boolean;
  products: Product[];
}

export function ProductListContainer({
  products,
  isFetching,
}: ProductListContainerProps) {
  return (
    <>
      {products.length ? (
        products.map((product) => (
          <div
            key={product.id}
            className={`relative max-w-96 ${
              isFetching ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <ProductPreview product={product} />

            {isFetching && <FetchInBackgroundCardLoader />}
          </div>
        ))
      ) : (
        <p>No Products</p>
      )}
    </>
  );
}

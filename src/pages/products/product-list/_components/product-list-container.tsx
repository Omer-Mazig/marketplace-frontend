import { Product } from "@/types/products.types";
import { ProductPreview } from "./product-preview";
import { FetchInBackgroundLoader } from "@/components/shared/fetch-in-backgound-loader";

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
            className={`relative max-w-96 ${
              isFetching ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <ProductPreview
              key={product.id}
              product={product}
            />

            {isFetching && <FetchInBackgroundLoader />}
          </div>
        ))
      ) : (
        <p>No Products</p>
      )}
    </>
  );
}

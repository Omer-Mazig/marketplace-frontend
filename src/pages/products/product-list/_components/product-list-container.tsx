import { Product } from "@/types/products.types";
import { ProductPreview } from "./product-preview";
import { LoaderCircle } from "lucide-react";

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
          <div className="relative max-w-96">
            <ProductPreview
              key={product.id}
              product={product}
            />

            <div
              className={`absolute inset-0 bg-black ${
                isFetching ? "opacity-40" : "opacity-0"
              }`}
            >
              <div className="w-full h-full flex justify-center items-center">
                <LoaderCircle className="w-16 h-16 animate-spin" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No Products</p>
      )}
    </>
  );
}

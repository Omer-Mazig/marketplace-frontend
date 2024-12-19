import { Product } from "@/types/products.types";
import { ProductPreview } from "./product-preview";

interface ProductListContainerProps {
  isLoading: boolean;
  products: Product[];
}

export function ProductListContainer({ products }: ProductListContainerProps) {
  return (
    <>
      {products.length ? (
        products.map((product) => (
          <ProductPreview
            key={product.id}
            product={product}
          />
        ))
      ) : (
        <p>No Products</p>
      )}
    </>
  );
}

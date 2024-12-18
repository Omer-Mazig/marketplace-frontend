import { Product } from "@/types/products.types";
import React, { createContext, useContext } from "react";

interface ProductProviderProps {
  product: Product;
  children: React.ReactNode;
}

const ProductContext = createContext<Product | null>(null);

export function ProductProvider({ product, children }: ProductProviderProps) {
  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}

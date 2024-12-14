import { Product } from "@/types/products.types";
import React, { createContext, useContext } from "react";

const ProductContext = createContext<Product | null>(null);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<{
  product: Product;
  children: React.ReactNode;
}> = ({ product, children }) => {
  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
};

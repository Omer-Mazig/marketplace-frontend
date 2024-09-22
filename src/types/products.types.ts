import { ProductCategory } from "@/enums/product-category.enum";

export type Product = {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  stock: number;
  categories: ProductCategory[];
  location?: string;
  isNegotiable: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
};

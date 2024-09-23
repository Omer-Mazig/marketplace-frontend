import { ProductCategory } from "@/enums/product-category.enum";
import { MiniUser } from "./users.types";

export type Product = {
  id: number;
  name: string;
  description?: string;
  imageURL?: string;
  price: number;
  stock: number;
  categories: ProductCategory[];
  location?: string;
  isNegotiable: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  owner: MiniUser;
};

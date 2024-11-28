import { ProductCategory } from "@/enums/product-category.enum";
import { MiniUser } from "./users.types";
import { addProductFormSchema } from "@/validations/product.validations";
import { z } from "zod";

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
  wishlistUsers: MiniUser[];
};

export type AddProductFormValues = z.infer<typeof addProductFormSchema>;
export type AddProductInput = AddProductFormValues & {
  categories: ProductCategory;
};

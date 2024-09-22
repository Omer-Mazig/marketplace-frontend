import { ProductCategory } from "@/enums/product-category.enum";
import api from "@/lib/api";
import { LoggedInUser } from "@/providers/auth-provider";

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

export type UserProfileData = LoggedInUser & {
  products: Product[];
  wishlist: any[];
};

export async function getUserProfileData(): Promise<UserProfileData> {
  console.log("getting user data..."); // just for development
  await new Promise((res) => setTimeout(res, 2000)); // just for development

  const { data } = await api.get(`/users/user-data`);
  return data;
}

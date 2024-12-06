import { LoggedInUser } from "@/providers/auth-provider";
import { Product } from "./products.types";

export type UserProfileData = LoggedInUser & {
  products: Product[];
  wishlist: Product[];
};

export type MiniUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
};

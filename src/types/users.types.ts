import { LoggedInUser } from "@/providers/auth-provider";
import { Product } from "./products.types";

export type UserProfileData = LoggedInUser & {
  products: Product[];
  wishlist: any[];
};

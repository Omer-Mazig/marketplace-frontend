import { LoggedInUser } from "@/providers/auth-provider";
import { Product } from "./products.types";
import { USER_TIERS_OPTIONS } from "@/constants/auth.constant";

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

export type UserTierOptionType = (typeof USER_TIERS_OPTIONS)[number];

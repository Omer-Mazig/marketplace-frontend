import api from "@/lib/api";
import { LoggedInUser } from "@/providers/auth-provider";

export type UserProfileData = LoggedInUser & {
  products: any[];
  wishlist: any[];
};

export async function getUserProfileData(): Promise<UserProfileData> {
  const { data } = await api.get(`/users/user-data`);
  return data;
}

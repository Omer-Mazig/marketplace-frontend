// API utility and helper functions
import api from "@/lib/api";

import { UserProfileData } from "@/types/users.types";
export async function getUserProfileData(): Promise<UserProfileData> {
  const { data } = await api.get(`/users/user-data`);
  return data;
}

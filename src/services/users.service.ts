// API utility and helper functions
import api from "@/lib/api";
import { wait } from "@/lib/utils";

import { UserProfileData } from "@/types/users.types";
export async function getUserProfileData(): Promise<UserProfileData> {
  await wait(); // just for development

  const { data } = await api.get(`/users/user-data`);
  return data;
}

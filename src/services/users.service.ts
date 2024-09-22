import api from "@/lib/api";
import { UserProfileData } from "@/types/users.types";

export async function getUserProfileData(): Promise<UserProfileData> {
  console.log("getting user data..."); // just for development
  await new Promise((res) => setTimeout(res, 2000)); // just for development

  const { data } = await api.get(`/users/user-data`);
  return data;
}

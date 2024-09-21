import { useQuery } from "@tanstack/react-query";
import { getUserProfileData } from "@/services/user.service";

export function useUserProfileDataQuery() {
  return useQuery({
    queryKey: ["user-profile-data"],
    queryFn: getUserProfileData,
    // staleTime: 5 * 1000, 👈 consider added staleTime to reduce api calls
  });
}

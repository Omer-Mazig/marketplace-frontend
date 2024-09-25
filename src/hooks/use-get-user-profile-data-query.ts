import { useQuery } from "@tanstack/react-query";
import { getUserProfileData } from "@/services/users.service";

export function useGetUserProfileDataQuery() {
  return useQuery({
    queryKey: ["user-profile-data"],
    queryFn: getUserProfileData,
    // staleTime: 5 * 1000, 👈 consider added staleTime to reduce api calls
  });
}

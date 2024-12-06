import { useQuery } from "@tanstack/react-query";
import { getUserProfileData } from "@/services/users.service";
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

export function useGetUserProfileDataQuery() {
  return useQuery({
    queryKey: [QUERY_KEY_DICT.USER_PROFILE_DATA],
    queryFn: getUserProfileData,
    // staleTime: 5 * 1000, 👈 consider added staleTime to reduce api calls
  });
}

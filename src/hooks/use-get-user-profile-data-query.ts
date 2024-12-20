// Third-party libraries
import { useQuery } from "@tanstack/react-query";

// Services
import { getUserProfileData } from "@/services/users.service";

// Constants
import { QUERY_KEY_DICT } from "@/constants/query-keys.constant";

export function useGetUserProfileDataQuery() {
  return useQuery({
    queryKey: [QUERY_KEY_DICT.USER_PROFILE_DATA],
    queryFn: getUserProfileData,
  });
}

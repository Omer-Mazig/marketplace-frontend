import { Outlet, useOutletContext } from "react-router-dom";
import ProfileTabLinks from "./_components/profile-tab-links";
import { useUserProfileDataQuery } from "@/hooks/use-user-profile-data-query";
import { UseQueryResult } from "@tanstack/react-query";
import { UserProfileData } from "@/types/users.types";

// Define a type for the context
type UserProfileContext = UseQueryResult<UserProfileData, Error>;

export default function UserProfileLayout() {
  const { data: userProfileData, isLoading, error } = useUserProfileDataQuery();

  return (
    <div className="text-center 3xs:text-start">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <ProfileTabLinks />
      <Outlet context={{ data: userProfileData, isLoading, error }} />
    </div>
  );
}

export function useUserProfileContext() {
  return useOutletContext<UserProfileContext>();
}

import { Outlet, useOutletContext } from "react-router-dom";
import ProfileTabLinks from "./_components/profile-tab-links";
import { UseQueryResult } from "@tanstack/react-query";
import { UserProfileData } from "@/types/users.types";
import { useGetUserProfileDataQuery } from "@/hooks/use-get-user-profile-data-query";

// Define a type for the context
type UserProfileContext = UseQueryResult<UserProfileData, Error>;

export default function UserProfileLayout() {
  const {
    data: userProfileData,
    isLoading,
    error,
  } = useGetUserProfileDataQuery();

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

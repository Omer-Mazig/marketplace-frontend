// Third-party libraries
import { Outlet, useOutletContext } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";

// Custom components
import ProfileTabLinks from "./_components/profile-tab-links";

// Types
import { UserProfileData } from "@/types/users.types";

// Hooks
import { useGetUserProfileDataQuery } from "@/hooks/use-get-user-profile-data-query";
import { PageHeading } from "@/components/ui/page-heading";

// Define a type for the context
type UserProfileContext = UseQueryResult<UserProfileData, Error>;

//TODO: fix bug related to 'isFetching'. infinate spinner withn moving between children pages
export default function UserProfileLayout() {
  const query = useGetUserProfileDataQuery();

  return (
    <div className="text-center 3xs:text-start">
      <PageHeading>User Profile</PageHeading>
      <ProfileTabLinks />
      <Outlet context={query} />
    </div>
  );
}

export function useUserProfileContext() {
  return useOutletContext<UserProfileContext>();
}

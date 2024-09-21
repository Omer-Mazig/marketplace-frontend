import {
  NavLink,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { User, Settings, Package, Heart, LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LoggedInUser } from "@/providers/auth-provider";
import api from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserProfileData = LoggedInUser & {
  products: any[];
  wishlist: any[];
};
type ContextType = { userProfileData: UserProfileData | null };

async function getUserProfileData(): Promise<UserProfileData> {
  const { data } = await api.get(`/users/user-data`);
  return data;
}

// Reusable component for profile tab links
type ProfileTabLinkProps = {
  to: string;
  value: string;
  Icon: LucideIcon;
  label: string;
};

function ProfileTabLink({ to, value, Icon, label }: ProfileTabLinkProps) {
  return (
    <TabsTrigger
      value={value}
      asChild
    >
      <NavLink
        to={to}
        className="flex flex-col items-center"
      >
        {({ isActive }) => (
          <>
            <Icon
              className={`h-5 w-5 md:hidden ${isActive ? "text-primary" : ""}`}
            />
            <span className="sr-only md:not-sr-only md:mt-1 text-xs">
              {label}
            </span>
          </>
        )}
      </NavLink>
    </TabsTrigger>
  );
}

function UserProfileLayout() {
  const location = useLocation();

  const { data: userProfileData } = useQuery({
    queryKey: ["user-profile-data"],
    queryFn: () => getUserProfileData(),
  });

  if (!userProfileData) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      <Tabs
        defaultValue={location.pathname}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <ProfileTabLink
            to="info"
            value="/user-profile/info"
            Icon={User}
            label="Info"
          />
          <ProfileTabLink
            to="settings"
            value="/user-profile/settings"
            Icon={Settings}
            label="Settings"
          />
          <ProfileTabLink
            to="products"
            value="/user-profile/products"
            Icon={Package}
            label="Products"
          />
          <ProfileTabLink
            to="wishlist"
            value="/user-profile/wishlist"
            Icon={Heart}
            label="Wishlist"
          />
        </TabsList>
      </Tabs>
      <Outlet context={{ userProfileData } satisfies ContextType} />
    </div>
  );
}

export function useUserProfileData() {
  return useOutletContext<ContextType>();
}

export default UserProfileLayout;

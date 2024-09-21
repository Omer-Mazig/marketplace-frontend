import { NavLink, Outlet, useLocation } from "react-router-dom";
import { User, Settings, Package, Heart, LucideIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <Icon className={`h-5 w-5 md:hidden ${isActive ? "" : ""}`} />
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

  // const { data: userProfileData, isLoading, error } = useUserProfileDataQuery();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      <Tabs
        value={location.pathname}
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
      <Outlet />
    </div>
  );
}

export default UserProfileLayout;

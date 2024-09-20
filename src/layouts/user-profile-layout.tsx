import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Package, Heart } from "lucide-react";

import { LoggedInUser, useAuth } from "@/providers/auth-provider";

type ContextType = { userProfileData: LoggedInUser | null };

function UserProfileLaoyout() {
  const { loggedInUser: userProfileData } = useAuth();

  // TODO:
  // create and point to fetch the user with the product and wishlist

  if (!userProfileData) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <Tabs
        defaultValue="info"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger
            value="info"
            asChild
          >
            <NavLink
              to="" // relative path
              className="flex flex-col items-center"
            >
              {({ isActive }) => (
                <>
                  <User className={`h-5 w-5 ${isActive ? "" : ""}`} />
                  <span className="sr-only md:not-sr-only md:mt-1 text-xs">
                    Info
                  </span>
                </>
              )}
            </NavLink>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            asChild
          >
            <NavLink
              to="settings"
              className="flex flex-col items-center"
            >
              {({ isActive }) => (
                <>
                  <Settings className={`h-5 w-5 ${isActive ? "" : ""}`} />
                  <span className="sr-only md:not-sr-only md:mt-1 text-xs">
                    Settings
                  </span>
                </>
              )}
            </NavLink>
          </TabsTrigger>
          <TabsTrigger
            value="products"
            asChild
          >
            <NavLink
              to="products"
              className="flex flex-col items-center"
            >
              {({ isActive }) => (
                <>
                  <Package className={`h-5 w-5 ${isActive ? "" : ""}`} />
                  <span className="sr-only md:not-sr-only md:mt-1 text-xs">
                    Products
                  </span>
                </>
              )}
            </NavLink>
          </TabsTrigger>
          <TabsTrigger
            value="wishlist"
            asChild
          >
            <NavLink
              to="wishlist"
              className="flex flex-col items-center"
            >
              {({ isActive }) => (
                <>
                  <Heart className={`h-5 w-5 ${isActive ? "" : ""}`} />
                  <span className="sr-only md:not-sr-only md:mt-1 text-xs">
                    Wishlist
                  </span>
                </>
              )}
            </NavLink>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Outlet context={{ userProfileData } satisfies ContextType} />
    </div>
  );
}

export function useUserProfileData() {
  return useOutletContext<ContextType>();
}

export default UserProfileLaoyout;

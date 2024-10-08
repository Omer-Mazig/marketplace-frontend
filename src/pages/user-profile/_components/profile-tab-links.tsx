import { NavLink, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Package, Heart, LucideIcon } from "lucide-react";

type ProfileTabLinkProps = {
  to: string;
  value: string;
  Icon: LucideIcon;
  label: string;
};

function TabLink({ to, value, Icon, label }: ProfileTabLinkProps) {
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

function ProfileTabLinks() {
  const location = useLocation();

  return (
    <Tabs
      value={location.pathname}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-4 mb-4">
        <TabLink
          to="info"
          value="/user-profile/info"
          Icon={User}
          label="Info"
        />
        <TabLink
          to="settings"
          value="/user-profile/settings"
          Icon={Settings}
          label="Settings"
        />
        <TabLink
          to="products"
          value="/user-profile/products"
          Icon={Package}
          label="Products"
        />
        <TabLink
          to="wishlist"
          value="/user-profile/wishlist"
          Icon={Heart}
          label="Wishlist"
        />
      </TabsList>
    </Tabs>
  );
}

export default ProfileTabLinks;

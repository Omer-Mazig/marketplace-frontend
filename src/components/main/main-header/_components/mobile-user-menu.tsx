import { Link } from "react-router-dom";
import {
  Bell,
  CreditCard,
  Heart,
  Info,
  LogOut,
  Package,
  Settings,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/auth-provider";
import { useUpgradePlanDialog } from "@/providers/upgrade-plan-dialog-provider";
import { Button } from "@/components/ui/button";

export function MobileUserMenu() {
  const { loggedInUser, logout } = useAuth();
  const { openDialog } = useUpgradePlanDialog();

  if (!loggedInUser) return null;

  const avatarFallbackText =
    loggedInUser.firstName[0].toUpperCase() +
    loggedInUser.lastName[0].toUpperCase();

  return (
    <div className="pt-4 pb-3 border-t border-gray-200">
      <div className="flex items-center px-4 mb-3">
        <div className="flex-shrink-0">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={loggedInUser.imageUrl}
              alt={loggedInUser.firstName}
            />
            <AvatarFallback>{avatarFallbackText}</AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-3">
          <div className="text-base font-semibold text-gray-800">
            {loggedInUser.firstName} {loggedInUser.lastName}
          </div>
          <div className="text-sm font-medium text-gray-500">
            {loggedInUser.email}
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1 px-2">
        {loggedInUser.userTier !== "platinum" && (
          <Button
            onClick={openDialog}
            variant="ghost"
            className="w-full justify-start text-left font-normal"
          >
            <Sparkles className="mr-3 h-5 w-5" />
            Upgrade plan
          </Button>
        )}
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-left font-normal"
        >
          <Link to="/platform/user-profile/info">
            <Info className="mr-3 h-5 w-5" />
            Info
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-left font-normal"
        >
          <Link to="/platform/user-profile/settings">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-left font-normal"
        >
          <Link to="/platform/user-profile/products">
            <Package className="mr-3 h-5 w-5" />
            Products
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-left font-normal"
        >
          <Link to="/platform/user-profile/wishlist">
            <Heart className="mr-3 h-5 w-5" />
            Wishlist
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-left font-normal"
        >
          <Link to="#">
            <CreditCard className="mr-3 h-5 w-5" />
            Billing
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-left font-normal"
        >
          <Link to="#">
            <Bell className="mr-3 h-5 w-5" />
            Notifications
          </Link>
        </Button>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-left font-normal"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </Button>
      </div>
    </div>
  );
}

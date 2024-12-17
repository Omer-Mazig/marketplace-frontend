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
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/auth-provider";
import { useUpgradePlanDialog } from "@/providers/upgrade-plan-dialog-provider";
import { cn } from "@/lib/utils";

export function UserDropDownContent({
  sideOffset = 4,
  align = "end",
  isMobile = false,
  className,
}: {
  sideOffset?: number | undefined;
  align?: "end" | "center" | "start" | undefined;
  isMobile?: boolean;
  className?: string;
}) {
  const { loggedInUser, logout } = useAuth();
  const { openDialog } = useUpgradePlanDialog();

  if (!loggedInUser) return null;
  const avatarFallbackText =
    loggedInUser.firstName[0].toUpperCase() +
    loggedInUser.lastName[0].toUpperCase();
  return (
    <DropdownMenuContent
      className={cn(
        "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
        className
      )}
      side={isMobile ? "bottom" : "right"}
      align={align}
      sideOffset={sideOffset}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={loggedInUser.imageUrl}
              alt={loggedInUser.firstName}
            />
            <AvatarFallback className="rounded-lg">
              {avatarFallbackText}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {loggedInUser.firstName}
            </span>
            <span className="truncate text-xs">{loggedInUser.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      {loggedInUser.userTier !== "platinum" ? (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              asChild
              className="flex gap-2"
            >
              <span onClick={openDialog}>
                <Sparkles className="w-4 h-4" />
                Upgrade plan
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </>
      ) : null}
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          asChild
          className="flex gap-2"
        >
          <Link to="/platform/user-profile/info">
            <Info className="w-4 h-4" />
            Info
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex gap-2"
        >
          <Link to="/platform/user-profile/settings">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex gap-2"
        >
          <Link to="/platform/user-profile/products">
            <Package className="w-4 h-4" />
            Products
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex gap-2"
        >
          <Link to="/platform/user-profile/wishlist">
            <Heart className="w-4 h-4" />
            Wishlist
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex gap-2"
        >
          <Link to="#">
            <CreditCard className="w-4 h-4" />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="flex gap-2"
        >
          <Link to="#">
            <Bell className="w-4 h-4" />
            Notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={logout}
        className="flex gap-2"
      >
        <LogOut className="w-4 h-4" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

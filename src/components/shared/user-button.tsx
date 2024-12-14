"use client";

import {
  Bell,
  ChevronsUpDown,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/providers/auth-provider";
import { Link } from "react-router-dom";

export function UserButton() {
  const { isMobile } = useSidebar();
  const { loggedInUser, logout } = useAuth();

  if (!loggedInUser) return null;

  const avatarFallbackText =
    loggedInUser.firstName[0].toUpperCase() +
    loggedInUser.lastName[0].toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip="Account"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
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
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
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
                  <DropdownMenuItem className="flex gap-2">
                    <Sparkles className="w-4 h-4" />
                    Upgrade plan
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
                <Link to="/user-profile/info">
                  <Info className="w-4 h-4" />
                  Info
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="flex gap-2"
              >
                <Link to="/user-profile/settings">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="flex gap-2"
              >
                <Link to="/user-profile/products">
                  <Package className="w-4 h-4" />
                  Products
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="flex gap-2"
              >
                <Link to="/user-profile/wishlist">
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
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

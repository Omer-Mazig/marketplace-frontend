import { NavLink } from "react-router-dom";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAuth } from "@/providers/auth-provider";

export function UserButton() {
  const { loggedInUser, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <Avatar>
            <AvatarImage
              src={loggedInUser?.imageUrl || ""}
              alt={loggedInUser?.email}
            />
            <AvatarFallback>
              {loggedInUser?.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Profile Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NavLink to="user-profile/info">Profile</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NavLink to="user-profile/settings">Setting</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NavLink to="user-profile/products">Products</NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NavLink to="user-profile/wishlist">Wishlist</NavLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="flex items-center gap-1"
        >
          <LogOut className="h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

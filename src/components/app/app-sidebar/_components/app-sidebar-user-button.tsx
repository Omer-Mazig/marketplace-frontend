import { ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/providers/auth-provider";
import { UserDropDownContent } from "../../../shared/user-dropdown-content";

export function AppSidebarUserButton() {
  const { isMobile } = useSidebar();
  const { loggedInUser } = useAuth();

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
          <UserDropDownContent isMobile={isMobile} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

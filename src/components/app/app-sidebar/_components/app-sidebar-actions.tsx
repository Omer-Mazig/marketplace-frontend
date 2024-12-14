import { Link } from "react-router-dom";

import { useAuth } from "@/providers/auth-provider";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus, Sparkles } from "lucide-react";

export function AppSidebarActions() {
  const { loggedInUser } = useAuth();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Actions</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Upgrade plan"
            >
              {loggedInUser?.userTier !== "platinum" ? (
                <button>
                  <Sparkles className="w-4 h-4" />
                  Upgrade plan
                </button>
              ) : null}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Add product"
            >
              <Link to="/products/new-product">
                <Plus /> Add product
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

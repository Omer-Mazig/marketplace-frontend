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
import { LogIn, Plus, Sparkles } from "lucide-react";
import { useUpgradePlanDialog } from "@/providers/upgrade-plan-dialog-provider";

export function AppSidebarActions() {
  const { loggedInUser } = useAuth();
  const { openDialog } = useUpgradePlanDialog();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Actions</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Upgrade plan"
              onClick={openDialog}
            >
              {loggedInUser && loggedInUser.userTier !== "platinum" ? (
                <button>
                  <Sparkles className="w-4 h-4" />
                  Upgrade plan
                </button>
              ) : null}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {loggedInUser ? (
              <SidebarMenuButton
                asChild
                tooltip="Add product"
              >
                <Link to="/platform/products/new-product">
                  <Plus className="w-4 h-4" /> Add product
                </Link>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                asChild
                tooltip="Login"
              >
                <Link to="/auth/login">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

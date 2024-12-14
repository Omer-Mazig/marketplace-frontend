// React router
import { Link } from "react-router-dom";

// Icons
import { Package, Search } from "lucide-react";

// Custom components
import { UserButton } from "@/components/shared/user-button";

// UI components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { Label } from "@/components/ui/label";
import { AppSidebarMainNavigation } from "./_components/app-sidebar-main-navigation";
import { AppSidebarActions } from "./_components/app-sidebar-actions";
import { AppSidebarProductCategories } from "./_components/app-sidebar-product-categories";

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
            >
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                  <Package className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none ml-2">
                  <span className="font-semibold">MarketPlace</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {state === "expanded" ? (
          <form>
            <SidebarGroup className="py-0">
              <SidebarGroupContent className="relative">
                <Label
                  htmlFor="search"
                  className="sr-only"
                >
                  Search
                </Label>
                <SidebarInput
                  id="search"
                  placeholder="Search the docs..."
                  className="pl-8"
                />
                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
              </SidebarGroupContent>
            </SidebarGroup>
          </form>
        ) : null}
      </SidebarHeader>
      <SidebarContent className="mt-[72px]">
        <AppSidebarMainNavigation />
        <AppSidebarActions />

        {state !== "collapsed" && <AppSidebarProductCategories />}
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}

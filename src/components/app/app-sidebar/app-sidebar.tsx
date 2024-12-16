// Custom components
import { AppSidebarUserButton } from "@/components/app/app-sidebar/_components/app-sidebar-user-button";

// UI components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

// Sidebar components
import { AppSidebarMainNavigation } from "./_components/app-sidebar-main-navigation";
import { AppSidebarActions } from "./_components/app-sidebar-actions";
import { AppSidebarProductCategories } from "./_components/app-sidebar-product-categories";
import { AppSidebarSearch } from "./_components/app-sidebar-search";
import { AppSidebarLogo } from "./_components/app-sidebar-logo";

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppSidebarLogo />
        {state === "expanded" ? <AppSidebarSearch /> : null}
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarMainNavigation />
        <SidebarSeparator />
        <AppSidebarActions />
        <SidebarSeparator />
        {state !== "collapsed" && <AppSidebarProductCategories />}
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarUserButton />
      </SidebarFooter>
    </Sidebar>
  );
}

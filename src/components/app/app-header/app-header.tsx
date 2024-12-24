// Custom components
import { ModeToggle } from "@/components/shared/mode-toggle";
import { AuthButton } from "@/components/shared/auth-button";
import { PageBreadcrumb } from "./_components/page-breadcrumb";

// Custom providers
import { useAuth } from "@/providers/auth-provider";

// UI components

import { AppSearchButton } from "@/components/shared/app-search-button";
import { AppSidebarTrigger } from "./_components/app-sidebar-trigger";
import { NotificationsButton } from "@/components/shared/notifications-button";

export function AppHeader() {
  const { loggedInUser } = useAuth();

  return (
    <header className="container mb-4 sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="mr-4 flex">
          <AppSidebarTrigger />
          <PageBreadcrumb />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-6 md:justify-end">
          <AppSearchButton />
          <div className="flex items-center gap-1 ">
            {/* undefined is initial state. null it no loggedInUser */}
            {loggedInUser === undefined ? null : loggedInUser === null ? (
              <AuthButton />
            ) : (
              <NotificationsButton />
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

// React hooks
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Custom components
import { ModeToggle } from "@/components/shared/mode-toggle";
import { AuthButton } from "@/components/shared/auth-button";
import { PageBreadcrumb } from "./_components/page-breadcrumb";

// Custom providers
import { useAuth } from "@/providers/auth-provider";

// UI components
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  const { loggedInUser } = useAuth();

  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <header className="container mb-4 sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="mr-4 flex">
          <SidebarTrigger />
          <PageBreadcrumb />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-6 md:justify-end">
          {/* <AppSearchButton /> */}
          <div className="flex items-center gap-1 ">
            {/* {loggedInUser ? <UserButton /> : <AuthButton />} */}
            {loggedInUser ? null : <AuthButton />}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

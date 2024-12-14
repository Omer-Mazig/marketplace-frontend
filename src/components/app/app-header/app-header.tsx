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
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AppHeader() {
  const { loggedInUser } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <header className="container mb-4 sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="mr-4 flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <SidebarTrigger className="mr-1" />
              </TooltipTrigger>
              <TooltipContent>
                {state === "expanded" ? "Close sidebar" : "Open sidebar"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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

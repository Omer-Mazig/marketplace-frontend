// Custom components
import { ModeToggle } from "./mode-toggle";
import { AuthButton } from "./auth-button";

// Custom providers
import { useAuth } from "@/providers/auth-provider";
import { SidebarTrigger } from "../ui/sidebar";
import { PageBreadcrumb } from "./page-breadcrumb";

export function MainNav() {
  const { loggedInUser } = useAuth();

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

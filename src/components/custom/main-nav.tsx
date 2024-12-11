// React Router
import { Link } from "react-router-dom";

// Custom components
import { ModeToggle } from "./mode-toggle";
import { AuthButton } from "./auth-button";
import { UserButton } from "./user-button";

// Custom providers
import { useAuth } from "@/providers/auth-provider";
import { SidebarTrigger } from "../ui/sidebar";

export function MainNav() {
  const { loggedInUser } = useAuth();

  return (
    <header className="container mb-4 sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <SidebarTrigger />

          <Link
            to="/"
            className="uppercase mr-4 flex items-center space-x-2 lg:mr-6"
          >
            MarketPlace
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-6 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <button className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64">
              <span className="hidden lg:inline-flex">
                Search documentation...
              </span>
              <span className="inline-flex lg:hidden">Search</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>
                "K"
              </kbd>
            </button>
          </div>
          <div className="flex items-center gap-1 ">
            {loggedInUser ? <UserButton /> : <AuthButton />}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { AuthButton } from "./auth-button";
import { UserButton } from "./user-button";
import { useAuth } from "@/providers/auth-provider";

export function MainNav() {
  const { loggedInUser } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link
            to="/"
            className="uppercase mr-4 flex items-center space-x-2 lg:mr-6"
          >
            Logo
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/services">Services</Link>
            <Link to="/protected">Protected</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {loggedInUser ? <UserButton /> : <AuthButton />}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

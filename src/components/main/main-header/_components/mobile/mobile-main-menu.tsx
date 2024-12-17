import { Link } from "react-router-dom";
import { MobileUserMenu } from "./mobile-user-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { MainHeaderLinks } from "../../main-header";

export function MobileMainMenu() {
  const { loggedInUser } = useAuth();

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {MainHeaderLinks.map((link) => {
          return (
            <Link
              key={link.to}
              to={link.to}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {link.label}
            </Link>
          );
        })}
      </div>
      {loggedInUser ? (
        <MobileUserMenu />
      ) : (
        <div className="my-3 px-2 space-y-1">
          <Button
            asChild
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium"
          >
            <Link to="/auth/login"> Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

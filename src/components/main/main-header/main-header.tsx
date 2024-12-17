import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDropDownContent } from "@/components/shared/user-dropdown-content";
import { MobileUserMenu } from "./_components/mobile-user-menu";
import { useIsMobile } from "@/hooks/use-mobile";

// TODO: add more links to real pages
export function MainHeader() {
  // this state control the mobile AND the desktop menus
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loggedInUser } = useAuth();
  const isMobile = useIsMobile();

  let avatarFallbackText = "";

  if (loggedInUser) {
    avatarFallbackText =
      loggedInUser.firstName[0].toUpperCase() +
      loggedInUser.lastName[0].toUpperCase();
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-2 h-16">
          <div className="flex items-center gap-12">
            <Link
              to="/"
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-full" />
              <span className="text-xl font-bold text-gray-900">
                MarketPalace
              </span>
            </Link>

            <nav className="hidden md:flex space-x-4">
              <Link
                to="/categories"
                className="text-gray-600 hover:text-gray-900"
              >
                Categories
              </Link>
              <Link
                to="/plans"
                className="text-gray-600 hover:text-gray-900"
              >
                Plans
              </Link>
              <Link
                to="/sell"
                className="text-gray-600 hover:text-gray-900"
              >
                Sell
              </Link>
            </nav>
          </div>

          {/* <div className="hidden md:block flex-1 max-w-xl px-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div> */}

          <div className="hidden md:flex items-center space-x-4">
            {/* undefined is initial state. null it no loggedInUser */}
            {loggedInUser === undefined ? (
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={undefined}
                  alt={undefined}
                />
                <AvatarFallback>
                  <Circle />
                </AvatarFallback>
              </Avatar>
            ) : loggedInUser === null ? (
              <Button asChild>
                <Link to="/auth/login"> Login</Link>
              </Button>
            ) : (
              <DropdownMenu
                open={isMenuOpen}
                onOpenChange={(open) => setIsMenuOpen(open)}
              >
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage
                      src={loggedInUser.imageUrl}
                      alt={loggedInUser.firstName}
                    />
                    <AvatarFallback>{avatarFallbackText}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                {!isMobile && (
                  <UserDropDownContent
                    sideOffset={-40}
                    align="start"
                    className="mt-14"
                  />
                )}
              </DropdownMenu>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 py-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/categories"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Categories
            </Link>
            <Link
              to="/plans"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Plans
            </Link>
            <Link
              to="/sell"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Sell
            </Link>
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
      )}
    </header>
  );
}

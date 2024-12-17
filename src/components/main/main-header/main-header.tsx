import { useState } from "react";
import { Logo } from "./_components/logo";
import { DesktopNav } from "./_components/desktop/desktop-nav";
import { DesktopUserDropdown } from "./_components/desktop/desktop-user-dropdown";
import { MobileHamburger } from "./_components/mobile/mobile-hamburger";
import { MobileMainMenu } from "./_components/mobile/mobile-main-menu";

export function MainHeader() {
  // this state control the mobile AND the desktop menus
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-2 h-16">
          <div className="flex items-center gap-12">
            <Logo />
            {/* Desktop  nav */}
            <div className="hidden md:block">
              <DesktopNav />
            </div>
          </div>

          {/* Desktop  menu */}
          <div className="hidden md:flex items-center space-x-4">
            <DesktopUserDropdown
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
            />
          </div>
          <MobileHamburger
            isOpen={isMenuOpen}
            toggle={toggleMenu}
          />
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && <MobileMainMenu />}
    </header>
  );
}

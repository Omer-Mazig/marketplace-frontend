import { Menu, X } from "lucide-react";

interface MobileHamburgerProps {
  isOpen: boolean;
  toggle: () => void;
}

export function MobileHamburger({ isOpen, toggle }: MobileHamburgerProps) {
  return (
    <button
      onClick={toggle}
      className="md:hidden text-gray-600 hover:text-gray-900"
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );
}

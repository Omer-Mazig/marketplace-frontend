import { Link } from "react-router-dom";
import { MainHeaderLinks } from "../../main-header";

export function DesktopNav() {
  return (
    <nav className="flex space-x-4">
      {MainHeaderLinks.map((link) => {
        return (
          <Link
            key={link.to}
            to={link.to}
            className="text-gray-600 hover:text-gray-900"
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

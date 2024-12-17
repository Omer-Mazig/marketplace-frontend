import { Link } from "react-router-dom";

const links = [
  { label: "Categories", to: "/categories" },
  { label: "Plans", to: "/plans" },
  { label: "Sell", to: "/sell" },
];

export function DesktopNav() {
  return (
    <nav className="flex space-x-4">
      {links.map((link) => {
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

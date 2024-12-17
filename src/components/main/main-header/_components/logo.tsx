import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center space-x-2"
    >
      <div className="w-8 h-8 bg-indigo-600 rounded-full" />
      <span className="text-xl font-bold text-gray-900">MarketPalace</span>
    </Link>
  );
}

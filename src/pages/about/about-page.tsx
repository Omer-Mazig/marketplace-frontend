import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function AboutPage() {
  const setBreadcrumpItems = useSetBreadcrumpItems();
  const location = useLocation();

  useEffect(() => {
    // because of nested routes
    if (location.pathname !== "/about") return;
    setBreadcrumpItems([
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
    ]);
  }, [location.pathname]);

  return (
    <div>
      <h1>About</h1>
      <Outlet />
    </div>
  );
}

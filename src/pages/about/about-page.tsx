import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function AboutPage() {
  const setBreadcrumpItems = useSetBreadcrumpItems();

  useEffect(() => {
    setBreadcrumpItems([
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
    ]);
  }, []);

  return (
    <div>
      <h1>About</h1>
      <Outlet />
    </div>
  );
}

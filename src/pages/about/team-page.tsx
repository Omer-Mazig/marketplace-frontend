import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";
import { useEffect } from "react";

export default function TeamPage() {
  const setBreadcrumpItems = useSetBreadcrumpItems();

  useEffect(() => {
    setBreadcrumpItems([
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/about/team", label: "Team" },
    ]);
  }, []);
  return <div>TeamPage</div>;
}

import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";
import { useEffect } from "react";

export default function VisionPage() {
  const setBreadcrumpItems = useSetBreadcrumpItems();

  useEffect(() => {
    setBreadcrumpItems([
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/about/vision", label: "Vision" },
    ]);
  }, []);
  return <div>VisionPage</div>;
}

import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";
import { useEffect } from "react";

function HomePage() {
  const setBreadcrumpItems = useSetBreadcrumpItems();

  useEffect(() => {
    setBreadcrumpItems([{ href: "/", label: "Home" }]);
  }, []);

  return <div>Home</div>;
}

export default HomePage;

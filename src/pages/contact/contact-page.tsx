import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";
import { useEffect } from "react";

function ContactPage() {
  const setBreadcrumpItems = useSetBreadcrumpItems();

  useEffect(() => {
    setBreadcrumpItems([
      { href: "/", label: "Home" },
      { href: "/contact", label: "Contact" },
    ]);
  }, []);

  return <div>Contact</div>;
}

export default ContactPage;

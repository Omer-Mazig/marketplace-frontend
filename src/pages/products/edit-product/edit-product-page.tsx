// Third-party libraries
import { useEffect } from "react";

// Custom components
import { PageHeading } from "@/components/ui/page-heading";
import { NewProductForm } from "../new-product/_components/new-product-form";

// Providers
import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";
import { useParams } from "react-router-dom";

// TODO: add skelaton
export default function EditProductPage() {
  const setBreadcrumpItems = useSetBreadcrumpItems();
  const { productId } = useParams();

  console.log("productId", productId);

  useEffect(() => {
    setBreadcrumpItems([
      { href: "/platform/user-profile", label: "Profile" },
      { href: "/platform/user-profile/products", label: "Products" },
      { href: "/platform/products/edit-product", label: "Edit Product" },
    ]);
  }, []);

  return (
    <div className="text-center 3xs:text-start">
      <PageHeading>Edit Product</PageHeading>

      <NewProductForm productId={productId} />
    </div>
  );
}

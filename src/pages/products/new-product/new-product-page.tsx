// Third-party libraries
import { useEffect, useState } from "react";

// Custom components
import { AfterCreateProductDialog } from "@/pages/products/_components/after-create-product-dialog";
import { PageHeading } from "@/components/ui/page-heading";
import { NewProductForm } from "./_components/new-product-form";

// Providers
import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";

export default function NewProductPage() {
  const [
    shouldShowafterCreateProductDialog,
    setShouldShowAfterCreateProductDialog,
  ] = useState(false);

  const setBreadcrumpItems = useSetBreadcrumpItems();

  useEffect(() => {
    setBreadcrumpItems([
      { href: "/platform/user-profile", label: "Profile" },
      { href: "/platform/user-profile/products", label: "Products" },
      { href: "/platform/products/new-product", label: "New Product" },
    ]);
  }, []);

  return (
    <div className="text-center 3xs:text-start">
      <PageHeading>Add New Product</PageHeading>

      <NewProductForm
        setShouldShowAfterCreateProductDialog={
          setShouldShowAfterCreateProductDialog
        }
      />

      {shouldShowafterCreateProductDialog ? (
        <AfterCreateProductDialog
          setShouldShowAfterCreateProductDialog={
            setShouldShowAfterCreateProductDialog
          }
        />
      ) : null}
    </div>
  );
}

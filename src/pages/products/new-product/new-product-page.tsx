// Third-party libraries
import { useState } from "react";

// Custom components
import { AfterCreateProductDialog } from "@/pages/products/_components/after-create-product-dialog";
import { PageHeading } from "@/components/ui/page-heading";
import { NewProductForm } from "./_components/new-product-form";
import { UpgradePlanDialog } from "@/components/shared/upgrade-plan-dialog";

// TODO: add skelaton
export default function NewProductPage() {
  const [
    shouldShowafterCreateProductDialog,
    setShouldShowAfterCreateProductDialog,
  ] = useState(false);
  const [shouldShowUpgradePlanDialog, setShouldShowUpgradePlanDialog] =
    useState(false);

  function handleCloseUpgradePlanDialog() {
    setShouldShowUpgradePlanDialog(false);
  }

  return (
    <div className="text-center 3xs:text-start">
      <PageHeading>Add New Product</PageHeading>
      <NewProductForm
        setShouldShowAfterCreateProductDialog={
          setShouldShowAfterCreateProductDialog
        }
        setShouldShowUpgradePlanDialog={setShouldShowUpgradePlanDialog}
      />

      {shouldShowafterCreateProductDialog ? (
        <AfterCreateProductDialog
          setShouldShowAfterCreateProductDialog={
            setShouldShowAfterCreateProductDialog
          }
        />
      ) : null}

      {shouldShowUpgradePlanDialog ? (
        <UpgradePlanDialog
          isOpen={shouldShowUpgradePlanDialog}
          onClose={handleCloseUpgradePlanDialog}
        />
      ) : null}
    </div>
  );
}

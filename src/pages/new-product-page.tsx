// Third-party libraries
import { useState } from "react";

// Custom components
import { AfterCreateProductDialog } from "@/components/custom/after-create-product-dialog";
import { NewProductForm } from "@/components/custom/new-product-form";
import { UpgradePlanDialog } from "@/components/custom/upgrade-plan-dialog";
import { PageHeading } from "@/components/ui/page-heading";

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

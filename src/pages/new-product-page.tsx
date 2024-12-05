import { AfterCreateProductDialog } from "@/components/custom/after-create-product-dialog";
import { NewProductForm } from "@/components/custom/new-product-form";
import { UpgradePlanDialog } from "@/components/custom/upgrade-plan-dialog";
import { useState } from "react";

export default function NewProductPage() {
  const [afterCreateProductDialog, setAfterCreateProductDialog] =
    useState(false);
  const [shouldShowUpgradePlanDialog, setShouldShowUpgradePlanDialog] =
    useState(false);

  function handleCloseUpgradePlanDialog() {
    setShouldShowUpgradePlanDialog(false);
  }

  return (
    <div className="text-center 3xs:text-start">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <NewProductForm
        setAfterCreateProductDialog={setAfterCreateProductDialog}
        setShouldShowUpgradePlanDialog={setShouldShowUpgradePlanDialog}
      />

      {afterCreateProductDialog ? (
        <AfterCreateProductDialog
          setAfterCreateProductDialog={setAfterCreateProductDialog}
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

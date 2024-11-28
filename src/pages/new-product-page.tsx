import { AfterCreateProductDialog } from "@/components/custom/after-create-product-dialog";
import { NewProductForm } from "@/components/custom/new-product-form";
import { useState } from "react";

export default function NewProductPage() {
  const [afterCreateProductDialog, setAfterCreateProductDialog] =
    useState(false);

  return (
    <div className="text-center 3xs:text-start">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <NewProductForm
        setAfterCreateProductDialog={setAfterCreateProductDialog}
      />

      {afterCreateProductDialog ? (
        <AfterCreateProductDialog
          setAfterCreateProductDialog={setAfterCreateProductDialog}
        />
      ) : null}
    </div>
  );
}

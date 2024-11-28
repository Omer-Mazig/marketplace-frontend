import { NewProductForm } from "@/components/custom/new-product-form";

export default function NewProductPage() {
  return (
    <div className="text-center 3xs:text-start">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <NewProductForm />
    </div>
  );
}

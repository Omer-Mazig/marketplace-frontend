// Third-party libraries
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Custom components
import { PageHeading } from "@/components/ui/page-heading";
import { NewProductForm } from "../new-product/_components/new-product-form";
import Error from "@/components/shared/error";
import { NewProductFormSkeleton } from "../new-product/_components/new-product-form-skeleton";

// Providers
import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";
import { useGetProductById } from "@/hooks/use-get-product-by-id-query";
import { TextWarning } from "@/components/shared/text-warning";

// TODO: no need for refetching?
export default function EditProductPage() {
  const setBreadcrumpItems = useSetBreadcrumpItems();

  const { productId: _productId } = useParams();
  const productId = parseInt(_productId || "");

  const { data: product, error, isLoading } = useGetProductById(productId);

  useEffect(() => {
    setBreadcrumpItems([
      { href: "/platform/user-profile", label: "Profile" },
      { href: "/platform/user-profile/products", label: "Products" },
      { href: "/platform/products/edit-product", label: "Edit Product" },
    ]);
  }, []);

  if (!isLoading) {
    if (error || !product) return <Error />;
  }

  return (
    <div className="text-center 3xs:text-start">
      <PageHeading
        subTitle={
          <TextWarning className="mt-1">
            Note: users that interested in this product will be notify.
          </TextWarning>
        }
      >
        Edit Product
      </PageHeading>

      {isLoading ? (
        <NewProductFormSkeleton />
      ) : (
        <NewProductForm product={product} />
      )}
    </div>
  );
}

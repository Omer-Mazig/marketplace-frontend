// Third-party libraries
import { useParams } from "react-router-dom";

// UI components
import { Skeleton } from "@/components/ui/skeleton";
import Error from "@/components/shared/error";
import { PageHeading } from "@/components/ui/page-heading";

// Hooks
import { useGetAllProductsQuery } from "@/hooks/use-get-all-products-query";
import { useEffect } from "react";
import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";
import { capitalize } from "@/lib/utils";
import { ProductListContainer } from "./_components/product-list-container";

// TODO: Implement infinite scroll
export default function ProductListPage() {
  const { category } = useParams();

  const setBreadcrumpItems = useSetBreadcrumpItems();

  const {
    data: products,
    error,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery({ category });

  useEffect(() => {
    if (category === undefined) return;
    setBreadcrumpItems([
      { href: "/platform/products", label: "Products" },
      {
        href: `/platform/products/category/${category.toLocaleLowerCase()}`,
        label: capitalize(category),
      },
    ]);
  }, [category]);

  if (products && products.length === 0 && isFetching) {
    console.log("render skelaton for products");
  }

  if (!isLoading) {
    if (error || !products) return <Error />;
  }

  return (
    <div>
      <PageHeading>{category}</PageHeading>
      <div className="auto-grid">
        {isLoading || !products ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ProductPreviewSkeleton key={index} />
          ))
        ) : (
          <ProductListContainer
            isLoading={isLoading}
            products={products}
          />
        )}
      </div>
    </div>
  );
}

function ProductPreviewSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

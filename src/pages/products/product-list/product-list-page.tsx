// Third-party libraries
import { useParams, useSearchParams } from "react-router-dom";

// UI components
import { Skeleton } from "@/components/ui/skeleton";
import Error from "@/components/shared/error";
import { PageHeading } from "@/components/ui/page-heading";

// Custom components
import { ProductPreview } from "./_components/product-preview";

// Hooks
import { useGetAllProductsQuery } from "@/hooks/use-get-all-products-query";
import { useEffect } from "react";
import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";
import { capitalize } from "@/lib/utils";

// TODO: Implement infinite scroll
export default function ProductListPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const setBreadcrumpItems = useSetBreadcrumpItems();

  const {
    data: products,
    error,
    isLoading,
  } = useGetAllProductsQuery({ category });

  useEffect(() => {
    if (category === undefined) return;
    setBreadcrumpItems([
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      {
        href: `/products/category/${category.toLocaleLowerCase()}`,
        label: capitalize(category),
      },
    ]);
  }, [category]);

  // TODO: Filter from the serverside
  const filteredProducts = products
    ? products.filter((product) => {
        const searchTerm = searchParams.get("search") || "";
        const priceRange = [
          Number(searchParams.get("minPrice")) || 0,
          Number(searchParams.get("maxPrice")) || 9999,
        ];

        return (
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          product.price >= priceRange[0] &&
          product.price <= priceRange[1]
        );
      })
    : [];

  if (error) return <Error />;

  return (
    <div>
      <PageHeading>{category}</PageHeading>
      <div className="auto-grid">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProductPreviewSkeleton key={index} />
            ))
          : filteredProducts.map((product) => (
              <ProductPreview
                key={product.id}
                product={product}
              />
            ))}
      </div>
    </div>
  );
}

export function ProductsFilterSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

export function ProductPreviewSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

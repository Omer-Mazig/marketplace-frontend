import { useSearchParams } from "react-router-dom";
import { ProductCategory } from "@/enums/product-category.enum";
import Error from "@/components/custom/error";
import { ProductsFilter } from "./_components/products-filter";
import ProductPreview from "./_components/product-preview";
import { useGetAllProductsQuery } from "@/hooks/use-get-all-products-query";
import { Skeleton } from "@/components/ui/skeleton";

// TODO: Implement infinite scroll
export default function ProductListPage() {
  const { data: products, error, isLoading } = useGetAllProductsQuery();

  const [searchParams] = useSearchParams();

  // TODO: Filter from the serverside
  const filteredProducts = products
    ? products.filter((product) => {
        const searchTerm = searchParams.get("search") || "";
        const selectedCategory = searchParams.get("category") || "All";
        const priceRange = [
          Number(searchParams.get("minPrice")) || 0,
          Number(searchParams.get("maxPrice")) || 9999,
        ];

        const isCategoryMatch =
          selectedCategory === "All" ||
          product.categories.includes(selectedCategory as ProductCategory);

        return (
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          isCategoryMatch &&
          product.price >= priceRange[0] &&
          product.price <= priceRange[1]
        );
      })
    : [];

  if (error) return <Error />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="space-y-4 relative">
          {isLoading ? <ProductsFilterSkeleton /> : <ProductsFilter />}
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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

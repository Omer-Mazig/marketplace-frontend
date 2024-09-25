import { useSearchParams } from "react-router-dom";
import { ProductCategory } from "@/enums/product-category.enum";
import Error from "@/components/custom/error";
import { ProductsFilter } from "./_components/products-filter";
import ProductPreview from "./_components/product-preview";
import { useProductsQuery } from "@/hooks/use-products-query";

// TODO: Implement infinate scoll
// TODO: add Skeleton (not urgent)
export default function ProductListPage() {
  const { data: products, error, isLoading } = useProductsQuery();

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

  if (isLoading) return <div>Loading...</div>;
  if (error || !products) return <Error />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductPreview
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4 relative">
          <ProductsFilter />
        </div>
      </div>
    </div>
  );
}

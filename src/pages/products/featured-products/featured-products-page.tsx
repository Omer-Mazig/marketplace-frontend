import { ProductCategory } from "@/enums/product-category.enum";
import { useSetBreadcrumpItems } from "@/providers/breadcrump-provider";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function FeaturedProductsPage() {
  const setBreadcrumpItems = useSetBreadcrumpItems();

  useEffect(() => {
    setBreadcrumpItems([{ href: "/platform/products", label: "Products" }]);
  }, []);

  return (
    <div>
      {Object.values(ProductCategory).map((category) => (
        <div key={category}>
          <Link to={`category/${category.toLowerCase()}`}>
            <span>{category}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default FeaturedProductsPage;

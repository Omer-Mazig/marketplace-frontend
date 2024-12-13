import { ProductCategory } from "@/enums/product-category.enum";
import { Link } from "react-router-dom";

function FeaturedProductsPage() {
  return (
    <div>
      {Object.values(ProductCategory).map((category) => (
        <div key={category}>
          <Link to={`/products/category/${category.toLowerCase()}`}>
            <span>{category}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default FeaturedProductsPage;

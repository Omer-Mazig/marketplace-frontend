import { Badge } from "@/components/ui/badge";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { useProduct } from "../product-provider";

export const ProductImage = () => {
  const product = useProduct();
  return (
    <img
      src={product.imageURL}
      alt={product.name}
      className="w-full h-full object-cover block"
    />
  );
};

export const ProductTitle = () => {
  const product = useProduct();
  return <CardTitle>{product.name}</CardTitle>;
};

export const ProductDescription = () => {
  const product = useProduct();
  return (
    <CardDescription className="mt-2 italic">
      {product.description || "Nothing to say about this product"}
    </CardDescription>
  );
};

export const ProductPrice = () => {
  const product = useProduct();
  return (
    <p className="text-2xl font-bold text-primary flex items-center">
      ${product.price.toFixed(2)}
    </p>
  );
};

export const ProductCategories = () => {
  const product = useProduct();
  return (
    <div className="flex flex-wrap gap-2">
      {product.categories.map((category) => (
        <Badge
          key={category}
          variant="default"
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};

export const ProductStock = () => {
  const product = useProduct();
  return <p>Stock: {product.stock}</p>;
};

export const ProductLocation = () => {
  const product = useProduct();
  return product.location && <p>Location: {product.location}</p>;
};

export const ProductNegotiableStatus = () => {
  const product = useProduct();
  return <p>{product.isNegotiable ? "Price is negotiable" : "Fixed price"}</p>;
};

export const ProductViewCount = () => {
  const product = useProduct();
  return <p>Currently views: {product.viewCount}</p>;
};

export const ProductDates = () => {
  const product = useProduct();
  return (
    <div>
      <p>Created: {format(product.createdAt, "PPP")}</p>
      <p>Last updated: {format(product.updatedAt, "PPP")}</p>
    </div>
  );
};

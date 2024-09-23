import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/products.types";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductPreviewProps {
  product: Product;
}

export default function ProductPreview({ product }: ProductPreviewProps) {
  return (
    <Link to={`${product.id}`}>
      <Card
        key={product.id}
        className="flex flex-col"
      >
        <CardHeader>
          <img
            src={
              product.imageURL ||
              `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                product.name
              )}`
            }
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="flex-grow">
          <CardTitle className="mb-2">{product.name}</CardTitle>
          <p className="text-sm text-gray-600 mb-2">
            {product.description || "Nothing to say about this product"}
          </p>
          <div className="flex flex-wrap gap-1">
            {product.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="text-xs"
              >
                {category}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Avatar>
              <AvatarImage
                src={product.owner?.imageUrl || ""}
                alt={product.owner?.email}
              />
              <AvatarFallback>
                {product.owner?.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>
              {product.owner.firstName} {product.owner.lastName}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <Heart className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
        </CardFooter>
      </Card>
    </Link>
  );
}

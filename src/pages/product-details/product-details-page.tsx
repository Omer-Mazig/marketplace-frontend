import { useState, useEffect } from "react";
import { format } from "date-fns";
import { MiniUser } from "@/types/users.types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/products.types";
import { ProductCategory } from "@/enums/product-category.enum";
import { useParams } from "react-router-dom";
import Error from "@/components/custom/error";

// Mock function to fetch product data
const fetchProduct = async (id: string): Promise<Product> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockOwner: MiniUser = {
    id: 1,
    email: "j@gmail.com",
    firstName: "john_doe",
    lastName: "john_doe",
    imageUrl: "/placeholder.svg?height=50&width=50",
  };

  return {
    id: parseInt(id),
    name: "Sample Product",
    description: "This is a sample product description.",
    imageURL: "",
    price: 99.99,
    stock: 10,
    categories: [ProductCategory.ELECTRONICS],
    location: "New York, NY",
    isNegotiable: true,
    viewCount: 150,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-06-15"),
    owner: mockOwner,
    wishlistUsers: [],
  };
};

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!productId) return;
        const data = await fetchProduct(productId);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <Error />;
  }

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {product.imageURL && (
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={
                    product.imageURL ||
                    `https://via.placeholder.com/300x200?text=${encodeURIComponent(
                      product.name
                    )}`
                  }
                  alt="product image"
                />
              )}
            </div>
            <div className="space-y-4">
              <p className="text-lg">{product.description}</p>
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              <p>Stock: {product.stock}</p>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              {product.location && <p>Location: {product.location}</p>}
              <p>
                {product.isNegotiable ? "Price is negotiable" : "Fixed price"}
              </p>
              <p>Views: {product.viewCount}</p>
              <p>Created: {format(product.createdAt, "PPP")}</p>
              <p>Last updated: {format(product.updatedAt, "PPP")}</p>
              <div className="flex items-center space-x-2">
                <img
                  src={product.owner.imageUrl}
                  alt={product.owner.email}
                  className="rounded-full"
                />
                <span>
                  Sold by:{" "}
                  {product.owner.firstName + " " + product.owner.lastName}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-2/3" />
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-[300px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
